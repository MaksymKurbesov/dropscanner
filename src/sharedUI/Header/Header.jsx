import styles from "./Header.module.css";
import Logo from "../../assets/logo.webp";
import Logo2 from "../../assets/logo2.webp";
import { Anchor, Button, Flex } from "@mantine/core";
import { IconLogout, IconUserFilled, IconLogin2 } from "@tabler/icons-react";
import useWindowSize from "../../hooks/useWindowSize";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../main.jsx";
import SignInModal from "../SignInModal/SignInModal.jsx";
import { useSignInModal } from "../../context/SignInModalContext.jsx";

const Header = ({ user }) => {
  const [scrollY, setScrollY] = useState(0);
  const windowSize = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();
  const isIndexPage = location.pathname === "/";
  const [isLogin, setIsLogin] = useState(true);

  const { isVisible, updateIsVisible } = useSignInModal();

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY); // или `window.scrollTop`
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles["header"]} ${!isIndexPage ? styles["white-header"] : ""} ${scrollY >= 100 ? styles["scrolled-header"] : ""}`}
    >
      <Flex align={"center"}>
        <NavLink to={"/"} className={styles["logo-link"]}>
          <img
            className={styles["logo"]}
            src={scrollY >= 100 || !isIndexPage ? Logo2 : Logo}
            alt={""}
            width={45}
            height={45}
          />
          <span>DropScanner</span>
        </NavLink>
        <nav className={styles["nav"]}>
          <ul>
            <li>
              <NavLink
                to={"/airdrops"}
                className={({ isActive }) => (isActive ? styles["active"] : "")}
              >
                Airdrops
              </NavLink>
            </li>
            <li>
              <Link
                to={"/#pricing"}
                onClick={() => {
                  document.getElementById("pricing")?.scrollIntoView();
                }}
              >
                Pricing
              </Link>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles["active"] : "")}
                to={"/earn"}
              >
                Earn
              </NavLink>
            </li>
          </ul>
        </nav>
        {user ? (
          <>
            <Anchor
              color="rgba(255, 255, 255, 1)"
              variant="subtle"
              radius="md"
              className={styles["log-in-button"]}
              href={"/dashboard/overview"}
              // onClick={() => navigate("/dashboard/overview")}
            >
              {windowSize.width <= 600 ? (
                <IconUserFilled size={18} />
              ) : (
                <>
                  <IconUserFilled size={18} />
                  <span className={styles["dashboard-text"]}>Dashboard</span>
                </>
              )}
            </Anchor>
            {!isIndexPage && (
              <Button
                onClick={() => authService.logout()}
                size={"xs"}
                variant={"light"}
                color={"#ff9400"}
              >
                <IconLogout size={14} />
              </Button>
            )}
          </>
        ) : (
          <Button
            leftSection={<IconLogin2 size={18} />}
            color={
              scrollY >= 100 || !isIndexPage
                ? "#ff9400"
                : "rgba(255, 255, 255, 1)"
            }
            variant="subtle"
            radius="md"
            className={styles["log-in"]}
            onClick={() => updateIsVisible()}
          >
            Sign In
          </Button>
        )}
      </Flex>

      <SignInModal
        opened={isVisible}
        close={updateIsVisible}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    </header>
  );
};

export default Header;
