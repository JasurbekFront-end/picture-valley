import { useEffect } from "react";
import DownloadButton from "./download-button";
import type { PhotoType } from "../pages/home/home";

interface ImageModalProps {
  image: PhotoType;
  isModalOpened: boolean;
  onClose: () => void;
  isLiked: boolean;
  isCollected: boolean;
  onLike: () => void;
  onCollect: () => void;
}

export default function ImageModal({
  image,
  isModalOpened,
  onClose,
  isLiked,
  isCollected,
  onLike,
  onCollect,
}: ImageModalProps) {
  useEffect(() => {
    document.body.style.overflow = isModalOpened ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpened]);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-y-auto bg-black/70  pb-8 transition-all duration-300 ease-in-out pt-15 lg:pt-3   ${isModalOpened ? "visible translate-y-0 opacity-100" : "invisible translate-y-10 opacity-0"} `}
    >
      <div className="mx-auto w-[90%] rounded-md bg-white shadow-lg lg:w-[70%]">
        <div
          className="absolute top-3 left-3 cursor-pointer text-[25px] text-white lg:top-6 lg:left-20"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="flex w-full items-center justify-between p-4 lg:px-7">
          <div className="flex items-center gap-3">
            <div className="flex size-[45px] cursor-pointer items-center justify-center rounded-md border border-gray-400">
              {isCollected ? (
                <i
                  className="fa-solid fa-bookmark text-[25px] text-green-500"
                  onClick={onCollect}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-bookmark text-[25px] text-green-500"
                  onClick={onCollect}
                ></i>
              )}
            </div>
            <div className="flex size-[45px] cursor-pointer items-center justify-center rounded-md border border-gray-400">
              {isLiked ? (
                <i
                  className="fa-solid fa-heart text-[25px] text-red-500"
                  onClick={onLike}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-heart text-[25px] text-red-500"
                  onClick={onLike}
                ></i>
              )}
            </div>
          </div>
          <DownloadButton imageUrl={image.src.original} />
        </div>

        <div className="mx-auto flex justify-center px-4 md:w-[60%] lg:mt-3 lg:w-[40%]">
          <img
            src={image.src.original}
            alt=""
            className="h-auto max-w-full rounded-md"
          />
        </div>

        <div className="mt-4 px-4 pb-6 lg:mt-8 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="custom-ava-back size-[50px] rounded-full" />
            <h1 className="font-poppins text-gray-700">{image.photographer}</h1>
          </div>
          <h1 className="font-poppins mt-2 text-[16px]">
            Author url:
            <a
              href={image.photographer_url}
              className="pl-2 text-[14px] text-blue-400 italic"
              target="_blank"
            >
              {image.photographer_url}
            </a>
          </h1>
          <h1 className="font-poppins mt-4 text-[16px]">
            Description:
            <span className="pl-2 text-[14px] text-gray-700 italic">
              {image.alt}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
