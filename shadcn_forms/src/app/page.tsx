import { getFirstUser } from "@/lib/actions";
import LoginForm from "./login-form";

export default async function Home() {
  const firstUser = await getFirstUser();
  
  return (
    <LoginForm {...firstUser[0]} />
  );
}