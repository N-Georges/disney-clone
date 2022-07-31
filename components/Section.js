import Link from "next/link";
import Card from "./Card";

export default function Section({ genre, videos }) {
  return (
    <div className="space-y-1">
      <h3 className="font-semibold text-xl">{genre}</h3>
      <div className="flex space-x-2">
        {videos.map((video) => (
          <div key={video.id}>
            <Link
              as={`/video/${video.slug}`}
              href="/video/[slug]"
              passHref
            >
              <a key={video.id}>
                <Card thumbnail={video.thumbnail} />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
