import { getMarketplaceContract } from "../../const/contractAddresses";
import { useCancelDirectListing } from "@thirdweb-dev/react";
import { FC } from "react";
import styles from "../../styles/Token.module.css";

interface CancelSellingCardProps {
  price: number;
  symbol: string;
  listingID: string;
}

const CancelSellingCard: FC<CancelSellingCardProps> = ({
  price,
  symbol,
  listingID,
}) => {
  const { marketplace } = getMarketplaceContract();

  const {
    mutate: cancelDirectListing,
    isLoading,
    error,
  } = useCancelDirectListing(marketplace);

  const handleDelist = () => {
    try {
      cancelDirectListing(listingID);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>{`Your NFT is listed for ${price} ${symbol}`}</h1>

      <button onClick={handleDelist} className={styles.btn}>
        Cancel Listing
      </button>
      <p></p>
      {(error as unknown as boolean) ? <div>Error Delisting! </div> : null}
      {isLoading && <div>Cancel listing in progress...</div>}
    </div>
  );
};
export default CancelSellingCard;
