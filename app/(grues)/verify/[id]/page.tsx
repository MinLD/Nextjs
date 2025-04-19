import Layout from "@/app/components/Layout/layout";
import Verify from "@/app/components/verify";

function VerifyPage({ params }: { params: { id?: string } }) {
  return (
    <div>
      <Layout>
        <Verify _id={params.id!} />
      </Layout>
    </div>
  );
}

export default VerifyPage;
