interface RecentSearchBoxProps {
  searchValue: string;
  onDelete: () => void;
  onMouseDown: () => void;
  onSearchSaved: (value: string) => void;
}
export default function RecentSearchBox({
  searchValue,
  onDelete,
  onMouseDown,
  onSearchSaved,
}: RecentSearchBoxProps) {
  return (
    <div
      className="font-poppins flex w-full cursor-pointer items-center justify-between px-3 py-0.5 transition-all hover:bg-gray-100"
      onMouseDown={onMouseDown}
    >
      <h1 className="text-[16px]" onClick={() => onSearchSaved(searchValue)}>
        {searchValue}
      </h1>
      <div className="text-[18px] text-gray-700 transition-all hover:scale-90">
        <i className="fa-solid fa-xmark" onClick={onDelete}></i>
      </div>
    </div>
  );
}
