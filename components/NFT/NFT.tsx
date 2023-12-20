import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React from "react";
import { MARKETPLACE_ADDRESS } from "../../const/addresses";
import Skeleton from "../Skeleton/Skeleton";
import styles from "../../styles/Buy.module.css";
import { useRouter } from "next/router";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const router = useRouter();

  const nft_address = router.query.NFT_COLLECTION_ADDRESS as string;

  // 1. Load if the NFT is for direct listing
  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: nft_address,
      tokenId: nft.metadata.id,
    });

  return (
    <>
      <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
      <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
      <p className={styles.nftName}>{nft.metadata.name}</p>
      <div className={styles.priceContainer}>
        {loadingDirect ? (
          <Skeleton width="100%" height="100%" />
        ) : directListing && directListing[0] ? (
          <div className={styles.priceContainer}>
            <div className={styles.nftPriceContainer}>
              <div className={styles.nftPrice}>
                <p className={styles.nftPriceLabel}>Price</p>
                <p className={styles.nftPriceValue}>
                  {`${directListing[0]?.currencyValuePerToken.displayValue}
          ${directListing[0]?.currencyValuePerToken.symbol}`}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.priceContainer}>
            <div className={styles.nftPriceContainer}>
              <div className={styles.nftPrice}>
                <p className={styles.nftPriceLabel}>Price</p>
                <p className={styles.nftPriceValue}>Not for sale</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
