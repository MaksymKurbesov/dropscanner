import styles from "./WeMadeItSimple.module.css";
import Image1 from "../../../../assets/we-made1.webp";
import Image2 from "../../../../assets/we-made2.png";
import {
  IconCrown,
  IconRosetteDiscountCheckFilled,
  IconBoltFilled,
  IconWorld,
  IconBrandTelegram,
  IconSpy,
} from "@tabler/icons-react";
import { Image } from "@mantine/core";

const WeMadeItSimple = () => {
  return (
    <div className={styles["we-made-it-simple"]}>
      <h3 className={"little-title"}>We made it simple</h3>
      <div className={styles["top-row"]}>
        <div className={styles["description"]}>
          <h4>Find all unclaimed Airdrops</h4>
          <ul>
            <li>
              <IconCrown color={"#FF9400"} />
              <p>
                <span>The best airdrop checker and tracker.</span> Tracking 75
                of the most recent crypto airdrops, with more constantly being
                added to the checker.
              </p>
            </li>
            <li>
              <IconRosetteDiscountCheckFilled color={"#FF9400"} />
              <p>
                <span>Claim Airdrops safely.</span> See which Airdrops you are
                eligible for and claim them via verified, official links.
              </p>
            </li>
            <li>
              <IconBoltFilled color={"#FF9400"} />
              <p>
                <span>Boost your rewards.</span> Add a crypto wallet from our
                supported networks to unlock access to exclusive airdrops and
                more exciting features. A one-time wallet connection is all it
                takes to discover even more opportunities!
              </p>
            </li>
          </ul>
        </div>
        <Image src={Image1} radius="md" />
      </div>
      <div className={styles["bottom-row"]}>
        <div className={styles["description"]}>
          <h4>Never miss Airdrops again</h4>
          <ul>
            <li>
              <IconWorld color={"#FF9400"} />
              <p>
                <span>7+ networks.</span> Watch and track all your wallet
                addresses accross multiple supported networks.
              </p>
            </li>
            <li>
              <IconBrandTelegram color={"#FF9400"} />
              <p>
                <span>Stay up to date on Telegram.</span> Receive Telegram
                alerts for new Airdrops when one of your addresses becomes
                eligible.
              </p>
            </li>
            <li>
              <IconSpy color={"#FF9400"} />
              <p>
                <span>Privacy is our priority.</span> We never share user data
                with third parties. All eligibility checks are proxied, and your
                wallet addresses are not linked to each other.
              </p>
            </li>
          </ul>
        </div>
        <Image src={Image2} radius="md" />
      </div>
    </div>
  );
};

export default WeMadeItSimple;
