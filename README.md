# Hydra Offline (Raspberry Pi Visualizer)

Run a full set of Hydra live-coding visuals locally with audio reactivity.

This project packages a series of Hydra patches into a lightweight local setup, making it suitable for installations, performances, or dedicated visual hardware. With some additional scripts, this can be set up to launch automatically on boot on a Raspberry Pi 5.

---

## Overview

Hydra is an open-source, browser-based, live coding environment for real-time visuals by Olivia Jack. While it is typically used interactively in the browser, this project adapts it to run offline and automatically on a Raspberry Pi. You can learn more about Hydra here: https://hydra.ojack.xyz

The system:

* launches a minimal X session
* runs a local web server
* opens Chromium in kiosk mode
* loads a Hydra visual patch
* uses microphone input for audio-reactive visuals

The result is a plug-and-play generative visual machine.

---

## Features

* Audio-reactive visuals
* Runs fully offline
* Kiosk-mode fullscreen rendering
* Automatic microphone recognition
* Optimized for Raspberry Pi 5

---

## Hardware

This program can be run on any computer/microphone combo. However, it was built for a Raspberry Pi deployment, tested on hardware as follows:

* Raspberry Pi 5
* HifiBerry Studio ADC XLR
* Shure SM57
* ASUS VG27AQ

---

## Software Requirements

* Raspberry Pi OS (64-bit recommended)
* Chromium browser
* Openbox window manager
* Python 3

Install required packages:

```bash
sudo apt update
sudo apt install chromium-browser openbox unclutter python3
```

---

## Project Structure

```
hydra-offline-main/
│
├── index.html        # Hydra visual patch
├── assets/           # optional media
├── scripts/          # optional helper scripts
└── README.md
```

---

## Running the Visualizer

### Start the local server

```bash
cd hydra-offline-main
python3 -m http.server 8080
```

Then open:

```
http://localhost:8080/index.html
```

in Chromium.

---

## Kiosk Mode (Auto Launch on Boot)

The system can automatically launch the visualizer at boot.

Example `.xinitrc`:

```bash
#!/bin/bash

xset s off
xset -dpms
xset s noblank
unclutter &
openbox-session &

cd /home/echovis/hydra-offline-main
python3 -m http.server 8080 &

sleep 2

chromium \
  --kiosk \
  --autoplay-policy=no-user-gesture-required \
  --use-fake-ui-for-media-stream \
  --enable-webgl \
  http://localhost:8080/index.html
```

---

## Development Mode

To edit visuals:

1. Exit kiosk mode
2. Modify `index.html`
3. Restart the server or refresh Chromium

You can also run Hydra patches directly in the browser for rapid experimentation.

---

## Performance Notes

For best results on Raspberry Pi:

* Use **Chromium instead of Firefox**
* Disable screen blanking and DPMS
* Avoid very high oscillator counts
* Reduce feedback recursion where possible

Hydra visuals rely heavily on **WebGL**, so GPU acceleration is important.

---

## License

This repository contains original configuration code under the MIT license.

Hydra itself is licensed separately by its creator.
Please refer to the official Hydra repository for details.
