import styles from "./Step2.module.css";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import {
  cutWalletNumber,
  identifyCryptoWallet,
} from "../../../../helpers/helpers.js";
import EthereumIcon from "../../../../assets/crypto-icons/ethereum.png";
import SolanaIcon from "../../../../assets/crypto-icons/solana.png";
import StarknetIcon from "../../../../assets/crypto-icons/starknet.svg";
import AptosIcon from "../../../../assets/crypto-icons/aptos.png";
import CosmosIcon from "../../../../assets/crypto-icons/cosmos.webp";
import BitcoinIcon from "../../../../assets/crypto-icons/bitcoin.webp";
import { useEffect } from "react";

export const ICON_MAP = {
  Ethereum: EthereumIcon,
  Solana: SolanaIcon,
  StarkNet: StarknetIcon,
  Aptos: AptosIcon,
  Cosmos: CosmosIcon,
  Bitcoin: BitcoinIcon,
};

const Step2 = ({ walletNumber, toggle }) => {
  const network = identifyCryptoWallet(walletNumber);

  useEffect(() => {
    toggle();
  }, []);

  return (
    <div className={styles["step2"]}>
      <IconCircleDashedCheck color={"rgba(120,255,109,0.5)"} size={60} />
      <h2 className={styles["title"]}>The wallet has been found!</h2>
      <p className={styles["found-text"]}>
        Your wallet has been successfully found on the <br />
        <strong>
          <img src={ICON_MAP[network]} alt={""} width={15} />
          {network}
        </strong>
        network.
      </p>
      <div className={styles["wallet-wrapper"]}>
        <span>Wallet:</span>
        <p>{cutWalletNumber(walletNumber)}</p>
      </div>
    </div>
  );
};

export default Step2;
