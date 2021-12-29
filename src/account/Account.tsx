import { useAppSelector } from "../context/Hooks";
import { selectProfileData } from "../context/slices/ProfileDataSlice";

export default function Account() {
  const profile = useAppSelector(selectProfileData);
  var name = profile.name;
  var email = profile.email;
  var numberPlate = profile.numberPlate;

  return (
    <div>
      <div>{name}</div>
      <div>{email}</div>
      <div>{numberPlate}</div>
    </div>
  );
}
