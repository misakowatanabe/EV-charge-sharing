import { useState, useEffect } from "react";
import { useAppSelector } from "../context/Hooks";
import { selectProfileData } from "../context/slices/ProfileDataSlice";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export default function SimpleProfile() {
  const profile = useAppSelector(selectProfileData);
  const [name, setName] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  var displayName;
  var icon;
  if (name === "") {
    displayName = <Skeleton height={30} width="100px" />;
    icon = <Skeleton variant="circular" width={40} height={40} />;
  } else {
    displayName = name;
    icon = (
      <Avatar
        alt="Avatar"
        sx={{
          width: 40,
          height: 40,
          margin: { xs: "0 0 0 auto", sm: "0" },
        }}
      >
        <PersonIcon style={{ fontSize: "30px" }} />
      </Avatar>
    );
  }

  return (
    <>
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: "#ffffff",
          fontWeight: 400,
          margin: "0 10px 0 auto",
          display: { xs: "none", sm: "block" },
        }}
      >
        {displayName}
      </Typography>
      {icon}
    </>
  );
}
