import Heading from "@components/_shared/Heading";
import { Button } from "@components/ui/button";
import {
  ArrowRightIcon,
  ArrowUturnRightIcon,
  BuildingLibraryIcon,
  ClipboardIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";
import { Dataset } from "@portaljs/ckan";

export default function DatasetsSection({
  datasets,
}: {
  datasets: Array<Dataset>;
}) {
  const _datasets = [
    {
      state: "TDC Formatted",
      title: "ADB Asian Transport Outlook Database",
      tags: ["Transport data", "Economic Impact of Transport"],
      description:
        "Asian Transport Outlook (ATO) is initiated by the Asian Development Bank (ADB) to strengthen the knowledge base on transport in the Asia-Pacific region. The ATO is developed in support of the planning and delivery of ADB Transport Sector Assistance. The ATO also supports Asian governments in transport policy development and delivery. ADB is working with other interested parties in developing the ATO as an instrument to track the implementation of the Sustainable Development Goals (SDG), the Paris Agreement and other relevant international agreements on sustainable development in the transport sector.",
      metadata_modified: "2024-02-20T14:00:00Z",
      organization: "TDC",
      region: "Worldwide",
    },
    {
      state: "TDC Harmonised",
      title: "TDC Global Vehicle Registration",
      tags: ["Vehicle registration", "Transport data"],
      description:
        "This dataset and documentation contains detailed information on vehicle registration around the world, a harmonised and up to date transport data set of historical values, 1970 - 2022.",
      metadata_modified: "2024-02-20T14:00:00Z",
      organization: "TDC",
      region: "Worldwide",
    },
    {
      state: "TDC Harmonised",
      title: "TDC Global Passenger Activity",
      tags: ["Passenger activity", "Transportation behaviour"],
      description:
        "This dataset contains survey data collected from residents of various urban areas, providing insights into transportation behaviors, preferences, and challenges. It can be used to inform the development of sustainable urban mobility solutions and policies.",
      metadata_modified: "2024-02-20T14:00:00Z",
      organization: "TDC",
      region: "Worldwide",
    },
  ];

  return (
    <div className="container py-[96px]">
      <div className="mx-auto text-center lg:max-w-[640px]">
        <Heading>Recently added</Heading>
        <p className="mt-4 text-xl font-normal text-gray-500">
          Explore available datasets and gain valuable insights into the
          transportation trends globally
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-[65px] md:grid-cols-2 lg:grid-cols-3">
        {_datasets.map((dataset, i) => {
          return (
            <div key={`recent-${i}`}>
              <div className="dataset-card flex flex-col gap-4">
                {/*Badge*/}
                <span className=" flex w-fit gap-1 rounded-[6px] bg-[#FDF6B2] px-[10px] py-[2px] text-xs font-medium text-[#723B13]">
                  <ShieldCheckIcon width={14} />
                  {dataset.state}
                </span>
                {/*Title*/}
                <h4 className="text-2xl font-bold leading-tight">
                  {dataset.title}
                </h4>
                {/*Tags*/}
                <div className="flex gap-2">
                  {dataset.tags.map((tag, x) => (
                    <span
                      key={`dataset-${tag}${x}`}
                      className="flex w-fit gap-1 rounded-[6px] bg-indigo-100 px-[10px] py-[2px] text-xs font-medium text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/*Description*/}
                <p className=" text-gray-500">{dataset.description}</p>
                {/*Other Metadatas*/}
                <div className="flex flex-col gap-[8px] text-xs font-medium text-gray-500 sm:flex-row">
                  <div className="flex gap-[4px]">
                    <BuildingLibraryIcon width={14} />
                    {dataset.organization}
                  </div>
                  <span className="hidden sm:block">•</span>
                  <div className="flex gap-[4px]">
                    <ClipboardIcon width={14} />
                    Updated on 23 March, 2023
                  </div>
                  <span className="hidden sm:block">•</span>
                  <div className="flex gap-[4px]">
                    <GlobeAltIcon width={14} />
                    {dataset.region}
                  </div>
                </div>
                {/*CTA*/}
                <Button
                  className="flex w-fit items-center gap-2 border border border-[#E5E7EB] hover:bg-slate-50"
                  variant="ghost"
                >
                  Show Dataset
                  <ArrowRightIcon width={20} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-[64px]">
        <Button
          variant="ghost"
          className="flex w-full border border-[#E5E7EB] hover:bg-slate-50"
        >
          Show more...
        </Button>
      </div>
    </div>
  );
}