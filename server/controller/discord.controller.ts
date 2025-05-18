import { Router } from "express";
import request from "axios";
import hasDiscordToken from "../middleware/hasDiscordToken";

const router = Router();

router.get("/me", hasDiscordToken, async (req, res, next) => {
  try {
    const discordUser = req.authData;
    res.json(discordUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
