import { TextInputs } from "../TextInputs";

import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider";

const usernameErrorMessage = "Username not found";
const passwordErrorMessage = "Password not found";
const loginErrorMessage = "User is not registered";

export const Login = () => {
  const { user, loginUser } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const usernameValid = usernameInput === user?.username;
  const passwordValid = passwordInput === user?.password;
  const loginValid = usernameValid && passwordValid;

  const showUsernameError = !usernameValid && error;
  const showPasswordError = !passwordValid && error;
  const showLoginError = !loginValid && error;

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser({
      password: passwordInput,
      username: usernameInput,
    }).then((user) => {
      if (!user) {
        setError(true);
        return;
      } else {
        setError(false);
        navigate("/dashboard");
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
    >
      <div className="flex flex-col">
        <div className="text-center m-2 text-xl">
          <h2 className="font-bold">Login</h2>
        </div>
        <div className="flex flex-col items-center gap-1 ">
          <TextInputs
            type="text"
            label="Username:"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            show={showUsernameError}
            message={usernameErrorMessage}
          />
          <div className="flex items-center">
            <TextInputs
              type={showPassword ? "text" : "password"}
              label="Password:"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              show={showPasswordError}
              message={passwordErrorMessage}
              togglePassword={togglePassword}
            />
          </div>
          {showLoginError ? (
            <div className="text-red-500 text-center">{loginErrorMessage}</div>
          ) : null}

          <div className="flex flex-row m-2 text-center cursor-pointer">
            <input
              type="submit"
              value="Login"
              className="items-center h-14 w-full max-w-md border border-gray-300 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-500 bg-green-500 hover:bg-green-600"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
