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

const GetAirdropModal = ({ close, opened }) => {
  return (
    <Portal>
      <Modal
        centered
        opened={opened}
        onClose={close}
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
          backgroundOpacity: 0.55,
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
            Token: <span>ETH</span>
          </p>
          <p>
            Amount: <span>0.0876</span>
          </p>
          <p>
            Network: <span>Ethereum</span>
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
