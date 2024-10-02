import { Badge } from "@components/ui/badge";
import { listGroups } from "@utils/group";
import * as getCountryISO2 from "country-iso-3-to-2";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Layout from "../components/_shared/Layout";
import Link from "next/link";
import React from "react";

export async function getServerSideProps(ctx) {
  return {
    props: {
      groups: (
        await listGroups({
          apiKey: ctx.session?.apiKey || "",
          type: "geography",
          showCoordinates: true,
          limit: 350,
        })
      ).filter((x) => x.geography_type === "country"),
    },
  };
}

export default function DatasetsPage({
  groups,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const letterMap = new Map<string, { name: string; title: string }[]>();
  groups.forEach((country) => {
    let letter = country.title[0]!.toLowerCase();
    if (letter === "Å".toLowerCase()) letter = "a";
    const array = letterMap.get(letter);
    if (!array) {
      letterMap.set(letter, [{ name: country.name, title: country.title }]);
    } else {
      array.push({ name: country.name, title: country.title });
    }
  });

  const router = useRouter();

  useEffect(() => {
    const map = new maplibregl.Map({
      style: style,
      container: "map",
      interactive: window.innerWidth < 787,
      renderWorldCopies: false,
      scrollZoom: false,
      maxZoom: window.innerWidth < 787 ? 0.6 : null,
    });

    map.on("load", () => {
      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "customized-tooltip",
      });

      let maxOfDatasets = 0;

      groups.forEach((x) => {
        if (maxOfDatasets < x.package_count) maxOfDatasets = x.package_count;
      });

      const getFillColor = (packageCount: number) => {
        if (packageCount === 0) return "#D1D5DB";

        const colors = interpolateColors(
          hexToRgb("#B2EBF2"),
          hexToRgb("#006064"),
          10
        );

        let index = 0;
        const percentage = `${(packageCount / maxOfDatasets) * 100}`;

        if (/\d/g.test(percentage[1]!)) {
          index = Number(percentage[0]!);
        }

        if (/\d\d\d/g.test(percentage.slice(0, 3)!)) {
          index = colors.length - 1;
        }

        return colors[index];
      };

      groups.forEach((x) => {
        if (x.geography_shape) {
          map.addSource(x.id, {
            type: "geojson",
            data: x.geography_shape,
          });
          map.addLayer({
            id: x.id,
            type: "fill",
            source: x.id,
            paint: {
              "fill-color": getFillColor(x.package_count),
              "fill-outline-color": "white",
            },
          });

          map.on("click", x.id, (e) => {
            router.push(
              `/search?region=${(e.features || [])[0]?.properties.ISO_A2}`
            );
          });

          map.on("mouseenter", x.id, () => {
            map.getCanvas().style.cursor = "pointer";
          });

          map.on("mousemove", x.id, (e) => {
            if (popup._container) {
              popup._container.style.minWidth = "194px";
              popup._container.style.cursor = "pointer";
              popup._container.style.width = "194px";
              popup._container.style.height = "171px";
              popup._container.style.minHeight = "171px";
            }

            popup
              .setLngLat(e.lngLat)
              .setHTML(
                `        
              <div>
              <img style="object-fit: cover; width: 40px; height: 40px; border-radius: 9999px;" src="${
                x.image_display_url || x.image_url
              }"></img>
                
              <div class="country-title" style="color: white'; font-size: 14px">${
                x.title
              }
              </div>
              <div style="color: #9CA3AF">${getCountryISO2(
                x.name.toUpperCase()
              )}</div>


                </div>
                
                <div style="color: white; font-size: 30px">${
                  x.package_count
                }+</div>
                <div style="color: #9CA3AF; font-size: 16px">Datasets</div>
              `
              )
              .addTo(map);
          });

          map.on("mouseleave", x.id, () => {
            map.getCanvas().style.cursor = "";
            popup.remove();
          });
        }
      });

      // Add a layer showing the countries polygons.
      // TODO remove it
      // map.addLayer({
      //   id: "countries-layer",
      //   type: "fill",
      //   source: "countries",
      //   paint: {
      //     "fill-color": [
      //       "match",
      //       ["get", "ISO_A3"],
      //       top,
      //       "#006064",
      //       countriesWithMediumAmountOfDatasets,
      //       "#00BCD4",
      //       "#D1D5DB",
      //     ],
      //     "fill-outline-color": "white",
      //   },
      // });

      // map.on("click", "countries-layer", (e) => {
      //   router.push(
      //     `/search?region=${(e.features || [])[0]?.properties.ISO_A2}`
      //   );
      // });

      // map.on("mouseenter", "countries-layer", () => {
      //   map.getCanvas().style.cursor = "pointer";
      // });

      // map.on("mousemove", "countries-layer", (e) => {
      //   if (popup._container) {
      //     popup._container.style.minWidth = "194px";
      //     popup._container.style.cursor = "pointer";
      //     popup._container.style.width = "194px";
      //     popup._container.style.height = "171px";
      //     popup._container.style.minHeight = "171px";
      //   }

      //   if (
      //     (e.features || []).length > 0 &&
      //     !(
      //       (e.features || [])[0]?.properties.ADMIN ===
      //       popup
      //         .getElement()
      //         ?.getElementsByTagName("div")
      //         ?.item(1)
      //         ?.getElementsByTagName("div")
      //         ?.item(0)
      //         ?.getElementsByClassName("country-title")
      //         ?.item(0)
      //         ?.textContent?.trim()
      //     )
      //   ) {
      //     popup
      //       .setLngLat(e.lngLat)
      //       .setHTML(
      //         `
      //         <div>
      //         <img style="object-fit: none; width: 40px; height: 40px; border-radius: 9999px" src="https://flagsapi.com/${
      //           (e.features || [])[0]?.properties.ISO_A2
      //         }/flat/64.png"></img>

      //         <div class="country-title" style="color: white'; font-size: 14px">${
      //           (e.features || [])[0]?.properties.ADMIN
      //         }
      //         </div>
      //         <div style="color: #9CA3AF">${
      //           (e.features || [])[0]?.properties.ISO_A2
      //         }</div>

      //           </div>

      //           <div style="color: white; font-size: 30px">${1650}+</div>
      //           <div style="color: #9CA3AF; font-size: 16px">Datasets</div>
      //         `
      //       )
      //       .addTo(map);
      //   }
      // });

      // map.on("mouseleave", "countries-layer", () => {
      //   map.getCanvas().style.cursor = "";
      //   popup.remove();
      // });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Geography</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout backgroundEffect effectSize="40%">
        <div className="container">
          <div>
            <div className="mb-8 border-b-[1px] border-[#E5E7EB] pb-5">
              <h1 className="text-[30px] font-bold text-[#111928]">
                All Geographies
              </h1>
              <h5 className="text-base text-[#6B7280]">
                Datasets by country & geography
              </h5>
            </div>
            <div
              className="flex max-h-[523px] min-h-[523px] sm:max-h-[823px] sm:min-h-[823px]"
              id="map"
            ></div>
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <div className="mb-24 flex max-w-[1280px] flex-col flex-wrap gap-4 pt-20 sm:max-h-[6273px] md:max-h-[4573px] lg:max-h-[3473px] xl:max-h-[2473px]">
              {Array.from(letterMap.keys()).map((letter) => (
                <LetterCard
                  letter={letter}
                  countries={letterMap.get(letter) || []}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const LetterCard = ({
  countries,
  letter,
}: {
  letter: string;
  countries: { name: string; title: string }[];
}) => (
  <div className="flex h-fit max-h-fit max-w-full grid-rows-1 flex-col gap-5 rounded-lg bg-white p-6 shadow-md sm:max-w-[200px] xl:w-[200px]">
    <Badge
      className="h-12 w-12 items-center justify-center px-3"
      variant={"success"}
    >
      <span className="text-[30px] font-extrabold uppercase">{letter}</span>
    </Badge>
    <div className="flex flex-col gap-3">
      {countries.map((word) => (
        <Link
          href={`/search?region=${word.name}`}
          className="cursor-pointer break-words text-[#6B7280] hover:underline"
        >
          {word.title}
        </Link>
      ))}
    </div>
  </div>
);

const style: any = {
  id: "43f36e14-e3f5-43c1-84c0-50a9c80dc5c7",
  name: "MapLibre",
  zoom: 0.8619833357855968,
  pitch: 0,
  center: [17.65431710431244, 41.954120326746775],
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "rgb(228 250 238)",
        "background-opacity": 0,
      },
      filter: ["all"],
      layout: {
        visibility: "visible",
      },
      maxzoom: 24,
    },
    {
      id: "coastline",
      type: "line",
      paint: {
        "line-blur": 0.5,
        "line-color": "white",
        "line-width": 2,
      },
      filter: ["all"],
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      source: "maplibre",
      maxzoom: 24,
      minzoom: 24,
      "source-layer": "countries",
    },
    {
      id: "countries-fill",
      type: "fill",
      paint: {
        "fill-color": "#D1D5DB",
      },
      filter: ["all"],
      layout: {
        visibility: "visible",
      },
      source: "maplibre",
      maxzoom: 24,
      "source-layer": "countries",
    },
    {
      id: "countries-boundary",
      type: "line",
      paint: {
        "line-color": "rgba(255, 255, 255, 1)",
        "line-width": 2,
        "line-opacity": {
          stops: [
            [3, 0.5],
            [6, 1],
          ],
        },
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
        visibility: "visible",
      },
      source: "maplibre",
      maxzoom: 24,
      "source-layer": "countries",
    },
    {
      id: "geolines-label",
      type: "symbol",
      paint: {
        "text-color": "#1077B0",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(255, 255, 255, 1)",
        "text-halo-width": 1,
      },
      filter: ["all", ["!=", "name", "International Date Line"]],
      layout: {
        "text-font": ["Open Sans Semibold"],
        "text-size": {
          stops: [
            [2, 12],
            [6, 16],
          ],
        },
        "text-field": "{name}",
        visibility: "visible",
        "symbol-placement": "line",
      },
      source: "maplibre",
      maxzoom: 24,
      minzoom: 24,
      "source-layer": "geolines",
    },
    {
      id: "countries-label",
      type: "symbol",
      paint: {
        "text-color": "rgba(8, 37, 77, 1)",
        "text-halo-blur": {
          stops: [
            [2, 0.2],
            [6, 0],
          ],
        },
        "text-halo-color": "rgba(255, 255, 255, 1)",
        "text-halo-width": {
          stops: [
            [2, 1],
            [6, 1.6],
          ],
        },
      },
      filter: ["all"],
      layout: {
        "text-font": ["Open Sans Semibold"],
        "text-size": {
          stops: [
            [2, 10],
            [4, 12],
            [6, 16],
          ],
        },
        "text-field": {
          stops: [
            [2, "{ABBREV}"],
            [4, "{NAME}"],
          ],
        },
        visibility: "visible",
        "text-max-width": 10,
        "text-transform": {
          stops: [
            [0, "uppercase"],
            [2, "none"],
          ],
        },
      },
      source: "maplibre",
      maxzoom: 24,
      minzoom: 24,
      "source-layer": "centroids",
    },
    {
      id: "crimea-fill",
      type: "fill",
      source: "crimea",
      paint: {
        "fill-color": "#D1D5DB",
      },
    },
  ],
  bearing: 0,
  sources: {
    maplibre: {
      url: "https://demotiles.maplibre.org/tiles/tiles.json",
      type: "vector",
    },
    crimea: {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [34.00905273547181, 46.55925987559425],
              [33.64325260204026, 46.34533545368038],
              [33.628682598560204, 46.12569762665683],
              [33.64292861730951, 46.10476396128129],
              [33.648473474905984, 46.09033047763651],
              [33.63876482059936, 46.077976784785335],
              [33.62782672238245, 46.06747935719011],
              [33.62911357645072, 46.05708111413949],
              [33.642686868727424, 46.02192963417187],
              [33.6429723910654, 46.01521185644708],
              [33.636224138774026, 46.006705833212465],
              [33.63052626465907, 45.99692992186792],
              [33.63193836679693, 45.988472992911284],
              [33.64276684834442, 45.984575360297384],
              [33.646928693041986, 45.97981936210982],
              [33.638745893564305, 45.96829769147004],
              [33.61958133326394, 45.951176418494185],
              [33.63181380398527, 45.9445404758078],
              [33.638921676216, 45.94737012930554],
              [33.64561542516918, 45.95403251372139],
              [33.65666403976448, 45.95687114427736],
              [33.6825817382811, 45.95878100879199],
              [33.738791807037614, 45.94836945227263],
              [33.758180142697, 45.94072970008301],
              [33.77735917288169, 45.92923970233858],
              [33.75927796793485, 45.92241179584471],
              [33.72529865009221, 45.91587363154565],
              [33.70875012326826, 45.91008760988058],
              [33.69378857293381, 45.91480850795665],
              [33.69092650243843, 45.89657370898402],
              [33.693592356906805, 45.87271465766318],
              [33.69226765972388, 45.86041392418218],
              [33.6704813511748, 45.8584273836251],
              [33.65936345808916, 45.85944682601249],
              [33.653870582376726, 45.86425922279372],
              [33.65107345584843, 45.87089907254003],
              [33.63067378180233, 45.88040685247182],
              [33.61945300059696, 45.88147266102649],
              [33.60987421595539, 45.88048951126686],
              [33.59906957603934, 45.877610457390375],
              [33.57828877687868, 45.86810261756233],
              [33.55357394560386, 45.84700625141778],
              [33.530220674480375, 45.84221983655459],
              [33.5192297395441, 45.84121682367507],
              [33.50832088442496, 45.84313067048083],
              [33.48901101848409, 45.85268298292175],
              [33.482152996405716, 45.854578171799005],
              [33.46719955896293, 45.849912739405056],
              [33.42447496599681, 45.83075886348303],
              [33.40940172404095, 45.82691953557702],
              [33.37918350072067, 45.802867525073566],
              [33.37362145339398, 45.79619281922518],
              [33.33805543634864, 45.78577808972071],
              [33.26498872665803, 45.75410774187094],
              [33.22887541283427, 45.75131270772724],
              [33.19548267281132, 45.7644887297206],
              [33.1789202379222, 45.78010311364778],
              [33.1688456078636, 45.78470227904205],
              [33.161012432811674, 45.77921593899549],
              [33.15951585299757, 45.76864464913777],
              [33.165962301438725, 45.762685940125465],
              [33.1750888126426, 45.759218220695715],
              [33.181464829753, 45.75490447884948],
              [33.17613930782352, 45.7437961960276],
              [33.16369168844906, 45.735912015025065],
              [32.93692665480876, 45.662114646778264],
              [32.86839112407645, 45.63044340698664],
              [32.83803944575723, 45.60834075026611],
              [32.82702772424804, 45.59576101516498],
              [32.82433467080986, 45.58705137380335],
              [32.82563941622885, 45.579605763895614],
              [32.82993674258438, 45.56978311819469],
              [32.82851940940563, 45.56227808675749],
              [32.813310142795274, 45.55930933158257],
              [32.80213583657516, 45.560145780074464],
              [32.78258622159436, 45.565158335073846],
              [32.77333922465823, 45.56689313356526],
              [32.758306734735356, 45.565030173463356],
              [32.750177256846115, 45.55943726334968],
              [32.74340732630185, 45.55261895849793],
              [32.73524549539499, 45.54598788110354],
              [32.72031700779701, 45.53735927760957],
              [32.70536040418847, 45.53169142131733],
              [32.68589438933773, 45.52663379187257],
              [32.66370583186284, 45.52563107058867],
              [32.64312077736798, 45.52188979044979],
              [32.525284074162556, 45.45838108691365],
              [32.49490411219156, 45.43524910229854],
              [32.48107654411925, 45.408986638827514],
              [32.48514589713025, 45.39458067125969],
              [32.51256939517424, 45.34060655033625],
              [32.535915460470335, 45.33777248012882],
              [32.57027153843481, 45.32510892683359],
              [32.590830644991826, 45.32038723212662],
              [32.66380378113439, 45.320421746458976],
              [32.67760722618917, 45.32609231279554],
              [32.71316246802607, 45.353283572618125],
              [32.72817188836078, 45.36074681043402],
              [32.750518060251466, 45.36371725645313],
              [32.89973931692998, 45.35412322462227],
              [32.941197846443885, 45.34245505845169],
              [32.97701667405008, 45.32596743563991],
              [33.04296090827762, 45.2853982930032],
              [33.05274355585479, 45.28154273654923],
              [33.06850284417635, 45.27703461892352],
              [33.07825272648239, 45.272210805127315],
              [33.089426322403455, 45.25656353201492],
              [33.09897492343546, 45.247820101667884],
              [33.12384611720435, 45.238235755071685],
              [33.15767197859745, 45.20755227709648],
              [33.172959979330074, 45.19681657531794],
              [33.21837666514142, 45.187878368659824],
              [33.24017433636709, 45.180191106261134],
              [33.248571989896675, 45.16588271012458],
              [33.259649216030766, 45.155918961282026],
              [33.28309785485047, 45.16064860772312],
              [33.31767999550894, 45.17535522412791],
              [33.35458473323109, 45.18598673360148],
              [33.39725661527919, 45.18973663076909],
              [33.41344561756824, 45.18490731877088],
              [33.468468576977216, 45.149132412229676],
              [33.537128652906205, 45.11719769268973],
              [33.56161328289443, 45.094099022711475],
              [33.57837628774928, 45.053145935448015],
              [33.58247744978442, 45.027377243150454],
              [33.5851414316958, 45.01816461606674],
              [33.6031021265521, 44.993103583251695],
              [33.605922209331794, 44.986905272229734],
              [33.60843524291815, 44.97039962759274],
              [33.61943161357851, 44.93184946652454],
              [33.619484500808824, 44.90819321920554],
              [33.61549738593425, 44.88894092276257],
              [33.608561183117274, 44.871288478948514],
              [33.59889474705494, 44.859790298912856],
              [33.55904244709464, 44.850057575124595],
              [33.54667558363471, 44.83724531175508],
              [33.53701832136994, 44.81871953508235],
              [33.5303157846202, 44.798338017069625],
              [33.5249116915937, 44.78918633101301],
              [33.51669091675143, 44.784809980590666],
              [33.524785531609865, 44.77183212449111],
              [33.5302902535075, 44.75724515985675],
              [33.53710734694323, 44.73034290771247],
              [33.54650992495621, 44.70989226909535],
              [33.5481286806762, 44.699106546699085],
              [33.543995566510915, 44.68230506537358],
              [33.53580273994743, 44.6726082589706],
              [33.52337411931097, 44.661863083605255],
              [33.515320778874354, 44.6491266698327],
              [33.516377841582795, 44.63464990118433],
              [33.52466971637648, 44.62863961572572],
              [33.557474298027785, 44.62473000923737],
              [33.5710648827386, 44.620853511273225],
              [33.55105839203679, 44.61506440493406],
              [33.499905706797676, 44.61452599304897],
              [33.48451102966331, 44.60992438254493],
              [33.47658499621011, 44.60714391514574],
              [33.46705078205747, 44.60616254193252],
              [33.44476599234898, 44.607062134677875],
              [33.4353466482458, 44.60509936890821],
              [33.413591053005575, 44.593500212748125],
              [33.40543527945235, 44.59055535193136],
              [33.37510958624222, 44.58564691897425],
              [33.37074452434078, 44.58851022190515],
              [33.372237834990756, 44.576810695127364],
              [33.37913003799301, 44.56412673079859],
              [33.48759131590526, 44.51024086451031],
              [33.50011215135888, 44.50041002882833],
              [33.517917009115365, 44.49074142372788],
              [33.53836387802215, 44.49164280212756],
              [33.56041892763031, 44.4966411022441],
              [33.57822378538677, 44.497542389459795],
              [33.59062975079095, 44.48975808594983],
              [33.619577003408466, 44.46229988129974],
              [33.62635433636015, 44.45336293328907],
              [33.63175322871038, 44.434828756313124],
              [33.645537634715026, 44.42498521035591],
              [33.721007257593925, 44.39946630464436],
              [33.74168386660085, 44.39560878121904],
              [33.80727466517129, 44.39454176175843],
              [33.81841706002561, 44.39552670349164],
              [33.83909366903248, 44.40143600575672],
              [33.85149963444792, 44.40143600575945],
              [33.91467816197718, 44.38387049706651],
              [33.938111652185, 44.38083293528811],
              [33.957065210440874, 44.38272116790142],
              [34.06614966692763, 44.42019923628979],
              [34.088893936836286, 44.42200415824283],
              [34.10279321289039, 44.42487551014821],
              [34.135933345669, 44.44163597968952],
              [34.14696087047267, 44.44959070749778],
              [34.16058918507403, 44.466287285335795],
              [34.170123399227776, 44.48186111741296],
              [34.182759104731986, 44.49267838558103],
              [34.22923417224524, 44.49949719774551],
              [34.24301857824986, 44.50744404277697],
              [34.263903954150294, 44.53186886058606],
              [34.26631622520165, 44.53555362837611],
              [34.26631622520165, 44.54153064468656],
              [34.27033667695244, 44.545378535987936],
              [34.2757355693048, 44.54644280144541],
              [34.285384653508004, 44.54562413743594],
              [34.299973149863405, 44.54554227040174],
              [34.32260254971496, 44.543577427039224],
              [34.3308731933177, 44.54546040325087],
              [34.340292537420794, 44.55798473830754],
              [34.38042135640006, 44.631830317636684],
              [34.41495238900856, 44.673669777529994],
              [34.424193090575585, 44.68239452736094],
              [34.42959198292681, 44.68884644523774],
              [34.469399167794535, 44.730194532749294],
              [34.47376422969597, 44.73011292571252],
              [34.47376422969597, 44.72635887754967],
              [34.475142670296464, 44.723502373339585],
              [34.499724861011515, 44.74292382044041],
              [34.532800295801195, 44.752620844929055],
              [34.61217550038418, 44.76534519537847],
              [34.65065696715081, 44.777088262503725],
              [34.72084256772871, 44.811080759265764],
              [34.756796893391225, 44.82094054159748],
              [34.82646979041766, 44.81208604604609],
              [34.84289620758207, 44.816893835303176],
              [34.856910353686715, 44.82373813182468],
              [34.889648317948144, 44.817871641692506],
              [34.90733830566026, 44.820886440346584],
              [34.922960632465504, 44.83050015059965],
              [34.92950822531711, 44.83652826953224],
              [34.94179932067178, 44.84019370922482],
              [34.95282684547897, 44.841415470643284],
              [34.98567967978991, 44.840275160795755],
              [35.0053224583441, 44.83538786296728],
              [35.017958163849414, 44.82219008824552],
              [35.02703289780189, 44.80890779582285],
              [35.037933245998005, 44.79869792240089],
              [35.08073333784134, 44.793525442788905],
              [35.1080207326404, 44.824553365795765],
              [35.130368105574235, 44.86879838545747],
              [35.15485200090768, 44.90071251697748],
              [35.17111229780758, 44.90746386008772],
              [35.21522068940149, 44.91421441031795],
              [35.233163085981715, 44.925728224907715],
              [35.25636688416236, 44.95896657181197],
              [35.27300098099195, 44.96690119386028],
              [35.29748487632534, 44.95605693543271],
              [35.30496087491386, 44.96121482614441],
              [35.315240372954605, 44.965711070514175],
              [35.31935217217088, 44.96941359539801],
              [35.36757236298112, 44.94362319076086],
              [35.36103086422793, 44.97364475976596],
              [35.362152264014156, 44.98593980935419],
              [35.374674561627444, 44.997835734117416],
              [35.389439658813274, 45.00180049366759],
              [35.42270785247763, 45.00087540764923],
              [35.43504325012745, 45.00470780964241],
              [35.43504325012745, 45.011446929213974],
              [35.40631957913584, 45.02015821022701],
              [35.40089948016896, 45.025046135473445],
              [35.39790908073891, 45.03482073400548],
              [35.40052568024015, 45.042216617888045],
              [35.40631957913584, 45.051328088783805],
              [35.40744097892215, 45.06294640963205],
              [35.41734667704213, 45.0708666385693],
              [35.469304867139925, 45.10068964922732],
              [35.5070260597534, 45.113341616151644],
              [35.54758335202416, 45.12019982412133],
              [35.59019654390909, 45.11993606213795],
              [35.63411803553862, 45.11439677872579],
              [35.70669729572677, 45.09480210570922],
              [35.771782422456766, 45.06572995732262],
              [35.78430472007, 45.057941041321754],
              [35.81250040352472, 45.031852200991295],
              [35.81941570220667, 45.021152336906454],
              [35.82763930064016, 44.99895365027004],
              [35.848198296721705, 44.99208088455586],
              [35.916977483614176, 45.00172895661731],
              [35.99360646900681, 44.997896355361604],
              [36.00893226608571, 45.00926125333629],
              [36.02539976723364, 45.03288661039673],
              [36.047827762958946, 45.048074065419456],
              [36.078666257082034, 45.03883000769565],
              [36.079137312377895, 45.046610970582435],
              [36.135020401727616, 45.02125162210126],
              [36.2241716847341, 45.00751061631556],
              [36.24398308095806, 45.011474706353084],
              [36.24828178013877, 45.01649549321965],
              [36.25332807917695, 45.03247980324494],
              [36.25743987839326, 45.03842324279259],
              [36.267158676549116, 45.043573724415154],
              [36.2783726744118, 45.04555455542638],
              [36.36740852558336, 45.04833265291825],
              [36.44029951169139, 45.06787222615526],
              [36.45375630913995, 45.07631970334319],
              [36.455251508854985, 45.09202341204062],
              [36.44142091149291, 45.10709638287736],
              [36.41432041665814, 45.12872568311289],
              [36.40852651776157, 45.149160473330085],
              [36.409997342308856, 45.171615955386955],
              [36.418312796420764, 45.23001671705953],
              [36.42672329481775, 45.25186253492981],
              [36.43756477765089, 45.27227491599612],
              [36.4497132753354, 45.28542626329343],
              [36.45905827355429, 45.28753019598713],
              [36.4814862692796, 45.28845064200263],
              [36.4909554290368, 45.29213135137758],
              [36.49637552800283, 45.300940007322055],
              [36.49394582846682, 45.305015191082816],
              [36.48871262946426, 45.30935296803605],
              [36.48460083024801, 45.315924724862185],
              [36.489647129296515, 45.336413860372005],
              [36.502169426909745, 45.34731734941451],
              [36.52104632331191, 45.35033842661815],
              [36.544281237819945, 45.34731734942025],
              [36.57455903204905, 45.33601971904315],
              [36.585399229982954, 45.333917585593355],
              [36.59810088537549, 45.334837278577254],
              [36.630808379142394, 45.34048649352954],
              [36.637536777859964, 45.3511265071989],
              [36.63099527910589, 45.3741073632589],
              [36.61359545390113, 45.40895280985421],
              [36.59845655678569, 45.421547717459106],
              [36.58331765967199, 45.42731944465129],
              [36.566309762912795, 45.42548305000767],
              [36.54836736633254, 45.41210180010589],
              [36.53285466928139, 45.4090840212946],
              [36.51565987255873, 45.41957994832251],
              [36.49117597722616, 45.44279525429408],
              [36.47043008117939, 45.4458112314303],
              [36.411182792482634, 45.43610707766504],
              [36.391371396258705, 45.43991025572652],
              [36.35959840231365, 45.45407156049933],
              [36.33960010612526, 45.45695583486963],
              [36.33025510790637, 45.454464879327446],
              [36.32053630976225, 45.44856480887407],
              [36.31156511147125, 45.4438443081136],
              [36.29885591389362, 45.442795254299995],
              [36.3072664122906, 45.46115087970253],
              [36.30016421364425, 45.47320989503609],
              [36.283717016779036, 45.476355300848866],
              [36.267082919949445, 45.46704963343626],
              [36.25213092279836, 45.46115087970253],
              [36.13681364478941, 45.46219959214511],
              [36.11700224855986, 45.45721803432335],
              [36.097003952371466, 45.441483909606006],
              [36.06952965760803, 45.43046741078453],
              [36.0655449627526, 45.42553028973455],
              [36.05134056545904, 45.39535242162091],
              [36.022557970944945, 45.368441166003805],
              [35.986486277818386, 45.362926059418186],
              [35.94723728529826, 45.372380198658874],
              [35.87220216002379, 45.404075760536614],
              [35.85388596351393, 45.413916621802144],
              [35.84715756479628, 45.426379251448395],
              [35.8524047739447, 45.44386497541683],
              [35.85950697259193, 45.45933624762881],
              [35.857824872912545, 45.469953901705],
              [35.83278027768503, 45.47087138287168],
              [35.8167068807486, 45.46392436820739],
              [35.80362388324218, 45.44963442058864],
              [35.79469305616038, 45.42980210462429],
              [35.791889556694684, 45.41209230278156],
              [35.772265060435046, 45.39214572935421],
              [35.767405661361295, 45.38873311015669],
              [35.75189296431793, 45.386632934388984],
              [35.7481549650407, 45.379938103368545],
              [35.746846665290036, 45.369960021421576],
              [35.74423006578874, 45.36076812520648],
              [35.71619507113218, 45.34040932557082],
              [35.69451467527287, 45.32989869277279],
              [35.51720627467216, 45.29506847418358],
              [35.48038698168983, 45.2979608697527],
              [35.33194061536096, 45.371562726652314],
              [35.04491375777232, 45.669545248704424],
              [35.00230056589345, 45.7290693869553],
              [34.70631294999043, 46.024929846739866],
              [34.35868883309806, 46.106725558140795],
              [34.00905273547181, 46.55925987559425],
            ],
          ],
        },
      },
    },
  },
  version: 8,
  metadata: {
    "maptiler:copyright":
      "This style was generated on MapTiler Cloud. Usage is governed by the license terms in https://github.com/maplibre/demotiles/blob/gh-pages/LICENSE",
    "openmaptiles:version": "3.x",
  },
};

const hexToRgb = (hex: string) => {
  let arrBuff = new ArrayBuffer(4);
  let vw = new DataView(arrBuff);
  hex = hex.replace(/[^0-9A-F]/gi, "");
  vw.setUint32(0, parseInt(hex, 16), false);
  let arrByte = new Uint8Array(arrBuff);

  return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
};

const interpolateColor = (color1, color2, factor: number = 0.5) => {
  let result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
};

const interpolateColors = (color1, color2, steps: number) => {
  let stepFactor = 1 / (steps - 1),
    interpolatedColorArray = [];

  color1 = color1.match(/\d+/g).map(Number);
  color2 = color2.match(/\d+/g).map(Number);

  for (let i = 0; i < steps; i++) {
    let color_ = interpolateColor(color1, color2, stepFactor * i);

    let new_color_ =
      "rgba(" + color_[0] + "," + color_[1] + "," + color_[2] + ",1)";
    interpolatedColorArray.push(new_color_);
  }

  return interpolatedColorArray;
};
