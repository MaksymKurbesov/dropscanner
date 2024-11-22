import styles from "./AddressesList.module.css";
import MyCopyButton from "../../../../sharedUI/CopyButton/CopyButton.jsx";
import {
  cutWalletNumber,
  getAirdrops,
  getRandomInt,
  identifyCryptoWallet,
} from "../../../../helpers/helpers.js";
import { Button, Menu } from "@mantine/core";
import { IconMoodEmptyFilled, IconDotsVertical } from "@tabler/icons-react";
import { ICON_MAP } from "../Step2/Step2.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AIRDROPS } from "../../../Address/Address.jsx";

const AddressesList = ({ addresses }) => {
  const navigate = useNavigate();
  const [airdropsCount, setAirdropsCount] = useState(0);

  useEffect(() => {
    getAirdrops(addresses[0], AIRDROPS).then((data) =>
      setAirdropsCount(data.length),
    );
  }, []);

  if (addresses.length === 0) {
    return (
      <div className={styles["log-in-wrapper"]}>
        <span className={styles["icon"]}>
          <IconMoodEmptyFilled size={50} color={"rgb(255,204,134)"} />
        </span>
        <p>No wallets tracked for airdrops yet</p>
        <span className={styles["log-in-text"]}>
          You’re not tracking any wallets for airdrops yet.
        </span>
      </div>
    );
  }

  return (
    <div className={styles["addresses-list-wrapper"]}>
      <ul className={styles["addresses-list"]}>
        {addresses.map((address, index) => {
          return (
            <li key={index}>
              <div>
                <p>{cutWalletNumber(address)}</p>
                <MyCopyButton value={address} />
                <span className={styles["network"]}>
                  <img
                    src={ICON_MAP[identifyCryptoWallet(address)]}
                    alt={""}
                    width={15}
                  />
                  {identifyCryptoWallet(address)}
                </span>
                <span className={styles["no-airdrop"]}>
                  {/*<span>{getRandomInt(2, 7)} airdrops</span>*/}
                  <span>{airdropsCount} airdrops</span>
                </span>
                <Button
                  variant={"light"}
                  color={"#FF9400"}
                  className={styles["view-button"]}
                  onClick={() =>
                    (window.location.href = `/address/${addresses}`)
                  }
                >
                  View
                </Button>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <span className={styles["more-button"]}>
                      <IconDotsVertical />
                    </span>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item disabled>
                      <p className={styles["menu-item"]}>
                        Unwatch address<span>Available on Whale plan</span>
                      </p>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddressesList;
