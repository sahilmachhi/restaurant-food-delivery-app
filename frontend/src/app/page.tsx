import HomePage from "@/components/HomePage";
export const revalidate = false;
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
