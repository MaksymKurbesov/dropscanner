import styles from "./EligibleAirdrops.module.css";
import { useEffect, useState } from "react";
import { getAirdrops } from "../../../helpers/helpers.js";
import { auth, userService } from "../../../main.jsx";
import { useAuthState } from "../../../hooks/userAuthState.js";
import { AIRDROPS } from "../../Address/Address.jsx";
import { Badge, Button } from "@mantine/core";

const EligibleAirdrops = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [userWallet, setUserWallet] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const wallet = await userService.getUserWallets(user.email);
      console.log(wallet, "walletwallet");
      setUserWallet(wallet);

      const airdrops = await getAirdrops(wallet[0], AIRDROPS);

      setAirdrops(airdrops);
    };

    fetchUserData();
  }, [user]);

  return (
    <div className={styles["eligible-airdrops"]} id={"eligible-airdrops"}>
      <ul>
        {airdrops.map((airdrop, index) => {
          return (
            <li className={styles["airdrop"]} key={index}>
              {index === 0 && <Badge className={styles["badge"]}>New</Badge>}
              <div className={styles["name"]}>
                <p>{airdrop.name}</p>
                <Button className={"open"} color={"#ff9400"} size={"xs"}>
                  Claim
                </Button>
              </div>
              <img src={airdrop.icon} alt={""} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EligibleAirdrops;
