import Link from "next/link";
import Layout from "./components/Layout/layout";

export default function Home() {
  return (
    <div>
      <Layout>
        <Link href={"/Ahihi"}>hihi </Link>
        <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum enim accusamus consectetur dolore voluptatibus sapiente nostrum velit eum, explicabo vel odit repudiandae rerum molestias! Iusto incidunt officiis accusamus numquam odio?</div>
        <div>đấ</div>
      </Layout>
    </div>
  );
}
