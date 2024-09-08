# Decentralized Taxi Service

A decentralized ride-hailing service using blockchain technology with DIMO for car identity, Web3Auth for authorization, Sign Protocol for attestation, and XMTP for secure communication between riders and drivers. The service connects riders to drivers and emergency responders using smart contracts and OpenStreetMap API for real-time location tracking.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Workflow](#system-workflow)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Smart Contract Details](#smart-contract-details)
- [Emergency Responder Workflow](#emergency-responder-workflow)
- [Future Plans](#future-plans)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a decentralized taxi service that empowers riders to request rides, drivers to offer services, and emergency responders to provide safety assistance—all through a decentralized, blockchain-driven platform. The key components include:

- **DIMO** for vehicle verification via token IDs.
- **Web3Auth** for decentralized authorization.
- **Sign Protocol** for identity attestation.
- **XMTP** for secure communication between rider and driver.

## Features

### Rider:
- Request a ride and connect to the nearest driver.
- View the real-time location of the ride using OpenStreetMap.
- Contact emergency responders if needed by pressing the emergency button.
- Secure communication with the driver via XMTP.

### Driver:
- Register by providing a valid DIMO token ID.
- Operate on a Proof of Work (POW) model, accepting or rejecting rides.
- Secure communication with riders using XMTP.
- Ratings system based on rider feedback; falling below a certain threshold leads to removal from the program.

### Emergency Responder:
- Register by staking a predefined amount.
- Operate on a Proof of Stake (POS) model.
- Receive and respond to emergency requests from riders.
- Earn rewards in tokens for successfully assisting riders.
- Subject to removal and stake forfeiture if multiple complaints are received.

## Tech Stack

- **Blockchain**: Smart Contracts (Solidity or similar)
- **DIMO**: Car identity management
- **Web3Auth**: Authorization and authentication
- **Sign Protocol**: Attestation
- **XMTP**: Secure, decentralized messaging protocol
- **OpenStreetMap API**: Real-time location tracking
- **Frontend**: React, Next.js (or your preferred framework)
- **Backend**: Node.js, Solidity (for smart contracts)

## System Workflow

1. **Driver Registration**:
   - The driver provides a DIMO token ID for car identity verification and goes through an attestation process using Sign Protocol.

2. **Ride Request**:
   - The rider requests a ride through the application. The nearest available driver receives the request, which they can accept or reject using a smart contract.

3. **Emergency Response**:
   - During the ride, the rider can press an emergency button if they feel unsafe. The nearest emergency responder is alerted and, upon helping the rider, receives tokens and ratings based on performance.

4. **Communication**:
   - Secure, decentralized conversations between rider and driver are facilitated via XMTP during the ride.

5. **Rating System and Removal**:
   - Drivers and emergency responders receive ratings after each ride. Multiple complaints or low ratings result in removal and forfeiture of stake or driver privileges.

## Getting Started

### Prerequisites

- **Node.js** and **npm**
- **Solidity** for smart contract deployment
- **MetaMask** for interacting with the blockchain

### Installation

1. Clone the repository:
    ```bash
    https://github.com/varun-r-mallya/EthOnline.git
    cd decentralized-taxi-service
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend:
    ```bash
    npm run dev
    ```

### Running the Application

- Make sure you have MetaMask connected to the correct blockchain.
- Interact with the smart contracts via the frontend to request rides, register drivers, or become an emergency responder.

## Smart Contract Details

- **Ride Management**: Handles ride requests, driver assignments, and status updates.
- **Emergency Response**: Manages the interaction between the rider and emergency responders.
- **Rating and Penalty System**: Monitors ratings and handles automatic removal and stake forfeiture.

## Emergency Responder Workflow

1. Register and stake a predefined amount to participate.
2. Receive emergency alerts from riders.
3. Assist the rider and receive rewards.
4. Maintain good ratings to stay in the program.

## Future Plans

- **KYC Integration with Kinto**: We aim to integrate Kinto for KYC processes. However, we encountered challenges due to excessive documentation requirements, which were not feasible for our student team. We plan to revisit this integration in the future to streamline and simplify the KYC process.
  
- **Decentralized Databases**: We are exploring the implementation of decentralized databases for storing data. This approach will enhance data security, availability, and redundancy while aligning with the decentralized ethos of our platform.

- **Custom Neural Network Architecture**: We plan to develop a custom neural network architecture for predictive pricing of rides. This model will analyze various factors, including historical ride data, demand patterns, and location-based metrics, to provide dynamic and accurate fare predictions.

![image](https://github.com/user-attachments/assets/1c24d0ed-8018-4e66-9417-133a0746eff4)


