// import { useERC1155Information } from "./tokens/TokenInteractions";
// import { ImageProperties } from "./tokens/token-card/ImageCard";
// import { DefaultTokenGroupCard } from "./tokens/token-group-card/DefaultTokenGroupCard";
// import {
//   mainCardPropertiesClasses,
//   mainCardRenderProps,
//   mainCardWithNumberOverlayPropertiesClasses,
//   navBarPropertiesClasses,
//   navBarRenderProps,
//   prettifyLoadingProps,
// } from "./tokens/token-group-card/TokenGroupCardConfig";
// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
// import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const ContractData = () => {
  const { address } = useAccount();

  // const { data: repTokensInstance } = useScaffoldContract({ contractName: "ReputationTokensStandalone" });
  // const tokenIds = [0, 1, 2];

  // const [result, setResult] = useState<bigint[]>([]);

  // useEffect(() => {
  //   async function getBalances() {
  //     if (!address) return;
  //     if (!repTokensInstance)
  //       return;

  //     const arr = [];
  //     for (let i = 0; i < tokenIds.length; i++) {
  //       const balanceOf = await repTokensInstance.read.balanceOf([address, BigInt(tokenIds[i])]);
  //       if (balanceOf != undefined)
  //           arr.push(balanceOf);
  //     }

  //     setResult([...arr]);
  //   }

  //   if (repTokensInstance) getBalances();
  // }, [address, repTokensInstance]);

  // console.log(result);

  // const {data: numOfTokens} = useScaffoldContractRead({contractName: "ReputationTokensStandalone", functionName: "getNumOfTokenTypes"});

  // const addressArr = [];
  // const tokenIdsArr: bigint[] = [];

  // for (let i  = 0; i < numOfTokens!; i++) {
  //   addressArr.push(address!);
  //   tokenIdsArr.push(BigInt(i));
  // }

  // const {data: balanceOfBatch} = useScaffoldContractRead({contractName: "ReputationTokensStandalone", functionName: "balanceOfBatch", args: [addressArr, tokenIdsArr]});
  // console.log(balanceOfBatch);

  // useEffect(()=> {
  //   async function getUris() {
  //     if (!address) return;
  //     if (!repTokensInstance)
  //       return;

  //     const arr = [];
  //     for (let i = 0; i < tokenIds.length; i++) {
  //       const balanceOf = await repTokensInstance.read.uri([tokenIdsArr[i]]);
  //       if (balanceOf != undefined)
  //           arr.push(balanceOf);
  //     }

  //     console.log(arr);
  //   }

  //   getUris();
  // }, [address, repTokensInstance]);

  // const { token0, token1 } = useERC1155Information(address);

  const { data: repTokensInstance } = useScaffoldContract({ contractName: "ReputationTokensStandalone" });

  const { data: numOfTokens } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "getNumOfTokenTypes",
  });

  const addressArr = [];
  const tokenIdsArr: bigint[] = [];

  for (let i = 0; i < numOfTokens!; i++) {
    addressArr.push(address!);
    tokenIdsArr.push(BigInt(i));
  }

  const { data: balanceOfBatch } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "balanceOfBatch",
    args: [addressArr, tokenIdsArr],
  });
  console.log(balanceOfBatch);

  const [uris, setUris] = useState<string[]>([]);

  useEffect(() => {
    async function getUris() {
      if (!address) return;
      if (!repTokensInstance) return;

      const arr = [];
      for (let i = 0; i < tokenIdsArr.length; i++) {
        const result = await repTokensInstance.read.uri([tokenIdsArr[i]]);
        if (result != undefined) arr.push(result);
      }

      console.log(arr);
      setUris([...arr]);
    }

    getUris();
  }, [address, repTokensInstance]);

  console.log(uris);

  // token0.image = token0.image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  // token1.image = token1.image?.replace("ipfs://", "https://ipfs.io/ipfs/");

  // const tokenGroup = {
  //   token0: token0,
  //   token1: token1,
  // };

  // const navBarCardImageProperties0 = new ImageProperties("Token 0", 64, 64);
  // const navBarCardImageProperties1 = new ImageProperties("Token 1", 64, 64);

  // const mainCardImageProperties0 = new ImageProperties("Token 0", 256, 256);
  // const mainCardImageProperties1 = new ImageProperties("Token 1", 256, 256);

  return (
    <>
      {/* <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <DefaultTokenGroupCard
            tokenGroup={tokenGroup}
            imageProperties0={navBarCardImageProperties0}
            imageProperties1={navBarCardImageProperties1}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={navBarPropertiesClasses}
            renderProps={navBarRenderProps}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <DefaultTokenGroupCard
            tokenGroup={tokenGroup}
            imageProperties0={mainCardImageProperties0}
            imageProperties1={mainCardImageProperties1}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={mainCardPropertiesClasses}
            renderProps={mainCardRenderProps}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div>
          <DefaultTokenGroupCard
            tokenGroup={tokenGroup}
            imageProperties0={mainCardImageProperties0}
            imageProperties1={mainCardImageProperties1}
            prettifyLoadingProps={prettifyLoadingProps}
            propertiesClasses={mainCardWithNumberOverlayPropertiesClasses}
            renderProps={mainCardRenderProps}
          />
        </div>
      </div> */}
    </>
  );
};
