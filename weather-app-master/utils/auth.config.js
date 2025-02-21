export const authConfig = {
  // trustHost: true,
  // trustHostedDomain: true,
  pages: {
    signIn: "/register",
  },
  providers: [],
  callbacks: {
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },

    // async session({ session, token }) {
    //   if (token) {
    //     session.user.id = token.id;
    //   }
    //   return session;
    // },
    authorized({ auth, request }) {
      // const user = auth.user;
      // const isOnDashboardPanel =
      //   request.nextUrl?.pathname.startsWith("/dashboard");

      // const isOnLoginPage = request.nextUrl?.pathname.startsWith("/register");

      // if (isOnDashboardPanel && !user) {
      //   return Response.redirect(new URL("/", request.nextUrl));
      // }

      // if (isOnLoginPage && user) {
      //   return Response.redirect(new URL("/", request.nextUrl));
      // }
      return true;
    },
  },
};
