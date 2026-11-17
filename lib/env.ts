type AppEnv = "development" | "preview" | "production";

const KNOWN: AppEnv[] = ["development", "preview", "production"];

const resolveAppEnv = (): AppEnv => {
  const override = process.env.NEXT_PUBLIC_APP_ENV;
  if (override && KNOWN.includes(override as AppEnv)) return override as AppEnv;

  // Fall back to the hosting provider's signal before guessing, so a clone
  // without .env still behaves like development and previews stay previews.
  if (process.env.VERCEL_ENV === "preview") return "preview";
  if (process.env.NODE_ENV === "development") return "development";
  return "production";
};

export const APP_ENV = resolveAppEnv();

export const isDev = APP_ENV === "development";
export const isPreview = APP_ENV === "preview";
export const isProd = APP_ENV === "production";
