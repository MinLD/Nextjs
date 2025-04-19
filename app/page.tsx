import Banner from "@/app/components/banner";
import Layout from "./components/Layout/layout";

import { auth } from "@/auth";
export default async function Home() {
  const session: any = await auth();

  return (
    <div>
      <Layout>
        <Banner session={session} />
      </Layout>
    </div>
  );
}
