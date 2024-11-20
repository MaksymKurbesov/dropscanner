import styles from "./Testimonials.module.css";
import { Avatar, Button, Spoiler } from "@mantine/core";
import TwitterBlueIcon from "../../../../assets/twitter-blue.svg";
import { FEEDBACKS } from "./Testimonials.jsx";
import { useState } from "react";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

const MobileFeedbacks = () => {
  return (
    <Spoiler
      maxHeight={270}
      showLabel={
        <Button
          color={"#FF9400"}
          variant={"light"}
          radius={"md"}
          rightSection={<IconArrowDown size={14} />}
        >
          See more
        </Button>
      }
      hideLabel={
        <Button
          color={"#FF9400"}
          variant={"light"}
          radius={"md"}
          rightSection={<IconArrowUp size={14} />}
        >
          See less
        </Button>
      }
    >
      <ul className={styles["feedback-list"]}>
        {FEEDBACKS.map((feedback, index) => {
          return (
            <li key={index}>
              <p className={styles["feedback-text"]}>{feedback.text}</p>
              <div className={styles["profile"]}>
                <Avatar src={feedback.icon} radius="xl" />
                <div>
                  <p>
                    {feedback.name}
                    <img src={TwitterBlueIcon} alt={""} width={17} />
                  </p>
                  <span>{feedback.nickname}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Spoiler>
  );
};

export default MobileFeedbacks;
