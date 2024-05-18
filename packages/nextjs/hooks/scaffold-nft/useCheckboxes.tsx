import { useState } from "react";

type test = {
  value: string;
  defaultValue: boolean;
};

export default function useCheckboxes(checks: test[]) {
  const initArr = [];
  for (let i = 0; i < checks.length; i++) {
    initArr.push(checks[i].defaultValue);
  }

  const [checkeds, setCheckeds] = useState<boolean[]>(initArr);

  const handleChange = (index: number) => {
    const temp: boolean[] = checkeds;

    temp[index] = !temp[index];

    setCheckeds([...temp]);
  };

  const inputComponents = checks.map((input, index) => {
    return (
      <div key={index + "-input"}>
        <label className="m-1">
          {input.value}
          <input
            className="m-1"
            type="checkbox"
            checked={checkeds[index]}
            onChange={() => {
              handleChange(index);
            }}
          />
        </label>
      </div>
    );
  });

  const componentsToRender: any = [];
  for (let i = 0; i < checkeds.length; i++) {
    if (checkeds[i]) componentsToRender.push(checks[i].value);
  }

  return { inputComponents, componentsToRender };
}
