export type Env = "qa" | "prod" | string;

export interface SharedStackProps {
  env: Env;
}
