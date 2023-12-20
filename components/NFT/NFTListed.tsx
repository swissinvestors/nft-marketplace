import React, { FC, useState } from "react";
import { DirectListingV3 } from "@thirdweb-dev/sdk";
import {
  // useAddress,
  // useValidDirectListings,
  // useContract,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import styles from "../../styles/Buy.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
// import { MARKETPLACE_ADDRESS } from "../../const/addresses";

const NFTListed: FC<DirectListingV3> = (nft) => {
  const router = useRouter();

  const nft_address = router.query.NFT_COLLECTION_ADDRESS as string;

  // const { contract: marketplace } = useContract(
  //   MARKETPLACE_ADDRESS,
  //   "marketplace-v3"
  // );

  // const address = useAddress();

  // const { data: directListing } = useValidDirectListings(marketplace, {
  //   tokenContract: nft_address,
  //   tokenId: nft.asset.id,
  // });

  return (
    <Link
      href={`../token/${nft_address}/${nft.asset.id}`}
      key={nft.asset.id}
      className={styles.nftContainer}
    >
      <ThirdwebNftMedia metadata={nft.asset} className={styles.nftImage} />
      <p className={styles.nftTokenId}>Token ID #{nft.asset.id}</p>
      <p className={styles.nftName}>{nft.asset.name}</p>
      <div className={styles.priceContainer}>
        <div className={styles.nftPriceContainer}>
          <div className={styles.nftPrice}>
            <p className={styles.nftPriceLabel}>Price</p>
            <p className={styles.nftPriceValue}>
              {`${nft.currencyValuePerToken.displayValue}
          ${nft.currencyValuePerToken.symbol}`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTListed;
