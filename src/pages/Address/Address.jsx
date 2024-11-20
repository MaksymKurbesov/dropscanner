import styles from "./Address.module.css";
import {
  IconRadar2,
  IconBrandTelegram,
  IconArrowNarrowLeft,
  IconCheck,
  IconDotsVertical,
  IconChevronRight,
} from "@tabler/icons-react";
import { Anchor, Button, LoadingOverlay, Menu, Overlay } from "@mantine/core";
import AirdropTabs from "./AirdropTabs/AirdropTabs.jsx";
import {
  Link,
  NavLink,
  ScrollRestoration,
  useNavigate,
  useParams,
} from "react-router-dom";
import SponsorCarousel from "../../sharedUI/SponsorCarousel/Carousel.jsx";
import MyCopyButton from "../../sharedUI/CopyButton/CopyButton.jsx";
import {
  cutWalletNumber,
  getAirdrops,
  identifyCryptoWallet,
} from "../../helpers/helpers.js";
import { ICON_MAP } from "../Dashboard/YourAddresses/Step2/Step2.jsx";
import { useAuthState } from "../../hooks/userAuthState.js";
import { auth, userService } from "../../main.jsx";
import { useEffect, useState } from "react";
import PricingModal from "../../sharedUI/PricingModal/PricingModal.jsx";
import { useDisclosure } from "@mantine/hooks";
import { useSignInModal } from "../../context/SignInModalContext.jsx";
import ScrollImage from "../../assets/airdrops-network/scroll-1.png";
import SolayerImage from "../../assets/airdrops-network/solayer-logo.jpg";
import FarcasterImage from "../../assets/airdrops-network/farcaster.jpg";
import BaseImage from "../../assets/airdrops-network/base.png";
import NansenImage from "../../assets/airdrops-network/nansen.png";
import PhantomImage from "../../assets/airdrops-network/phantom.png";
import BlastImage from "../../assets/airdrops-network/blast.png";
import Layer3Image from "../../assets/airdrops-network/layer3.png";
import ZoraImage from "../../assets/airdrops-network/zora.png";
import AptosImage from "../../assets/airdrops-network/aptos.png";
import useWindowSize from "../../hooks/useWindowSize.js";

export const AIRDROPS = [
  {
    name: "Scroll",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $221.3<span>0.0714 $ETH</span>
      </p>
    ),
    icon: ScrollImage,
  },
  {
    name: "Solayer",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $137.5<span>0.5817 $SOL</span>
      </p>
    ),
    icon: SolayerImage,
  },
  {
    name: "Farcaster",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $181.2<span>0.0582 $ETH</span>
      </p>
    ),
    icon: FarcasterImage,
  },
  {
    name: "Base",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $271.5<span>0.0872 $ETH</span>
      </p>
    ),
    icon: BaseImage,
  },
  {
    name: "Nansen",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $111.8<span>0.4633 $SOL</span>
      </p>
    ),
    icon: NansenImage,
  },
  {
    name: "Phantom",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $195.2<span>0.8139 $SOL</span>
      </p>
    ),
    icon: PhantomImage,
  },
  {
    name: "Blast",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $95.3<span>0.0305 $ETH</span>
      </p>
    ),
    icon: BlastImage,
  },
  {
    name: "Layer3",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $291.7<span>662.0 MATIC</span>
      </p>
    ),
    icon: Layer3Image,
  },
  {
    name: "Zora",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $132.1<span>1500 ZOR</span>
      </p>
    ),
    icon: ZoraImage,
  },
  {
    name: "Aptos",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $151.4<span>12.73 APT</span>
      </p>
    ),
    icon: AptosImage,
  },
];

