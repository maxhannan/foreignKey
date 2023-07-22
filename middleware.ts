import withAuth from "next-auth/middleware";
console.log;
export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});
