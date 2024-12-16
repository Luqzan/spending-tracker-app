import { useState } from "react";
import axios from "../../services/axios";
import CustomFormInput from "../../components/CustomFormInput";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ErrorMessage from "../../components/ErrorMessage";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/login", data);

      if (
        response.data.error === false &&
        (await authContext.isAuthenticated())
      ) {
        navigate("/protected");
      } else {
        if (response.data.message === "Validation error.") {
          setErrors(response.data.details);
        } else if (
          typeof response.data.message === "object" &&
          Object.keys(response.data.message).includes("message")
        ) {
          setErrors([response.data.message.message]);
        } else if (typeof response.data.message === "string") {
          setErrors([response.data.message]);
        } else {
          setErrors(["Oops! Something's wrong, try again."]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-4 sm:mx-20 w-full max-w-[600px] px-8 py-6 bg-background2 rounded-lg flex flex-col gap-4"
    >
      <h2 className="text-xl tracking-widest">LOG IN TO CONTINUE</h2>

      <CustomFormInput
        id="email"
        label="Email"
        type="email"
        value={data.email}
        placeholder="Enter email here"
        onChange={(e) => {
          setData((prev) => ({ ...prev, email: e.target.value }));
        }}
      />

      <CustomFormInput
        id="password"
        label="Password"
        type="password"
        value={data.password}
        placeholder="Enter password here"
        onChange={(e) => {
          setData((prev) => ({ ...prev, password: e.target.value }));
        }}
      />

      <div className="flex flex-row gap-4 items-center mt-2">
        <CustomButton type="submit" label="Log in" />

        <p>or</p>

        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/auth/signup");
          }}
          className="text-blue-600 uppercase font-bold tracking-wide pr-6 leading-tight"
        >
          Sign UP
          <br />
          Instead
        </button>
      </div>

      {errors.length > 0 ? <ErrorMessage errors={errors} /> : null}
    </form>
  );
}
