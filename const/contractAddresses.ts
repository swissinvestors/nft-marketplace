import { useContract } from "@thirdweb-dev/react";

/** Replace the values below with the addresses of your smart contracts. */

//  The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS_1 =
  "0x9ba5b40C9b5735255C002Dd9717ad984afaE722B";
export const NFT_COLLECTION_ADDRESS_2 =
  "0xCc656A28d656bBb8B45eC450d43bEd4226fc167f";
export const NFT_COLLECTION_ADDRESS_3 = "";

// SUPER MARIO TEST 0x9ba5b40C9b5735255C002Dd9717ad984afaE722B
// SCOVILLE 0xCc656A28d656bBb8B45eC450d43bEd4226fc167f
// GENESIS 0xCC9e5A8d8005D4915b6d51E547a5B73F07fEFf03

//  The address of the marketplace V3 smart contract.
export const MARKETPLACE_ADDRESS_1 =
  "0xB02cCDd94238326ffc4cAd5E1ca531d8B08c2feC";

export const getMarketplaceAddress = () => {
  return MARKETPLACE_ADDRESS_1 ?? "";
};

export const getMarketplaceContract = () => {
  let market_address = getMarketplaceAddress();

  const { contract: marketplace, isLoading: marketplaceLoading } = useContract(
    market_address,
    "marketplace-v3"
  );

  return { marketplace, marketplaceLoading };
};
