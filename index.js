import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { config as _config } from "dotenv";
import logger from "morgan";
import { Color } from "colors";
import Middleware from "./api_v1/middleware/middleware";
import userRoutes from "./api_v1/routes/userRoutes";
import connetDB from "./api_v1/db/config/config";
_config(); 
connetDB()

const app = express();
const corsConfig = {
  origin: ["http://localhost:8000"],
  credentials: true,
};

// const allowedOrigin = 'http://localhost:5173'; // Replace with your frontend URL
// const corsConfig = {
//   origin: (origin, callback) => {

//     if (origin === allowedOrigin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not authorized to access this route'));
//     }

//   },
//   credentials: true,
// };

app.use(helmet());
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", userRoutes);
// app.use("/api/v1/admin", adminRoutes);
app.use(Middleware.errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(
  port,
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT} `
      .yellow.bold
  )
);
