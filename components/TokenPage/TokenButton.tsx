import React from "react";
import {
  Web3Button,
  useValidDirectListings,
  useNFT,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../../const/addresses";
import toast from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import styles from "../../styles/Token.module.css";
import { useRouter } from "next/router";
import { SellNFT } from "./SellNFT";
import CancelSellingCard from "./CancelSelling";
import { useEffect, useState } from "react";

const TokenButton = () => {
  const router = useRouter();
  const addressCollection = router.query.contractAddress as string;
  const tokenId = router.query.tokenId as string;

  const { contract: collectionContract } = useContract(addressCollection);

  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: addressCollection,
      tokenId: tokenId,
    });

  const [nftID, setNftID] = useState("");
  const [price, setPrice] = useState(1);
  const [listingID, setListingID] = useState("");
  const [symbol, setSymbol] = useState("");

  const { data: nft, isLoading: isNFTLoading } = useNFT(
    collectionContract,
    nftID
  );

  const address = useAddress();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = tokenId;
      setNftID(id as string);
    }
    let listedNFT = directListing?.find((item) => item.tokenId === nftID);
    if (listedNFT) {
      setListingID(listedNFT.id);
      setPrice(Number(listedNFT.currencyValuePerToken.displayValue));
      setSymbol(listedNFT.currencyValuePerToken.symbol);
    }
  }, [directListing, price, listingID, tokenId]);

  async function buyListing() {
    let txResult;

    if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No valid listing found for this NFT");
    }
    return txResult;
  }

  if (!nft) return <div></div>;

  return (
    <>
      {directListing?.[0] && address !== nft.owner && (
        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          action={async () => await buyListing()}
          className={styles.btn}
          onSuccess={() => {
            toast(`Purchase success!`, {
              icon: "✅",
              style: toastStyle,
              position: "bottom-center",
            });
          }}
          onError={(e) => {
            toast(`Purchase failed! Reason: ${e.message}`, {
              icon: "❌",
              style: toastStyle,
              position: "bottom-center",
            });
          }}
        >
          Buy NFT
        </Web3Button>
      )}
      {isNFTLoading || !nft || address !== nft.owner ? (
        <div></div>
      ) : (
        <>
          {listingID ? (
            <CancelSellingCard
              price={price}
              symbol={symbol}
              listingID={listingID}
            />
          ) : (
            <SellNFT price={price} onUpdatePrice={setPrice} id={nftID} />
          )}
        </>
      )}
    </>
  );
};

export default TokenButton;
