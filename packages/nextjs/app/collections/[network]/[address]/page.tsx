"use client";

import React from "react";
//, { useEffect }
import { useState } from "react";
import { useAccount } from "wagmi";
// import "react-dropdown/style.css";
import { Collection } from "~~/components/scaffold-nft/collection/Collection";
// import useAdvancedFiltering from "~~/hooks/scaffold-nft/useAdvancedFiltering";
// import useCheckboxes from "~~/hooks/scaffold-nft/useCheckboxes";
// import useTokenIds from "~~/hooks/scaffold-nft/useTokenIds";
import { useTokens } from "~~/hooks/scaffold-nft/useTokens";

// import { renderInputOptions } from "~~/scaffold-nft-config";

export default function CollectionPage({ params }: { params: { network: string; address: string } }) {
  // const { inputComponents, componentsToRender } = useCheckboxes(renderInputOptions);

  const userAccount = useAccount();

  // const { tokenIds, setTokenIds } = useTokenIds(2);
  // async function onSubmit(newIds: bigint[]) {
  //   setTokenIds([...newIds]);
  // }

  // const tokenIds = [BigInt(0), BigInt(1)];

  const [tokenIds] = useState<bigint[]>([BigInt(0), BigInt(1)]);

  // const {
  //   chosenOption,
  //   // chosenOption2,
  //   output: advancedOutput,
  // } = useAdvancedFiltering(inputComponents, onSubmit);

  const { collection, isLoading, isError } = useTokens(
    params["network"],
    params["address"],
    userAccount.address,
    tokenIds,
    "nftstorage",
    //chosenOption2,
  );

  console.log(collection);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* {advancedOutput} */}
      <Collection
        collection={collection}
        isLoading={isLoading}
        isError={isError}
        renderOrder={["Balance", "Image", "Token Id", "Name", "Description", "Type", "Attributes"]}
      />
    </div>
  );
}
