import { useState } from "react";
import { Login } from "./forms/Login";
import { SignUp } from "./forms/Signup";

// import { SignUp } from "./forms/signup";
export const WelcomeComponent = () => {
  const [isLogin, setIsLogin] = useState(false);
  const onButtonClick = (bool: boolean) => {
    setIsLogin(bool);
  };

  const inputRadio = [
    {
      id: 1,
      title: "Signup",
      value: isLogin,
      checked: !isLogin,
      onClick: () => onButtonClick(false),
    },
    {
      id: 2,
      title: "Login",
      value: !isLogin,
      checked: isLogin,
      onClick: () => onButtonClick(true),
    },
  ];

  return (
    <div
      className="flex flex-col border border-green-300 rounded-2xl max-[768px]:border-none max-[768px]:text-3xl
        lg:px-10 lg:py-2"
    >
      <div className="text-center">
        <h1 className="text-4xl m-6">WalletWhiz</h1>
      </div>
      <div className="text-center gap-2 flex flex-row justify-center text-xl">
        {inputRadio.map((item) => (
          <label htmlFor="" key={item.id}>
            <input
              type="radio"
              checked={item.checked}
              readOnly
              onClick={item.onClick}
            />
            {item.title}
          </label>
        ))}
      </div>
      <div>{isLogin ? <Login /> : <SignUp />}</div>
    </div>
  );
};
