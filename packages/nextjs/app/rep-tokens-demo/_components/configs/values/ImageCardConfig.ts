import { ImageProps } from "~~/components/rep-tokens/cards/value-cards/ImageCard";
import { ImageValueCardConfigProp } from "~~/components/rep-tokens/types/Types";

export const imageConfigProps = {
  isRendering: true,
  classes: {
    card: "text-black w-64 rounded-lg bg-cyan-300  p-1",
    value: "rounded-lg mx-auto",
  },
  imageProperties: new ImageProps("Token", 256, 256),
  isPrettyLoading: true,
} as ImageValueCardConfigProp;
