"use client";

import { useState } from "react";
import { IconEye, IconEyeSlash, IconLock } from "@/components/icons";
import { Input, InputProps } from "../ui/input";
import { useFormContext } from "react-hook-form";

type PasswordFieldProps = {
  name: string;
  label?: string;
} & InputProps;

export function PasswordField({ name, ...props }: PasswordFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <label htmlFor={name} className="block">
      {props.label && <span className="font-medium">{props.label}</span>}

      <div className="relative mt-1">
        <div className="absolute inset-y-0 flex items-center left-3 text-gray-500">
          <IconLock />
        </div>
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          autoComplete="on"
          className="pl-9 pr-3 py-3 bg-custom-gray dark:bg-card"
          {...props}
          {...register(name)}
        />

        <div className="absolute inset-y-[1px] px-1 flex items-center right-[1px] rounded-md bg-custom-gray dark:bg-card">
          <span
            className="p-[6px] text-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 rounded-full text-black/60"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span>{showPassword ? <IconEyeSlash /> : <IconEye />}</span>
          </span>
        </div>
      </div>

      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </label>
  );
}

// export const PasswordField2 = ({ className, ...props }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <label htmlFor={name} className="block w-full">
//       <div className="relative mt-1">
//         <Field
//           id={name}
//           type={showPassword ? "text" : "password"}
//           className="pl-0.5 py-0 w-full outline-none text-2xl font-bold bg-transparent text-gray-600"
//           {...props}
//         />

//         <div className="absolute inset-y-0 right-0 px-2 bg-custom-gray5">
//           <span
//             className="size-9 flex justify-center items-center text-lg cursor-pointer hover:bg-gray-200 active:bg-gray-300 rounded-full text-black/60 border border-gray-300"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             <span>{showPassword ? <IconEyeSlash /> : <IconEye />}</span>
//           </span>
//         </div>
//       </div>
//     </label>
//   );
// };
