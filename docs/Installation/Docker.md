---
title: Docker
description: Instructions for Docker installation
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Preroll Plus comes pre-built as a Docker image and is the preferred way to run the application, but there are also instructions included if you wish to download the source and run it natively on your device.

## Docker

### Location

Docker images for Preroll Plus can be found at: [chadwpalm/prerollplus](https://hub.docker.com/repository/docker/chadwpalm/prerollplus)

### Tags

| Tags            | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| latest          | The latest stable release                                   |
| #.#.#.#         | Stable releases by version number                           |
| latest-arm      | The latest stable release for ARM v7 (Raspberry Pi)         |
| #.#.#.#-arm     | Stable releases by version number for ARM v7 (Raspberry Pi) |
| develop         | The latest development release                              |
| develop-#.#.#.# | Development release by version number                       |

The `latest` tag will always be the latest stable release. You can also run images that are of a particular version number. These will simply show the version number. The `develop` tag will be the latest development release. Development releases will have newer features to be tested, but are not guaranteed to be stable. Earlier development releases can be also be used and they contain a version number preceded by the word `develop`.

### Usage

<Tabs>
  <TabItem value="CLI" label="Docker CLI" default>
```
docker run -d \
  --name=prerollplus \
  --network host
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=America/Los_Angeles \
  -e SCHEDULE_TIME=03:30 \
  -e APP_PORT=4949 \
  -v /path/to/config:/config \
  -v /path/to/preroll/files:/prerolls \
  --restart unless-stopped \
  chadwpalm/prerollplus:latest
```
  </TabItem>
  <TabItem value="Compose" label="Docker Compose">
  ```
  prerollplus:
    image: chadwpalm/prerollplus:latest
    container_name: prerollplus
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Los_Angeles
      - SCHEDULE_TIME=03:30
      - APP_PORT=4949
    network_mode: "host"
    volumes:
      - /path/to/config:/config
      - /path/to/preroll/files:/prerolls
    restart: unless-stopped
  ```
    </TabItem>
</Tabs>

### Parameters

| Parameter          | Description                                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--name`           | The name to assign to the container.                                                                                                                     |
| `-e PUID`          | User ID for file permissions on the `/config` files. (Settings, logs, and cache)                                                                         |
| `-e PGID`          | Group ID for file permissions on the `/config` files. (Settings, logs, and cache)                                                                        |
| `-e TZ`            | Container timezone for logs (e.g., `America/Los_Angeles`).                                                                                               |
| `-e SCHEDULE_TIME` | _Optional._ Daily pre-roll update time in `HH:MM` format. Defaults to `00:00` (midnight). Use with caution if set late in the day.                       |
| `-e APP_PORT`      | _Optional._ Override for _internal_ container port number Preroll Plus will use. This variable will override any ports that are set in the app settings. |
| `-v /config`       | Mount point for config files. Format: `<host_path>:/config`. Right side must always be `/config`.                                                        |
| `-v /prerolls`     | Mount point for preroll media. Format: `<host_path>:/prerolls`. Right side must always be `/prerolls`.                                                   |
| `-p`               | Port mapping. Format: `<host_port>:<container_port>`. Container port must be what is set in APP_PORT or within the app settings. Default is `4949`.      |
| `--restart`        | Docker restart behavior (e.g., `unless-stopped`). See [Docker docs](https://docs.docker.com/engine/reference/commandline/run/#restart).                  |

Note: Even though the config file is typically not accessed by any other software (though this does not discourage anyone who wants to write one), setting the `PUID` and `GUID` variables to match the host's user and group can help resolve any permission issues.

#### docker compose

Using `--network host` (CLI) or `network_mode: "host"` (Docker Compose) forces the Docker container to use the host's network configuration which includes the host's IP address, Netmask, Gateway, etc. Omitting it will use the Docker network and will allow you to alter the port number.
