import styles from "./FAQ.module.css";
import { Accordion } from "@mantine/core";
import { AIRDROPS, BILLING, GENERAL, ISSUES, PRIVACY } from "./QUESTIONS.jsx";

const FAQ = () => {
  const AIRDROPS_ITEMS = AIRDROPS.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  const GENERAL_ITEMS = GENERAL.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  const PRIVACY_ITEMS = PRIVACY.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  const BILLING_ITEMS = BILLING.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  const ISSUES_ITEMS = ISSUES.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className={styles["FAQ"]} id={"FAQ"}>
      <div>
        <h3 className={"little-title"}>Frequently asked questions</h3>
        <p className={styles["subtitle"]}>Everything you need to know</p>
      </div>
      <div className={styles["accordion-list"]}>
        <span>Airdrops</span>
        <Accordion
          styles={{
            label: { fontWeight: 500 },
            content: { fontWeight: 400, fontSize: 14 },
          }}
          className={styles["accordion"]}
          variant="contained"
        >
          {AIRDROPS_ITEMS}
        </Accordion>
        <span>General</span>
        <Accordion
          styles={{
            label: { fontWeight: 500 },
            content: { fontWeight: 400, fontSize: 14 },
          }}
          className={styles["accordion"]}
          variant="contained"
        >
          {GENERAL_ITEMS}
        </Accordion>
        <span>Privacy & Security</span>
        <Accordion
          styles={{
            label: { fontWeight: 500 },
            content: { fontWeight: 400, fontSize: 14 },
          }}
          className={styles["accordion"]}
          variant="contained"
        >
          {PRIVACY_ITEMS}
        </Accordion>
        <span>Billing & Payments</span>
        <Accordion
          styles={{
            label: { fontWeight: 500 },
            content: { fontWeight: 400, fontSize: 14 },
          }}
          className={styles["accordion"]}
          variant="contained"
        >
          {BILLING_ITEMS}
        </Accordion>
        <span>Issues</span>
        <Accordion
          styles={{
            label: { fontWeight: 500 },
            content: { fontWeight: 400, fontSize: 14 },
          }}
          className={styles["accordion"]}
          variant="contained"
        >
          {ISSUES_ITEMS}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
