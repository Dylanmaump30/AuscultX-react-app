import { Control, Controller, FieldError } from "react-hook-form";
import "../../styles/customInput.css";

import { FormValues } from "../../models/schemaRegister";
interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const RegisterInput = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="form-group">
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

export default RegisterInput;
