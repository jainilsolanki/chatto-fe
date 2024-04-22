import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Dashboard</h1>
      <Link href={"/app/message"}>Home</Link>
    </main>
  );
}
