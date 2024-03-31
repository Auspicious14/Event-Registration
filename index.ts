import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import RegistrationRoute from "./routes/registration";
export const appRoute = express();
dotenv.config();

appRoute.use(cors());
appRoute.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow_Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
appRoute.use(express.json({ limit: "50mb" }));
appRoute.use(express.urlencoded({ limit: "50mb", extended: true }));
appRoute.use(cookieParser());
appRoute.use(RegistrationRoute);
