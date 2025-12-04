import { ArrowLeft, Lock, LogIn, Mail } from "lucide-react";
import { useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.webp";
import { useUserStore } from "../../stores/userStore";
export const Login = () => {
  const { user, login } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/admin/dashboard");
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login(email, password);
  };

  return (
    <div className="flex h-screen min-h-screen flex-col items-center px-8 md:justify-center">
      <div className="w-full space-y-4 py-6 md:space-y-8">
        <div>
          <h1 className="flex items-center justify-center gap-x-1 lg:gap-x-4">
            <img src={logo} alt="Itad logo" className="size-10 md:size-15" />
            <span className="text-2xl font-semibold md:text-5xl">
              Itad Admin
            </span>
          </h1>
          <p className="text-center text-gray-200 md:text-xl">
            Panneau d'admnistration
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-card mx-auto w-full max-w-md space-y-4 rounded-xl px-4 py-6 max-md:max-w-sm md:px-8 md:py-8"
        >
          <h2 className="text-2xl md:text-3xl">Connexion</h2>
          <div className="space-y-4 md:space-y-8">
            <div className="space-y-2">
              <label
                htmlFor=""
                className="text-primary flex items-center gap-x-1"
              >
                <Mail className="size-4 md:size-6" strokeWidth={1} />
                <span className="md:text-xl">Email</span>
              </label>
              <input
                className="ring-primary/50 focus:outline-primary focus:shadow-primary w-full rounded-md px-2 py-2 ring-1 focus:shadow-sm focus:outline-1 md:px-6 md:py-4"
                type="email"
                required
                placeholder="admin@itad.com"
                name="email"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor=""
                className="text-primary flex items-center gap-x-1"
              >
                <Lock className="size-4 md:size-6" strokeWidth={1} />
                <span className="md:text-xl">Password</span>
              </label>
              <input
                className="ring-primary/50 focus:outline-primary focus:shadow-primary w-full rounded-md px-2 py-2 ring-1 focus:shadow-sm focus:outline-1 md:px-6 md:py-4"
                type="password"
                required
                placeholder="********"
                name="password"
              />
            </div>
          </div>
          <button className="btn w-full">
            <div className="flex w-full items-center justify-center gap-x-2">
              <LogIn />
              <span>Se connecter</span>
            </div>
          </button>
        </form>
        <Link
          to={"/"}
          className="text-primary flex items-center justify-center gap-x-2 text-center"
        >
          <ArrowLeft strokeWidth={1} />
          <span>Retour au site</span>
        </Link>
      </div>
    </div>
  );
};
