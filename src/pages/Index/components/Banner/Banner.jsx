import styles from "./Banner.module.css";
import { Button } from "@mantine/core";
import PhoneImage from "../../../../assets/phone.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className={styles["banner"]}>
      <div className={"container"}>
        <div className={styles["banner-text"]}>
          <h2>Stay up to date on Telegram</h2>
          <p>
            Receive Telegram alerts for new Airdrops when one of your addresses
            becomes eligible
          </p>
          <Link target={"_blank"} to={"https://t.me/DropScannerAlertsBot"}>
            <Button
              color="rgba(255, 255, 255, 1)"
              size={"md"}
              radius={"md"}
              className={styles["start-finding-button"]}
              variant="filled"
            >
              Start Finding Airdrops
            </Button>
          </Link>
        </div>
        <img src={PhoneImage} alt={""} width={350} />
        <Link target={"_blank"} to={"https://t.me/DropScannerAlertsBot"}>
          <Button
            color={"#FF9400"}
            size={"md"}
            radius={"md"}
            className={styles["start-finding-mobile-button"]}
          >
            Start Finding Airdrops
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
