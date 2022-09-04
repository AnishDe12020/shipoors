import { ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const url = useMemo(() => clusterApiUrl("devnet"), []);
  const phantom = new PhantomWalletAdapter();
  const solflare = new SolflareWalletAdapter();

  return (
    <ConnectionProvider endpoint={url}>
      <WalletProvider wallets={[phantom, solflare]}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
