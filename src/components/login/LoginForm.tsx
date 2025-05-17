import { LoginValues, schemaLogin } from "../../models/schemaLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginInput from "./LoginInput";
import { loginUser } from "../../services/loginService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PrivateRoutes, PublicRoutes } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "../../styles/customInput.css";
import { MdOutlineEmail } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export const LoginForm2 = () => {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(schemaLogin),
  });

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    try {
      setServerError(null);

      const user = await loginUser(
        {
          email: data.email,
          password: data.password,
        },
        dispatch
      );

      if (user) {
        navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
      }
    } catch (error: any) {
      console.error("Error al loguear usuario", error);
      setServerError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <div>
          <div className="go-home">
            <FaHome className="icon" />
            <a href={PublicRoutes.HOME}>Home</a>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1> Login </h1>
            <div className="input-box">
              <MdOutlineEmail className="icon" />
              <LoginInput
                name="email"
                control={control}
                label="Email"
                type="email"
                error={errors.email}
              />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <LoginInput
                name="password"
                control={control}
                label="Password"
                type="password"
                error={errors.password}
              />
            </div>
            {serverError && <p className="text-danger">{serverError}</p>}
            <button type="submit">Login</button>

            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <Link to={`/${PublicRoutes.REGISTER}`} className=" ">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm2;
