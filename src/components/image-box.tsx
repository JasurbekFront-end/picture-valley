import { useState } from "react";
import type { PhotoType } from "../pages/home/home";
import DownloadButton from "./download-button";

interface ImageBoxProps {
  image: PhotoType;
  onClick:()=>void
}

export default function ImageBox({ image,onClick }: ImageBoxProps) {
  const [isHover, setIsHover] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative min-h-[200px] w-full overflow-hidden rounded-md shadow-md lg:rounded-xl"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex animate-pulse flex-col justify-between rounded-md bg-gray-400 p-4">
          <div className="flex items-center gap-4">
            <div className="h-[50px] w-[50px] rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-gray-300" />
            </div>
          </div>
          <div className="h-3 w-40 self-end rounded bg-gray-300" />
        </div>
      )}

      <img
        src={image.src.original}
        alt=""
        className={`w-full transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />

      {isLoaded && (
        <div
          className={`${
            isHover ? "opacity-100" : "opacity-0"
          } absolute inset-0 h-full w-full bg-black/40 transition-all duration-200`}
        >
          <div className="absolute top-[15px] left-[20px] flex cursor-pointer items-center gap-3">
            <div className="custom-ava-back size-[50px] rounded-full" />
            <h1 className="font-poppins text-white">{image.photographer}</h1>
          </div>
          <div className="absolute top-3 right-3">
            <DownloadButton imageUrl={image.src.original} />
          </div>
          <div className="absolute bottom-3 left-5">
            <a
              href={image.photographer_url}
              className="font-poppins text-[12px] text-white"
            >
              {image.photographer_url}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
