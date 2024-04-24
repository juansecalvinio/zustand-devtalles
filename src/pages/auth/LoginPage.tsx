import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores";

export const LoginPage = () => {
  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginUser);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const { email, password, remember } = event.target as HTMLFormElement;
    const { email, password, remember } =
      event.target as typeof event.target & {
        email: { value: string };
        password: { value: string };
        remember: { checked: boolean };
      };

    try {
      await loginUser(email.value, password.value);
      navigate("/dashboard");
    } catch (error) {
      console.log("No se pudo autenticar");
    }

    // email.value = "";
    // password.value = "";
    // remember.checked = false;
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Login</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input type="text" name="email" autoComplete="off" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input type="password" name="password" autoComplete="off" />
        </div>

        <div className="flex items-center mb-4">
          <input type="checkbox" name="remember" className="text-blue-500" />
          <label className="ml-2 text-gray-600">Remember Me</label>
        </div>

        <div className="mb-6 text-blue-500">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="bg-indigo-600">
          Login
        </button>
      </form>
      <div className="mt-6 text-center text-blue-500">
        <a href="#" className="hover:underline">
          Sign up Here
        </a>
      </div>
    </>
  );
};
