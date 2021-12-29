import { FC } from "react";
import { Box } from "@mui/system";

const PublicLayout: FC = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
};
export default PublicLayout;
