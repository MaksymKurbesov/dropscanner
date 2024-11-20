import styles from "./Statistic.module.css";
import { IconUsers, IconUser } from "@tabler/icons-react";

const Statistic = () => {
  return (
    <div className={styles["statistic"]}>
      <div>
        <IconUsers size={16} />
        <span>0</span>
        <p>Signups using your link</p>
      </div>
      <div>
        <IconUser size={16} />
        <span>$0</span>
        <p>Earned from revenue share</p>
      </div>
      <p>Your are entitled to 10% of the revenue share</p>
    </div>
  );
};

export default Statistic;
