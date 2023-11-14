import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";

// import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Example UI | Reputation & Roles"
        description="Example UI created with Reputation & Roles, showcasing some of its features."
      />
      <div className="grid lg:grid-cols-1 flex-grow" data-theme="exampleUi">
        {/* <ContractInteraction /> */}
        <ContractData />
      </div>
    </>
  );
};

export default ExampleUI;
