// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS to allow requests from the frontend (e.g., localhost:3000)
app.use(cors());

app.use(express.json());

// for test  http://localhost:5000/api/health
app.get("/api/health", (req, res) => {
    res.json({ message: "Backend is running!" });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
