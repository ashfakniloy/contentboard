import { useFormContext } from "react-hook-form";
import { Textarea, TextareaProps } from "../ui/textarea";

type TextareaFieldProps = {
  name: string;
  label?: string;
} & TextareaProps;

export function TextareaField({ name, ...props }: TextareaFieldProps) {
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
        <Textarea id={name} {...props} {...register(name)} rows={4} />

        {errors[name] && (
          <p className="absolute mt-0.5 text-sm text-red-600">
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
}
