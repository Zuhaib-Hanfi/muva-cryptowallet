import React,{createContext, useState,useContext, useEffect} from 'react';
import {createWalletFromMnemonic} from '../services/wallet';

const WalletContext=createContext(null);

export const WalletProvider=({Children})=>{
    const [wallet,setWallet]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        try{
            const savedWallet =localStorage.getItem('cryptoWallet');
            if(savedWallet){
                setWallet(JSON.parse(savedWallet));
            }
        }
        catch(error){
            console.error("Failed to parse Wallet from localStorage",error);
            localStorage.removeItem('cryptoWallet');
        }

        setLoading(false);
    },[]);

    const login=async(mnemonic)=>{
        setLoading(true);
        const newWallet=await createWalletFromMnemonic(mnemonic);
        setWallet(newWallet);

        localStorage.setItem('cryptoWallet',JSON.stringify(newWallet));
        setLoading(false);
    };

    const logout=()=>{
        setWallet(null);

        localStorage.removeItem('cryptoWallet');
    };

    const value={wallet,loading,login,logout};

    return(
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    )
};

export const useWallet=()=>{
    const context =useContext(WalletContext);
    if(context===null){
        throw new Error("useWallet much be used withing a WalletProvider");
    }
    return context;
};