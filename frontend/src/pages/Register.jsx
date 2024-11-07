import { Button, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { CiUser, CiMail, CiLock } from "react-icons/ci";

function Register() {
  return (
    <div className="min-h-screen mt-20 select-none">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className=" text-cyan-600  text-2xl ">Auth Project</span>
          </Link>
          <p className="text-sm mt-5">
            Bu bir demo projesidir. E-postanız ve şifrenizle kaydolabilirsiniz
            veya Google ile..
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <TextInput
                type="text"
                placeholder="Kullanıcı Adı"
                id="username"
                icon={CiUser}
              />
            </div>
            <div>
              <TextInput
                type="email"
                placeholder="E-mail"
                id="email"
                icon={CiMail}
              />
            </div>
            <div className="relative">
              <TextInput
                type={"password"}
                placeholder="Şifre"
                id="password"
                icon={CiLock}
              />
            </div>
            <div>
              <TextInput
                type={"password"}
                placeholder="Şifreyi Onayla"
                id="confirmPassword"
                icon={CiLock}
              />
            </div>
            <Button gradientMonochrome="cyan" type="submit">
              Kayıt ol
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Bir hesabınız var mı?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Giriş yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
