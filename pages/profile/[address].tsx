import type { NextPage } from "next";
import Link from "next/link";
import { useContract, useOwnedNFTs, useMetadata } from "@thirdweb-dev/react";
import NFTGridProfile from "./GridProfile";
import { useRouter } from "next/router";
import Container from "../../components/Container/Container";
import { NFT_COLLECTION_ADDRESS_1 } from "../../const/contractAddresses";
import { NFT_COLLECTION_ADDRESS_2 } from "../../const/contractAddresses";
import Skeleton from "../../components/Skeleton/Skeleton";
import randomColor from "../../util/randomColor";
import styles from "../../styles/Profile.module.css";

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
  randomColor(),
  randomColor(),
  randomColor(),
  randomColor(),
];

type Props = {
  data: any;
};
export default function ProfilePage() {
  const router = useRouter();

  const { contract: nftCollection1 } = useContract(NFT_COLLECTION_ADDRESS_1);
  const { data: ownedNfts1, isLoading: loadingOwnedNfts1 } = useOwnedNFTs(
    nftCollection1,
    router.query.address as string
  );
  const { data: collectionMetadata1 }: Props = useMetadata(nftCollection1);

  const { contract: nftCollection2 } = useContract(NFT_COLLECTION_ADDRESS_2);
  const { data: ownedNfts2, isLoading: loadingOwnedNfts2 } = useOwnedNFTs(
    nftCollection2,
    router.query.address as string
  );
  const { data: collectionMetadata2 }: Props = useMetadata(nftCollection2);

  return (
    <Container maxWidth="lg">
      <div className={styles.profileHeader}>
        <div
          className={styles.coverImage}
          style={{
            background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
          }}
        />
        <div
          className={styles.profilePicture}
          style={{
            background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
          }}
        />
        <h1 className={styles.profileName}>
          {router.query.address ? (
            router.query.address.toString().substring(0, 4) +
            "..." +
            router.query.address.toString().substring(38, 42)
          ) : (
            <Skeleton width="320" />
          )}
        </h1>
      </div>

      <div className={styles.heroCtaContainer}>
        <NFTGridProfile
          data={ownedNfts1}
          isLoading={loadingOwnedNfts1}
          emptyText=""
          addressCollection={NFT_COLLECTION_ADDRESS_1}
          collectionTitle={
            <h2 className={styles.profileTitle}>{collectionMetadata1?.name}</h2>
          }
        />
      </div>
      <div className={styles.heroCtaContainer}>
        <NFTGridProfile
          data={ownedNfts2}
          isLoading={loadingOwnedNfts2}
          emptyText=""
          addressCollection={NFT_COLLECTION_ADDRESS_2}
          collectionTitle={
            <h2 className={styles.profileTitle}>{collectionMetadata2?.name}</h2>
          }
        />
      </div>
    </Container>
  );
}
