import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "@/utils/utils";
import { User } from "@/utils/models";
import bcrypt from "bcryptjs";
import { authConfig } from "@/utils/auth.config";

const login = async (credentials) => {
  try {
    connectToDb();
    const checkUser = await User.findOne({
      email: credentials.email,
    });

    if (!checkUser) {
      throw new Error("رمز عبور اشتباه است");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      checkUser.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong password!");
    }

    return checkUser;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

const handlers = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.name,
              email: profile.email,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});

export { handlers as GET, handlers as POST };
