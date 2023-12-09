import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/gala/ContractData";

// import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const Gala: NextPage = () => {
  return (
    <>
      <MetaHeader title="Hats Demo Day | Reputation & Roles" description="Hats Demo Day" />
      <div className="grid lg:grid-cols-1 flex-grow" data-theme="exampleUi">
        {/* <ContractInteraction /> */}
        <ContractData />
      </div>
    </>
  );
};

export default Gala;
