export type DiscordUser = {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  banner?: string | null;
  global_name: string | null;
  avatar_decoration?: string | null;
  email?: string | null;
};

export type DiscordGuildMember = {
  nick: string | null;
  avatar: string | null;
  roles: string[];
  user?: DiscordUser | null;
};

export type DiscordRole = {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
};

export type TeamDetails = {
  isIndividual: boolean;
  groupName: string | null;
  groupRoleId: string | null;
};
