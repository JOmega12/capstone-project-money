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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser({
      password: passwordInput,
      username: usernameInput
    })
    .then((user) => {
      if(!user) {
        setError(true);
        return;
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        setError(false);
        navigate("/dashboard")
      }
    })


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
        handleKeyDown(e)
      }}
    >
      <div>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <TextInputs
            type="text"
            label="Username:"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            show={showUsernameError}
            message={usernameErrorMessage}
          />
          <TextInputs
            type="text"
            label="Password:"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            show={showPasswordError}
            message={passwordErrorMessage}
          />

          {showLoginError ? (
            <div className="text-red-500 text-center">
              {loginErrorMessage}
            </div>
          ) : null}


          <div className="flex flex-row gap-10 text-center cursor-pointer">
            <input
              type="submit"
              value="Login"
              className="items-center h-14 w-full max-w-md border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 bg-green-500 hover:bg-green-600"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
