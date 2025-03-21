import Button from "@mui/material/Button";
import "../../styles/downloadButton.css";
import DownloadIcon from "@mui/icons-material/Download";
import { ReactNode } from "react";
interface Props {
  children?: ReactNode;
  fileName: string;
  className: string;
}
export default function DownloadButton({
  children,
  fileName,
  className,
}: Props) {
  const content = children ?? "Descargar";
  const fileNameOnly = fileName.split("/").pop();

  return (
    <a href={fileName} download={fileNameOnly}>
      <Button
        className={className}
        endIcon={<DownloadIcon />}
        sx={{ textTransform: "none" }}
      >
        {content}
      </Button>
    </a>
  );
}
