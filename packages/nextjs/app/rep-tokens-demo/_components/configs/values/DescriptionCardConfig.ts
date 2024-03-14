import { ValueCardConfigProps } from "~~/components/rep-tokens/types/Types";

export const descriptionConfigProps = {
  isRendering: true,
  classes: {
    card: "w-64 rounded-lg bg-violet-300",
    value: "text-1xl mx-auto text-center break-words text-black",
  },
  isPrettyLoading: {
    classes: "text-black text-center",
    message: "Loading Description...",
  },
} as ValueCardConfigProps;
