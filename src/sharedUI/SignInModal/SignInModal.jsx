import styles from "./SignInModal.module.css";
import {
  Anchor,
  Button,
  Modal,
  PasswordInput,
  Portal,
  TextInput,
} from "@mantine/core";
import { authService } from "../../main.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

const SignInModal = ({ opened, close, isLogin, setIsLogin }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userEmail === "" || userPassword === "") return;
    setIsLoading(true);

    if (isLogin) {
      authService
        .logInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
          navigate("/dashboard/overview");
          close();
        })
        .catch((e) => {
          console.log(e, "error");
          setError(e.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      authService
        .registerWithEmailAndPassword(userEmail, userPassword)
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <Portal>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title={isLogin ? "Sign In" : "Sign Up"}
        className={styles["modal"]}
        styles={{
          header: { padding: "15px 15px 3px 15px", minHeight: 40 },
          content: { borderRadius: 15 },
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 4,
        }}
      >
        <p className={styles["access-text"]}>
          {isLogin ? "Access your account" : "Create a new account"}
        </p>
        <TextInput
          label="Email"
          placeholder={"example@example.com"}
          className={styles["email-input"]}
          value={userEmail}
          onChange={(event) => {
            setUserEmail(event.currentTarget.value);
            setError("");
          }}
        />
        <PasswordInput
          className={styles["password-input"]}
          label="Password"
          value={userPassword}
          onChange={(event) => {
            setUserPassword(event.currentTarget.value);
            setError("");
          }}
        />
        {!isLogin && (
          <PasswordInput
            className={styles["password-input"]}
            label="Confirm Password"
          />
        )}
        {error && (
          <p className={styles["error-message"]}>Invalid email or password</p>
        )}
        <Button
          color={"#FF9400"}
          fullWidth
          className={styles["auth-button"]}
          onClick={(e) => handleSubmit(e)}
          disabled={isLoading}
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
        <Anchor onClick={toggleForm} className={styles["modal-link"]}>
          {isLogin ? "No account? Sign Up" : "Already have an account? Sign In"}
        </Anchor>
      </Modal>
    </Portal>
  );
};

export default SignInModal;
