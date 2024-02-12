type RadioFieldProps = {
  label: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RadioField({ label, name, ...props }: RadioFieldProps) {
  return (
    <label htmlFor={label} className="flex items-center gap-3 cursor-pointer">
      <input type="radio" id={label} {...props} />
      <span>{label}</span>
    </label>
  );
}
