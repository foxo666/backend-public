import { Router } from "express";
import { cUser, gUser, login, dUsers, changePassword} from "../controller/users.js";

const router = Router();

router.post("/create-users", cUser);

router.get("/get-users", gUser);

router.delete("/delete-user/:id", dUsers);

router.post("/login", login);

router.put("/change-password", changePassword);

export default router;