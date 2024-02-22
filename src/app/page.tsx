import Link from "next/link";
import AppWrapper from "./wrappers/app.wrapper";

export default function Home() {
  return (
    <main>
      <AppWrapper>
        <h1>Dashboard</h1>
        <Link href={"/home"}>Home</Link>
      </AppWrapper>
    </main>
  );
}
