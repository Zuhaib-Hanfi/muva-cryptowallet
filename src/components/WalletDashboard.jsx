import React, { useEffect, useState, useCallback } from 'react';
import { useWallet } from '../context/WalletContext';
import AssetCard from './AssetCard';
import { getEthBalance, getSolBalance, getBtcBalance } from '../services/blockchain';

function WalletDashboard() {
    const { wallet, logout } = useWallet();
    const [balances, setBalance] = useState({ eth: null, sol: null, btc: null });

    const fetchBalances = useCallback(async () => {
        if (!wallet || !wallet.ethereum || !wallet.bitcoin || !wallet.solana) return;

        try {
            console.log("Refreshing Balances...");
            const [eth, sol, btc] = await Promise.all([
                getEthBalance(wallet.ethereum.address),
                getSolBalance(wallet.solana.address),
                getBtcBalance(wallet.bitcoin.address)
            ]);
            setBalance({ eth, sol, btc });
        }
        catch (error) {
            console.error("Failed to fetch all balances: ", error);
        }
    }, [wallet]);

    useEffect(() => {
        fetchBalances();
        const interval = setInterval(fetchBalances, 3000);
        return () => clearInterval(interval);
    }, [fetchBalances]);

    if (!wallet || !wallet.ethereum || !wallet.bitcoin || !wallet.solana) {
        return (
            <div className='text-center'>
                <h2 className='text-2xl font-bold text-red-600'>Wallet Data Error</h2>

                <p className='my-4'>There was a problem while loading your wallet data. Please try logging out and importing your wallet again</p>

                <button onClick={logout} className='bg-red-600 text-white font-bold py-2 px-4 rounded-2xl hover:bg-red-800'>
                    Logout
                </button>
            </div>
        )
    }

    const coins = [
        { name: 'Ethereum', symbol: 'ETH', ...wallet.ethereum },
        { name: 'Solana', symbol: 'SOL', ...wallet.solana },
        { name: 'Bitcoin', symbol: 'BTC', ...wallet.bitcoin }
    ];

    return (
        <div>
            <header className='flex justify-between items-center mb-8'>
                <h2 className='text-3xl font-extrabold'>Wallet Dashboard</h2>
                <button onClick={logout} className='bg-gray-500 text-white font-bold py-2 px-4 rounded-2xl hover:bg-gray-700'>Logout</button>
            </header>

            <div className='bg-yellow-100 border-2 border-amber-300 text-yellow-800 px-4 py-3 rounded-2xl mb-8'>
                <p className='font-bold'>Your Mnemonic Phrase (Keep it secret)</p>
                <p className='font-mono text-sm break-words'>{wallet.mnemonic}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {coins.map(coin => (
                    <AssetCard
                        key={coin.symbol}
                        coin={coin}
                        balance={balances[coin.symbol.toLowerCase()]}
                        onTransactionSuccess={fetchBalances}
                    />
                ))}
            </div>
        </div>
    )
}

export default WalletDashboard;