import React, { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AccountMenu from "./AccountMenu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserInfo } from "../../models/user.model";
import { RootState } from "../../redux/store";

const MyAccount: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user) as UserInfo;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (url?: string) => {
    setAnchorEl(null);
    if (url) navigate(url);
  };

  return (
    <div
      className="myAccount"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Button
        onClick={handleClick}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Avatar
          src="src/assets/images/userImg3.jpeg"
          className="custom-avatar"
        />
        <div className="userInfo">
          <h4 style={{ margin: 0, fontSize: "1rem" }}>
            {user.name || "Usuario"}
          </h4>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#666" }}>
            @{user.username || "SinUsername"}
          </p>
        </div>
      </Button>
      <AccountMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        className="account-menu"
      />
    </div>
  );
};

export default MyAccount;
