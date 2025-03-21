import Button from "@mui/material/Button";
import "../styles/DownloadButton.css";
import { ReactNode } from "react";
interface Props {
  children?: ReactNode;
}
export default function CustomButton({ children }: Props) {
  return (
    <Button
      className="custom-button"
      variant="outlined"
      sx={{ textTransform: "none" }}
    >
      {children}
    </Button>
  );
}
