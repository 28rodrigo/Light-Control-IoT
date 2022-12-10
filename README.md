# Lights Control System

Light control system based in Esp32 Development Board.
This system is supported by a Web APP (built in Next. JS) to control the lights anytime, anywhere.


# Architecture

The architecture of this system is in development. The version 1.0 of the architecture is composed by:
* Web Server - NextJS: Responsible to communicate with the IoT device.
* Web APP (PWA) - NextJS: App respensible to interact with the user and available in any platform.
* Cloudflare: Bridge between the Internet and the LAN where the IoT device is connected.
* IoT device: This device acts as a gateway between the hardware devices and the Web Server. This device provides a Web API to control the different devices.

IMAGEM ARQUITETURA
![Alt text](./assets/Architecture.png?raw=true "Architecture")

# Use-Case 1 - Christmas Lights

This system was applied in my house to control all the Christmas lights. These lights have their own independent and manual controller. The goal is to connect all the lights to a single controller and make it possible to switch the lights on and off and change the effects remotely.

## Components
* 1 x Esp32-S2 Dev Board
* 3 x Relay Signal 5V - 220V/10A
* 2 x LED Strip - Different colors

## Electrical Schematic
![Alt text](./assets/Circuit.png?raw=true "Circuit")
