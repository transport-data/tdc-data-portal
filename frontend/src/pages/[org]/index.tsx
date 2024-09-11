import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import OrgNavCrumbs from "../../components/organization/individualPage/OrgNavCrumbs";
import OrgInfo from "../../components/organization/individualPage/OrgInfo";
import Layout from "../../components/_shared/Layout";
import Tabs from "../../components/_shared/TabsPublic";
import { CKAN } from "@portaljs/ckan";
import styles from "@/styles/DatasetInfo.module.scss";
import DatasetList from "../../components/_shared/DatasetList";
import getConfig from "next/config";
import { env } from "@env.mjs";
const backend_url = env.NEXT_PUBLIC_CKAN_URL;

export async function getStaticPaths() {
  const ckan = new CKAN(backend_url);
  const orgList = await ckan.getOrgList();
  const paths = orgList.map((org: string) => ({
    params: { org: org },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  let orgName = context.params?.org as string | undefined;
  if (!orgName) {
    return {
      notFound: true,
    };
  }
  orgName = orgName.includes("@") ? orgName.split("@")[1] : orgName;
  const ckan = new CKAN(backend_url);
  let org = await ckan.getOrgDetails(orgName ?? "");
  if (org?.packages) {
    const packagesWithResources = await Promise.all(
      org.packages.map(async (dataset) => ckan.getDatasetDetails(dataset.name))
    );
    org = { ...org, packages: packagesWithResources };
  }
  if (!org) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      org,
    },
    revalidate: 1800,
  };
};

export default function OrgPage({
  org,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const tabs = [
    {
      id: "datasets",
      content: org.packages ? (
        <DatasetList datasets={org.packages ? org.packages : []} />
      ) : (
        ""
      ),
      title: "Datasets",
    },
  ];
  return (
    <>
      <Head>
        <title>{org.title || org.name + " - Organization Page"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {org && (
        <Layout>
          <div className="grid-rows-datasetpage-hero grid">
            <section className="col-span-full row-start-1 row-end-3">
              <div
                className="flex h-full flex-col bg-black bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/backgrounds/SearchHero.avif')",
                }}
              >
                <OrgNavCrumbs
                  org={{
                    name: org?.name,
                    title: org?.title,
                  }}
                />
                <div
                  className="custom-container mx-auto grid grow items-center"
                  style={{ marginBlock: "8rem" }}
                >
                  <div className="col-span-1">
                    <h1 className="text-6xl font-black text-white">
                      {org.title}
                    </h1>
                  </div>
                </div>
              </div>
            </section>
            <section className="col-span-full row-span-2 row-start-2 grid">
              <div className="custom-container">
                {org && (
                  <main className={styles.main}>
                    <OrgInfo org={org} />
                    <div>
                      <Tabs items={tabs} />
                    </div>
                  </main>
                )}
              </div>
            </section>
          </div>
        </Layout>
      )}
    </>
  );
}
