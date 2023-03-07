export const navLinks = [
  {
    name: "dashboard",
    link: "/",
  },
  {
    name: "create-campaign",
    link: "/create-campaign",
  },
  {
    name: "payment",
    link: "/my-campaigns",
  },
  // {
  //   name: "withdraw",
  //   link: "/withdraw",
  // },
  {
    name: "my-contributions",
    link: "/my-contributions",
  },
  {
    name: "logout",
    link: "/logout",
  },
];

export const execluded = ["/register", "/login", "/landing-page"];

export const authRoutes = ["/login", "/register"];
export const protectedRoutes = [
  "/create-campaign",
  "/my-campaigns",
  "/my-contributions",
  "/consultant",
];
