import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { CiMail, CiLock } from "react-icons/ci";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // localStorage'daki bilgiyi yükleme
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setFormData({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  // Beni Hatırla checkbox'unun güncellenmesi
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // Formun gönderilmesi ve giriş işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessage("Lütfen tüm alanları doldurun.");
    }

    // E-posta formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return setErrorMessage("Geçersiz email formatı.");
    }

    if (formData.password.length < 6) {
      return setErrorMessage("Şifre en az 6 karakter olmalıdır.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/backend/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        return setErrorMessage(data.message || "Giriş başarısız oldu.");
      }

      if (rememberMe) {
        localStorage.setItem("email", formData.email);
        localStorage.setItem("password", formData.password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      setFormData({
        email: "",
        password: "",
      });

      navigate("/");
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
            <span className="text-cyan-600  text-2xl ">Auth Project</span>
          </Link>
          <p className="text-sm mt-5">
            Bu bir demo projesidir. E-postanız ve şifrenizle kaydolabilirsiniz
            veya Google ile.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            <div>
              <div className="relative">
                <TextInput
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  id="password"
                  icon={CiLock}
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <BiHide /> : <BiShow />}
                </span>
              </div>
            </div>
            {/* Beni Hatırla Kutusu */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <Label htmlFor="rememberMe">Beni Hatırla</Label>
              <span className="ml-32 text-sm text-blue-500 hover:underline">
                <Link to="/forgot-password">Şifreni mi unuttun?</Link>
              </span>
            </div>

            <Button gradientMonochrome="cyan" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />{" "}
                  <span className="pl-3">Yükleniyor...</span>
                </>
              ) : (
                "Giriş yap"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Bir hesabınız yok mu?</span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Kayıt ol
            </Link>
          </div>

          {/* Hata Mesajı Gösterimi */}
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

export default SignIn;
