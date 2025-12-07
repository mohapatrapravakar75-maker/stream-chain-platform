import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [chainId, setChainId] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
        
        // Get balance
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
        
        // Get chain ID
        const network = await provider.getNetwork();
        setChainId(network.chainId);
        
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setBalance('');
    setChainId('');
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });
    }
  }, []);

  return (
    <div className="wallet-connect">
      {account ? (
        <div className="wallet-info">
          <div className="account">
            <span className="label">Account:</span>
            <span className="address">{account.slice(0, 6)}...{account.slice(-4)}</span>
          </div>
          <div className="balance">
            <span className="label">Balance:</span>
            <span className="amount">{balance.slice(0, 6)} MATIC</span>
          </div>
          <button 
            onClick={disconnectWallet}
            className="disconnect-btn"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          className="connect-btn"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
