// /frontend/src/App.tsx
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";

const CONTRACT_ADDRESS = "0xYourTestnetSwapContract";
const ABI = [
  // Replace this with your deployed contract's ABI
];

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("Wallet not connected");

  useEffect(() => {
    const initWallet = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = web3Provider.getSigner();
        const account = await signer.getAddress();

        setProvider(web3Provider);
        setSigner(signer);
        setAccount(account);
        setStatus("Wallet connected ✅");
      } else {
        setStatus("Please install MetaMask ❌");
      }
    };
    initWallet();
  }, []);

  const testSwap = async () => {
    if (!signer) return alert("Wallet not connected");

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    try {
      const tx = await contract.buyOnlyCoin({ value: ethers.utils.parseEther("0.01") });
      await tx.wait();
      alert("✅ Swap completed!");
    } catch (err) {
      console.error(err);
      alert("❌ Swap failed. Check contract and ABI.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">OnlyChain Swap Testnet</h1>
      <p className="mb-2">{status}</p>
      <p className="mb-6">Connected: {account}</p>
      <Button onClick={testSwap} className="bg-red-600 hover:bg-red-500">
        🚀 Swap 0.01 BNB for OnlyCoin
      </Button>
    </div>
  );
}
