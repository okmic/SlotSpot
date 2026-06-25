import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schemas/schemas.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    //@ts-ignore
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;