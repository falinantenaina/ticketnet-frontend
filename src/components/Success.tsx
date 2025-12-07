import { Check, Copy, Printer } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.webp";
import type { Ticket } from "../types";

export const Success = ({
  generatedTicket,
  resetPurchase,
}: {
  generatedTicket: Ticket;
  resetPurchase: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTicket.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-card/50 mx-auto h-max max-w-xl min-w-[350px] px-4 py-6 print:bg-transparent print:px-0 print:py-0 print:text-black">
      <div className="flex flex-col items-center space-y-4 print:justify-start print:space-y-0">
        <div className="bg-primary/20 flex size-15 items-center justify-center rounded-full print:relative print:-top-5 print:hidden">
          <Check className="text-green-300" strokeWidth={4} />
        </div>
        <h3 className="text-center text-xl font-bold print:hidden">
          Paiement réussi!
        </h3>
        <div className="flex items-center justify-center gap-x-2">
          <img src={logo} alt="Itad logo" className="size-10" />
          <span className="font-semibold">Itad Wifi Zone</span>
        </div>
        <p className="print:hidden">Votre code d'accès WiFi</p>
        <div className="bg-primary relative w-full border border-gray-200/20 px-6 py-4 text-center text-2xl print:px-0 print:py-0">
          {generatedTicket.code}
          <button
            onClick={handleCopy}
            className="hover:bg-card/10 absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer px-3 py-2 transition-colors print:hidden"
            title="Copier le code"
          >
            {copied ? (
              <Check className="size-5 text-white" />
            ) : (
              <Copy className="size-5" />
            )}
          </button>
        </div>
        <p className="text-lg">
          Durée: <span>{generatedTicket.duration} h</span>
        </p>
        <div className="bg-card px-4 py-2 print:hidden">
          <ol className="space-y-2">
            <li>1. Connectez-vous au WiFi du hotspot</li>
            <li>2. Sur la page de connexion : Entrez le code</li>
            <li>3. Cliquez sur "Se connecter"</li>
          </ol>
        </div>
        <button
          className="bg-primary flex w-full cursor-pointer items-center justify-center gap-x-2 px-4 py-2 print:hidden"
          onClick={handlePrint}
        >
          <Printer className="size-5" />
          Imprimer le ticket
        </button>
        <button
          className="bg-primary w-full cursor-pointer gap-x-1 px-4 py-2 print:hidden"
          onClick={resetPurchase}
        >
          Acheter un autre ticket
        </button>
      </div>
    </div>
  );
};
