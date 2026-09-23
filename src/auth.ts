import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from './auth.config';

const credentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const encodedHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !encodedHash) {
          console.error('ADMIN_EMAIL or ADMIN_PASSWORD_HASH is not configured.');
          return null;
        }

        const hash = Buffer.from(encodedHash, 'base64').toString('utf8');
        const emailMatches = parsed.data.email.toLowerCase() === adminEmail.trim().toLowerCase();
        const passwordMatches = await bcrypt.compare(parsed.data.password, hash);

        if (!emailMatches || !passwordMatches) return null;

        return { id: 'admin', email: adminEmail, name: 'Admin' };
      },
    }),
  ],
});
