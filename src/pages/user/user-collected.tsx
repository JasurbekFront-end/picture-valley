import type { PhotoType } from "../home/home";
import ImagesWrapper from "../home/images-wrapper";

export default function UserCollected() {
  const collectedImage = JSON.parse(localStorage.getItem("collectedImages") || "[]");

  const columns = [[], [], []] as PhotoType[][];
  collectedImage.forEach((img: PhotoType, i: number) => {
    columns[i % 3].push(img);
  });
  console.log(collectedImage);
  return (
    <div className="mt-[80px]">
      {collectedImage.length>0 ? (
        <ImagesWrapper columns={columns} />
      ) : (
        <div className="flex w-full items-center justify-center font-poppins text-[20px] pt-10">
          There are not collected pictures
        </div>
      )}
    </div>
  );
}
