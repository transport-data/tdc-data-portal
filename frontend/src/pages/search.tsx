import { useEffect } from "react";
import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SWRConfig, unstable_serialize } from "swr";
import ListOfDatasets from "../components/search/ListOfDatasets";
import Layout from "../components/_shared/Layout";
import TopBar from "../components/_shared/TopBar";
import { PackageSearchOptions } from "@portaljs/ckan";
import getConfig from "next/config";
import { CKAN } from "@portaljs/ckan";
import DatasetSearchForm from "@/components/search/DatasetSearchForm";
import DatasetSearchFilters from "@/components/search/DatasetSearchFilters";
import { env } from "@env.mjs";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "@components/ui/button";
import { SearchIcon } from "lucide-react";
import DatasetsFilter from "@components/_shared/DatasetsFilter";
import DashboardDatasetCard, {
  DashboardDatasetCardProps,
} from "@components/_shared/DashboardDatasetCard";
import { usersMock } from "@components/dashboard/MyOrganizationTabContent";
import QuickFilterDropdown from "@components/ui/quick-filter-dropdown";

import example from "@data/example.json";
import datasets from "@data/datasets.json";
import sectors from "@data/sectors.json";
import DatasetSearchItem from "@components/search/DatasetSearchItem";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

export async function getStaticProps() {
  const backend_url = env.NEXT_PUBLIC_CKAN_URL;
  const ckan = new CKAN(backend_url);
  const search_result = await ckan.packageSearch({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
  });
  const groups = await ckan.getGroupsWithDetails();
  const tags = await ckan.getAllTags();
  const orgs = await ckan.getOrgsWithDetails(true);
  return {
    props: {
      fallback: {
        [unstable_serialize([
          "package_search",
          { offset: 0, limit: 5, tags: [], groups: [], orgs: [] },
        ])]: search_result,
      },
      groups,
      tags,
      orgs,
    },
  };
}

export default function DatasetSearch({
  fallback,
  groups,
  tags,
  orgs,
}: InferGetServerSidePropsType<typeof getStaticProps>): JSX.Element {
  const router = useRouter();
  const { q, sector, mode, service, region } = router.query;
  const [options, setOptions] = useState<PackageSearchOptions>({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
    query: q as string,
  });

  return (
    <>
      <Head>
        <title>Datasets</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout backgroundEffect effectSize="120px">
        <div className="container">
          <div className="pt-5">
            <div className="relative flex w-full items-center rounded-[12px] border border-[#D1D5DB] ">
              <input
                className="w-full grow rounded-[12px] border-0 py-[18px] pl-4 pr-[150px] focus:ring-1 focus:ring-[#006064] "
                placeholder="Find statistics, forecasts & studies"
              />
              <span
                className="absolute right-[125px] z-[10] cursor-pointer p-2 text-gray-500"
                role="button"
              >
                <XMarkIcon width={20} />
              </span>

              <Button
                type="submit"
                className="absolute right-[10px] top-[10px] flex gap-[8px]"
              >
                <MagnifyingGlassIcon width={20} />
                Search
              </Button>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-[64px]">
              <div className="w-full">
                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <span className="text-base font-medium text-gray-900">
                    Quick filters:
                  </span>
                  <div className="flex flex-wrap items-center gap-2 sm:flex-row sm:flex-nowrap">
                    <QuickFilterDropdown text="Sector" items={sectors} />
                    <QuickFilterDropdown text="Mode" items={example} />
                    <QuickFilterDropdown text="Service" items={example} />
                    <QuickFilterDropdown
                      text="Region"
                      defaultValue={region as string}
                      items={example}
                    />
                  </div>
                </div>
                <section className="mt-8 ">
                  <div className="flex flex-col gap-8">
                    {datasets.map((item, i) => (
                      <DatasetSearchItem
                        key={`dataset-result-${i}`}
                        {...item}
                      />
                    ))}
                  </div>
                  <Pagination className="mx-0 mt-8 justify-start">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </section>
              </div>
              <div className="order-first w-full lg:order-last lg:max-w-[306px]">
                <DatasetsFilter></DatasetsFilter>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
