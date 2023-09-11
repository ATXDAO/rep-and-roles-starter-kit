var repTokensInstance = "5FbDB2315678afecb367f032d93F642f64180aa3";
import { useWalletClient, useContractRead } from 'wagmi';
import {abi} from  "../../smart-contracts/out/RepTokensInstance.sol/RepTokensInstance.json";

function Test({  }) {

    const contractRead = useContractRead({
      address: repTokensInstance as '0x${string}',
      abi: abi,
      functionName: "symbol"
    });
  
    console.log(contractRead);
  
    return (
        <>
        </>
    );
  }
  
  export default Test;