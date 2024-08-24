import type {
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import getConfig from 'next/config';
import MiniSearch from "minisearch";
import ListOfGroups from "../../components/groups/ListOfGroups";
import Layout from "../../components/_shared/Layout";
import { useState } from "react";
import TopBar from "../../components/_shared/TopBar";
import SearchHero from "../../components/dataset/_shared/SearchHero";
import { CKAN, Group } from "@portaljs/ckan";
import { env } from "@env.mjs";

const backend_url = env.NEXT_PUBLIC_CKAN_URL

export async function getStaticProps() {
  const ckan = new CKAN(backend_url)
  const groups = await ckan.getGroupsWithDetails();
  return {
    props: {
      groups,
    },
    revalidate: 1800,
  };
}

export default function GroupsPage({
  groups,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const miniSearch = new MiniSearch({
    fields: ["description", "display_name", "name"], // fields to index for full-text search
    storeFields: ["description", "display_name", "image_display_url", "name"], // fields to return with search results
  });
  miniSearch.addAll(groups);
  return (
    <>
      <Head>
        <title>Ckan Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main miniSearch={miniSearch} groups={groups} />
    </>
  );
}

function Main({
  miniSearch,
  groups,
}: {
  miniSearch: MiniSearch<any>;
  groups: Array<Group>;
}) {
  const [searchString, setSearchString] = useState("");
  return (
    <Layout>
      <section className="row-start-1 row-end-3 col-span-full">
        <div
          className="bg-cover h-full bg-center bg-no-repeat bg-black flex flex-col"
          style={{
            backgroundImage: "url('/images/backgrounds/SearchHero.avif')",
          }}
        >
          <TopBar />
          <SearchHero
            title="Groups"
            searchValue={searchString}
            onChange={setSearchString}
          />
        </div>
      </section>
      <main className="custom-container py-8">
        <ListOfGroups
          groups={groups}
          searchString={searchString}
          miniSearch={miniSearch}
        />
      </main>
    </Layout>
  );
}
