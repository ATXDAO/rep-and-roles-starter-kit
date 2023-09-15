import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const ContractData = () => {
  const { address } = useAccount();

  const { data: uri0 } = useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "uri",
    args: [BigInt(0)],
  });

  const { data: uri1 } = useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "uri",
    args: [BigInt(1)],
  });

  const { data: balanceOf0 } = useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "balanceOf",
    args: [address, BigInt(0)],
  });

  const { data: balanceOf1 } = useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "balanceOf",
    args: [address, BigInt(1)],
  });

  const [json0Name, setJson0Name] = useState("");
  const [json0Description, setJson0Description] = useState("");
  const [json0Image, setJson0Image] = useState("");

  const [json1Name, setJson1Name] = useState("");
  const [json1Description, setJson1Description] = useState("");
  const [json1Image, setJson1Image] = useState("");

  if (uri0 !== undefined && uri1 !== undefined) {
    const finalURL0 = uri0.replace("ipfs://", "https://ipfs.io/ipfs/");
    const finalURL1 = uri1.replace("ipfs://", "https://ipfs.io/ipfs/");

    console.log(finalURL0);
    console.log(finalURL1);

    const getJsonData = async () => {
      const finalJson0 = await axios.get(finalURL0);
      setJson0Name(finalJson0.data.name);
      setJson0Description(finalJson0.data.description);
      setJson0Image(finalJson0.data.image.replace("ipfs://", "https://ipfs.io/ipfs/"));

      const finalJson1 = await axios.get(finalURL1);
      setJson1Name(finalJson1.data.name);
      setJson1Description(finalJson1.data.description);
      setJson1Image(finalJson1.data.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
    };

    getJsonData();
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div>
        <div className="float-left px-2">
          <div className="grid w-64 h-26 rounded text-secondary-content place-content-center">
            <div className="text-4xl text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {Number(balanceOf0)}
            </div>
          </div>

          <div className="grid w-64 h-64 rounded bg-primary text-primary-content place-content-center">
            <div className="avatar">
              <div className="w-64 rounded">
                <Image src={json0Image} alt="Token 0 Image" width="512" height="512" />
              </div>
            </div>
          </div>
          <div className="grid w-64 h-8 rounded text-accent-content place-content-center">
            <div className="text-2xl text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {json0Name}
            </div>
          </div>
          <div className="grid w-64 h-26 rounded text-secondary-content place-content-center">
            <div className="text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {json0Description}
            </div>
          </div>
        </div>

        <div className="float-left px-2">
          <div className="grid w-64 h-26 rounded text-secondary-content place-content-center">
            <div className="text-4xl text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {Number(balanceOf1)}
            </div>
          </div>

          <div className="grid w-64 h-64 rounded bg-primary text-primary-content place-content-center">
            <div className="avatar">
              <div className="w-64 rounded">
                <Image src={json1Image} alt="Token 1 Image" width="512" height="512" />
                <img src={json1Image} />
              </div>
            </div>
          </div>

          <div className="grid w-64 h-8 rounded text-accent-content place-content-center">
            <div className="text-2xl text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {json1Name}
            </div>
          </div>
          <div className="grid w-64 h-26 rounded text-secondary-content place-content-center">
            <div className="text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {json1Description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
