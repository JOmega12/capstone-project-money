import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { TextInputs } from "../TextInputs";
import { isPasswordValid } from "../validations/formValidations";
import { useAuth } from "../../providers/AuthProvider";

const usernameErrorMessage = "Username not found";
const passwordErrorMessage = "Password not found";
const confirmPasswordErrorMessage = "Passwords are not the same";

export const SignUp = () => {
  const { registerUser } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const usernameValid = usernameInput.length > 2;
  const passwordValid = isPasswordValid(passwordInput);
  const confirmPasswordValid = passwordInput === confirmPass;

  const showUsernameError = !usernameValid && error;
  const showPasswordError = !passwordValid && error;
  const showConfirmPasswordError = !confirmPasswordValid && error;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      registerUser({
        username: usernameInput,
        password: passwordInput,
      });

      if (!usernameValid || !passwordValid || !confirmPasswordValid) {
        setError(true);
      } else {
        setError(false);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => handleKeyDown(e)}
      className=""
    >
      <div className="flex flex-col">
        <div className="text-center m-2 text-xl">
          <h2 className="font-bold">SignUp</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <TextInputs
            type="text"
            label="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            show={showUsernameError}
            message={usernameErrorMessage}
          />
          <TextInputs
            type="text"
            label="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            show={showPasswordError}
            message={passwordErrorMessage}
          />
          <TextInputs
            type="text"
            label="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            show={showConfirmPasswordError}
            message={confirmPasswordErrorMessage}
          />

          <div className="flex flex-row m-2 text-center cursor-pointer">
            <input
              type="submit"
              value="Signup"
              className="items-center h-14 w-full max-w-md border border-gray-300 rounded-lg py-2 px-10 focus:outline-none focus:border-blue-500 bg-green-500 hover:bg-green-600"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
