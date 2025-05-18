import { DiscordUser, TeamDetails } from "./types/discord";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND: string;
      PORT: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_SECRET: string;
      BASE_URL: string;
      AWS_ACCESS_KEY: string;
      AWS_ACCESS_SECRET: string;
      JWT_SECRET: string;
      DB_NAME: string;
      DB_USER: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_PASSWORD: string;
    }
  }

  namespace Express {
    export interface Request {
      authData?: {
        discordUser: DiscordUser;
        teamDetails: TeamDetails;
      };
    }
  }
}

export {};
