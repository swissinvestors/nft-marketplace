import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import Link from "next/link";
import Skeleton from "../../components/Skeleton/Skeleton";
import NFTComponent from "../../components/NFT/NFT";
import styles from "../../styles/Buy.module.css";
import { useRouter } from "next/router";
import { useContract, useNFTs, useTotalCount } from "@thirdweb-dev/react";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
  addressCollection: any;
  collectionTitle: any;
};

export default function NFTGridProfile({
  addressCollection,
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found for this collection.",
  collectionTitle = "",
}: Props) {
  const { contract } = useContract(addressCollection);
  const { nftData = data, isLoadingNft = isLoading }: any = useNFTs(contract, {
    // Return the first "count" NFTs in the collection
    count: 20,
    start: 0,
  });

  return (
    <>
      {isLoadingNft ? (
        <div className={styles.nftGridContainer}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={styles.nftContainer}>
              <Skeleton key={index} width={"100%"} height="312px" />
            </div>
          ))}
        </div>
      ) : nftData && nftData.length > 0 ? (
        <>
          <div> {collectionTitle}</div>
          <div className={styles.nftGridContainer}>
            {nftData.map((nft: any) =>
              !overrideOnclickBehavior ? (
                <Link
                  href={`../token/${addressCollection}/${nft.metadata.id}`}
                  key={nft.metadata.id}
                  className={styles.nftContainer}
                >
                  <NFTComponent nft={nft} />
                </Link>
              ) : (
                <div
                  key={nft.metadata.id}
                  className={styles.nftContainer}
                  onClick={() => overrideOnclickBehavior(nft)}
                >
                  <NFTComponent nft={nft} />
                </div>
              )
            )}
          </div>
        </>
      ) : (
        <p>{emptyText}</p>
      )}
    </>
  );
}
