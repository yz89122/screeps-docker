const fs = require("fs/promises");
const http = require("http");
const https = require("https");

/** @type {(options: https.RequestOptions, body: Buffer?) => Promise<http.IncomingMessage>} */
const request = (options, body = null) => {
  return new Promise((resolve, reject) => {
    /** @type {Buffer} */
    const buffer = body != null ? Buffer.from(body) : Buffer.alloc(0);
    const _options = Object.assign({}, options);
    _options.headers = Object.assign({}, options.headers);
    if (body != null) _options.headers["content-length"] = buffer.byteLength;
    _options.headers["user-agent"] = _options.headers["user-agent"] || "node";
    // use native https.request in order to make this script dependency-less
    const req = https.request(_options, (res) => {
      res.data = Buffer.alloc(0);
      res.on("data", (chunk) => (res.data += chunk));
      res.on("end", () => resolve(res));
    });
    if (body != null) req.write(buffer);
    req.on("error", reject);
    req.end();
  });
};

(async () => {
  /** @type {[string]} */
  const versions = JSON.parse(await fs.readFile("versions.json"));
  const options = {
    hostname: process.env.GITHUB_API_URL
      ? new URL(process.env.GITHUB_API_URL).hostname
      : "api.github.com",
    path: `/repos/${process.env.GITHUB_REPOSITORY}/actions/workflows/build-docker-image.yml/dispatches`,
    method: "POST",
    headers: {
      accept: "application/vnd.github.v3+json",
      "content-type": "application/json",
    },
  };
  if (process.env.GITHUB_BASIC_AUTH)
    options.auth = process.env.GITHUB_BASIC_AUTH;
  else options.headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  await Promise.all(
    versions
      .filter((version) => version.split(".", 1) >= 4)
      .map(async (version) => {
        const response = await request(
          options,
          JSON.stringify({
            ref: process.env.GITHUB_REF || "master",
            inputs: { version },
          })
        );
        console.info(
          version,
          response.statusCode,
          response.headers,
          response.data.toString()
        );
      })
  );
})();
