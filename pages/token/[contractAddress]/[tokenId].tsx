import React, { useState } from "react";
import styles from "../../../styles/Token.module.css";
import Container from "../../../components/Container/Container";
import randomColor from "../../../util/randomColor";
import {
  MediaRenderer,
  ThirdwebNftMedia,
  useContract,
  useContractEvents,
  useValidDirectListings,
  Web3Button,
  useNFT,
  useMetadata,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { MARKETPLACE_ADDRESS } from "../../../const/addresses";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../../util/toastConfig";
import Link from "next/link";
import Skeleton from "../../../components/Skeleton/Skeleton";
import { ETHERSCAN_URL } from "../../../const/network";
import TokenButton from "../../../components/TokenPage/TokenButton";

type Props = {
  data: any;
};

function TokenPage() {
  const [bidValue] = useState<string>();
  const router = useRouter();
  const addressCollection = router.query.contractAddress as string;
  const tokenId = router.query.tokenId as string;

  const { contract: nftCollection } = useContract(addressCollection);

  const { data: collectionMetadata }: Props = useMetadata(nftCollection);

  const [randomColor1, randomColor2] = [randomColor(), randomColor()];

  // Connect to marketplace smart contract
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: addressCollection,
      tokenId: tokenId,
    });

  // Load historical transfer events: TODO - more event types like sale
  const { data: transferEvents, isLoading: loadingTransferEvents } =
    useContractEvents(nftCollection, "Transfer", {
      queryFilter: {
        filters: {
          tokenId: tokenId,
        },
        order: "desc",
      },
    });

  const { data: nft, isLoading } = useNFT(nftCollection, tokenId);

  async function createBidOrOffer() {
    let txResult;
    if (!bidValue) {
      toast(`Please enter a bid value`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
      return;
    }

    if (directListing?.[0]) {
      txResult = await marketplace?.offers.makeOffer({
        assetContractAddress: addressCollection,
        tokenId: tokenId,
        totalPrice: bidValue,
      });
    } else {
      throw new Error("No valid listing found for this NFT");
    }

    return txResult;
  }

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

  if (isLoading)
    return (
      <Container maxWidth="lg">
        <div>Loading NFT…</div>
      </Container>
    );

  if (!nft)
    return (
      <Container maxWidth="lg">
        <div>NFT not found</div>
      </Container>
    );

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Container maxWidth="lg">
        <div className={styles.container}>
          <div className={styles.metadataContainer}>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className={styles.image}
            />

            <div className={styles.descriptionContainer}>
              <div className={styles.pricingContainer}>
                {/* Pricing information */}
                <div className={styles.pricingInfo}>
                  <p className={styles.label}>Price</p>
                  <div className={styles.pricingValue}>
                    {loadingContract || loadingDirect ? (
                      <div>loading price...</div>
                    ) : (
                      <>
                        {directListing && directListing[0] ? (
                          <>
                            {
                              directListing[0]?.currencyValuePerToken
                                .displayValue
                            }
                            {" " +
                              directListing[0]?.currencyValuePerToken.symbol}
                          </>
                        ) : (
                          "Not for sale"
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.tokenButtonContainer}>
                  <div className={styles.tokenButton}>
                    {loadingContract || loadingDirect ? (
                      <div></div>
                    ) : (
                      <>
                        <TokenButton></TokenButton>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.listingContainer}>
            {
              <div className={styles.contractMetadataContainer}>
                <MediaRenderer
                  src={collectionMetadata?.image}
                  className={styles.collectionImage}
                />
                <p className={styles.collectionName}>
                  {collectionMetadata?.name}
                </p>
              </div>
            }
            <h1 className={styles.title}>{nft.metadata.name}</h1>
            <p className={styles.collectionName}>Token ID #{nft.metadata.id}</p>

            <Link
              href={`/profile/${nft.owner}`}
              className={styles.nftOwnerContainer}
            >
              {/* Random linear gradient circle shape */}
              <div
                className={styles.nftOwnerImage}
                style={{
                  background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
                }}
              />
              <div className={styles.nftOwnerInfo}>
                <p className={styles.label}>Current Owner</p>
                <p className={styles.nftOwnerAddress}>
                  {nft.owner.slice(0, 8)}...{nft.owner.slice(-4)}
                </p>
              </div>
            </Link>

            {/* <h3 className={styles.descriptionTitle}>Description</h3>
              <p className={styles.description}>{nft.metadata.description}</p>

              <h3 className={styles.descriptionTitle}>Traits</h3>
              <div className={styles.traitsContainer}>
                {Object.entries(nft?.metadata?.attributes || {}).map(
                  ([key, value]) => (
                    <div className={styles.traitContainer} key={key}>
                      <p className={styles.traitName}>{key}</p>
                      <p className={styles.traitValue}>
                        {value?.toString() || ""}
                      </p>
                    </div>
                  )
                )}
              </div> */}

            <h3 className={styles.descriptionTitle}>History</h3>

            <div className={styles.traitsContainer}>
              {transferEvents?.map((event, index) => (
                <div
                  key={event.transaction.transactionHash}
                  className={styles.eventsContainer}
                >
                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>Event</p>
                    <p className={styles.traitValue}>
                      {
                        // if last event in array, then it's a mint
                        index === transferEvents.length - 1
                          ? "Mint"
                          : "Transfer"
                      }
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>From</p>
                    <p className={styles.traitValue}>
                      {event.data.from?.slice(0, 4)}...
                      {event.data.from?.slice(-2)}
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>To</p>
                    <p className={styles.traitValue}>
                      {event.data.to?.slice(0, 4)}...
                      {event.data.to?.slice(-2)}
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <Link
                      className={styles.txHashArrow}
                      href={`${ETHERSCAN_URL}/tx/${event.transaction.transactionHash}`}
                      target="_blank"
                    >
                      ↗
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default TokenPage;
