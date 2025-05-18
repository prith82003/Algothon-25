import { Router } from "express";
import BadRequest from "../errors/BadRequest";
import hasDiscordToken from "../middleware/hasDiscordToken";
import * as discordService from "../service/discord.service";
import * as submissionService from "../service/submission.service";

const router = Router();

router.get("/submissionLink", hasDiscordToken, async (req, res, next) => {
  try {
    const uploadData = await submissionService.createUploadLink(
      req.authData!.discordUser,
      req.authData!.teamDetails
    );
    res.json(uploadData);
  } catch (err) {
    next(err);
  }
});

router.get("/lastSubmission", hasDiscordToken, async (req, res, next) => {
  const { teamDetails, discordUser } = req.authData!;

  try {
    if (teamDetails.isIndividual) {
      res.json(
        await submissionService.getLastSubmissionForGroup(discordUser.username)
      );
    } else if (teamDetails.groupName) {
      res.json(
        await submissionService.getLastSubmissionForGroup(teamDetails.groupName)
      );
    } else {
      throw new BadRequest(
        "Something went wrong with your group allocation, please let staff know this happened!"
      );
    }
  } catch (err) {
    next(err);
  }
});

router.post("/submission/ready", hasDiscordToken, async (req, res, next) => {
  const { key } = req.body;
  if (typeof key !== "string") {
    throw new BadRequest("Invalid key param");
  }
  try {
    await submissionService.markSubmissionReady(key);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.get("/status", hasDiscordToken, async (req, res, next) => {
  try {
    const groupName = req.authData!.teamDetails.isIndividual
      ? req.authData!.discordUser.username
      : req.authData!.teamDetails.groupName;
    if (groupName === null) {
      throw new BadRequest("Please join a team on discord first!");
    }
    const submissions = await submissionService.getSubmissionsForGroup(
      groupName
    );
    res.json(submissions);
  } catch (err) {
    next(err);
  }
});

export default router;
