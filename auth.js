import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password) {
          return null;
        }

        if (!email.includes('@')) {
          return null;
        }

        const customer = await prisma.customer.findUnique({
          where: { email },
        });

        if (customer) {
          return {
            id: customer.customer_id,
            name: customer.fullname,
            email: customer.email,
            image: customer.img_identity,
            role: 'customer',
          };
        }

        const employee = await prisma.employee.findUnique({
          where: { email },
        });

        if (employee) {
          return {
            id: employee.employee_id,
            name: employee.fullname,
            email: employee.email,
            role: employee.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
