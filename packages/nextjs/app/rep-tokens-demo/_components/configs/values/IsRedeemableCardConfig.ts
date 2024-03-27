import { ValueCardConfigProps } from "~~/components/rep-tokens/types/Types";

export const isRedeemableConfigProps = {
  isRendering: true,
  classes: {
    card: "w-64 rounded-lg bg-indigo-300 ",
    value: "text-1xl text-center object-center mx-auto font-bold break-all text-black",
  },
  isPrettyLoading: {
    classes: "text-black text-center",
    message: "Loading Is Tradeable...",
  },
} as ValueCardConfigProps;
