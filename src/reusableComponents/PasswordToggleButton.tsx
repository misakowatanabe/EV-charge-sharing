import { Dispatch, SetStateAction } from "react";

type passwordToggleButtonProps = {
  passwordShown: boolean;
  setPasswordShown: Dispatch<SetStateAction<boolean>>;
};

export default function PasswordToggleButton({
  passwordShown,
  setPasswordShown,
}: passwordToggleButtonProps) {
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div
      onClick={togglePassword}
      data-type="button"
      className="password-toggle-button"
    >
      Show Password
    </div>
  );
}
