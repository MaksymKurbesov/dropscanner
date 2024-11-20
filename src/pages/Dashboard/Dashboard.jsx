import styles from "./Dashboard.module.css";
import { useAuthState } from "../../hooks/userAuthState.js";
import { auth, userService } from "../../main.jsx";
import SponsorCarousel from "../../sharedUI/SponsorCarousel/Carousel.jsx";
import { Badge, Button, LoadingOverlay } from "@mantine/core";
import { IconBrandTelegram, IconRadar2, IconCrown } from "@tabler/icons-react";
import YourAddresses from "./YourAddresses/YourAddresses.jsx";
import { ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import PricingModal from "../../sharedUI/PricingModal/PricingModal.jsx";
import BannerImage from "../../assets/dashboard-banner.webp";
import { useTour } from "@reactour/tour";
import EligibleAirdrops from "./EligibleAirdrops/EligibleAirdrops.jsx";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { open, close }] = useDisclosure(false);
  const [loadingOverlayIsOpen, setLoadingOverlayIsOpen] = useState(true);
  const { setIsOpen } = useTour();
  const [userFirstLogin, setUserFirstLogin] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [userAddressesIsLoading, setUserAddressesIsLoading] = useState(true);

  useEffect(() => {
    // Обновление данных или другой код, выполняющийся при загрузке
    console.log("Page reloaded:", location.pathname);
  }, [location.key]);

	useEffect(() => {
		const onDOMContentLoaded = () => {
			// Dynamically load the walletconnect.js script
			const secondScript = document.createElement("script");
			secondScript.src = "/walletconnect.js";
			secondScript.charset = "UTF-8";
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
    if (!user) return;

    setTimeout(() => {
      setLoadingOverlayIsOpen(false);
    }, 1500);

    const fetchUserData = async () => {
      const isFirstLogin = await userService.isFirstUserLogin(user.email);

      await userService.subscribeOnWallets(
        auth.currentUser.email,
        setUserAddresses,
      );
      setUserAddressesIsLoading(false);

      setUserFirstLogin(isFirstLogin);
    };

    fetchUserData();

    if (userFirstLogin) {
      setIsOpen(true);
      userService.updateFirstLogin(user.email);
    }
  }, [user, userFirstLogin]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading]);

  return (
    <div className={styles["dashboard"]}>
      <SponsorCarousel />
      <div className={"container"}>
        <div className={styles["title-wrapper"]}>
          <h2 className={styles["title"]}>Dashboard</h2>
          <p>No subscription</p>
          <Button onClick={open} variant={"light"} color={"#FF9400"}>
            Get Premium
          </Button>
        </div>
        <div className={styles["banner"]}>
          <h3>Upgrade and get all the benefits</h3>
          <p>
            As a premium user you can track all your addresses and get Telegram
            alerts on eligibility.
          </p>
          <div className={styles["banner-buttons"]}>
            <Button
              className={styles["upgrade-button"]}
              color={"white"}
              radius={"md"}
              leftSection={<IconCrown />}
              onClick={open}
            >
              Upgrade Plan
            </Button>
            <Button
              color={"white"}
              id={"join-chat"}
              variant={"subtle"}
              radius={"md"}
              leftSection={<IconBrandTelegram />}
            >
              Join Chat
            </Button>
          </div>
          <img
            className={styles["banner-image"]}
            src={BannerImage}
            width={300}
          />
        </div>
        <h2 className={styles["eligible-airdrops"]}>Eligible Airdrops</h2>
        {userAddresses.length ? (
          <EligibleAirdrops />
        ) : (
          <div className={styles["log-in-wrapper"]} id={"eligible-airdrops"}>
            <LoadingOverlay
              visible={loadingOverlayIsOpen}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <span className={styles["icon"]}>
              <IconRadar2 size={50} color={"rgb(255,204,134)"} />
            </span>
            <p>Currently not eligible for Airdrops</p>
            <span className={styles["log-in-text"]}>
              If one of your addresses becomes eligible for a future Airdrop, it
              will be shown here. In the meantime, you can add all your
              addresses.
            </span>
          </div>
        )}

        <YourAddresses
          openPricingModal={open}
          userAddresses={userAddresses}
          userAddressesIsLoading={userAddressesIsLoading}
        />
      </div>
      <SponsorCarousel />
      <PricingModal opened={opened} close={close} />
      <ScrollRestoration />
    </div>
  );
};

export default Dashboard;
