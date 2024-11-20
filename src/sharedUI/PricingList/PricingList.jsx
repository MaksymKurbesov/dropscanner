import styles from "./PricingList.module.css";
import { Button, Card, SegmentedControl, Tooltip } from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleLetterX,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { useSignInModal } from "../../context/SignInModalContext.jsx";
import { useAuthState } from "../../hooks/userAuthState.js";
import { auth } from "../../main.jsx";

const PricingList = ({ value, setValue, short }) => {
  const { updateIsVisible } = useSignInModal();
  const [user] = useAuthState(auth);

  const getStartedButtonHandler = () => {
    if (user) {
      if (value === "monthly") {
        window.open(
          "https://pay.boomfi.xyz/2p3zMw4NLq4XuBftrcBD7fvuY64",
          "_blank",
        );
      } else {
        window.open(
          "https://pay.boomfi.xyz/2p3zGz03c9oTyu020zSeMDMarOp",
          "_blank",
        );
      }
    } else {
      updateIsVisible();
    }
  };

  const getStartedButtonHandlerPleb = () => {
    if (user) {
      if (value === "monthly") {
        window.open(
          "https://pay.boomfi.xyz/2p3zVQMV9dS2Go5pShshdrUBVBC",
          "_blank",
        );
      } else {
        window.open(
          "https://pay.boomfi.xyz/2p3zRgoe0zNtCyn4WyAw7fGlZGF",
          "_blank",
        );
      }
    } else {
      updateIsVisible();
    }
  };

  return (
    <>
      <div className={styles["segmented-control"]}>
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={[
            { label: "Monthly", value: "monthly" },
            { label: "Yearly (20% Off)", value: "yearly" },
          ]}
          radius="md"
          color={"#FF9400"}
        />
      </div>
      <div
        className={`${styles["pricing-list"]} ${short ? styles["short"] : ""}`}
      >
        {!short && (
          <Card radius={"lg"}>
            <h2>E-beggar</h2>
            <p className={styles["price"]}>
              <sup>$</sup>0<sub>/ address / mo</sub>
            </p>
            <span className={styles["billed"]}></span>
            <p className={styles["watch-1-address"]}>Watch 1 address</p>
            <Button
              className={styles["get-started-button"]}
              color={"#FF9400"}
              radius={"md"}
              variant={"outline"}
              onClick={() => {
                if (user) return;

                updateIsVisible();
              }}
            >
              Get Started
            </Button>
            <span className={styles["plan-includes"]}>Plan includes:</span>
            <ul className={styles["includes-list"]}>
              <li>
                <IconCircleCheck color={"#FF9400"} />
                See all eligible Airdrops
              </li>
              <li>
                <IconCircleCheck color={"#FF9400"} />
                Get your personal referral link
              </li>
              <li className={styles["cancel-plan"]}>
                <IconCircleLetterX />
                Telegram alerts
              </li>
            </ul>
          </Card>
        )}
        <Card radius={"lg"} className={styles["whale"]}>
          <h2>Whale</h2>
          <p className={styles["price"]}>
            <sup>$</sup>
            {value === "monthly" ? "0.48" : "0.36"}
            <sub>/ address / mo</sub>
          </p>
          <span className={styles["billed"]}>
            {value === "monthly" ? (
              "$24 billed monthly"
            ) : (
              <span>
                <span className={styles["line-through"]}>$288</span>{" "}
                <span className="shrink-0">
                  <span className="notranslate">$215 </span>billed yearly
                </span>
              </span>
            )}
          </span>
          <p className={styles["watch-1-address"]}>Watch 50 addresses</p>
          <Button
            className={styles["get-started-button"]}
            color={"#FF9400"}
            radius={"md"}
            variant={"filled"}
            onClick={getStartedButtonHandler}
          >
            Get Started
          </Button>
          <span className={styles["plan-includes"]}>
            All E-beggar features plus:
          </span>
          <ul className={styles["includes-list"]}>
            <li>
              <IconCircleCheck color={"#FF9400"} />
              See all eligible Airdrops
            </li>
            <li>
              <IconCircleCheck color={"#FF9400"} />
              Telegram alerts
              <Tooltip label="Get alerts from our Telegram bot when new airdrops are added and your addresses are eligible">
                <IconExclamationCircle size={16} />
              </Tooltip>
            </li>
            <li>
              <IconCircleCheck color={"#FF9400"} />
              No ads
            </li>
            <li>
              <IconCircleCheck color={"#FF9400"} />
              Cancel anytime
            </li>
          </ul>
        </Card>
        <Card radius={"lg"}>
          <h2>Pleb</h2>
          <p className={styles["price"]}>
            <sup>$</sup>
            {value === "monthly" ? "1.40" : "1.15"}
            <sub>/ address / mo</sub>
          </p>
          <span className={styles["billed"]}>
            {" "}
            {value === "monthly" ? (
              "$7 billed monthly"
            ) : (
              <span>
                <span className={styles["line-through"]}>$84</span>{" "}
                <span className="shrink-0">
                  <span className="notranslate">$69 </span>billed yearly
                </span>
              </span>
            )}
          </span>
          <p className={styles["watch-1-address"]}>Watch 5 addresses</p>
          <Button
            className={styles["get-started-button"]}
            color={"#FF9400"}
            radius={"md"}
            variant={"outline"}
            onClick={getStartedButtonHandlerPleb}
          >
            Get Started
          </Button>
          <span className={styles["plan-includes"]}>
            All E-beggar features plus:
          </span>
          <ul className={styles["includes-list"]}>
            <li>
              <IconCircleCheck color={"#FF9400"} />
              See all eligible Airdrops
            </li>
            <li>
              <IconCircleCheck color={"#FF9400"} />
              Telegram alerts
              <Tooltip label="Get alerts from our Telegram bot when new airdrops are added and your addresses are eligible">
                <IconExclamationCircle size={16} />
              </Tooltip>
            </li>
            <li>
              <IconCircleCheck color={"#FF9400"} />
              No ads
            </li>
            <li>
              <IconCircleCheck color={"#FF9400"} />
              Cancel anytime
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
};

export default PricingList;
