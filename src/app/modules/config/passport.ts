
import passport, { Profile } from "passport";
import {
  Strategy as Googestragy,
  Strategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../user/user.model";
import { Role } from "../user/user.interface";
import { Strategy as localStrategy } from "passport-local";
import AppError from "../../errorHelpers/appError";
import bcyprtjs from 'bcryptjs'

// local
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "",
    },
    async (email: string, password: string, done: any) => {
      try {
        const isUserExits = await User.findOne({ email });

        if (!isUserExits) {
          return done(null, false, { message: "User does not exits" });
        }

        const isGoogleAuthnicate = isUserExits.auths.some(providerObject => providerObject.provider=="google")

        if(isGoogleAuthnicate && !isUserExits.password){
            return done(null, false, {message:"You have authnicate want to google login first"})
        }

        const isPassword = await bcyprtjs.compare(
          password,
          isUserExits.password as string
        );

        if (!isPassword) {
                     return done(null, false, { message: "Password does not matched" });
         
        }
        return done(null, isUserExits);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.use(
  new Googestragy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALL_BACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) {
          return done(null, false, { message: "No email founded" });
        }

        let user = await User.findOne({ email: email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auth: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }

        return done(null, user);
      } catch (error) {
        console.log(error, " google stragy ");

        return done(error);
      }
    }
  )
);

passport.serializeUser(
  (user: Express.User, done: (err: any, id?: unknown) => void) => {
    done(null, (user as any)._id); // Use type assertion if TypeScript complains about `_id`
  }
);

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
    console.log(error);
  }
});
