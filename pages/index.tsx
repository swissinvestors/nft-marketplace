import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { NFT_COLLECTION_ADDRESS_1 } from "../const/contractAddresses";
import { NFT_COLLECTION_ADDRESS_2 } from "../const/contractAddresses";
import { useContract, useMetadata, MediaRenderer } from "@thirdweb-dev/react";

/**
 * Landing page with a simple gradient background and a hero asset.
 * Free to customize as you see fit.
 */

type Props = {
  data: any;
};
const Home: NextPage = () => {
  const { contract: nftCollection1 } = useContract(NFT_COLLECTION_ADDRESS_1);
  const { data: collectionMetadata1 }: Props = useMetadata(nftCollection1);

  const { contract: nftCollection2 } = useContract(NFT_COLLECTION_ADDRESS_2);
  const { data: collectionMetadata2 }: Props = useMetadata(nftCollection2);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  Chiliz Swap NFT Marketplace
                </span>
              </h1>
              <p className={styles.heroSubtitle}>
                Buy and Sell NFTs on Chiliz Chain
              </p>
              <h1> TOP COLLECTIONS</h1>

              <div className={styles.heroCtaContainer}>
                <Link
                  className={styles.heroCta}
                  href={`./${NFT_COLLECTION_ADDRESS_1}/listed`}
                >
                  <MediaRenderer
                    src={collectionMetadata1?.image}
                    className={styles.collectionImage}
                  />
                  <h2 className={styles.profileTitle}>
                    {collectionMetadata1?.name}
                  </h2>{" "}
                </Link>
                <Link
                  className={styles.heroCta}
                  href={`./${NFT_COLLECTION_ADDRESS_2}/listed`}
                >
                  <MediaRenderer
                    src={collectionMetadata2?.image}
                    className={styles.collectionImage}
                  />
                  <h2 className={styles.profileTitle}>
                    {collectionMetadata2?.name}
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
