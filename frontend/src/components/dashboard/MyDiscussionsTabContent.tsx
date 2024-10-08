import {
  default as Guideline,
  default as Guidelines,
} from "@components/_shared/Guidelines";
import SimplifiedSearchBar from "@components/_shared/SimplifiedSearchBar";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { SelectableItemsList } from "@components/ui/selectable-items-list";
import { usersMock } from "./MyOrganizationTabContent";

export default () => {
  const discussions = [
    {
      upVotes: 12,
      emojis: 1,
      comments: 2,
      postTime: "3 weeks ago",
      section: "📚 Sources",
      topic: "Asia Transport Outlook",
      user: usersMock[0],
      title: "UIC",
      message: (
        <>
          <p className="text-[#6B7280]">
            The Union Internationale des Chemins de fer (UIC) (en: International
            Union of Railways) has a statistics unit: Information about the unit
            and its activities: https://uic.org/support-activities/sta…
          </p>
          <div className="mt-4 cursor-pointer font-semibold">Read more</div>
        </>
      ),
    },
    {
      upVotes: 12,
      emojis: 1,
      comments: 2,
      postTime: "3 weeks ago",
      section: "💬 General",
      topic: "Asia Transport Outlook",
      user: usersMock[0],
      title: "Concepts for Transport Data",
      message: (
        <>
          <p className="text-[#6B7280]">
            I wrote a post at
            https://paul.kishimoto.name/transport-data-concepts/ that “gives
            precise definitions for terms related to data, especially transport
            data, as well as processes and practices for w…
          </p>
          <div className="mt-4 cursor-pointer font-semibold">Read more</div>
        </>
      ),
    },
    {
      postTime: "3 weeks ago",
      section: "📚 Sources",
      topic: "Asia Transport Outlook",
      user: usersMock[0],
      title: "Climatiqs",
      message: (
        <>
          <p className="text-[#6B7280]">
            Climatiq is a database close to what we are aiming at, including all
            sectors not only transportation. Browsing the database is for free
            but automated API call is linked with fees. We can use it for…
          </p>
          <div className="mt-4 cursor-pointer font-semibold">Read more</div>
        </>
      ),
      upVotes: 12,
      emojis: 1,
      comments: 2,
    },
  ];

  return (
    <div>
      <SimplifiedSearchBar>
        <Button className="gap-2 px-3 py-2">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 8.5H4H8Z" fill="white" />
            <path
              d="M8 4.5V8.5M8 8.5V12.5M8 8.5H12M8 8.5H4"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          New discussion
        </Button>
      </SimplifiedSearchBar>
      <div className="mt-6 flex flex-col justify-between gap-8 sm:flex-row">
        <div className="space-y-12">
          <SelectableItemsList
            items={[
              {
                icon: (
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="currentColor"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.70039 10.5001H7.525L7.38804 10.6097L4.70039 12.7598V11.0001V10.5001H4.20039H2.80039C2.5617 10.5001 2.33278 10.4053 2.16399 10.2365C1.99521 10.0677 1.90039 9.83879 1.90039 9.6001V4.0001C1.90039 3.7614 1.99521 3.53248 2.16399 3.3637C2.33278 3.19492 2.5617 3.1001 2.80039 3.1001H11.2004C11.4391 3.1001 11.668 3.19492 11.8368 3.3637C12.0056 3.53248 12.1004 3.7614 12.1004 4.0001V9.6001C12.1004 9.83879 12.0056 10.0677 11.8368 10.2365C11.668 10.4053 11.4391 10.5001 11.2004 10.5001H7.70039ZM5.40039 6.1001V5.6001H4.90039H3.50039H3.00039V6.1001V7.5001V8.0001H3.50039H4.90039H5.40039V7.5001V6.1001ZM6.30039 5.6001H5.80039V6.1001V7.5001V8.0001H6.30039H7.70039H8.20039V7.5001V6.1001V5.6001H7.70039H6.30039ZM11.0004 6.1001V5.6001H10.5004H9.10039H8.60039V6.1001V7.5001V8.0001H9.10039H10.5004H11.0004V7.5001V6.1001Z" />
                  </svg>
                ),
                isSelected: true,
                value: "All discussions",
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="currentColor"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.005 2.43024L12.2674 2.00564L12.005 2.43025C12.034 2.44816 12.058 2.47318 12.0746 2.50294C12.0912 2.5327 12.0999 2.5662 12.0999 2.60028V10.9997C12.0999 11.0338 12.0912 11.0673 12.0746 11.0971C12.058 11.1269 12.034 11.1519 12.005 11.1698L12.2678 11.5952L12.005 11.1698C11.976 11.1877 11.9429 11.1979 11.9089 11.1994C11.8749 11.201 11.841 11.1938 11.8106 11.1786C11.8106 11.1786 11.8105 11.1786 11.8105 11.1786L7.22348 8.88539L6.4999 8.52365V9.33262V12.4C6.4999 12.4531 6.47883 12.5039 6.44132 12.5414C6.40382 12.5789 6.35295 12.6 6.2999 12.6H5.5999H5.59978C5.55779 12.6 5.51686 12.5868 5.48279 12.5623C5.44873 12.5377 5.42325 12.5031 5.40998 12.4632L5.40997 12.4632L4.17027 8.74198L4.05635 8.40002H3.6959H3.4999C3.07556 8.40002 2.66859 8.23145 2.36853 7.93139C2.06847 7.63133 1.8999 7.22436 1.8999 6.80002C1.8999 6.37567 2.06847 5.9687 2.36853 5.66865C2.66859 5.36859 3.07556 5.20002 3.4999 5.20002H6.134H6.25201L6.35756 5.14725L11.8105 2.42148C11.8105 2.42147 11.8105 2.42146 11.8106 2.42145C11.841 2.40624 11.8749 2.39906 11.9089 2.40059C11.9429 2.40213 11.976 2.41233 12.005 2.43024Z" />
                  </svg>
                ),
                isSelected: false,
                value: "Announcements",
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="currentColor"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.1365 3.3637L11.485 3.01517L11.1365 3.3637C11.3053 3.53248 11.4001 3.7614 11.4001 4.0001V11.0001C11.4001 11.2388 11.3053 11.4677 11.1365 11.6365C10.9677 11.8053 10.7388 11.9001 10.5001 11.9001H3.5001C3.2614 11.9001 3.03248 11.8053 2.8637 11.6365L2.51517 11.985L2.8637 11.6365C2.69492 11.4677 2.6001 11.2388 2.6001 11.0001V4.0001C2.6001 3.7614 2.69492 3.53248 2.8637 3.3637C3.03248 3.19492 3.2614 3.1001 3.5001 3.1001H10.5001C10.7388 3.1001 10.9677 3.19492 11.1365 3.3637ZM10.3001 5.4001C10.3001 5.08184 10.1737 4.77661 9.94862 4.55157C9.72358 4.32653 9.41836 4.2001 9.1001 4.2001C8.78184 4.2001 8.47661 4.32653 8.25157 4.55157C8.02653 4.77661 7.9001 5.08184 7.9001 5.4001V6.00637C7.88356 5.98762 7.8664 5.96935 7.84863 5.95157C7.62358 5.72653 7.31836 5.6001 7.0001 5.6001C6.68184 5.6001 6.37661 5.72653 6.15157 5.95157C5.92653 6.17661 5.8001 6.48184 5.8001 6.8001V8.10637C5.78356 8.08762 5.7664 8.06935 5.74863 8.05157C5.52358 7.82653 5.21836 7.7001 4.9001 7.7001C4.58184 7.7001 4.27661 7.82653 4.05157 8.05157C3.82653 8.27661 3.7001 8.58184 3.7001 8.9001V9.6001C3.7001 9.91836 3.82653 10.2236 4.05157 10.4486C4.27661 10.6737 4.58184 10.8001 4.9001 10.8001C5.21836 10.8001 5.52358 10.6737 5.74863 10.4486C5.82868 10.3686 5.89625 10.2784 5.9501 10.181C6.00394 10.2784 6.07152 10.3686 6.15157 10.4486C6.37661 10.6737 6.68184 10.8001 7.0001 10.8001C7.31836 10.8001 7.62358 10.6737 7.84863 10.4486C7.92868 10.3686 7.99625 10.2784 8.0501 10.181C8.10394 10.2784 8.17152 10.3686 8.25157 10.4486C8.47661 10.6737 8.78184 10.8001 9.1001 10.8001C9.41836 10.8001 9.72358 10.6737 9.94863 10.4486C10.1737 10.2236 10.3001 9.91836 10.3001 9.6001V5.4001Z" />
                  </svg>
                ),
                isSelected: false,
                value: "Datasets",
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="currentColor"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.2999 7.7001H6.0928L5.94635 7.84654L4.6999 9.09299V8.2001V7.7001H4.1999H2.7999C2.56121 7.7001 2.33229 7.60528 2.16351 7.43649C1.99472 7.26771 1.8999 7.03879 1.8999 6.8001V4.0001C1.8999 3.7614 1.99472 3.53248 2.16351 3.3637C2.33229 3.19492 2.56121 3.1001 2.7999 3.1001H7.6999C7.9386 3.1001 8.16752 3.19492 8.3363 3.3637C8.50508 3.53248 8.5999 3.7614 8.5999 4.0001V6.8001C8.5999 7.03879 8.50508 7.26771 8.3363 7.43649C8.16752 7.60528 7.9386 7.7001 7.6999 7.7001H6.2999Z" />
                    <path d="M10.5002 5.3999V6.7999C10.5002 7.54251 10.2052 8.2547 9.68005 8.7798C9.15495 9.3049 8.44276 9.5999 7.70015 9.5999H6.87975L5.64355 10.8368C5.83955 10.9411 6.06285 10.9999 6.30015 10.9999H7.70015L9.80015 13.0999V10.9999H11.2002C11.5715 10.9999 11.9276 10.8524 12.1901 10.5899C12.4527 10.3273 12.6002 9.97121 12.6002 9.5999V6.7999C12.6002 6.4286 12.4527 6.0725 12.1901 5.80995C11.9276 5.5474 11.5715 5.3999 11.2002 5.3999H10.5002Z" />
                  </svg>
                ),
                isSelected: false,
                value: "General",
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="currentColor"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.0226 9.7999H5.97728C5.88037 9.59947 5.73517 9.43187 5.57568 9.30605L5.57563 9.30601C5.20034 9.01003 4.92657 8.60449 4.79239 8.14575C4.65822 7.68701 4.67028 7.19786 4.82692 6.74629C4.98356 6.29473 5.27699 5.90318 5.66642 5.62607C6.05585 5.34896 6.52194 5.20006 6.9999 5.20006C7.47786 5.20006 7.94395 5.34896 8.33338 5.62607C8.72282 5.90318 9.01624 6.29473 9.17288 6.74629C9.32952 7.19786 9.34159 7.68701 9.20741 8.14575C9.07323 8.60449 8.79947 9.01003 8.42418 9.30601L8.42341 9.30661C8.26484 9.43217 8.11974 9.59956 8.0226 9.7999ZM3.89455 4.67735L3.8946 4.67729L3.88846 4.67115L3.39756 4.18025C3.36245 4.14278 3.34306 4.0932 3.34351 4.04177C3.34397 3.98933 3.365 3.93916 3.40208 3.90208C3.43916 3.865 3.48933 3.84397 3.54177 3.84351C3.5932 3.84306 3.64278 3.86245 3.68025 3.89756L4.17115 4.38846L4.1711 4.38851L4.17735 4.39455C4.19645 4.413 4.21168 4.43506 4.22217 4.45947L4.68157 4.26212L4.22217 4.45947C4.23265 4.48387 4.23817 4.51011 4.2384 4.53667C4.23863 4.56322 4.23357 4.58956 4.22351 4.61414C4.21346 4.63872 4.1986 4.66105 4.17983 4.67983C4.16105 4.6986 4.13872 4.71346 4.11414 4.72351C4.08956 4.73357 4.06322 4.73863 4.03667 4.7384C4.01011 4.73817 3.98387 4.73265 3.95947 4.72217L3.76212 5.18157L3.95947 4.72217C3.93506 4.71168 3.913 4.69645 3.89455 4.67735ZM7.14132 2.45848C7.17883 2.49599 7.1999 2.54686 7.1999 2.5999V3.2999C7.1999 3.35295 7.17883 3.40382 7.14132 3.44132C7.10382 3.47883 7.05295 3.4999 6.9999 3.4999C6.94686 3.4999 6.89599 3.47883 6.85848 3.44132C6.82097 3.40382 6.7999 3.35295 6.7999 3.2999V2.5999C6.7999 2.54686 6.82097 2.49599 6.85848 2.45848C6.89599 2.42097 6.94686 2.3999 6.9999 2.3999C7.05295 2.3999 7.10382 2.42097 7.14132 2.45848ZM10.6563 4.04177C10.6567 4.0932 10.6374 4.14278 10.6022 4.18025L10.1153 4.66716C10.0779 4.70226 10.0283 4.72164 9.97687 4.72119C9.92443 4.72074 9.87427 4.6997 9.83718 4.66262L9.48363 5.01618L9.83718 4.66262C9.8001 4.62554 9.77907 4.57538 9.77861 4.52294C9.77816 4.47151 9.79755 4.42193 9.83266 4.38445L10.3196 3.89756C10.357 3.86245 10.4066 3.84306 10.458 3.84351C10.5105 3.84397 10.5606 3.865 10.5977 3.90208C10.6348 3.93916 10.6558 3.98933 10.6563 4.04177ZM12.0999 7.4999C12.0999 7.55295 12.0788 7.60382 12.0413 7.64132C12.0038 7.67883 11.9529 7.6999 11.8999 7.6999H11.1999C11.1469 7.6999 11.096 7.67883 11.0585 7.64132C11.021 7.60382 10.9999 7.55294 10.9999 7.4999C10.9999 7.44686 11.021 7.39599 11.0585 7.35848C11.096 7.32097 11.1469 7.2999 11.1999 7.2999H11.8999C11.9529 7.2999 12.0038 7.32097 12.0413 7.35848C12.0788 7.39599 12.0999 7.44686 12.0999 7.4999ZM2.9999 7.4999C2.9999 7.55295 2.97883 7.60382 2.94132 7.64132C2.90382 7.67883 2.85295 7.6999 2.7999 7.6999H2.0999C2.04686 7.6999 1.99599 7.67883 1.95848 7.64132C1.92097 7.60382 1.8999 7.55295 1.8999 7.4999C1.8999 7.44686 1.92097 7.39599 1.95848 7.35848C1.99599 7.32097 2.04686 7.2999 2.0999 7.2999H2.7999C2.85295 7.2999 2.90382 7.32097 2.94132 7.35848C2.97883 7.39599 2.9999 7.44686 2.9999 7.4999ZM6.0999 11.6999V11.4999H7.8999V11.6999C7.8999 11.9386 7.80508 12.1675 7.6363 12.3363C7.46752 12.5051 7.2386 12.5999 6.9999 12.5999C6.76121 12.5999 6.53229 12.5051 6.36351 12.3363C6.19472 12.1675 6.0999 11.9386 6.0999 11.6999Z" />
                  </svg>
                ),
                isSelected: false,
                value: "Ideas and Requests",
              },
              {
                icon: (
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="currentColor"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.85076 9.79981C3.18588 9.79887 2.52715 9.90701 1.90039 10.1183V4.18582C2.50081 3.93753 3.15932 3.79981 3.85039 3.79981L3.85114 3.79981C4.52097 3.7988 5.18333 3.93033 5.80039 4.18569V8.89981C5.80039 9.21807 5.92682 9.52329 6.15186 9.74834C6.37691 9.97338 6.68213 10.0998 7.00039 10.0998C7.31865 10.0998 7.62388 9.97338 7.84892 9.74834C8.07396 9.52329 8.20039 9.21807 8.20039 8.89981V4.18582C8.80081 3.93753 9.45932 3.79981 10.1504 3.79981L10.1511 3.79981C10.821 3.7988 11.4833 3.93033 12.1004 4.18569V10.1185C11.488 9.91214 10.8322 9.79987 10.1509 9.79981M3.85076 9.79981C5.00254 9.79988 6.08075 10.119 7.00046 10.6752C7.94899 10.102 9.03837 9.7981 10.1509 9.79981M3.85076 9.79981C3.85064 9.79981 3.85051 9.79981 3.85039 9.79981V10.2998L3.85113 9.79981C3.85101 9.79981 3.85088 9.79981 3.85076 9.79981ZM10.1509 9.79981C10.1507 9.79981 10.1506 9.79981 10.1504 9.79981V10.2998L10.1512 9.79981C10.1511 9.79981 10.151 9.79981 10.1509 9.79981ZM1.40039 10.8626C1.56384 10.783 1.73071 10.7117 1.90039 10.6487L1.40039 10.3118L1.40039 10.8626Z" />
                  </svg>
                ),
                isSelected: false,
                value: "Sources",
              },
            ]}
            onSelectedItem={() => ""}
            title="Categories"
          />
          <div className="lg:hidden">
            <Guidelines />
          </div>
        </div>
        <div className="w-fit">
          <h3 className="mb-4 text-sm font-semibold">Discussions</h3>
          <section className="flex flex-col gap-4">
            {discussions.map((x) => (
              <div className="flex flex-col gap-3 rounded-lg bg-white p-6">
                <div className="flex items-center gap-3 text-sm">
                  <img className="h-8 w-8 rounded-full" src={x.user!.icon} />
                  <div>
                    <span className="text-[#111928]">{x.user?.name}</span>
                    <p className="text-[#6B7280]">
                      Posted <span className="font-bold">{x.topic}</span> in{" "}
                      <span className="font-bold">{x.section}</span> •{" "}
                      {x.postTime}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold">{x.title}</h4>
                  {x.message}
                </div>
                <div className="flex justify-between text-sm text-[#111928]">
                  <div className="flex gap-2">
                    <Badge
                      className="flex cursor-pointer items-center rounded-xl border"
                      variant={"outline"}
                      icon={
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.41232 7.91192L6.84667 4.47757L7.70022 3.62402V4.83113V14.0999C7.70022 14.1795 7.73183 14.2558 7.78809 14.3121C7.84435 14.3683 7.92065 14.3999 8.00022 14.3999C8.07979 14.3999 8.15609 14.3683 8.21235 14.3121C8.26861 14.2558 8.30022 14.1795 8.30022 14.0999V4.83113V3.62402L9.15377 4.47757L12.5844 7.90816C12.6407 7.96137 12.7154 7.99076 12.793 7.99008C12.8717 7.9894 12.9469 7.95785 13.0025 7.90223C13.0581 7.8466 13.0897 7.77136 13.0904 7.6927C13.0911 7.61514 13.0617 7.54038 13.0085 7.48407L8.21232 2.68793C8.15606 2.63169 8.07977 2.6001 8.00022 2.6001C7.9207 2.6001 7.84443 2.63167 7.78817 2.68788L3.41232 7.91192ZM3.41232 7.91192C3.4123 7.91194 3.41228 7.91196 3.41227 7.91197C3.35601 7.96818 3.27974 7.99976 3.20022 7.99976C3.12072 7.99976 3.04447 7.9682 2.98823 7.91203C2.93199 7.85577 2.90039 7.77948 2.90039 7.69993C2.90039 7.6204 2.93196 7.54413 2.98817 7.48788C2.98819 7.48786 2.98821 7.48784 2.98823 7.48783L7.78812 2.68793L3.41232 7.91192Z"
                            fill="#6B7280"
                            stroke="#6B7280"
                          />
                        </svg>
                      }
                    >
                      {x.upVotes}
                    </Badge>
                    <Badge
                      className="flex cursor-pointer items-center rounded-xl border"
                      variant={"outline"}
                      icon={
                        <svg
                          width="16"
                          height="17"
                          viewBox="0 0 16 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.99961 14.9001C9.69699 14.9001 11.3249 14.2258 12.5251 13.0256C13.7253 11.8253 14.3996 10.1975 14.3996 8.5001C14.3996 6.80271 13.7253 5.17485 12.5251 3.97461C11.3249 2.77438 9.69699 2.1001 7.99961 2.1001C6.30222 2.1001 4.67436 2.77438 3.47413 3.97461C2.27389 5.17485 1.59961 6.80271 1.59961 8.5001C1.59961 10.1975 2.27389 11.8253 3.47413 13.0256C4.67436 14.2258 6.30222 14.9001 7.99961 14.9001ZM5.59961 7.7001C5.81178 7.7001 6.01527 7.61581 6.16529 7.46578C6.31532 7.31575 6.39961 7.11227 6.39961 6.9001C6.39961 6.68792 6.31532 6.48444 6.16529 6.33441C6.01527 6.18438 5.81178 6.1001 5.59961 6.1001C5.38744 6.1001 5.18395 6.18438 5.03392 6.33441C4.88389 6.48444 4.79961 6.68792 4.79961 6.9001C4.79961 7.11227 4.88389 7.31575 5.03392 7.46578C5.18395 7.61581 5.38744 7.7001 5.59961 7.7001ZM11.1996 6.9001C11.1996 7.11227 11.1153 7.31575 10.9653 7.46578C10.8153 7.61581 10.6118 7.7001 10.3996 7.7001C10.1874 7.7001 9.98395 7.61581 9.83392 7.46578C9.68389 7.31575 9.59961 7.11227 9.59961 6.9001C9.59961 6.68792 9.68389 6.48444 9.83392 6.33441C9.98395 6.18438 10.1874 6.1001 10.3996 6.1001C10.6118 6.1001 10.8153 6.18438 10.9653 6.33441C11.1153 6.48444 11.1996 6.68792 11.1996 6.9001ZM10.8284 11.3281C10.9027 11.2538 10.9616 11.1655 11.0018 11.0684C11.0419 10.9713 11.0626 10.8673 11.0626 10.7622C11.0625 10.6571 11.0418 10.5531 11.0016 10.456C10.9613 10.359 10.9023 10.2708 10.828 10.1965C10.7537 10.1222 10.6655 10.0633 10.5684 10.0231C10.4713 9.98296 10.3672 9.9623 10.2621 9.96234C10.157 9.96237 10.053 9.98311 9.95594 10.0234C9.85887 10.0636 9.77069 10.1226 9.69641 10.1969C9.24634 10.6468 8.636 10.8996 7.99961 10.8996C7.36321 10.8996 6.75288 10.6468 6.30281 10.1969C6.1528 10.0468 5.94931 9.96241 5.73709 9.96234C5.52488 9.96226 5.32132 10.0465 5.17121 10.1965C5.0211 10.3465 4.93672 10.55 4.93665 10.7622C4.93657 10.9744 5.0208 11.178 5.17081 11.3281C5.54226 11.6996 5.98326 11.9944 6.46863 12.1955C6.954 12.3965 7.47423 12.5 7.99961 12.5C8.52499 12.5 9.04522 12.3965 9.53059 12.1955C10.016 11.9944 10.457 11.6996 10.8284 11.3281Z"
                            fill="#6B7280"
                          />
                        </svg>
                      }
                    >
                      {x.emojis}
                    </Badge>
                  </div>
                  <div className="flex cursor-pointer gap-[2.5px]">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3333 5.83317H12.6667C13.0203 5.83317 13.3594 5.97365 13.6095 6.2237C13.8595 6.47374 14 6.81288 14 7.1665V11.1665C14 11.5201 13.8595 11.8593 13.6095 12.1093C13.3594 12.3594 13.0203 12.4998 12.6667 12.4998H11.3333V15.1665L8.66667 12.4998H6C5.82489 12.5 5.65146 12.4656 5.48969 12.3986C5.32792 12.3315 5.18098 12.2332 5.05733 12.1092M5.05733 12.1092L7.33333 9.83317H10C10.3536 9.83317 10.6928 9.69269 10.9428 9.44265C11.1929 9.1926 11.3333 8.85346 11.3333 8.49984V4.49984C11.3333 4.14622 11.1929 3.80708 10.9428 3.55703C10.6928 3.30698 10.3536 3.1665 10 3.1665H3.33333C2.97971 3.1665 2.64057 3.30698 2.39052 3.55703C2.14048 3.80708 2 4.14622 2 4.49984V8.49984C2 8.85346 2.14048 9.1926 2.39052 9.44265C2.64057 9.69269 2.97971 9.83317 3.33333 9.83317H4.66667V12.4998L5.05733 12.1092Z"
                        stroke="#6B7280"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{x.comments} Comments</span>
                  </div>
                </div>
              </div>
            ))}

            <nav aria-label="Page navigation example">
              <ul className="flex h-8 items-center -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-2.5 w-2.5 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="z-10 flex h-8 items-center justify-center border  border-e-0 border-gray-300 bg-[#F3F4F6] px-3 leading-tight text-[#374151] dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-2.5 w-2.5 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>
        <div className="hidden lg:block">
          <Guideline />
        </div>
      </div>
    </div>
  );
};
