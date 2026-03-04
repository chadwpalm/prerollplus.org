---
sidebar_position: 2
---

To run Preroll Plus natively, you will need to install [Node JS](https://nodejs.org/) on to your machine. Node 20 LTS is the version this application was created to be run on and what is used in the Docker images. Using a different version could cause dependencies to to fail or force a version that is out of date causing potential security issues.

:::note
Even though Preroll Plus was designed to be ran through a Docker container, it can still be ran natively on Windows, Linux, and MacOS.
:::

## Windows

To install Preroll Plus on Windows you will need to clone the GitHub repository to your local machine. This can either be done by installing [Git for Windows](https://gitforwindows.org/) and cloning through the command line, or by downloading the latest commit from either the [main](https://github.com/chadwpalm/PrerollPlus/archive/refs/heads/main.zip) or [develop](https://github.com/chadwpalm/PrerollPlus/archive/refs/heads/develop.zip) branch. You may also choose a method of your choice for obtaining the source code (i.e. [GitHub Desktop](https://desktop.github.com/)).

If you wish to install git and clone from the command line, navigate to the parent directory of where you want to install Preroll Plus and enter into the terminal:

Mainline Branch:

```bash
git clone https://github.com/chadwpalm/PrerollPlus.git -b main
```

Development Branch:

```bash
git clone https://github.com/chadwpalm/PrerollPlus.git -b develop
```

Once you have cloned or unzipped Preroll Plus into the Preroll Plus directory, you will need to install the necessary node modules for both the frontend and the backend of the application. Then you will need to build the frontend into a single static page which will be served by the backend Node server.

```powershell
C:\> cd PrerollPlus
C:\PrerollPlus> cd frontend
C:\PrerollPlus\frontend> npm ci
C:\PrerollPlus\frontend> npm run build
C:\PrerollPlus\frontend> cd ..
C:\PrerollPlus\> npm ci
C:\PrerollPlus\> npm start
```

:::note
If you want to use the environment variables found in the [Docker](/docs/Installation/Docker#parameters) settings you can prepend them to the front of the `npm start` command. For example:

Windows CMD
```
set PORT=4000 && set SCHEDULE_TIME=01:30 && npm start
```
Windows PowerShell
```
$env:PORT=4000; $env:SCHEDULE_TIME="01:30"; npm start
```
:::

## Linux

To install Preroll Plus on Linux you will need to clone the GitHub repository to your local machine. This can either be done by installing Git through your Linux distro's package manager and cloning through the command line, or by downloading the latest commit from either the [main](https://github.com/chadwpalm/PrerollPlus/archive/refs/heads/main.zip) or [develop](https://github.com/chadwpalm/PrerollPlus/archive/refs/heads/develop.zip) branch.

If you wish to install git and clone from the command line, navigate to the parent directory of where you want to install Preroll Plus and enter into the terminal:

Mainline Branch:

    git clone https://github.com/chadwpalm/PrerollPlus.git -b main

Development Branch:

    git clone https://github.com/chadwpalm/PrerollPlus.git -b develop

Once you have cloned or unzipped Preroll Plus into the Preroll Plus directory, you will need to install the necessary node modules for both the frontend and the backend of the application. Then you will need to build the frontend into a single static page which will be served by the backend Node server.

```bash
$ cd PrerollPlus
$ cd frontend
$ npm ci
$ npm run build
$ cd ..
$ npm ci
$ mkdir /config
$ npm start
```

:::note
If you want to use the environment variables found in the [Docker](/docs/Installation/Docker#parameters) settings you can prepend them to the front of the `npm start` command. For example:

```
SCHEDULE_TIME=01:30 APP_PORT=1234 npm start
:::

Preroll Plus stores its settings file in the /config of your system. This may cause permission issues when starting up the application for the first time. Preroll Plus will first attempt to create the /config directory and then create the settings initial file in that directory. The application may not be able to create the folder if it is ran by a non-root account. You may need to create the directory manually first before starting the application for the first time. Preroll Plus will take in PUID and PGID environment variables on start up and set the settings file to those IDs. If you don't supply IDs, Preroll Plus will set the settings file to the same account IDs that the application is ran from.

## Run as Background Process

Running Preroll Plus using the instructions above will start up the application, but the terminal window it is ran from will need to stay open. You can run Preroll Plus as a background process, but this document will not go into details on how to set it up to do that.

Here are some suggested solutions that might help you in this matter:

- [Systemd](https://stackoverflow.com/a/29042953/339122) (Linux)
- [Launchd](https://stackoverflow.com/a/25998406/339122) (Mac)
- [node-windows](https://stackoverflow.com/a/15616912/339122) (Windows)
- [PM2](https://stackoverflow.com/a/17005935/339122) (Node.js)
