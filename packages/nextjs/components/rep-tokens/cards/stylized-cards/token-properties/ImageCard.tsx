import { StylizedImageCard } from "../StylizedImageCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token?: Token;
  src?: string;
  alt?: string;
};

export const ImageCard = ({ token, src = "" }: Props) => {
  return <StylizedImageCard src={token ? token?.image : src} />;
};
