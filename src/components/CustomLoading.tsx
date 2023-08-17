import { useEffect, useState } from "react";

interface CustomLoadingProps {
  isOpen: boolean;
  message?: string;
  modal?: boolean;
  bg?: string;
  full?: boolean;
}

const CustomLoading: React.FC<CustomLoadingProps> = ({
  isOpen,
  message,
  modal,
  full = true,
  bg = true,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`absolute z-30 flex flex-col justify-center items-center ${
          !full || modal
            ? "left-[50%] translate-x-[-50%] w-[min(400px,80%)]"
            : ""
        } ${
          !full && !modal
            ? `top-[20%] translate-y-[-20%]`
            : "h-full w-full top-0 left-0"
        }`}
      >
        <div className="custom-loading-spinner"></div>
        {message && <p className="mx-auto p-2 my-2 text-inherit">{message}</p>}
      </div>
    </>
  );
};

export default CustomLoading;
