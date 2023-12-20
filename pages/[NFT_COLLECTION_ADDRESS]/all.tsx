import { useContract, useNFTs, useMetadata } from "@thirdweb-dev/react";
import React from "react";
import Container from "../../components/Container/Container";
import NFTGrid from "../../components/NFT/Grid";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../components/Navbar/Navbar.module.css";

type Props = {
  data: any;
};

export default function All() {
  const router = useRouter();

  const addressCollection = router.query.NFT_COLLECTION_ADDRESS as string;

  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(addressCollection);
  const { data, isLoading } = useNFTs(contract);

  const { data: collectionMetadata }: Props = useMetadata(contract);

  return (
    <Container maxWidth="lg">
      <h1>{collectionMetadata?.name}</h1>

      <div className={styles.navCollectionContainer}>
        <Link
          href={`../${addressCollection}/listed`}
          className={styles.linkCollection}
        >
          Listed
        </Link>
        <Link
          href={`../${addressCollection}/all`}
          className={styles.linkCollectionActive}
        >
          All NFTs
        </Link>
      </div>

      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={"Looks like there are no NFTs in this collection."}
        addressCollection={router.query.NFT_COLLECTION_ADDRESS as string}
      />
    </Container>
  );
}
