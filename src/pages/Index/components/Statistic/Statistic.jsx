import styles from "./Statistic.module.css";
import { Card } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import HackerNewsImg from "../../../../assets/as-seen/hackernews.webp";
import DappRadarImg from "../../../../assets/as-seen/dappradar.webp";
import ProductHuntImg from "../../../../assets/as-seen/producthunt.webp";

const Statistic = () => {
  return (
    <div className={styles["statistic"]}>
      <ul className={styles["statistic-list"]}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <li>
            <h3>$16.9M+</h3>
            <p>In airdrops discovered</p>
          </li>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <li>
            <h3>$850</h3>
            <p>Average found per user</p>
          </li>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <li>
            <h3>13000</h3>
            <p>Users claimed airdrops</p>
          </li>
        </Card>
      </ul>
      <div className={styles["as-seen"]}>
        <p>as seen on</p>
        <div>
          <img src={HackerNewsImg} alt={""} width={160} />
          <img src={DappRadarImg} alt={""} width={160} />
          <img src={ProductHuntImg} alt={""} width={160} />
        </div>
      </div>
      <div className={styles["check-text-wrapper"]}>
        <p className={styles["check-text"]}>
          <IconCheck size={16} color={"#16a34a"} />
          Founded in the EU. We respect your privacy.
        </p>
        <p className={styles["check-text"]}>
          <IconCheck size={16} color={"#16a34a"} />
          100% Anonymous and secure
        </p>
      </div>
    </div>
  );
};

export default Statistic;
