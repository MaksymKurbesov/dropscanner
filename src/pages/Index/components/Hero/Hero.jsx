import styles from "./Hero.module.css";
import AptosIcon from "../../../../assets/crypto-icons/aptos.png";
import BitcoinIcon from "../../../../assets/crypto-icons/bitcoin.webp";
import CosmosIcon from "../../../../assets/crypto-icons/cosmos.webp";
import EthereumIcon from "../../../../assets/crypto-icons/ethereum.png";
import SolanaIcon from "../../../../assets/crypto-icons/solana.png";
import StarknetIcon from "../../../../assets/crypto-icons/starknet.svg";
import { Button, Input } from "@mantine/core";
import { IconArrowRight, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";
import { isCryptoWallet } from "../../../../helpers/helpers.js";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Hero = () => {
  const [isError, setIsError] = useState(false);
  const [walletNumber, setWalletNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const isCrypto = isCryptoWallet(walletNumber);
    if (!isCrypto) {
      setIsError(true);
      return;
    }

    navigate(`/address/${walletNumber}`);
  };

  return (
    <div className={styles["hero"]}>
      <div className={"container"}>
        <h1>Find unclaimed Airdrops</h1>
        <p className={styles["subtitle"]}>
          Get alerts, and never miss Airdrops again
        </p>
        <div className={styles["input-wrapper"]}>
          <Input
            className={`${styles["enter-wallet-input"]} ${isError ? styles["error-input"] : ""}`}
            size="md"
            radius="md"
            placeholder="Enter wallet address or ENS"
            onChange={(e) => {
              setWalletNumber(e.target.value);
              setIsError(false);
            }}
            value={walletNumber}
          />
          {isError && (
            <p className={styles["error-message"]}>
              Invalid address.{" "}
              <NavLink to={"/airdrops"}>See supported networks</NavLink>
            </p>
          )}
        </div>
        <Button
          className={styles["check-address-button"]}
          rightSection={<IconArrowRight size={14} />}
          radius="md"
          size="md"
          variant="filled"
          color="rgba(255, 255, 255, 1)"
          onClick={() => handleSubmit()}
        >
          Check Address
        </Button>
        <div className={styles["icons-list"]}>
          <img src={AptosIcon} alt={""} />
          <img src={BitcoinIcon} alt={""} />
          <img src={CosmosIcon} alt={""} />
          <img src={EthereumIcon} alt={""} />
          <img src={SolanaIcon} alt={""} />
          <img src={StarknetIcon} alt={""} />
        </div>
        <p className={styles["check-text"]}>
          Check any crypto wallet address for unclaimed airdrops with
          DropScanner. <Link to={"/airdrops"}>See supported networks</Link>
        </p>
        <p className={styles["over-text"]}>
          <span>
            <IconStarFilled color={"#facc15"} size={14} />
            <IconStarFilled color={"#facc15"} size={14} />
            <IconStarFilled color={"#facc15"} size={14} />
            <IconStarFilled color={"#facc15"} size={14} />
            <IconStarFilled color={"#facc15"} size={14} />
          </span>
          <span>Over $16,900,000 in airdrops discovered for users</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
