import Link from "next/link";
import AuthButton from "./header-auth";

const NavBar = () => {
    return (
    <div className="bg-[#ffb5a7] text-white py-2 px-5 flex justify-between">
        <Link href='/'>
            Skinple
        </Link>

        <AuthButton />
    </div>)
};

export default NavBar;
