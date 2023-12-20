import {
  useCreateDirectListing,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS } from "../../const/addresses";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useRouter } from "next/router";
import { type FC } from "react";
import styles from "../../styles/Token.module.css";

interface SellNFTCard {
  price: number;
  onUpdatePrice: (newPrice: number) => void;
  id: string;
}

// Your smart contract address
const contractAddress = MARKETPLACE_ADDRESS;

export const SellNFT: FC<SellNFTCard> = ({ price, onUpdatePrice, id }) => {
  const { contract } = useContract(contractAddress, "marketplace-v3");
  const {
    mutateAsync: createDirectListing,
    isLoading: listingLoading,
    error: listError,
  } = useCreateDirectListing(contract);

  const router = useRouter();
  const addressCollection = router.query.contractAddress as string;
  const tokenId = router.query.tokenId as string;

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdatePrice(Number(event.target.value));
  };
  return (
    <>
      <div>
        <h1>List your NFT</h1>
        <input
          type="number"
          value={price}
          onChange={handlePriceChange}
          className={styles.inputList}
        />
        <Web3Button
          contractAddress={contractAddress}
          className={styles.btn}
          action={() =>
            createDirectListing({
              assetContractAddress: addressCollection,
              tokenId: tokenId,
              isReservedListing: false,
              quantity: 1,
              currencyContractAddress: NATIVE_TOKEN_ADDRESS,
              startTimestamp: new Date(Date.now()),
              pricePerToken: price,
            })
          }
        >
          List NFT
        </Web3Button>
      </div>

      <p></p>
      {(listError as unknown as boolean) ? (
        <div className="text-center mt-4">Error Listing!</div>
      ) : null}
      {listingLoading && (
        <div className="text-center mt-4">Listing in progress...</div>
      )}
    </>
  );
};
