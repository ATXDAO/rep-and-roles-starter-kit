import { StylizedImageCard } from "../StylizedImageCard";
import { Token } from "~~/components/rep-tokens/hooks/Hooks";

type Props = {
  token: Token;
  alt?: string;
};

export const ImageCard = ({ token }: Props) => {
  return <StylizedImageCard src={token?.image} />;
};
