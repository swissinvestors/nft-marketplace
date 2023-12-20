import { useContract, useNFTs, useMetadata } from "@thirdweb-dev/react";
import React from "react";
import Container from "../../components/Container/Container";
import ListGrid from "../../components/NFT/GridListed";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../components/Navbar/Navbar.module.css";

type Props = {
  data: any;
};

export default function Listed() {
  // Load all of the NFTs from the NFT Collection
  const router = useRouter();

  const addressCollection = router.query.NFT_COLLECTION_ADDRESS as string;

  const { contract } = useContract(addressCollection);
  // const { data, isLoading } = useNFTs(contract);

  const { data: collectionMetadata }: Props = useMetadata(contract);

  return (
    <Container maxWidth="lg">
      <h1>{collectionMetadata?.name}</h1>
      <div className={styles.navCollectionContainer}>
        <Link
          href={`../${addressCollection}/listed`}
          className={styles.linkCollectionActive}
        >
          Listed
        </Link>
        <Link
          href={`../${addressCollection}/all`}
          className={styles.linkCollection}
        >
          All NFTs
        </Link>
      </div>{" "}
      <ListGrid
      // data={data}
      // isLoading={isLoading}
      // emptyText={
      //   "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
      // }
      />
    </Container>
  );
}
