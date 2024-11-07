import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { CiUser, CiMail, CiLock } from "react-icons/ci";
import { useEffect, useState } from "react";

function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      return setErrorMessage("Lütfen tüm alanları doldurun.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setErrorMessage("Geçerli bir e-posta adresi giriniz.");
    }

    if (password.length < 6) {
      return setErrorMessage("Şifreniz en az 6 karakter olmalıdır.");
    }

    if (password !== confirmPassword) {
      return setErrorMessage("Şifreler eşleşmiyor.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/backend/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Kayıt işlemi başarısız.");
      }

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, setErrorMessage]);
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <TextInput
                type="text"
                placeholder="Kullanıcı Adı"
                id="username"
                icon={CiUser}
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                type="email"
                placeholder="E-mail"
                id="email"
                icon={CiMail}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <TextInput
                type={"password"}
                placeholder="Şifre"
                id="password"
                icon={CiLock}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                type={"password"}
                placeholder="Şifreyi Onayla"
                id="confirmPassword"
                icon={CiLock}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button gradientMonochrome="cyan" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />{" "}
                  <span className="pl-3">Yükleniyor...</span>
                </>
              ) : (
                "Kayıt ol"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Bir hesabınız var mı?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Giriş yap
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
