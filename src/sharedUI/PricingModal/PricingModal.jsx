import styles from "./PricingModal.module.css";
import { Modal } from "@mantine/core";
import Pricing from "../../pages/Index/components/Pricing/Pricing.jsx";
import PricingList from "../PricingList/PricingList.jsx";
import { useState } from "react";

const PricingModal = ({ opened, close }) => {
  const [value, setValue] = useState("yearly");

  return (
    <div className={styles["pricing-modal"]}>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title="Subscribe to Premium"
        size={"xl"}
      >
        {/* Modal content */}
        <PricingList short setValue={setValue} value={value} />
      </Modal>
    </div>
  );
};

export default PricingModal;
