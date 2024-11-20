import styles from "./Carousel.module.css";
import colors from "../../pages/Airdrops/Colors.module.css";
import { Button } from "@mantine/core";
import MitosisIcon from "../../assets/crypto-icons/mitosis.webp";
import AzuraIcon from "../../assets/crypto-icons/azura.webp";
import ChainbaseCoin from "../../assets/crypto-icons/chainbase.webp";
import AftermathIcon from "../../assets/crypto-icons/aftermath.webp";
import JupiterIcon from "../../assets/crypto-icons/jupiter.webp";
import AptinIcon from "../../assets/crypto-icons/aptin.webp";
import ZoraIcon from "../../assets/crypto-icons/zora.webp";
import ElixirIcon from "../../assets/crypto-icons/elixir.webp";
import TurtleIcon from "../../assets/crypto-icons/turtleclub.webp";
import SolvIcon from "../../assets/crypto-icons/solv.webp";
import TwitterBlue from "../../assets/twitter-blue.svg";
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const SPONSOR_AIRDROP = [
  {
    icon: MitosisIcon,
    name: "Mitosis",
    text: "Earn Mitosis points, Eigen points and more by restaking on Mitosis",
    color: "blue",
    link: "https://app.mitosis.org/?referral=JUZ8D5",
  },
  {
    icon: AzuraIcon,
    name: "Azura",
    text: "Azura is a new full-stack trading platform. Earn Azurite and get 10% off fees",
    color: "light-blue",
    link: "https://app.azura.xyz/swap",
  },
  {
    icon: ChainbaseCoin,
    name: "Chainbase",
    text: "Earn Zircons from your onchain footprint and by completing challenges.",
    color: "cyan",
    link: "https://genesis.chainbase.com/landing",
  },
  {
    icon: AftermathIcon,
    name: "Aftermath",
    text: "Swap and stake SUI with zero fees, and earn rewards",
    color: "green",
    link: "https://aftermath.finance/trade?from=USDC&to=SUI",
  },
  {
    icon: JupiterIcon,
    name: "Jupiter Season 2",
    text: "Get ready for the next airdrop from the Jupiter DEX",
    color: "yellow",
    link: "https://jup.ag/",
  },
  {
    icon: AptinIcon,
    name: "Aptin",
    text: "Lend and borrow assets, and be ready for the $APN airdrop on Aptos!",
    color: "orange",
    link: "https://app.aptin.io/",
  },
  {
    icon: ZoraIcon,
    name: "Zora",
    text: "Earn Sparks by minting and creating NFTs",
    color: "red",
    link: "",
  },
  {
    icon: ElixirIcon,
    name: "Elixir",
    text: "Earn potions by interacting or contributing to the Elixir Network",
    color: "pink",
    link: "https://www.elixir.xyz/refer/ankunding4347",
  },
  {
    icon: TurtleIcon,
    name: "Turtle Club",
    text: "10% Boost on Scroll Marks, Linea LXP. No smart contract or counterparty risk!",
    color: "violet",
    link: "https://app.turtle.club/",
  },
  {
    icon: SolvIcon,
    name: "Solv Protocol",
    text: "Put your BTC to work with SolvBTC, and earn XP.",
    color: "green",
    link: "https://app.solv.finance/points/FG2LZX",
  },
];

const SponsorCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <div className={styles["carousel"]}>
      <Carousel
        loop
        // withControls={false}

        height={50}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        classNames={styles}
      >
        {SPONSOR_AIRDROP.map((aidrop, index) => {
          return (
            <Carousel.Slide
              className={`${styles["slide"]} ${colors[aidrop.color]}`}
              key={index}
            >
              <div className={styles["slide-wrapper"]}>
                <img
                  className={styles["icon"]}
                  src={aidrop.icon}
                  alt={""}
                  width={25}
                />
                <span className={styles["name"]}>{aidrop.name}</span>
                <img
                  src={TwitterBlue}
                  alt={""}
                  width={15}
                  className={styles["twitter-icon"]}
                />
                <p className={styles["text"]}>{aidrop.text}</p>
                <a href={aidrop.link} target={"_blank"}>
                  <Button size={"xs"} radius={"md"} variant={"light"}>
                    Join Airdrop
                  </Button>
                </a>
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};

export default SponsorCarousel;
