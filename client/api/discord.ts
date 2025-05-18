import request from "./request";

export type GetDiscordUserResponse = {
  discordUser: {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    banner: string | null;
    global_name: string | null;
    avatar_decoration: string | null;
    email: string | null;
  };
  teamDetails: {
    isIndividual: boolean;
    groupName: string | null;
    groupRoleId: string | null;
  };
};

export const getDiscordUser = () => {
  return request
    .get(process.env.NEXT_PUBLIC_API + "/discord/me")
    .then((res) => res.data) as Promise<GetDiscordUserResponse>;
};
