"use client";

import Select from "react-select";

type Props = {
  index: number;
  onTypeChanged: any;
  onUriChanged: any;
};

const options = [
  { value: 0, label: "Transferable" },
  { value: 1, label: "Lifetime" },
  { value: 2, label: "Redeemable" },
];
export function UpdateTokenCard({ index, onTypeChanged, onUriChanged }: Props) {
  const defaultOption = options[0];

  // const [selectedDropdownOption, setSelectedDropdownOption] = useState(defaultOption);

  return (
    <div className="rounded-lg bg-base-100 items-center justify-center flex flex-col p-1 m-1">
      <p>Token {index}</p>
      <p>Type</p>
      <Select
        options={options}
        className="text-black bg-base-100"
        onChange={(option: any) => {
          // option ? setSelectedDropdownOption(option) : "";

          onTypeChanged(index, option);
        }}
        defaultValue={defaultOption}
        instanceId={`select-${index}`}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#efeaff",
            primary50: "#c1aeff",
            primary: "#551d98",
          },
        })}
        styles={{
          menuList: provided => ({ ...provided, maxHeight: 280, overflow: "auto" }),
        }}
      />
      <p>URI</p>
      <input
        type="text"
        id="first_name"
        onChange={val => {
          onUriChanged(index, val);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John"
        required
      />
    </div>
  );
}
