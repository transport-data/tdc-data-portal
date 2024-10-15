import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import DashboardLayout from "@components/_shared/DashboardLayout";
import Loading from "@components/_shared/Loading";
import MyTopicsTabContent from "@components/dashboard/MyTopicsTabContent";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const TopicsDashboard: NextPage = () => {
  const { data: sessionData } = useSession();
  const isSysAdmin = sessionData?.user?.sysadmin == true;
  if (!isSysAdmin) {
    useRouter().push("/404");
    return <Loading />;
  }

  return (
    <>
      <NextSeo title="Newsfeed" />
      <DashboardLayout active="topics">
        <MyTopicsTabContent />
      </DashboardLayout>
    </>
  );
};

export default TopicsDashboard;
