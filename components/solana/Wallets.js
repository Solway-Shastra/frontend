import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import { WalletMultiButtonDynamic, WalletDisconnectButtonDynamic } from '@solana/wallet-adapter-react-ui';
import styles from '../../styles/Home.module.css';


const WalletButtons = () => {
  return (
    <div className={styles.walletButtons}>
      <WalletMultiButtonDynamic />
      <WalletDisconnectButtonDynamic />
    </div>
  );
}