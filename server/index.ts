import { config } from "dotenv";
config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRouter from "./controller/auth.controller";
import discordRouter from "./controller/discord.controller";
import submissionRouter from "./controller/submission.controller";

import CustomError from "./errors/CustomError";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://algothon.au"],
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/discord", discordRouter);
app.use("/upload", submissionRouter);
app.use("/static", express.static("./public"));

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ msg: err.message });
  } else {
    console.error("Error: ", err);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Running on ${process.env.PORT}`)
);
