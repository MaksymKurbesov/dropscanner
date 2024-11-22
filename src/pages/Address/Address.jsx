import styles from "./Address.module.css";
import {
  IconCheck,
  IconDotsVertical,
  IconChevronRight,
} from "@tabler/icons-react";
import { Button, LoadingOverlay, Menu, Overlay } from "@mantine/core";
import AirdropTabs from "./AirdropTabs/AirdropTabs.jsx";
import {
  Link,
  redirect,
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
import GetAirdropModal from "../../sharedUI/GetAirdropModal/GetAirdropModal.jsx";

import MantraImage from "../../assets/airdrops-network/mantra.png";
import SwellImage from "../../assets/airdrops-network/swell.png";
import ZircuitImage from "../../assets/airdrops-network/zircuit.png";
import MorphoImage from "../../assets/airdrops-network/morpho.png";
import EthenaImage from "../../assets/airdrops-network/ethena.png";
import LayerZeroImage from "../../assets/airdrops-network/layer_zero.png";

export const AIRDROPS = [
  {
    name: "Mantra",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $221.3<span>60.32 $OM</span>
      </p>
    ),
    icon: MantraImage,
    token: "$OM",
    amount: "60.32 $OM",
  },
  {
    name: "Swell",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $137.5<span>4015.54 $SWELL</span>
      </p>
    ),
    icon: SwellImage,
    token: "$SWELL",
    amount: "4015.54 $SWELL",
  },
  {
    name: "Zircuit",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $181.2<span>582.1 $ZRC</span>
      </p>
    ),
    icon: ZircuitImage,
    token: "$ZRC",
    amount: "582.1 $ZRC",
  },
  {
    name: "Morpho",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $271.5<span>162979.45 $MORPHO</span>
      </p>
    ),
    icon: MorphoImage,
    token: "$MORPHO",
    amount: "162979.45 $MORPHO",
  },
  {
    name: "Ethena",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $111.8<span>180.4 $ENA</span>
      </p>
    ),
    icon: EthenaImage,
    token: "$ENA",
    amount: "180.4 $ENA",
  },
  {
    name: "Layer Zero",
    status: (
      <p className={styles["airdrop-status"]}>
        <span>Available</span>
      </p>
    ),
    price: (
      <p className={styles["airdrop-price"]}>
        $195.2<span>53.8 $ZRO</span>
      </p>
    ),
    icon: LayerZeroImage,
    token: "$ZRO",
    amount: "53.8 $ZRO",
  },
  // {
  //   name: "Blast",
  //   status: (
  //     <p className={styles["airdrop-status"]}>
  //       <span>Available</span>
  //     </p>
  //   ),
  //   price: (
  //     <p className={styles["airdrop-price"]}>
  //       $95.3<span>0.0305 $ETH</span>
  //     </p>
  //   ),
  //   icon: BlastImage,
  //   token: "ETH",
  // },
  // {
  //   name: "Layer3",
  //   status: (
  //     <p className={styles["airdrop-status"]}>
  //       <span>Available</span>
  //     </p>
  //   ),
  //   price: (
  //     <p className={styles["airdrop-price"]}>
  //       $291.7<span>662.0 MATIC</span>
  //     </p>
  //   ),
  //   icon: Layer3Image,
  //   token: "ETH",
  // },
  // {
  //   name: "Zora",
  //   status: (
  //     <p className={styles["airdrop-status"]}>
  //       <span>Available</span>
  //     </p>
  //   ),
  //   price: (
  //     <p className={styles["airdrop-price"]}>
  //       $132.1<span>1500 ZOR</span>
  //     </p>
  //   ),
  //   icon: ZoraImage,
  //   token: "ETH",
  // },
  // {
  //   name: "Aptos",
  //   status: (
  //     <p className={styles["airdrop-status"]}>
  //       <span>Available</span>
  //     </p>
  //   ),
  //   price: (
  //     <p className={styles["airdrop-price"]}>
  //       $151.4<span>12.73 APT</span>
  //     </p>
  //   ),
  //   icon: AptosImage,
  //   token: "ETH",
  // },
];

const Address = () => {
  const { walletId } = useParams();
  const [user] = useAuthState(auth);
  const [hasWallet, setHasWallet] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [airdrops, setAirdrops] = useState([]);
  const windowSize = useWindowSize();
  const navigate = useNavigate();

  const [clickedAirdrop, setClickedAirdrop] = useState();

  const [
    getAirdropModalIsOpened,
    { open: openGetAirdropModal, close: closeGetAirdropModal },
  ] = useDisclosure(false);
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
                      openGetAirdropModal();
                      setClickedAirdrop(airdrop);
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
        </AirdropTabs>
        <p className={styles["airdrop-missing"]}>
          Airdrop missing from here? Report missing airdrops to Drops Admin
        </p>
      </div>
      <PricingModal opened={opened} close={close} />
      <GetAirdropModal
        close={closeGetAirdropModal}
        opened={getAirdropModalIsOpened}
        airdrop={clickedAirdrop}
        walletAddress={walletId}
      />
      <SponsorCarousel />
      <ScrollRestoration />
    </div>
  );
};

export default Address;
