type AppEnv = "development" | "preview" | "production";

export const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV ?? "production") as AppEnv;

export const isDev = APP_ENV === "development";
export const isPreview = APP_ENV === "preview";
export const isProd = APP_ENV === "production";