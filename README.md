# Book My Tickets (Lego Hackathon Project)

Welcome to **Book My Tickets**, a modern, blockchain-based ticketing platform built for the Lego Hackathon. This platform allows users to browse events, purchase tickets securely, and engage in a peer-to-peer ticket resale marketplace, all powered by decentralized technology.

## 🚀 Overview

The project leverages Next.js for a premium frontend experience and integrates with Ethereum-based smart contracts for secure ticket management and resale.

## ✨ Key Features

- **Event Discovery**: Browse featured concerts and live performances with a dynamic, responsive UI.
- **Secure Ticketing**: Purchase tickets directly through the platform (integrating with MetaMask).
- **Secondary Market**: A dedicated resale dashboard for users to list and trade their purchased tickets.
- **Organiser Dashboard**: Control panel for event organisers to manage ticket supply, prices, and withdrawals.
- **Blockchain Integration**: Uses `ethers.js` to interact with smart contracts for transparent and secure transactions.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Frontend Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Blockchain Interface**: [Ethers.js](https://docs.ethers.org/v5/)
- **State Management**: React Hooks (useState, useEffect)
- **Icons**: Lucide React

## 📂 Project Structure

The repository contains two main project folders, reflecting different stages or variations of the application:

1.  `lego_ilovehackathon/`: The primary development directory containing the full feature set (Pages for buying, reselling, and organising).
2.  `lego_ilovehackathon-1/`: A variation of the project structure, possibly for specific experimentations or a cleaned-up version.

## 🏁 Getting Started

To run the project locally, navigate to the `lego_ilovehackathon` directory and follow these steps:

1.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📜 Smart Contract Reference

The application interacts with a ticketing contract. You can find the contract ABI and configuration in `/utils/contractABI.ts`. *Note: Ensure you have MetaMask installed and configured to interact with the blockchain features.*

