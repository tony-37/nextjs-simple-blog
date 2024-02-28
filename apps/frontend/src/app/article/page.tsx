import { Suspense } from "react";
import Articles from "@/components/articles";
import Loading from "../dashboard/loading";

const Page = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Articles />
    </Suspense>
  );
};

export default Page;
