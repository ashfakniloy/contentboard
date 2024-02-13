import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

type InputFieldProps = {
  name: string;
  label?: string;
} & InputProps;

export function InputField({ name, className, ...props }: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      {props.label && (
        <label htmlFor={name} className="font-medium inline-block">
          {props.label}
        </label>
      )}
      <div className="relative mt-1">
        <Input
          id={name}
          className={cn(className)}
          {...props}
          {...register(name)}
        />

        {errors[name] && (
          <p className="absolute mt-0.5 text-sm text-red-600">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}

export function InputFieldLong({ name, ...props }: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <div className="relative">
        <Input
          id={name}
          {...props}
          {...register(name)}
          className="pl-0.5 w-full border-0 text-2xl font-bold bg-transparent text-gray-600 dark:text-gray-200"
        />

        {errors[name] && (
          <p className="absolute -mt-1 text-sm text-red-600">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}
