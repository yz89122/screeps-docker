# screeps-docker

Dockerlized [Screeps](https://github.com/screeps/screeps).

## Build

```bash
docker build -t screeps .
```

### With Version

```bash
VERSION=4.2.12
docker build --build-arg "version=${VERSION}" -t screeps .
```

### alpine

```bash
docker build -t screeps:alpine -f Dockerfile-alpine .
```

#### With Version

```bash
VERSION=4.2.12
docker build --build-arg "version=${VERSION}"  -f Dockerfile-alpine -t screeps .
```

## Pre-built Image

See in [Docker Hub](https://hub.docker.com/r/yz89122/screeps)

```bash
docker pull yz89122/screeps
```

### With Version

```bash
VERSION=4.2.12
docker pull "yz89122/screeps:${VERSION}"
```
### alpine

```bash
docker pull yz89122/screeps:alpine
```

#### With Version

```bash
VERSION=4.2.12
docker pull "yz89122/screeps:alpine-${VERSION}"
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

   
