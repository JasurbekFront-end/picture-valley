import { useNavigate } from "react-router-dom";
import type { PhotoType } from "../home/home";

export default function UserProfile() {
  const likedImages = JSON.parse(
    localStorage.getItem("likedImages") || "[]",
  ) as PhotoType[];
  const collectedImages = JSON.parse(
    localStorage.getItem("collectedImages") || "[]",
  ) as PhotoType[];

  const previewLikedImage = likedImages[likedImages.length - 1];
  const previewCollectedImage = collectedImages[collectedImages.length - 1];
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(`${pathname}`);
  }
  return (
    <div className="font-poppins mt-20 pb-10 md:mt-[140px]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex size-[70px] items-center justify-center rounded-full bg-blue-600 md:size-[90px] text-[45px] font-[600] text-white">
          J
        </div>
        <h1 className="mt-1 text-[25px] font-[600] text-gray-800">John Doe</h1>
        <span className="mt-1 text-[14px] text-gray-800">
          yoqubjonovjasurbek612@gmail.com
        </span>
      </div>

      <div className="mt-6 border-b border-gray-900 pl-2 text-[20px] text-gray-800">
        Collections
      </div>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:mt-4 md:justify-start md:pl-2">
        <div className="mt-4 flex w-full flex-col items-center justify-center md:size-[350px]">
          <div
            className="aspect-square w-[95%] rounded-xl md:w-full cursor-pointer hover:scale-98 transition-all"
            style={{
              backgroundImage: previewLikedImage
                ? `url(${previewLikedImage.src.original})`
                : undefined,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: previewLikedImage ? undefined : "#ccc",
            }}
            onClick={()=>handleNavigate("liked")}
          ></div>

          <div className="mt-3 flex w-full items-center justify-between px-2">
            <h1 className="text-[20px] text-gray-700">Your likes</h1>
            <div className="flex items-center justify-center gap-1">
              <span className="text-[20px] text-gray-700">
                <i className="fa-solid fa-images"></i>
              </span>
              <p className="text-[20px] text-gray-700">{likedImages.length}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center md:size-[350px]">
          <div
            className="aspect-square w-[95%] rounded-xl md:w-full cursor-pointer hover:scale-98 transition-all"
            style={{
              backgroundImage: previewCollectedImage
                ? `url(${previewCollectedImage.src.original})`
                : undefined,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: previewCollectedImage ? undefined : "#ccc",
            }}
            onClick={()=>handleNavigate("collected")}

          ></div>

          <div className="mt-3 flex w-full items-center justify-between px-2">
            <h1 className="text-[20px] text-gray-700">Your Collection</h1>
            <div className="flex items-center justify-center gap-1">
              <span className="text-[20px] text-gray-700">
                <i className="fa-solid fa-images"></i>
              </span>
              <p className="text-[20px] text-gray-700">
                {collectedImages.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
