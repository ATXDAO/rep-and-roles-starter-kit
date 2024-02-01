import { ValueCardConfigProps } from "~~/components/rep-tokens/types/Types";

export const maxMintAmountConfigProps = {
  isRendering: true,
  classes: {
    card: "w-64 rounded-lg bg-teal-300",
    value: "text-1xl text-center object-center mx-auto font-bold text-black",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;
