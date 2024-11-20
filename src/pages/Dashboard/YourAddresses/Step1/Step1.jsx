import styles from "./Step1.module.css";
import { NavLink } from "react-router-dom";
import { TextInput } from "@mantine/core";

const Step1 = ({ walletNumber, setWalletNumber, isError, setIsError }) => {
  return (
    <>
      <p className={styles["e-bagger"]}>
        E-beggar plan allows you to watch up to 1 addresses
      </p>
      <NavLink to={"/airdrops"}>Supported Networks</NavLink>
      <TextInput
        value={walletNumber}
        onChange={(e) => {
          setWalletNumber(e.target.value);
          setIsError("");
        }}
        styles={{
          label: { fontWeight: 400 },
        }}
        error={isError}
        label={"Enter the address of your crypto wallet to track airdrop."}
        placeholder={"0x..."}
      />
    </>
  );
};

export default Step1;
