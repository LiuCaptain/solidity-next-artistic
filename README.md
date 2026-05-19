# Solidity Next Artistic

This project combines a [Next.js](https://nextjs.org) app with a Hardhat 3 Beta smart contract workspace.
It uses `mocha` and `ethers` for TypeScript integration tests, while also keeping Foundry-compatible Solidity unit tests.

To learn more about Hardhat 3 Beta, visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3).
You can also share feedback in the [Hardhat 3 Beta Telegram group](https://hardhat.org/hardhat3-beta-telegram-group) or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new).

## Project Overview

This project includes:

- A Next.js frontend app.
- A Hardhat 3 configuration file with simulated L1 and OP networks.
- Foundry-compatible Solidity unit tests.
- TypeScript integration tests using `mocha` and `ethers`.
- An Ignition deployment module for the sample `Counter` contract.
- Example network configuration for Sepolia deployment.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

### Running Tests

Run all Hardhat tests:

```bash
pnpm hardhat test
```

Run Solidity or `mocha` tests selectively:

```bash
pnpm hardhat test solidity
pnpm hardhat test mocha
```

### Deploying with Ignition

Deploy the example Ignition module to a locally simulated chain:

```bash
pnpm hardhat ignition deploy ignition/modules/Counter.ts
```

Deploy to Sepolia:

```bash
pnpm hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```

Before deploying to Sepolia, configure an account with funds and set the required variables:

- `SEPOLIA_RPC_URL`
- `SEPOLIA_PRIVATE_KEY`

You can set `SEPOLIA_PRIVATE_KEY` with the `hardhat-keystore` plugin:

```bash
pnpm hardhat keystore set SEPOLIA_PRIVATE_KEY
```

Alternatively, provide the variables through your environment.

## Useful Scripts

```bash
pnpm dev      # Start the Next.js development server
pnpm build    # Build the Next.js app
pnpm start    # Start the production Next.js server
pnpm lint     # Run ESLint
```

## Learn More

Useful references:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Hardhat Documentation](https://hardhat.org/docs)

## Deployment

The Next.js app can be deployed on platforms such as [Vercel](https://vercel.com/new).
For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
