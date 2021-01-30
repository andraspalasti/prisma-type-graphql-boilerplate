declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "test" | "production";
			PORT: number;
			DATABASE_URL: string;
			TEST_DATABASE_URL?: string;
		}
	}
}

export {};
