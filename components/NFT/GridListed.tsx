import { MARKETPLACE_ADDRESS } from "../../const/addresses";
import { useContract, useValidDirectListings } from "@thirdweb-dev/react";
import NFTListed from "./NFTListed";
import Skeleton from "../Skeleton/Skeleton";
import styles from "../../styles/Buy.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function ListGrid() {
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const router = useRouter();

  const addressCollection = router.query.NFT_COLLECTION_ADDRESS as string;

  const { data: directListings, isLoading } = useValidDirectListings(
    marketplace,
    {
      start: 0,
      count: 500, // total count of  NFTs shown
      tokenContract: addressCollection, // Only show NFTs from this collection
    }
  );

  const [sortPriceState, setPriceState] = useState("none");

  const sortPrice: any = {
    none: { method: () => null },

    ascending: {
      method: (a: any, b: any) =>
        a.currencyValuePerToken.displayValue -
        b.currencyValuePerToken.displayValue,
    },

    descending: {
      method: (a: any, b: any) =>
        b.currencyValuePerToken.displayValue -
        a.currencyValuePerToken.displayValue,
    },
  };

  return (
    <>
      <div className={styles.sortContainer}>
        <p className={styles.sortTitle}>SORT BY </p>
        <select
          className={styles.sortSelect}
          defaultValue={"ascending"}
          onChange={(e) => setPriceState(e.target.value)}
        >
          <option value="ascending">Lowest Price</option>
          <option value="descending">Highest Price</option>
        </select>
      </div>

      <div className={styles.nftGridContainer}>
        {isLoading
          ? [...Array(5)].map((_, index) => (
              <div key={index} className={styles.nftContainer}>
                <Skeleton key={index} width={"100%"} height="312px" />
              </div>
            ))
          : directListings &&
            directListings
              .sort(sortPrice[sortPriceState].method)
              .map((listedNFT, id) => {
                return <NFTListed {...listedNFT} key={id} />;
              })}
      </div>
    </>
  );
}
export default ListGrid;
