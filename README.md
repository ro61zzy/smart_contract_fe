# 🧠 Smart Contract Dashboard (Frontend/Web3 Assignment)

A responsive web dashboard that connects to a live Ethereum smart contract (Sepolia testnet) to fetch and visualize real-time `Transfer` event data. Built with **Next.js**, **TailwindCSS**, **ethers.js**, and **Recharts**.

---

## ✨ Features

- 🔌 **Web3 Integration** using `ethers.js` and an Alchemy Sepolia RPC.
- 📈 **Real-time chart** displaying recent ERC-20 token transfer volume.
- ⚙️ **Smart contract connection** to live deployed token.
- ✅ **Responsive UI** built with TailwindCSS and React.
- 🚫 Handles errors such as missing provider, rate limits, and empty event logs gracefully.

---

### 🚀 Getting Started

### 1. Clone the repo

```bash
git clone [https://github.com/ro61zzy/smart_contract_fe.git]
cd smart_contract_fe
```

### 2. Install dependencies

npm install
### 3. Run the app locally
npm run dev
### 4. View it in your browser
Go to: http://localhost:3000

### ⚙️ Tech Stack
Framework: Next.js

Blockchain: ethers.js

Data Viz: Recharts

Styling: TailwindCSS

Icons & UI: Lucide, Toast notifications

### 🔗 Smart Contract Info
    /lib/tokens




## 🧪 Project Notes

* We fetch the most recent 200 transfer events and group them by the minute.
* All data is pulled directly from the blockchain using `queryFilter()` and enriched with block timestamps.
* To reduce rate-limit errors, a short delay is added between block timestamp queries.

---

## 📦 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build production app     |
| `npm run start` | Start built app          |

---

## 📄 License

This project is part of a frontend/web3 integration assignment and is not licensed for production use.

---

## 🙌 Author

Built with ❤️ by \[Rose Wachuka] – [@ro61zzy](https://github.com/ro61zzy)




