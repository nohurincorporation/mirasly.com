export declare const envSchema: Record<string, unknown>;
export declare const featureFlags: Record<string, boolean>;
export declare function readPublicConfig(env?: Record<string, string | undefined>): {
  apiUrl: string;
  defaultLocale: string;
  enabledLocales: string[];
};
