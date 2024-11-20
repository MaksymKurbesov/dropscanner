import styles from "./Referrals.module.css";
import { Button, TextInput } from "@mantine/core";
import { IconCopy, IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { auth, userService } from "../../../main.jsx";
import { cutWalletNumber, generateCode } from "../../../helpers/helpers.js";
import MyCopyButton from "../../../sharedUI/CopyButton/CopyButton.jsx";

const Referrals = () => {
  const [userWallet, setUserWallet] = useState("");
  const [userRefCode, setUserRefCode] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = auth.currentUser.email;
      const wallets = await userService.getUserWallets(userEmail);
      const refCode = await userService.getRefCode(userEmail);

      setUserWallet(wallets[0]);
      setUserRefCode(refCode);
    };

    fetchUserData();
  }, [auth.currentUser]);

  return (
    <div className={styles["referrals"]}>
      <div className={styles["input-wrapper"]}>
        <TextInput
          className={styles["invite-link-input"]}
          label={"Your invite link"}
          value={`https://drops.bot/?r=${userRefCode}`}
          // rightSection={<IconCopy size={16} />}
        />
        {/*<Button radius={"md"} variant={"light"} color={"orange"} size={"xs"}>*/}
        {/*  <IconCopy size={14} />*/}
        {/*</Button>*/}
        <MyCopyButton value={`https://drops.bot/?r=${userRefCode}`} />
      </div>

      <div className={styles["input-wrapper"]}>
        <TextInput
          className={styles["revenue-input"]}
          label={"Your revenue share address"}
          value={cutWalletNumber(userWallet)}
          // rightSectionPointerEvents="none"
        />
        <Button radius={"md"} variant={"light"} color={"gray"} size={"xs"}>
          <IconEdit size={14} />
        </Button>
      </div>
    </div>
  );
};

export default Referrals;
