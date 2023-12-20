import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

/**
 * Navigation bar that shows up on all pages.
 * Rendered in _app.tsx file above the page content.
 */
export function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <Link
          href="https://twitter.com/chilizswap"
          className={`${styles.footerLogo}`}
        >
          <Image src="/x_logo.png" alt="x" width={30} height={30} />
        </Link>

        <Link
          href="mailto:info@chilizswap.com"
          className={`${styles.footerLogo}`}
        >
          <Image src="/email_icon.png" alt="x" width={30} height={30} />
        </Link>

        <p className={styles.footerText}>
          Made with 🌶️ by chilizens for chilizens
        </p>
      </div>
    </>
  );
}
