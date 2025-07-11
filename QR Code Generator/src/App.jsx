import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import QrImage from "./components/QrImage";
import { SettingsOverscan } from "@mui/icons-material";

export function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("http://localhost:3001/all-qrs");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching QR images:", error);
      }
    }
    fetchImages();
  }, []);

  async function generate(url) {
    const response = await fetch("http://localhost:3001/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    setItems((prev) => {
      return [
        ...prev,
        {
          imagePath: data.imagePath,
          title: url,
        },
      ];
    });
  }

  async function deleteQr(fileName) {
    const response = await fetch("http://localhost:3001/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName }),
    });

    const data = await response.json();

    setItems(data);
  }

  return (
    <div>
      <Header />
      <Form generate={generate} />
      {items.map((item, index) => {
        return (
          <QrImage
            key={index}
            image={item.imagePath}
            title={item.title}
            delete={deleteQr}
          />
        );
      })}
    </div>
  );
}
