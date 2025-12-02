import { CreditCardIcon, LockKeyhole } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/logo.webp";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-4 md:py-6">
        <h1 className="flex items-center justify-center gap-x-1 lg:gap-x-4">
          <img src={logo} alt="Itad logo" className="size-10 lg:size-15" />
          <span className="text-2xl font-semibold lg:text-5xl">
            Itad Wifi Zone
          </span>
        </h1>
        <p className="mx-auto max-w-[80%] text-center text-sm text-white/70 lg:text-base">
          Achetez vos tickets internet en ligne et connectez-vous instantanément
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className="bg-card shadow-card flex flex-col items-center justify-center space-y-4 rounded-lg border border-gray-200/10 px-4 py-4 shadow-md">
            <CreditCardIcon className="text-primary size-10" />
            <h2 className="text-xl font-semibold">Acheter un ticket</h2>
            <p className="text-center text-white/70">
              Choisissez votre plan (1h, 2h, 3h, 4h) et payez par Orange Money,
              MVola ou en espèces
            </p>
            <Link to="/buy" className="btn">
              Commencer
            </Link>
          </div>
          <div className="bg-card shadow-card flex flex-col items-center justify-center space-y-4 rounded-lg border border-gray-200/10 px-4 py-4 shadow-md">
            <LockKeyhole className="text-primary size-10" />
            <h2 className="text-xl font-semibold">Espace admin</h2>
            <p className="text-center text-white/70">
              Gérez les plans, consultez les statistiques et l'historique des
              ventes
            </p>
            <Link to="/admin/dashboard" className="btn">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
