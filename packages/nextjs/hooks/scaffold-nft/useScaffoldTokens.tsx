// "use client";

// import { useFetches } from "./UseFetches";
// import { useTokenURIs } from "./useTokenURIs";
// import { replacementType } from "./useTokens";
// import { useScaffoldContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

// const replacement = {
//   ipfs: "https://ipfs.io/ipfs/",
//   nftstorage: "https://nftstorage.link/ipfs/",
//   w3s: "https://w3s.link/ipfs/",
// };

// export const useScaffoldTokens = (tokenIds: bigint[], replacementType = "ipfs") => {
//   const { data: scaffoldErc721 } = useScaffoldContract({ contractName: "ScaffoldERC721" });

//   const {
//     data: collectionName,
//     isLoading: isLoadingName,
//     isError: isErrorName,
//   } = useScaffoldReadContract({
//     contractName: "ScaffoldERC721",
//     functionName: "name",
//   });

//   const {
//     data: collectionSymbol,
//     isLoading: isLoadingSymbol,
//     isError: isErrorSymbol,
//   } = useScaffoldReadContract({
//     contractName: "ScaffoldERC721",
//     functionName: "symbol",
//   });

//   const { uris, isLoading: isLoadingUris, isError: isErrorUris } = useTokenURIs(scaffoldErc721, tokenIds);

//   for (let i = 0; i < uris.length; i++) {
//     uris[i] = uris[i].replace("ipfs://", replacement[replacementType as replacementType]);
//   }

//   const { responses, isLoading: isLoadingFetches, isError: isErrorFetches } = useFetches(uris);

//   const tokens: any[] = [];
//   for (let i = 0; i < responses.length; i++) {
//     responses[i] ? (
//       (responses[i].image = responses[i].image.replace("ipfs://", replacement[replacementType as replacementType]))
//     ) : (
//       <></>
//     );

//     const token = {} as any;
//     token.address = scaffoldErc721?.address;
//     token.metadata = responses[i];
//     token.id = tokenIds[i];
//     token.uri = uris[i];
//     token.collectionName = collectionName;
//     token.collectionSymbol = collectionSymbol;
//     tokens.push(token);
//   }

//   const collection = {} as any;
//   collection.tokens = tokens;
//   collection.address = scaffoldErc721?.address;
//   collection.symbol = collectionSymbol;
//   collection.name = collectionName;

//   return {
//     tokens,
//     collection,
//     isLoading: isLoadingName || isLoadingSymbol || isLoadingUris || isLoadingFetches,
//     isError: isErrorName || isErrorSymbol || isErrorUris || isErrorFetches,
//   };
// };
