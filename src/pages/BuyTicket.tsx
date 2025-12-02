import { CreditCard, LoaderCircle, Timer, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import cash from "../assets/cash.webp";
import mvola from "../assets/mvola.webp";
import orange from "../assets/orange.webp";
import Loading from "../components/Loading";
import { Success } from "../components/Success";
import axios from "../lib/axios";
import { type Plan, type Ticket } from "../types";

const paymentMethods = [
  {
    name: "Mvola",
    value: "mvola",
    src: mvola,
  },
  {
    name: "Orange Money",
    value: "orange_moeny",

    src: orange,
  },
  {
    name: "Cash",
    value: "cash",
    src: cash,
  },
];

const BuyTickets = () => {
  const [plans, setPlans] = useState<null | Plan[]>(null);
  const [selectedPlan, setSelectedPlan] = useState<null | Plan["_id"]>(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [generatedTicket, setGeneratedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPlans = async () => {
      const res = await axios.get("plans");
      setPlans(res.data.plans);
    };
    getPlans();
  }, []);

  const buyTicket = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/tickets/purchase", {
        planId: selectedPlan,
        paymentMethod: selectedPayment,
      });
      setGeneratedTicket(res.data.ticket);
    } catch {
      console.log("The is an error");
    } finally {
      setLoading(false);
    }
  };

  const resetPurchase = () => {
    setSelectedPlan(null);
    setSelectedPayment("");
    setGeneratedTicket(null);
  };

  if (!plans) return <Loading />;

  return !generatedTicket ? (
    <div className="mx-auto space-y-4">
      <div className="bg-card/50 space-y-2 rounded-xl px-4 py-4 md:px-8 md:py-6 lg:px-16 lg:py-12">
        <h2 className="flex items-center gap-x-2">
          <Wifi className="text-primary size-10" />
          <span className="text-2xl">Choisissez votre forfait:</span>
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <button
              key={plan._id}
              onClick={() => setSelectedPlan(plan._id)}
              className={`hover:border-primary flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-xl border border-gray-200/20 px-6 py-4 transition-all duration-500 hover:relative hover:scale-105 ${plan._id === selectedPlan ? "bg-primary" : "bg-card"}`}
            >
              <Timer />
              <p>{plan.duration}h</p>
              <p>{plan.price} ar</p>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-card/50 space-y-4 rounded-xl px-4 py-4 md:px-8 md:py-6 lg:px-16 lg:py-12">
        <h2 className="flex items-center gap-x-2">
          <CreditCard className="text-primary size-10" />
          <span className="text-2xl">Mode de paiement</span>
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {paymentMethods.map((paymentMethod) => (
            <div key={paymentMethod.name} className="space-y-2">
              <button
                onClick={() => setSelectedPayment(paymentMethod.value)}
                className={`bg-card hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-xl border border-gray-200/20 px-6 py-4 transition-all duration-500 hover:relative hover:scale-105 ${paymentMethod.value == selectedPayment ? "border-primary" : ""}`}
              >
                <img
                  src={paymentMethod.src}
                  alt={paymentMethod.name}
                  className="size-12"
                />
                <h3>{paymentMethod.name}</h3>
              </button>
            </div>
          ))}
        </div>
        <div
          className={`flex flex-col gap-1 ${selectedPayment !== "cash" ? "" : "hidden"}`}
        >
          <label htmlFor="phone">Numéro de téléphone:</label>
          <input
            type="phone"
            className="focus:outline-primary focus:border-primary rounded-lg border border-gray-200/20 px-4 py-2 focus:ring-0 focus:outline"
            placeholder="034 12 345 67"
          />
        </div>
        <button
          className="bg-primary disabled:bg-gray-800-100 w-full cursor-pointer gap-x-1 rounded-2xl px-4 py-2"
          onClick={buyTicket}
          disabled={!selectedPlan || !selectedPayment}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-x-2">
              <span className="animate-pulse">Chargement...</span>
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            "Acheter le ticket"
          )}
        </button>
      </div>
    </div>
  ) : (
    <Success generatedTicket={generatedTicket} resetPurchase={resetPurchase} />
  );
};

export default BuyTickets;
