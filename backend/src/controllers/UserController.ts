import { Repository } from "typeorm";
import { User } from "../entity/User";
import { Request, Response } from "express";

export function register(
  req: Request,
  res: Response,
  userRepository: Repository<User>
) {
  // Validation
  console.log(req.body);
  if (!req.body.hasOwnProperty("email"))
    return res.status(400).send("Invalid request body.");
  if (!req.body.hasOwnProperty("password"))
    return res.status(400).send("Invalid request body.");

  const { email, password } = req.body;
  console.log("Email: ", email);
  console.log("Password: ", password);

  // Insert user
  const user = userRepository.create({ email, password });
  return res.send(userRepository.save(user));
}
