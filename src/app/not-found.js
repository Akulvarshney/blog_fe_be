import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Page not Found</h1>
      <Link href={"/"}>Go Back to Home Page</Link>
    </>
  );
}
