import {
  ConnectWallet,
  useAddress,
  metamaskWallet,
  lightTheme,
} from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Navbar() {
  const address = useAddress();

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
            />
            <h1> Chiliz Swap </h1>
          </Link>
        </div>

        <div className={styles.navMiddle}>
          <Link href="#" target="_blank" className={styles.linkHeader}>
            Swap
          </Link>
          <Link
            href="https://www.fanmarketcap.com/"
            target="_blank"
            className={styles.linkHeader}
          >
            Fan Tokens
          </Link>
          <Link
            href="https://bridge.chiliz.com/transfer"
            target="_blank"
            className={styles.linkHeader}
          >
            Bridge
          </Link>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet
              btnTitle="Connect Wallet"
              theme={lightTheme({
                colors: {
                  primaryButtonBg: "#FF1256",
                },
              })}
              switchToActiveChain={true}
              modalSize={"compact"}
              welcomeScreen={{}}
            />
          </div>
          {address && (
            <Link className={styles.link} href={`/profile/${address}`}>
              <div className={styles.profileimagedesktop}>
                <Image
                  className={styles.profileImage}
                  src="/user-icon.png"
                  width={42}
                  height={42}
                  alt="Profile"
                />
              </div>
            </Link>
          )}
        </div>

        <div className={styles.hamburgermenu}>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" />
            <span className={styles.menu}>
              {" "}
              <span className={styles.hamburger}></span>{" "}
            </span>
            <ul className={styles.ul}>
              <li className={styles.li}>
                {" "}
                <a className={styles.a} href="/nft ">
                  Chiliz NFTs{" "}
                </a>
              </li>

              <li className={styles.li}>
                {" "}
                <a
                  className={styles.a}
                  href="https://www.fanmarketcap.com/"
                  target="_blank"
                >
                  Fan Tokens{" "}
                </a>
              </li>

              <li className={styles.li}>
                <a
                  className={styles.a}
                  href="https://bridge.chiliz.com/transfer"
                  target="_blank"
                >
                  Bridge{" "}
                </a>
              </li>

              <li className={styles.li}>
                {address && (
                  <a
                    className={styles.profileImage}
                    href={`/profile/${address}`}
                  >
                    Profile Page
                  </a>
                )}
              </li>
            </ul>
          </label>
        </div>
      </nav>
    </div>
  );
}
