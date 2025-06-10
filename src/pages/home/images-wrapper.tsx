import { useEffect, useState } from "react";
import type { PhotoType } from "./home";
import ImageModal from "../../components/image-modal";
import ImageBox from "../../components/image-box";

interface ImagesWrapperProps {
  columns: PhotoType[][];
}
export default function ImagesWrapper({ columns }: ImagesWrapperProps) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PhotoType>({
    id: Math.random(),
    alt: "",
    photographer: "",
    photographer_url: "",
    src: {
      medium: "",
      large: "",
      original: "",
    },
  });
  const [likedImages, setLikedImages] = useState<PhotoType[]>(() => {
    try {
      const stored = localStorage.getItem("likedImages");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [collectedImages, setCollectedImages] = useState<PhotoType[]>(() => {
    try {
      const stored = localStorage.getItem("collectedImages");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  function toggleLike(image: PhotoType) {
    setLikedImages((prev) => {
      const foundImage = prev.find((likedImage) => likedImage.id === image?.id);
      return foundImage
        ? prev.filter((likedImage) => likedImage.id !== image.id)
        : [image, ...prev];
    });
  }

  function toggleCollect(image: PhotoType) {
    setCollectedImages((prev) => {
      const foundImage = prev.find(
        (collectedImage) => collectedImage.id === image.id,
      );
      return foundImage
        ? prev.filter((collectedImage) => collectedImage.id !== image.id)
        : [image, ...prev];
    });
  }

  useEffect(() => {
    localStorage.setItem("likedImages", JSON.stringify(likedImages));
  }, [likedImages]);
  useEffect(() => {
    localStorage.setItem("collectedImages", JSON.stringify(collectedImages));
  }, [collectedImages]);

  return (
    <>
      {" "}
      <div className="grid grid-cols-1 gap-x-6 px-2 md:grid-cols-2 lg:grid-cols-3 lg:px-10 lg:py-6">
        {columns.map((column, idx) => (
          <div key={idx} className="flex flex-col gap-8">
            {column.map((image) => (
              <ImageBox
                key={image.id}
                image={image}
                onClick={() => {
                  setSelectedImage(image);
                  setIsModalOpened(true);
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {isModalOpened && (
        <ImageModal
          image={selectedImage}
          onClose={() => setIsModalOpened(false)}
          isModalOpened={isModalOpened}
          isLiked={likedImages.some((img) => img.id === selectedImage.id)}
          isCollected={collectedImages.some(
            (img) => img.id === selectedImage.id,
          )}
          onLike={() => toggleLike(selectedImage)}
          onCollect={() => toggleCollect(selectedImage)}
        />
      )}
    </>
  );
}
