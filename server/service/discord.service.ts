import request, { AxiosError } from "axios";
import BadRequest from "../errors/BadRequest";
import {
  DiscordGuildMember,
  DiscordRole,
  DiscordUser,
  TeamDetails,
} from "../types/discord";
import jwt from "jsonwebtoken";
import { teamRoles, individualRole } from "../consts/teamRoles";
import Unauthorized from "../errors/Unauthorized";
import CustomError from "../errors/CustomError";

export const exchangeDiscordCodeForToken = async (
  code: string
): Promise<string> => {
  try {
    const token = await request
      .post(
        "https://discord.com/api/oauth2/token",
        {
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_SECRET,
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.BASE_URL + "/auth",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => res.data);
    const discordToken = token.token_type + " " + token.access_token;
    const me = await getDiscordMe(discordToken);
    return await signJWT(me);
  } catch (err) {
    console.error("Error exchanging user auth code for discord token", err);
    throw err;
  }
};

export const getGuildMember = async (
  guildId: string,
  token: string
): Promise<DiscordGuildMember> => {
  try {
    const guildMember = await request
      .get(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data as DiscordGuildMember);
    return guildMember;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.data.message === "Unknown Guild") {
        throw new BadRequest(
          "You're not a member of our disord server, please join it and then join your team so you can submit."
        );
      }
    }
    console.error("Error getting guild member", err);
    throw err;
  }
};

export const getDiscordTeamDetails = async (
  token: string
): Promise<TeamDetails> => {
  const guildMember = await getGuildMember("1246086590728503428", token);
  const isIndividual = !!guildMember.roles.find(
    (roleId) => roleId === individualRole
  );
  const groupRoleId = guildMember.roles.find((roleId) => teamRoles.get(roleId));
  const groupName = groupRoleId ? teamRoles.get(groupRoleId) : null;

  if (!isIndividual && groupName === null) {
    throw new Unauthorized(
      "You have not joined a team on discord yet. Please do so first, or mark yourself as an individual team."
    );
  }

  return {
    isIndividual,
    groupName: groupName ?? null,
    groupRoleId: groupRoleId ?? null,
  };
};

export const getDiscordMe = async (
  token: string
): Promise<{ discordUser: DiscordUser; teamDetails: TeamDetails }> => {
  try {
    const discordUser = await request
      .get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data as DiscordUser);

    const teamDetails = await getDiscordTeamDetails(token);

    return { discordUser, teamDetails };
  } catch (err) {
    console.error("Error getting discord /me", err);
    throw err;
  }
};

const signJWT = (payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, (err: any, token: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token as string);
    });
  });
};
