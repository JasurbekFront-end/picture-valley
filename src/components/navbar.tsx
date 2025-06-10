import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecentSearchBox from "./recent-search-box";

interface NavbarProps {
  toggleMenu: () => void;
}

export default function Navbar({ toggleMenu }: NavbarProps) {
  const { query } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [recentSearches, setRecentSearches] = useState(() => {
    const res = localStorage.getItem("recent-searches");
    return res ? JSON.parse(res) : [];
  });
  useEffect(() => {
    localStorage.setItem("recent-searches", JSON.stringify(recentSearches));
  }, [recentSearches]);
  useEffect(() => {
    if (!query) return;
    setRecentSearches((prev: string[]) => {
      const updated = [query, ...prev.filter((item) => item !== query)];
      if (updated.length >= 10) updated.splice(10);
      return updated;
    });
  }, [query]);

  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    setInputValue("")
    navigate(`/${pathname}`);
  }
  function handleSearchNavigate(value: string) {
    setInputValue(value);
    navigate(`/search/${value}`);
  }
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/search/${inputValue}`);
    setIsFocused(false);
  }
  return (
    <div className="fixed top-0 left-0 z-50 flex h-[70px] w-full items-center justify-between border-b border-gray-400 bg-white px-3 md:px-6 lg:h-[90px]">
      <div className="flex w-full items-center justify-between">
        <h1
          className="font-dancing cursor-pointer text-[20px] md:hidden"
          onClick={() => {
            handleNavigate("home");
          }}
        >
          PV
        </h1>
        <h1
          className="font-dancing hidden cursor-pointer text-[25px] md:flex"
          onClick={() => {
            handleNavigate("home");
          }}
        >
          Picture Valley
        </h1>
        <form
          className="relative mx-3 flex w-full items-center md:w-[400px] lg:h-[50px] lg:w-[600px]"
          onSubmit={(e) => handleSearch(e)}
        >
          <input
            id="search-input"
            type="text"
            value={inputValue}
            autoComplete="off"
            required
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            placeholder="Search..."
            className="h-[40px] w-full rounded-md bg-gray-200 indent-3 focus:shadow focus:outline-0 lg:h-[45px]"
          />
          {isFocused && recentSearches.length > 0 && (
            <div className="absolute top-[60px] flex w-full flex-col rounded-md border border-gray-300 bg-white py-2 shadow">
              {recentSearches.map((item: string, idx: number) => (
                <RecentSearchBox
                  key={item}
                  searchValue={item}
                  onDelete={() =>
                    setRecentSearches((prev: string[]) =>
                      prev.filter((_, i) => i !== idx),
                    )
                  }
                  onMouseDown={() => setIsFocused(true)}
                  onSearchSaved={(value: string) => handleSearchNavigate(value)}
                />
              ))}
            </div>
          )}
        </form>

        <div className="flex items-center justify-center gap-4 lg:flex-row-reverse">
          <div onClick={()=>handleNavigate("user")} className="flex size-[40px] cursor-pointer items-center justify-center rounded-full bg-blue-600 text-[20px] font-bold text-white lg:size-[50px] lg:text-[25px]">
            J
          </div>
          <ul className="font-poppins hidden items-center gap-6 text-[16px] lg:flex">
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Pricing</li>
            <li className="cursor-pointer">Contact Us</li>
          </ul>
          <div
            className="text-[22px] text-gray-800 lg:hidden"
            onClick={toggleMenu}
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
