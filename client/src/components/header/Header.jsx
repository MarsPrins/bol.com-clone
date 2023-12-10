import MainHeader from "./MainHeader";
import SelectHeader from "./SelectHeader";
import ShopHeader from "./ShopHeader";

function Header() {
  return (
    <div>
      <SelectHeader />
      <MainHeader />
      <ShopHeader />
    </div>
  );
}

export default Header;
