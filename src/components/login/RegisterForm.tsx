import { FormValues, schemaRegister } from "../../models/schemaRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import RegisterInput from "./RegisterInput";
import { registerUser } from "../../services/registerService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaHome, FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { PublicRoutes } from "../../routes";

export const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schemaRegister),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setServerError(null);
      await registerUser({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      navigate(`/${PublicRoutes.LOGIN}`);
    } catch (error: any) {
      console.error("Error al crear usuario", error);
      setServerError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <div className="go-home">
          <FaHome className="icon" />
          <a href={PublicRoutes.HOME}>Home</a>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1> Sign up </h1>
          <div className="input-box">
            <FaUser className="icon" />
            <RegisterInput
              name="name"
              control={control}
              label="Name"
              type="text"
              error={errors.name}
            />
          </div>
          <div className="input-box">
            <FaUser className="icon" />
            <RegisterInput
              name="username"
              control={control}
              label="Username"
              type="text"
              error={errors.username}
            />
          </div>
          <div className="input-box">
            <MdOutlineEmail className="icon" />
            <RegisterInput
              name="email"
              control={control}
              label="Email"
              type="email"
              error={errors.email}
            />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <RegisterInput
              name="password"
              control={control}
              label="Password"
              type="password"
              error={errors.password}
            />
          </div>
          <div className="input-box">
            <FaLock className="icon" />

            <RegisterInput
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword}
            />
          </div>

          {serverError && <p className="text-danger">{serverError}</p>}

          <button className=" register-button" type="submit">
            Create account
          </button>
          <div className="register-link">
            <p>
              Already have an account? <a href={PublicRoutes.LOGIN}> Log in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
