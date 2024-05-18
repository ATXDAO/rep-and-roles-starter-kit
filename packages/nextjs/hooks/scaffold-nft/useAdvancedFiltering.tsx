// import { useState } from "react";
// // import Select from "react-dropdown-select";
// import Select from "react-select";

// const metadataLinkLoadOptions = [
//   { value: "ipfs", label: "IPFS" },
//   { value: "nftstorage", label: "NFT Storage" },
//   { value: "w3s", label: "web3.storage" },
// ];

// // const metadataLoadMethods = [
// //   { value: "url", label: "url" },
// //   { value: "base64", label: "base64" },
// // ];

// export default function useAdvancedFiltering(inputComponents: any, onSubmitCallback?: any) {
//   // const defaultMetadataLoadMethod = metadataLoadMethods[1];

//   // const [metadataLoadMethodSelectedDropdownOption, setMetadataLoadMethodSelectedDropdownOption] = useState(
//   //   defaultMetadataLoadMethod.value,
//   // );

//   // const [metadataLoadMethodChosenOption, setMetadataLoadMethodChosenOption] = useState(defaultMetadataLoadMethod.value);

//   const defaultMetadataLinkLoadOption = metadataLinkLoadOptions[1];

//   const [metadataLinkSelectedDropdownOption, setMetadataLinkLoadSelectedDropdownOption] =
//     useState(defaultMetadataLinkLoadOption);

//   const [metadataLinkLoadChosenOption, setMetadataLinkLoadChosenOption] = useState(defaultMetadataLinkLoadOption.value);

//   async function onSubmit(event: any) {
//     event.preventDefault();

//     // setMetadataLoadMethodChosenOption(metadataLoadMethodSelectedDropdownOption);
//     setMetadataLinkLoadChosenOption(metadataLinkSelectedDropdownOption.value);

//     const tempArr = [];

//     for (let i = event.target[1].value; i < Number(event.target[1].value) + Number(event.target[0].value); i++) {
//       tempArr.push(BigInt(i));
//     }

//     if (onSubmitCallback) onSubmitCallback(tempArr);
//   }

//   const [isShowingAdvancedSettings, setIsShowingAdvancedSettings] = useState(false);

//   let advancedOutput;
//   if (isShowingAdvancedSettings) {
//     advancedOutput = (
//       <>
//         <div className="flex flex-wrap">{inputComponents}</div>
//         <form
//           onSubmit={(event: any) => {
//             onSubmit(event);
//           }}
//         >
//           <div className="bg-base-100 rounded p-1 flex flex-col items-center justify-center ">
//             <p className="text-center m-0">Number To Render</p>

//             <div className={`flex border-2 border-base-300 bg-base-200 rounded-full text-accent`}>
//               <input
//                 className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
//                 placeholder={"1"}
//                 defaultValue={10}
//               />
//               <br />
//             </div>

//             <p className="text-center m-0">Start Index</p>

//             <div className={`flex border-2 border-base-300 bg-base-200 rounded-full text-accent`}>
//               <input
//                 className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
//                 placeholder={"1"}
//                 defaultValue={1}
//               />
//             </div>
//             <p className="text-center m-0">Metadata Link Load Method</p>
//             <div className="w-64">
//               <Select
//                 options={metadataLinkLoadOptions}
//                 className="text-black bg-base-100"
//                 onChange={(option: any) => {
//                   option ? setMetadataLinkLoadSelectedDropdownOption(option) : "";
//                 }}
//                 defaultValue={defaultMetadataLinkLoadOption}
//                 theme={theme => ({
//                   ...theme,
//                   colors: {
//                     ...theme.colors,
//                     primary25: "#efeaff",
//                     primary50: "#c1aeff",
//                     primary: "#551d98",
//                   },
//                 })}
//                 styles={{
//                   menuList: provided => ({ ...provided, maxHeight: 280, overflow: "auto" }),
//                 }}
//               />
//             </div>
//             {/*
//             <p className="text-center m-0">Metadata Load Method</p>
//             <div className="w-64">
//               <Select
//                 options={metadataLoadMethods}
//                 className="text-black bg-base-100"
//                 onChange={(event: any) => {
//                   setMetadataLoadMethodSelectedDropdownOption(event[0].value);
//                 }}
//                 values={[defaultMetadataLoadMethod]}
//               />
//             </div> */}

//             <button type="submit" className="btn btn-sm btn-primary">
//               Refresh
//             </button>
//           </div>
//         </form>
//       </>
//     );
//   } else {
//     advancedOutput = <></>;
//   }

//   const output = (
//     <>
//       <button
//         onClick={() => {
//           setIsShowingAdvancedSettings(!isShowingAdvancedSettings);
//         }}
//         className="btn btn-sm btn-primary"
//       >
//         Toggled Advanced Options
//       </button>
//       <>{advancedOutput}</>
//     </>
//   );

//   return {
//     chosenOption: metadataLinkLoadChosenOption,
//     //chosenOption2: metadataLoadMethodChosenOption,
//     output,
//   };
// }
