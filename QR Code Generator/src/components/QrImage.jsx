import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardMedia, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function QrImage(prop) {
  return (
    <div>
      <Card
        sx={{ maxWidth: 500 }}
        style={{ position: "relative", margin: "auto", marginTop: "3.5rem" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={prop.image}
            alt="qr"
            onClick={() => {
              const link = document.createElement("a");
              link.href = prop.image;
              link.setAttribute("download", "my-qr.png"); // filename
              link.setAttribute("target", "_blank"); // ensure it doesn't replace current tab
              document.body.appendChild(link); // attach to DOM
              link.click(); // trigger click
              document.body.removeChild(link); // cleanup
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {prop.title}
            </Typography>
            <button
              className="deleteBtn"
              onClick={() => prop.delete(prop.title + ".png")}
            >
              <HighlightOffIcon />
            </button>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default QrImage;
