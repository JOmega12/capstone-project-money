import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent } from "react";

type TextInputsType = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  show: boolean;
  message: string;
  type?: "password" | "text";
  togglePassword?: () => void;
};

export const TextInputs = ({
  label,
  onChange,
  value,
  show,
  message,
  type,
  togglePassword,
}: TextInputsType) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-row">
        <label htmlFor="" className="w-32 text-lg mb-2 p-3">
          {label}
        </label>
        <div className="relative ">
          <input
            type={type}
            className="items-center h-14 w-full max-w-md border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={onChange}
            value={value}
          />
          {togglePassword && (
            <FontAwesomeIcon
              icon={type === "text" ? faEye : faEyeSlash}
              className="absolute right-3 top-[24px] hover:cursor-pointer max-[768px]:text-lg"
              onClick={togglePassword}
            />
          )}
        </div>
      </div>
      {show ? <div className="text-red-500">{message}</div> : null}
    </div>
  );
};
