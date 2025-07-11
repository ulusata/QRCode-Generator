import React from "react";
import QrCodeIcon from "@mui/icons-material/QrCode";

function Header() {
  return (
    <header>
      <h1 className="bitcount-grid-double-font">
        <QrCodeIcon fontSize="large" />
        &nbsp; Qr Code Generator
      </h1>
    </header>
  );
}

export default Header;
