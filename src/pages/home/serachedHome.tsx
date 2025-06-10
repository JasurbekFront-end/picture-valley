import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PhotoType } from "./home";
import ImagesWrapper from "./images-wrapper";

export default function SearchedHome() {
  const { query } = useParams();
  const [images, setImages] = useState<PhotoType[]>([]);
  const [page, setPage] = useState(1);
   const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
  useEffect(() => {
    if (!query) return;

    setImages([]);
    setPage(1);
  }, [query]);
  useEffect(() => {
    if (!query) return;
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=50&page=${page}`,
          {
            headers: {
              Authorization:
                apiKey,
            },
          },
        );
        if (!res.ok) console.log("Unexpected error");
        const data = await res.json();
        setImages((prev) => [...prev, ...data.photos]);
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    }
    fetchData();
  }, [query, page,apiKey]);

  const columns = [[], [], []] as PhotoType[][];

  images.forEach((img, i) => {
    columns[i % 3].push(img);
  });

  return (
    <div className="mt-[80px] lg:mt-[90px]">
      <h1 className="mb-1 px-2 pt-1 text-[18px] font-bold lg:mb-3 lg:px-10 lg:pt-3 lg:text-2xl">
        Results for: {query}
      </h1>
      {images.length === 0 ? (
        <p className="px-2 text-[20px] font-medium text-gray-600 lg:px-10">
          There are no results for "{query}"
        </p>
      ) : (
        <ImagesWrapper columns={columns} />
      )}
      {images.length !== 0 && (
        <div className="my-4 flex w-full items-center justify-center">
          <div
            className="font-poppins flex h-[50px] w-[140px] cursor-pointer items-center justify-center rounded-md bg-gray-400 text-[18px] text-white"
            onClick={() => setPage((prev) => (prev += 1))}
          >
            Load more
          </div>
        </div>
      )}
    </div>
  );
}
