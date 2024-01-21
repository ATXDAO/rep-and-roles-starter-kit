import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Index } from "~~/components/rep-tokens-demo/Index";

const RepTokensDemo: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Rep Demo | Reputation & Roles"
        description="Example UI created with Reputation & Roles, showcasing some of its features."
      />
      <div className="grid lg:grid-cols-1 flex-grow" data-theme="exampleUi">
        <Index />
      </div>
    </>
  );
};

export default RepTokensDemo;
