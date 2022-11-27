import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";


type passwordToggleButtonProps = {
  passwordShown: boolean;
  setPasswordShown: Dispatch<SetStateAction<boolean>>;
};

export default function PasswordToggleButton({
  passwordShown,
  setPasswordShown,
}: passwordToggleButtonProps) {
  const { t } = useTranslation("auth");
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div
      onClick={togglePassword}
      data-type="button"
      className="password-toggle-button"
    >
      {t("showPassword")}
    </div>
  );
}
