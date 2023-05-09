import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import multer from "multer";
import { analyzeImage } from "./services/analyze-image";
import { uploadImage } from "./services/upload-image";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.use("/api/image/upload", upload.single("image"), async (req, res) => {
  try {
    if (req.file) {
      const imageUploaded = await uploadImage(req.file);
      res.status(200).json({ imageUploaded });
    } else {
      res.status(500).json({
        message: "Obrigatório enviar uma imagem...",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao armazenar imagem..." });
  }
});

app.use("/api/image/analyze", async (req, res) => {
  try {
    const uri = req.body.uri;
    if (uri) {
      const labels = await analyzeImage(uri);
      res.status(200).json({ labels });
    } else {
      res.status(500).json({
        message: "Obrigatório enviar uma URI...",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao armazenar analisar imagem..." });
  }
});

app.listen(port, () => {
  console.log(`Iniciado na porta: ${port}`);
});

export default app;
