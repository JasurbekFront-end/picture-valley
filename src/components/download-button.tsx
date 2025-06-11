
interface DownloadButtonProps{
  imageUrl:string
}

export default function DownloadButton({imageUrl}:DownloadButtonProps) {
  const handleDownload = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    const fileName = imageUrl.split("/").pop() || "download.jpg";
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={(e)=>handleDownload(e)}
      className="font-poppins flex cursor-pointer items-center justify-center rounded-md bg-green-400 px-4 py-3 text-[16px] text-white"
    >
      Downlaod
    </button>
  );
}
