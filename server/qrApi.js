import express from "express";
import qr, { image } from "qr-image";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/generate", (req, res) => {
  const { url } = req.body;
  const sanitized = url.slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `${sanitized}.png`;
  const outputPath = path.join(__dirname, "public", filename);

  const qr_png = qr.image(url, { type: "png" });
  qr_png.pipe(fs.createWriteStream(outputPath));

  res.json({ imagePath: `http://localhost:${PORT}/public/${filename}` });
});

app.post("/delete", (req, res) => {
  const qrDir = path.join(__dirname, "public");
  const fileToDelete = path.join(qrDir, req.body.fileName);

  // First, delete the file
  fs.rm(fileToDelete, (err) => {
    if (err) {
      console.error("Error deleting file:", err.message);
      return res
        .status(404)
        .json({ error: "File not found or couldn't be deleted" });
    }

    // Then, read the remaining files
    fs.readdir(qrDir, (err, files) => {
      if (err) return res.status(500).send("Could not read QR directory");

      const images = files
        .filter((file) => file.endsWith(".png"))
        .map((file) => ({
          title: file.replace(".png", ""),
          imagePath: `http://localhost:3001/public/${file}`,
        }));

      res.json(images);
    });
  });
});

app.use(
  "/public",
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res) => {
      res.setHeader("Content-Disposition", "attachment");
    },
  })
);

app.get("/all-qrs", (req, res) => {
  const qrDir = path.join(__dirname, "public");

  fs.readdir(qrDir, (err, files) => {
    if (err) return res.status(500).send("Could not read QR directory.");

    const images = files
      .filter((file) => file.endsWith(".png"))
      .map((file) => ({
        title: file.replace(".png", ""),
        imagePath: `http://localhost:3001/public/${file}`,
      }));

    res.json(images);
  });
});

app.listen(PORT, () => {
  console.log(`QR API running at http://localhost:${PORT}`);
});
