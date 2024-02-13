import { useFormContext } from "react-hook-form";
import { IconAtSymbol } from "../icons";
import { Input, InputProps } from "../ui/input";

type EmailFieldProps = {
  name: string;
  label?: string;
} & InputProps;

export function EmailField({ name, ...props }: EmailFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <label htmlFor={name} className="block">
      {props.label && <span>{props.label}</span>}

      <div className="relative mt-1">
        <div className="absolute inset-y-0 flex items-center left-3 text-gray-500">
          <IconAtSymbol />
        </div>

        <Input
          id={name}
          type="email"
          className="pl-9 bg-custom-gray dark:bg-card"
          {...props}
          {...register(name)}
        />

        {errors[name] && (
          <p className="absolute mt-0.5 text-sm text-red-600">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    </label>
  );
}
