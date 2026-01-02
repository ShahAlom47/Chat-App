import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { convex } from "@/lib/convexClient";

/* =========================
   Type Augmentation
========================= */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
  }
}

/* =========================
   Auth Options
========================= */
export const authOptions: NextAuthOptions = {
  providers: [
    // 🔹 Google (optional)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔹 Email + Password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 1️⃣ Basic validation
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // 2️⃣ Get user from Convex
        const user = await convex.query("users:getByEmail", {
          email: credentials.email,
        });

        // 3️⃣ User / password existence check
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // 4️⃣ Password compare
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // 5️⃣ Return user for NextAuth
        return {
          id: user._id, // ✅ Convex document id
          name: user.name ?? "",
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // optional but recommended
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
 