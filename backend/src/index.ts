import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

const PORT = process.env.PORT || 8080;

// create typeorm connection
createConnection().then(connection => {
  const userRepository = connection.getRepository(User);

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());

  // register routes
  app.get("/", (_req: Request, res: Response) => res.send("Hello world!"));

  app.get("/users", async function(_req: Request, _res: Response) {
    return userRepository.find();
  });

  app.get("/users/:id", async function(req: Request, _res: Response) {
    return userRepository.findOne(req.params.id);
  });

  app.post("/users", async function(req: Request, _res: Response) {
    const user = userRepository.create(req.body);
    return userRepository.save(user);
  });

  app.put("/users/:id", async function(req: Request, _res: Response) {
    const user = await userRepository.findOne(req.params.id);
    if (user !== undefined) {
      userRepository.merge(user, req.body);
      return userRepository.save(user);
    }
    return "User not found";
  });

  app.delete("/users/:id", async function(req: Request, _res: Response) {
    return userRepository.remove(req.params.id);
  });

  // start express server
  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);
});
