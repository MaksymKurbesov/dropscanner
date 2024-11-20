import styles from "./Footer.module.css";
import { IconSpy } from "@tabler/icons-react";
import FindUsProducthunt from "../../assets/find-us-producthunt.svg";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className={"container"}>
        <div className={styles["left-column"]}>
          <h3 className={styles["title"]}>DropScanner</h3>
          <p className={styles["subtitle"]}>
            Check and track any crypto wallet address for unclaimed airdrops,
            get Telegram alerts on eligibility, and never miss an airdrop again
            with DropScanner.
          </p>
        </div>
        <div className={styles["right-column"]}>
          <ul>
            <span>Resources</span>
            <li>
              <Link to={"/#FAQ"}>FAQ</Link>
            </li>
            <li>
              <NavLink to={"/airdrops"}>Airdrops</NavLink>
            </li>
            <li>
              <Link to={"/#pricing"}>Pricing</Link>
            </li>
          </ul>
          <ul>
            <span>Support</span>
            <li>
              <Link to={"/#"}>Support Chat</Link>
            </li>
            <li>
              <NavLink to={"/terms"}>Terms of Service</NavLink>
            </li>
            <li>
              <NavLink to={"/privacy"}>Privacy</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={"container"}>
        <div className={styles["bottom-footer"]}>
          <p>
            <IconSpy size={20} />
            Privacy first! We never share data with third parties. © 2024
            DropScanner. All rights reserved.
          </p>
          <img src={FindUsProducthunt} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
