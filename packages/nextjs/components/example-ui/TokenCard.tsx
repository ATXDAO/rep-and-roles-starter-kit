import Image from "next/image";

type TTokenProps = {
  imageUri?: string;
  balance?: number;
  name?: string;
  description?: string;
};

export const TokenCard = ({ imageUri, balance, name, description }: TTokenProps) => {
  return (
    <div className="float-left px-2">
      <div className="grid w-64 h-26 rounded text-secondary-content place-content-center">
        <div className="text-4xl text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {Number(balance)}
        </div>
      </div>

      <div className="grid w-64 h-64 rounded bg-primary text-primary-content place-content-center">
        <div className="avatar">
          <div className="w-64 rounded">
            <Image src={imageUri!} alt="Token 0 Image" width="512" height="512" />
          </div>
        </div>
      </div>
      <div className="grid w-64 h-8 rounded text-accent-content place-content-center">
        <div className="text-2xl text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">{name}</div>
      </div>
      <div className="grid w-64 h-26 rounded text-secondary-content place-content-center">
        <div className="text-center min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">{description}</div>
      </div>
    </div>
  );
};
