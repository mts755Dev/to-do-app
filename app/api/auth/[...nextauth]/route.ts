import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      id: "login",
      async authorize({ username, password }: any) {
        if (!username || !password) throw new Error("Invalid credentials");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );

        const userData = await response.json();

        return userData as User;
      },
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),

    Credentials({
      id: "signup",
      async authorize({ firstName, lastName, username, password }: any) {
        if (!firstName || !lastName || !username || !password)
          throw new Error("Invalid user data");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/users/add`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName,
              lastName,
              username,
              password,
            }),
          }
        );

        const userData = await response.json();
        return userData as unknown as User;
      },
      name: "Create Account",
      credentials: {
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
});

export { handler as GET, handler as POST };
