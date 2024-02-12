import { Controller, useFormContext } from "react-hook-form";
import TextEditor from "../text-editor";

export function TextEditorField({
  label,
  name,
  ...props
}: {
  label: string;
  name: string;
}) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleSetValue = (content: string) => {
    setValue(name, content);
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="inline-block mb-2">
        {label}
      </label>
      <Controller
        name={name}
        {...props}
        render={({ field }) => (
          <TextEditor value={field.value} setValue={handleSetValue} />
        )}
      />

      {errors[name] && (
        <p className="absolute mt-0.5 text-sm text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
