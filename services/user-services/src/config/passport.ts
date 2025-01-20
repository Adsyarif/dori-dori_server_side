import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { IUser, User } from "../models/User";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Document } from "mongoose";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function verify(email, password, done) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Invalid credentials" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/google/isAuth",
    },
    async function verify(
      _: any,
      __: any,
      profile: {
        id: any;
        displayName: any;
        emails: { value: any }[];
        photos: { value: any }[];
      },
      cb: (
        arg0: unknown,
        arg1:
          | (Document<unknown, {}, IUser> &
              IUser &
              Required<{ _id: unknown }> & { __v: number })
          | null
      ) => any
    ) {
      try {
        // Cari pengguna di database berdasarkan Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Jika pengguna tidak ditemukan, buat pengguna baru
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
          });
        }

        // Kembalikan pengguna ke Passport
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
