import styles from "./ExpiringBanner.module.css";
import { Button } from "@mantine/core";
import { useSignInModal } from "../../context/SignInModalContext.jsx";
import { useAuthState } from "../../hooks/userAuthState.js";
import { auth } from "../../main.jsx";
import { useNavigate } from "react-router-dom";

const ExpiringBanner = () => {
  const { updateIsVisible } = useSignInModal();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className={styles["expiring-banner"]}>
      <h2>1 Airdrop expiring in the next 7 days</h2>
      <Button
        radius={"md"}
        size={"sm"}
        variant={"filled"}
        color="rgba(255, 255, 255, 1)"
        className={styles["check-button"]}
        onClick={() => {
          if (!user) {
            updateIsVisible();
          } else {
            // take payment boomfi api
            navigate("/dashboard/overview");
          }
        }}
      >
        Check Your Eligibility
      </Button>
    </div>
  );
};

export default ExpiringBanner;
