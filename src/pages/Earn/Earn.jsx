import styles from "./Earn.module.css";
import Carousel from "../../sharedUI/SponsorCarousel/Carousel.jsx";
import { Button } from "@mantine/core";
import {
  IconBrandTelegram,
  IconBoltFilled,
  IconCopy,
  IconSpeakerphone,
  IconGift,
} from "@tabler/icons-react";
import SponsorCarousel from "../../sharedUI/SponsorCarousel/Carousel.jsx";
import { ScrollRestoration } from "react-router-dom";
import { useAuthState } from "../../hooks/userAuthState.js";
import { auth } from "../../main.jsx";
import Referrals from "./Referrals/Referrals.jsx";
import Statistic from "./Statistic/Statistic.jsx";
import { useSignInModal } from "../../context/SignInModalContext.jsx";

const Earn = () => {
  const [user] = useAuthState(auth);
  const { isVisible, updateIsVisible } = useSignInModal();

  return (
    <div className={styles["earn"]}>
      <Carousel />
      <div className={"container"}>
        <h1 className={styles["title"]}>
          Invite friends, get <span>10%</span> <br />
          of revenue share
        </h1>
        {user ? (
          <>
            <Referrals />
            <Statistic />
          </>
        ) : (
          <div className={styles["log-in-wrapper"]}>
            <span className={styles["icon"]}>
              <IconBoltFilled />
            </span>
            <p>Log in to get your personal link</p>
            <span className={styles["start-earning"]}>
              Start earning from the revenue share immidiattely
            </span>
            <Button
              color={"#FF9400"}
              radius={"md"}
              leftSection={<IconBrandTelegram />}
              onClick={() => updateIsVisible()}
            >
              Log in
            </Button>
          </div>
        )}

        <ul className={styles["steps-list"]}>
          <li>
            <span className={styles["step-icon"]}>
              <IconCopy size={30} />
            </span>
            <p>Copy your link</p>
            <span>
              Copy your personal referral link and share it with your friends
            </span>
          </li>
          <li>
            <span className={styles["step-icon"]}>
              <IconSpeakerphone size={30} />
            </span>
            <p>Spread the word</p>
            <span>Invite as many people as you wish, using your link</span>
          </li>
          <li>
            <span className={styles["step-icon"]}>
              <IconGift size={30} />
            </span>
            <p>Get the rewards</p>
            <span>
              Your friend subscribes to Premium, you get 10% in crypto every
              month
            </span>
          </li>
        </ul>
      </div>
      <ScrollRestoration />
      <SponsorCarousel />
    </div>
  );
};

export default Earn;
