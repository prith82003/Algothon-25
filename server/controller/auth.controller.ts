import { Router } from "express";
import request from "axios";
import * as discordService from "../service/discord.service";
import BadRequest from "../errors/BadRequest";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { code } = req.query;
    if (typeof code !== "string") {
      throw new BadRequest("Missing code param");
    }
    const token = await discordService.exchangeDiscordCodeForToken(code);
    res
      .cookie("Authorization", token)
      .redirect(process.env.FRONTEND + "/submission");
  } catch (err) {
    console.error("Error getting discord token with user code", { err });
    next(err);
  }
});

export default router;
