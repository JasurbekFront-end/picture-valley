import type { PhotoType } from "../home/home";
import ImagesWrapper from "../home/images-wrapper";

export default function UserLiked() {
  const likedImages = JSON.parse(localStorage.getItem("likedImages") || "[]");

  const columns = [[], [], []] as PhotoType[][];
  likedImages.forEach((img: PhotoType, i: number) => {
    columns[i % 3].push(img);
  });
  console.log(likedImages);
  return (
    <div className="mt-[80px]">
      {likedImages.length>0 ? (
        <ImagesWrapper columns={columns} />
      ) : (
        <div className="flex w-full items-center justify-center font-poppins text-[20px] pt-10">
          The pictures have not been liked.
        </div>
      )}
    </div>
  );
}
