FROM node:12-slim

WORKDIR /app

RUN	set -eux ; \
	apt-get update ; \
	apt-get install -y \
		python3 \
		build-essential \
	; \
	npm --global config set user root ;

ARG version=latest
ENV VERSION=${version:-latest}

RUN	set -eux ; \
	npm --global install "screeps@${VERSION}" --cache /tmp/empty-cache --unsafe-perm ; \
	rm -fr /tmp/empty-cache /root/.cache ; \
	apt-get remove -y \
		python3 \
		build-essential \
	; \
	apt-get autoremove -y ; \
	rm -fr /var/lib/apt/lists/* ;

RUN set -eux ; \
	echo api_key | npx screeps init

EXPOSE 21025 21026

CMD ["npx", "screeps", "start"]

