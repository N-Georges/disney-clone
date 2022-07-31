import { gql, GraphQLClient } from "graphql-request";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export const getServerSideProps = async (pageContext) => {
  const url = process.env.GRAPHCMS_ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const pageSlug = pageContext.query.slug;

  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
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

  const variables = {
    pageSlug,
  };

  const data = await graphQLClient.request(query, variables);
  const video = data.video;

  return {
    props: {
      video,
    },
  };
};

const changeToSeen = async (slug) => {
  await fetch("/api/changeToSeen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  });
};

const Video = ({ video }) => {
  const router = useRouter();
  const [wachting, setWachting] = useState(false);
  return (
    <div>
      {!wachting && (
        <div className="absolute top-0 w-screen h-screen">
          <Image
            layout="fill"
            className="brightness-75"
            src={video.thumbnail.url}
            alt={video.title}
          />
        </div>
      )}
      {!wachting && (
        <>
          <button
            className="absolute top-10 left-20 flex items-center space-x-1 px-3 py-1 hover:scale-105 bg-white text-black font-semibold rounded-md"
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </button>
          <div className="relative mt-60 max-w-2xl ml-20 space-y-5">
            <p className="capitalize">{video.tags.join(", ")}</p>
            <p className="text-lg">{video.description}</p>
            <button
              className="flex items-center space-x-1 px-2 py-1 hover:scale-105 bg-white text-black font-semibold rounded-md"
              onClick={() => {
                changeToSeen(video.slug)
                wachting ? setWachting(false) : setWachting(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>PLAY</span>
            </button>
          </div>
        </>
      )}
      {wachting && (
        <>
          <video width="100%" className="h-screen" controls>
            <source src={video.mp4.url} type="video/mp4" />
          </video>
          <button
            onClick={() => {
              setWachting(false);
            }}
            className="absolute top-5 right-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default Video;
