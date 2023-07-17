export type Environment = "development" | "preview" | "production";

export const environment = process.env.VERCEL_ENV as Environment;
