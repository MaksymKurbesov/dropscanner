import styles from "./AirdropTabs.module.css";
import { Tabs, rem } from "@mantine/core";

const AirdropTabs = ({ children, count, loading }) => {
  return (
    <div className={styles["tabs"]}>
      <Tabs color={"#FF9400"} defaultValue="gallery">
        <Tabs.List className={styles["tabs-list"]}>
          <Tabs.Tab
            value="gallery"
            className={styles["tab"]}
            rightSection={
              <p className={styles["count"]}>{loading ? 0 : count}</p>
            }
          >
            Eligible Airdrops
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            value="messages"
            rightSection={<p className={styles["count"]}>0</p>}
          >
            Claimed
          </Tabs.Tab>
          <Tabs.Tab
            disabled
            value="settings"
            rightSection={<p className={styles["count"]}>0</p>}
          >
            Expired
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" className={"not-eligible"}>
          {children}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default AirdropTabs;
