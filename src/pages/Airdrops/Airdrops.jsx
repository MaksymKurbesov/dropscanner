import styles from "./Airdrops.module.css";
import SponsorCarousel from "../../sharedUI/SponsorCarousel/Carousel.jsx";
import EthereumIcon from "../../assets/crypto-icons/ethereum.png";
import SolanaIcon from "../../assets/crypto-icons/solana.png";
import StarknetIcon from "../../assets/crypto-icons/starknet.svg";
import AptosIcon from "../../assets/crypto-icons/aptos.png";
import SuiIcon from "../../assets/crypto-icons/sui.webp";
import CosmosIcon from "../../assets/crypto-icons/cosmos.webp";
import BitcoinIcon from "../../assets/crypto-icons/bitcoin.webp";
import ExpiringBanner from "../../sharedUI/ExpiringBanner/ExpiringBanner.jsx";
import { Accordion } from "@mantine/core";
import { Link, ScrollRestoration } from "react-router-dom";

const NETWORKS = [
  { icon: EthereumIcon, name: "Ethereum & L2", airdrops: 55 },
  { icon: SolanaIcon, name: "Solana", airdrops: 10 },
  { icon: StarknetIcon, name: "Starknet", airdrops: 4 },
  { icon: AptosIcon, name: "Aptos", airdrops: 4 },
  { icon: SuiIcon, name: "Sui", airdrops: null },
  { icon: CosmosIcon, name: "Cosmos", airdrops: 4 },
  { icon: BitcoinIcon, name: "Bitcoin", airdrops: 5 },
];

const QUESTIONS = [
  {
    value: "What are Airdrops?",
    description:
      "Airdrops are a marketing strategy in the cryptocurrency world where blockchain projects distribute free tokens to the community to promote awareness and adoption. These tokens are often given to users who complete specific tasks, such as onchain activities or joining a community group. Airdrops can be profitable for protocol users as they receive free tokens that may increase in value over time, providing a direct financial benefit. If you have active wallets or addresses on any of the supported blockchains/networks, you might be eligible for Airdrops!",
  },
  {
    value: "How to qualify for Airdops",
    description:
      "Qualifying for airdrops through onchain activities involves engaging directly with a blockchain's ecosystem by performing specific tasks that demonstrate active participation and support. These activities can include trading, staking, or holding a particular cryptocurrency, interacting with decentralized applications (dApps), providing liquidity to decentralized exchanges (DEXs), or participating in governance votes.\n" +
      "\n" +
      "By consistently engaging in these onchain activities, users not only contribute to the network's growth and stability but also position themselves as active members of the community, often making them eligible for airdrops. These onchain actions are verifiable through the blockchain, ensuring that the rewards are distributed to genuine and engaged users.\n" +
      "\n" +
      "DropScanner makes it easy to check your eligibility for airdrops by monitoring your wallet addresses across multiple networks. Saving your addresses, you can receive real-time notifications on Telegram when you qualify for airdrops, ensuring that you can claim your airdrop before it expires, so you never miss out on free tokens.",
  },
  {
    value: "How can I find unclaimed Airdrops?",
    description:
      "DropScanner is the most advanced airdrop checker. It finds unclaimed crypto airdrops for you by monitoring all your wallet addresses across multiple networks like Ethereum, Solana, Cosmos, Aptos, and Bitcoin. Just paste your crypto wallet address to the checker. No need to connect a wallet.",
  },
  {
    value: "How do I avoid missing Airdrops?",
    description:
      "We've made it simple. Just enter any crypto wallet addresses, and DropScanner will instantly check your eligibility for all recent and verified airdrops. It will also run automatic background checks for new airdrops. If you're eligible, you'll get a notification on Telegram.",
  },
];

const Airdrops = () => {
  const QUESTION_ITEMS = QUESTIONS.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className={styles["airdrops"]}>
      <SponsorCarousel />
      <div className={"container"}>
        <h1 className={styles["title"]}>
          Tracking <span>75</span> recent <span>Airdrops</span> across{" "}
          <span>7 networks</span> and counting!
        </h1>
        <p className={styles["subtitle"]}>
          Whenever a new airdrop becomes available, your watched addresses will
          be automatically checked for eligibility. If you are a Premium user,
          you will also receive a Telegram alert.
        </p>
        <ul className={styles["network-list"]}>
          {NETWORKS.map((network, index) => {
            return (
              <li key={index}>
                <p>
                  <img src={network.icon} alt={""} width={20} />
                  {network.name}
                </p>
                <span>
                  {network.airdrops
                    ? `${network.airdrops} most recent Airdrops`
                    : `Coming soon...`}
                </span>
              </li>
            );
          })}
        </ul>
        <div className={styles["expiring-banner"]}>
          <ExpiringBanner />
        </div>
        <Accordion
          styles={{
            label: { fontWeight: 500 },
            content: { fontWeight: 400, fontSize: 14 },
          }}
          className={styles["accordion"]}
          variant="contained"
        >
          {QUESTION_ITEMS}
        </Accordion>
        <p className={styles["read-more"]}>
          Read more from the{" "}
          <Link to={"/#FAQ"}>
            <span>FAQ section</span>
          </Link>
        </p>
      </div>
      <SponsorCarousel />
      <ScrollRestoration />
    </div>
  );
};

export default Airdrops;
