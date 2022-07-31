import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import Section from "../components/Section";
import disneyLogo from "../public/disney-button.png";
import marvelLogo from "../public/marvel-button.png";
import natgeoLogo from "../public/natgeo-button.png";
import starwarsLogo from "../public/star-wars-button.png";
import pixarLogo from "../public/pixar.png";

export const getStaticProps = async () => {
  const url = process.env.GRAPHCMS_ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const videosQuery = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "cl680u0j6ytyz0bupz0vhn2mw" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account,
    },
  };
};

export const Home = ({ videos, account }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen == null);
  };
  return (
    <>
      <Navbar account={account} />
      <div className="mx-3">
        <div className="my-3">
          <Image
            width={1300}
            className="img"
            height={300}
            objectFit="fill"
            src={randomVideo(videos).thumbnail.url}
            alt="banner image"
          />
        </div>
        <div className="space-y-5">
          <div className="flex space-x-3 mx-auto justify-center">
            <div className="w-72 h-28 bg-white border rounded-lg">
              <Link className="" href="#disney">
                <a id="disney">
                  <Image
                    layout="responsive"
                    objectFit="cover"
                    alt="logo disney"
                    src={disneyLogo}
                  />
                </a>
              </Link>
            </div>
            <div className="w-72 bg-blue-400 border h-28 rounded-lg">
              <Link href="#pixar">
                <a id="pixar">
                  <Image
                    layout="responsive"
                    objectFit="cover"
                    alt="logo pixar"
                    src={pixarLogo}
                  />
                </a>
              </Link>
            </div>
            <div className="w-72 bg-yellow-400 border h-28 rounded-lg">
              <Link href="#star-wars">
                <a id="star-wars">
                  <Image
                    layout="responsive"
                    objectFit="cover"
                    alt="logo star-wars"
                    src={starwarsLogo}
                  />
                </a>
              </Link>
            </div>
            <div className="w-72 bg-green-400 border h-28 rounded-lg">
              <Link href="#nat-geo">
                <a id="nat-geo">
                  <Image
                    layout="responsive"
                    objectFit="cover"
                    alt="logo nat-geo"
                    src={natgeoLogo}
                  />
                </a>
              </Link>
            </div>
            <div className="w-72  border h-28 rounded-lg">
              <Link href="#marvel">
                <a id="marvel">
                  <Image
                    layout="responsive"
                    objectFit="cover"
                    alt="logo marvel"
                    src={marvelLogo}
                  />
                </a>
              </Link>
            </div>
          </div>

          <Section
            genre={"Recommended for you"}
            videos={unSeenVideos(videos)}
          />
          <Section genre={"Family"} videos={filterVideos(videos, "family")} />
          <Section
            genre={"Thriller"}
            videos={filterVideos(videos, "thriller")}
          />
          <Section genre={"Classic"} videos={filterVideos(videos, "classic")} />
          <Section
            id="pixar"
            genre={"Pixar"}
            videos={filterVideos(videos, "Pixar")}
          />
          <Section
            id="marvel"
            genre={"Marvel"}
            videos={filterVideos(videos, "Marvel")}
          />
          <Section
            id="nat-geo"
            genre={"National Geopgraphic"}
            videos={filterVideos(videos, "National Geopgraphic")}
          />
          <Section
            id="disney"
            genre={"Disney"}
            videos={filterVideos(videos, "disney")}
          />
          <Section
            genre={"Star Wars"}
            videos={filterVideos(videos, "Star Wars")}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
