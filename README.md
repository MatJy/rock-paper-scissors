# Rock Paper Scissors Game

## Description

This is a simple local multiplayer Rock Paper Scissors game built with **Node.js**, **Express**, and **Socket.IO**. Two players can connect locally and play against each other in real-time. The first player to reach three wins is declared the game winner.

## How to Run Locally

1. **Clone this repository and navigate into the project folder:**
    ```bash
    git clone <repository-url>
    cd rock-paper-scissors
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start Docker MySQL container:**
    ```bash
    cd dockermysql
    docker compose up -d
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

5. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

## Features

- Built with **Socket.IO** for real-time communication.
- Two players can join and play locally.
- Standard Rock Paper Scissors rules.
- First player to reach **three wins** is declared the winner.

## Notes

This project is meant for local testing and development only.
