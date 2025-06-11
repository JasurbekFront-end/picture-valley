interface RecentSearchBoxProps {
  searchValue: string;
  onDelete: () => void;
  onSearchSaved: (value: string) => void;
}
export default function RecentSearchBox({
  searchValue,
  onDelete,
  onSearchSaved,
}: RecentSearchBoxProps) {
  return (
    <div className="font-poppins flex w-full items-center justify-between px-3 py-0.5 transition-all hover:bg-gray-100">
      <h1
        className="cursor-pointer text-[16px] w-[95%]"
        onClick={() => onSearchSaved(searchValue)}
      >
        {searchValue}
      </h1>
      <div
        className="cursor-pointer text-[18px] text-gray-700 transition-all hover:scale-90"
        onClick={onDelete}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
}
