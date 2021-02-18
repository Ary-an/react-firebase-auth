import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
}) => {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor={name}>{label}</label>
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Input;
