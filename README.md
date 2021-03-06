# screeps-docker

Dockerlized [Screeps](https://github.com/screeps/screeps).

## Build

```bash
docker build -t screeps .
```

### alpine

```bash
docker build -t screeps:alpine -f Dockerfile-alpine .
```

## Pre-built Image

See in [Docker Hub](https://hub.docker.com/r/yz89122/screeps)

```bash
docker pull yz89122/screeps
```

### alpine

```bash
docker pull yz89122/screeps:alpine
```

## Run

1. Generate configurations

   ```bash
   docker run -it --rm -v "$PWD/screeps-data:/app" screeps npx screeps init
   ```

   Then enter your Steam API key

2. Start

   ```bash
   docker run -d -v "$PWD/screeps-data:/app" -p "21025:21025" screeps
   ```

   Then the screeps server will listening on port `21025`

   
