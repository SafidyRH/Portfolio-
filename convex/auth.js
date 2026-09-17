import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

const normalizeEmail = (value) => String(value ?? "").trim().toLowerCase();

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = normalizeEmail(params.email);
        const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);

        if (!adminEmail) {
          throw new Error("ADMIN_EMAIL n'est pas configure dans Convex.");
        }

        if (email !== adminEmail) {
          throw new Error("Cette adresse n'est pas autorisee a administrer le portfolio.");
        }

        return { email, name: "Administrateur" };
      },
    }),
  ],
});
