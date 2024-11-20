import styles from "./Pricing.module.css";
import { useState } from "react";
import PricingList from "../../../../sharedUI/PricingList/PricingList.jsx";

const Pricing = () => {
  const [value, setValue] = useState("yearly");

  return (
    <div className={styles["pricing"]} id={"pricing"}>
      <div className={"container"}>
        <h3 className={"little-title"}>Pricing</h3>
        <h2>
          Become a Premium user
          <br />
          <span>Unlock all Benefits</span>
        </h2>
        <p className={styles["subtitle"]}>
          As a premium user, you can track all your addresses across networks,
          receive Telegram alerts, and ensure you never miss future airdrops.
          <br />
          Pay with crypto via automatic payments or email invoice. Cancel
          anytime.
        </p>
        <PricingList value={value} setValue={setValue} />
      </div>
    </div>
  );
};

export default Pricing;
