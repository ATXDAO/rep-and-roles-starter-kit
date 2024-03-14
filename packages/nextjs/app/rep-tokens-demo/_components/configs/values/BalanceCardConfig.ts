import { ValueCardConfigProps } from "~~/components/rep-tokens/types/Types";

export const balanceConfigProps = {
  isRendering: true,
  classes: {
    card: "w-64 rounded-lg bg-slate-300",
    value: "text-4xl mx-auto text-center text-black",
  },
  isPrettyLoading: {
    classes: "text-black text-center",
    message: "Loading Balance...",
  },
} as ValueCardConfigProps;
