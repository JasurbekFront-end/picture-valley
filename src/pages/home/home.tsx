import { useEffect, useState } from "react";
import ImagesWrapper from "./images-wrapper";
export interface PhotoType {
  id: number;
  alt:string;
  photographer: string;
  photographer_url: string;
  src: {
    medium: string;
    large: string;
    original: string;
  };
}
export default function Home() {
  const [images, setImages] = useState<PhotoType[]>([]);
  const [page, setPage] = useState(1);
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/curated?per_page=50&page=${page}`,
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
  }, [page,apiKey]);

  const columns = [[], [], []] as PhotoType[][];

  images.forEach((img, i) => {
    columns[i % 3].push(img);
  });

  return (
    <div className="mt-[80px] lg:mt-[90px]">
      <ImagesWrapper columns={columns}/>
       <div className="my-4 flex w-full items-center justify-center">
        <div
          className="font-poppins flex h-[50px] w-[140px] cursor-pointer items-center justify-center rounded-md bg-gray-400 text-[18px] text-white"
          onClick={() => setPage((prev) => (prev += 1))}
        >
          Load more
        </div>
      </div>
    </div>
  );
}
