interface HiddenNavbarMenuProps {
  toggleMenu: () => void;
  hiddenMenu: boolean;
}

export default function HiddenNavbarMenu({
  hiddenMenu,
}: HiddenNavbarMenuProps) {
  return (
    <div
      className={`${hiddenMenu ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} fixed top-[60px] right-3 z-60 h-[200px] w-[180px] rounded-md bg-white px-5 py-3 shadow-2xl transition-all duration-300 md:h-[250px] md:w-[230px]`}
    >
      <ul className="font-poppins">
        <li>About</li>
        <li>Pricing</li>
        <li>Contact Us</li>
      </ul>
    </div>
  );
}