const Address = () => {
  const { walletId } = useParams();
  const [user] = useAuthState(auth);
  const [hasWallet, setHasWallet] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [airdrops, setAirdrops] = useState([]);
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const [isOpenLoadOverlay, setIsOpenLoadOverlay] = useState(true);
  const { isVisible, updateIsVisible } = useSignInModal();

  useEffect(() => {
    getAirdrops(walletId, AIRDROPS).then((data) => setAirdrops(data));

    const timeout = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;

    setTimeout(() => {
      setIsOpenLoadOverlay(false);
    }, timeout);
  }, []);

  useEffect(() => {
    const fetchWallets = async () => {
      if (user) {
        const wallets = await userService.getUserWallets(user.email);
        setHasWallet(wallets.includes(walletId));
      }
    };

    fetchWallets();
  }, [user]);

  return (
    <div className={styles["address"]}>
      <SponsorCarousel />
      <div className={"container"}>
        <div className={styles["title"]}>
          <p>Address</p>

          <span>
            <img
              src={ICON_MAP[identifyCryptoWallet(walletId)]}
              alt={""}
              width={15}
            />
            {identifyCryptoWallet(walletId)}
          </span>
        </div>
        <div className={styles["address-wrapper"]}>
          <p>
            {cutWalletNumber(walletId)}
            <MyCopyButton value={walletId} />
          </p>
          {user && hasWallet ? (
            <Button
              leftSection={<IconCheck size={16} />}
              disabled
              radius={"md"}
              color={"#FF9400"}
            >
              Watching
            </Button>
          ) : (
            <Button
              radius={"md"}
              color={"#FF9400"}
              onClick={() => {
                if (!user) {
                  updateIsVisible();
                } else {
                  open();
                }
              }}
            >
              Watch this address
            </Button>
          )}
        </div>
        <h2>Address Airdrops</h2>
        <AirdropTabs count={airdrops.length} loading={isOpenLoadOverlay}>
          <ul className={styles["airdrops-list"]}>
            <LoadingOverlay
              visible={isOpenLoadOverlay}
              zIndex={1000}
              overlayProps={{
                radius: "md",
                blur: 2,
              }}
            />
            {isOpenLoadOverlay && (
              <Overlay color="#fff" backgroundOpacity={1} />
            )}
            {airdrops.map((airdrop, index) => {
              return (
                <li key={index}>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <IconDotsVertical size={20} />
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>
                        <p className={styles["menu-item"]}>
                          <Link to={"#"}>Visit site</Link>
                        </p>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                  <img src={airdrop.icon} alt={""} width={40} />
                  <p className={styles["airdrop-name"]}>{airdrop.name}</p>
                  {airdrop.status}
                  {airdrop.price}
                  <Button
                    color={"#FF9400"}
                    size={"xs"}
                    onClick={() => {
                      if (user) {
                        navigate("/dashboard/overview");
                      } else {
                        updateIsVisible();
                      }
                    }}
                  >
                    {windowSize.width <= 550 ? (
                      "Claim"
                    ) : (
                      <>
                        Claim safely <IconChevronRight size={16} />
                      </>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
          {/*<div className={styles["log-in-wrapper"]}>*/}
          {/*  <LoadingOverlay*/}
          {/*    visible={isOpenLoadOverlay}*/}
          {/*    zIndex={1000}*/}
          {/*    overlayProps={{ radius: "sm", blur: 2 }}*/}
          {/*  />*/}
          {/*  <span className={styles["icon"]}>*/}
          {/*    <IconRadar2 size={50} color={"rgb(255,204,134)"} />*/}
          {/*  </span>*/}
          {/*  <p>Currently not eligible for Airdrops</p>*/}
          {/*  <span className={styles["log-in-text"]}>*/}
          {/*    {!user*/}
          {/*      ? "Log in and save this address to be alerted for every future airdrops"*/}
          {/*      : hasWallet*/}
          {/*        ? "This address has been saved. You will see on this page if it becomes eligible for future Airdrops."*/}
          {/*        : "Save this address to be alerted when it becomes eligible for future Airdrops"}*/}
          {/*  </span>*/}
          {/*  {!user && (*/}
          {/*    <Button*/}
          {/*      color={"#FF9400"}*/}
          {/*      radius={"md"}*/}
          {/*      leftSection={<IconBrandTelegram />}*/}
          {/*      className={styles["log-in-button"]}*/}
          {/*      onClick={() => updateIsVisible()}*/}
          {/*    >*/}
          {/*      Log in*/}
          {/*    </Button>*/}
          {/*  )}*/}

          {/*  <NavLink to={"/"} className={styles["check-another-link"]}>*/}
          {/*    <IconArrowNarrowLeft />*/}
          {/*    Check another address*/}
          {/*  </NavLink>*/}
          {/*</div>*/}
        </AirdropTabs>
        <p className={styles["airdrop-missing"]}>
          Airdrop missing from here? Report missing airdrops to Drops Admin
        </p>
      </div>
      <PricingModal opened={opened} close={close} />
      <SponsorCarousel />
      <ScrollRestoration />
    </div>
  );
};

export default Address;
