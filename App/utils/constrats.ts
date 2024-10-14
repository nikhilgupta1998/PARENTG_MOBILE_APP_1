import configs from "../../app.json";
type ENVType = "local" | "staging" | "production";
const env = configs.env.envname as ENVType;
export const APP_API_URL = configs.env[env].apiURL || "";
export const AWS_PATH = configs.env[env].awsUrl || "";
export const PASSETS_PATH = configs.env[env].assestsPath || "";
export const APP_LANGUAGE = "en";
export const CHART_PATH = configs.env[env].chartPath || "";
export const PlAN_PATH = (configs.env[env].paymentPath || "") + "/subscription";
