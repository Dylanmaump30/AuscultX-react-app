import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { menuPaperStyles } from "../../styles/accountMenuStyle";
import useLogout from "../logout/logout";
import { PublicRoutes } from "../../routes";

interface AccountMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: (redirectTo?: string) => void;
  className?: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  anchorEl,
  open,
  onClose,
  className,
}) => {
  const logOut = useLogout();

  const handleMenuItemClick = (redirectTo?: string) => {
    if (redirectTo === `/${PublicRoutes.LOGIN}`) {
      logOut();
    }
    onClose(redirectTo);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => onClose()}
      className={className}
      slotProps={{ paper: menuPaperStyles }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        className="menu-item"
        onClick={() => handleMenuItemClick(`/${PublicRoutes.LOGIN}`)}
      >
        <ListItemIcon>
          <Logout className="list-item-icon" fontSize="small" />
        </ListItemIcon>
        <span className="logout-text"> Logout</span>
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
