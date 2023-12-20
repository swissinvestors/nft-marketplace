import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import Skeleton from "../Skeleton/Skeleton";
import NFT from "./NFT";
import styles from "../../styles/Buy.module.css";
import React, { useState, useEffect } from "react";
import { useContract, useNFTs, useTotalCount } from "@thirdweb-dev/react";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
  addressCollection: any;
};

export default function NFTGrid({
  addressCollection,
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found for this collection.",
}: Props) {
  const startGrid = 0;
  const [newGrid, addGrid] = useState(10);
  const increaseGrid = () => {
    addGrid(newGrid + 10);
  };

  const { contract } = useContract(addressCollection);
  const { nftData = data, isLoadingNft = isLoading }: any = useNFTs(contract, {
    // Return the first "count" NFTs in the collection
    count: 20,
    start: 0,
  });

  const { data: totalCount }: any = useTotalCount(contract);

  const totalNFTsMinted = totalCount?.toString();

  return (
    <>
      <div className={styles.nftGridContainer}>
        {isLoadingNft ? (
          [...Array(5)].map((_, index) => (
            <div key={index} className={styles.nftContainer}>
              <Skeleton key={index} width={"100%"} height="312px" />
            </div>
          ))
        ) : nftData && nftData.length > 0 ? (
          nftData.slice(startGrid, newGrid).map((nft: any) =>
            !overrideOnclickBehavior ? (
              <Link
                href={`../token/${addressCollection}/${nft.metadata.id}`}
                key={nft.metadata.id}
                className={styles.nftContainer}
              >
                <NFT nft={nft} />
              </Link>
            ) : (
              <div
                key={nft.metadata.id}
                className={styles.nftContainer}
                onClick={() => overrideOnclickBehavior(nft)}
              >
                <NFT nft={nft} />
              </div>
            )
          )
        ) : (
          <p>{emptyText}</p>
        )}

        {totalNFTsMinted > newGrid && !isLoadingNft ? (
          <button type="button" onClick={increaseGrid}>
            LOAD MORE
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
