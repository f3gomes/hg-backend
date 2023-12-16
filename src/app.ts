import cors from "cors";
import express, { Request, Response } from "express";
import { main as connectDB } from "./config/database";
import { productRoutes } from "./routes/productRoutes";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/hello", (_req: Request, res: Response) => {
  res.json({ message: "Hello API!" });
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
