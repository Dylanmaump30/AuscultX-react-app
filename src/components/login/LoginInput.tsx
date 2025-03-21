import { Control, Controller, FieldError } from "react-hook-form";
import { LoginValues } from "../../models/schemaLogin";
interface Props {
  name: keyof LoginValues;
  control: Control<LoginValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const LoginInput = ({ name, control, label, type, error }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={`form-control ${error ? "is-invalid" : ""}`}
          />
        )}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default LoginInput;
