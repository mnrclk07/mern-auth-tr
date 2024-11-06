import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2 select-none ">
      <Navbar.Toggle />
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white ">
        <span className="   text-cyan-600  text-2xl ">Auth Project</span>
      </Link>
      <form className="flex items-center">
        <TextInput
          type="text"
          placeholder="Ara"
          aria-label="Search input"
          style={{ borderRadius: "50px 0 0 50px", borderRight: "none" }}
          className="hidden lg:inline w-96  "
        />
        <Button
          className="w-12 h-10 hidden lg:inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 "
          type="submit"
          color="white"
          title="Ara"
          style={{
            padding: "21px",
            borderRadius: "0 50px 50px 0",
          }}
          aria-label="Search button">
          <AiOutlineSearch className="size-6 " color="white" />
        </Button>
      </form>

      <div className="flex gap-2 md:order-2 ">
        <Button
          className="w-12 h-10 hidden sm:inline focus:ring-0  focus:outline-none "
          color="gray"
          pill>
          <FaMoon />
        </Button>

        <Link to="/login">
          <Button gradientDuoTone="cyanToBlue" outline>
            Giriş yap
          </Button>
        </Link>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Ana Sayfa</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">Hakkımda</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projeler</Link>
        </Navbar.Link>
        <Navbar.Link
          active={path === "/search"}
          as={"div"}
          className="sm:hidden">
          <Link to="/search?searchTerm=">Arama</Link>
        </Navbar.Link>
        <div className=" sm:hidden w-20 ml-1 mt-2 focus:ring-0  focus:outline-none border border-solid  rounded-full border-slate-500  dark:border-gray-500">
          <Link color="gray">
            <FaMoon
              className="
              border border-solid border-slate-600 rounded-2xl size-8 bg-slate-100  p-2 ml-12 hover:scale-110"
            />
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
