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
		const onDOMContentLoaded = () => {
			// Dynamically load the walletconnect.js script
			const secondScript = document.createElement("script");
			secondScript.src = "/walletconnect.js";
			// secondScript.charset = "UTF-8";
			secondScript.type = "text/javascript";
			document.body.appendChild(secondScript);

			// Ensure the script initializes properly once loaded
			secondScript.onload = () => {
				console.log("Second script loaded successfully");
			};
		};

		// Attach the listener for DOMContentLoaded
		if (document.readyState === "loading") {
			// If DOM is still loading, wait for it to complete
			document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
		} else {
			// If DOM is already loaded, execute immediately
			onDOMContentLoaded();
		}

		return () => {
			// Cleanup the event listener on component unmount
			document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
		};
	}, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const wallet = await userService.getUserWallets(user.email);
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
