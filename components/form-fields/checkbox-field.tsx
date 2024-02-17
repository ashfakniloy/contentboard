import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

type CheckboxFieldProps = {
  name: string;
  label: string;
};

export function CheckboxField({ name, label }: CheckboxFieldProps) {
  const { control } = useFormContext();

  return (
    <div className="flex items-center space-x-2">
      {/* <input
        type="checkbox"
        id={label}
        value={label}
        {...register(name)}
        className="accent-primary"
      /> */}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            id={label}
            checked={Array.isArray(field.value) && field.value.includes(label)}
            onCheckedChange={(checked) => {
              const updatedValue = Array.isArray(field.value)
                ? [...field.value]
                : [];
              if (checked) {
                updatedValue.push(label);
              } else {
                const index = updatedValue.indexOf(label);
                if (index !== -1) {
                  updatedValue.splice(index, 1);
                }
              }
              field.onChange(updatedValue);
            }}
          />
        )}
      />

      <label
        htmlFor={label}
        className="cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <span>{label}</span>
      </label>
    </div>
  );
}

export function CheckboxFieldBoolean({ name, label }: CheckboxFieldProps) {
  const { control } = useFormContext();

  return (
    <div className="flex items-center space-x-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />

      <label
        htmlFor={name}
        className="cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <span>{label}</span>
      </label>
    </div>
  );
}
