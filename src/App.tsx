import { lazy, Suspense } from "react";

const InvitationOne = lazy(() => import("./routes/one/InvitationOne"));
const CreateInvitationLink = lazy(
  () => import("./routes/create/CreateInvitationLink"),
);
// const InvitationTwo = lazy(() => import("./routes/two/InvitationTwo"));
// const InvitationThree = lazy(() => import("./routes/three/InvitationThree"));

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";

  let route = <InvitationOne />;

  if (path === "/create") route = <CreateInvitationLink />;

  // if (path === "/2") route = <InvitationTwo />;
  // if (path === "/3") route = <InvitationThree />;

  return <Suspense>{route}</Suspense>;
}
