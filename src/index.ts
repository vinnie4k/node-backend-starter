import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { dbConnect } from "./database";
import { errorMiddleware } from "./middleware/errorMiddleware";

// Express Server
const app = express();
app.use(bodyParser.json());

// Default Route
app.get("/", (req, res) => {
  return res.send("Welcome to yourprojectname-backend!");
});

// Swagger API Docs
app.use("/api-docs", swaggerUI.serve, async (req: Request, res: Response) => {
  return res.send(
    swaggerUI.generateHTML(await import("../build/swagger.json"))
  );
});
RegisterRoutes(app);

// Define middleware last
app.use(errorMiddleware);

app.listen(process.env.PORT || 8000, async () => {
  console.log(
    `✅ Server is up and running at http://localhost:${
      process.env.PORT || 8000
    }`
  );
  await dbConnect();
});
