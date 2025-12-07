import { AxiosError } from "axios";
import {
  Calendar,
  DollarSign,
  Filter,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "../../lib/axios";
import type { Period, StatCardProps, StatsResponse } from "../../types";
const AdminDashboard = () => {
  const [period, setPeriod] = useState<Period>("day");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [specificDate, setSpecificDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `/sales/stats?period=${period}`;

      if (period === "day" && specificDate) {
        url += `&date=${specificDate}`;
      } else if (period === "custom" && customStartDate && customEndDate) {
        url += `&startDate=${customStartDate}&endDate=${customEndDate}`;
      }

      const response = await axios.get(url);
      const data = await response.data;

      if (data.success) {
        setStats(data);
      } else {
        setError(data.message || "Erreur lors de la récupération des données");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError("Erreur de connexion au serveur");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod: Period) => {
    setPeriod(newPeriod);
    setSpecificDate("");
    setCustomStartDate("");
    setCustomEndDate("");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    subtitle,
  }: StatCardProps) => (
    <div className="bg-card rounded-lg p-6 shadow">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-white">{subtitle}</p>}
    </div>
  );

  if (loading && !stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Tableau de bord des ventes
          </h1>
          <p className="text-white">Analysez vos performances de vente</p>
        </div>

        {/* Filtres */}
        <div className="bg-card mb-6 rounded-lg p-6 shadow">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Filtres</h2>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <button
              onClick={() => handlePeriodChange("day")}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                period === "day"
                  ? "bg-primary text-white"
                  : "text-card bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Jour
            </button>
            <button
              onClick={() => handlePeriodChange("week")}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                period === "week"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => handlePeriodChange("month")}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                period === "month"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => handlePeriodChange("custom")}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                period === "custom"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Personnalisé
            </button>
          </div>

          {period === "day" && (
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-white/90">
                  Date spécifique
                </label>
                <input
                  type="date"
                  value={specificDate}
                  onChange={(e) => setSpecificDate(e.target.value)}
                  className="focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                />
              </div>
              <button
                onClick={fetchStats}
                disabled={loading}
                className="bg-primary hover:bg-primary rounded-lg px-6 py-2 text-white transition disabled:opacity-50"
              >
                {loading ? "Chargement..." : "Appliquer"}
              </button>
            </div>
          )}

          {period === "custom" && (
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date de début
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                />
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-white">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2"
                />
              </div>
              <button
                onClick={fetchStats}
                disabled={loading || !customStartDate || !customEndDate}
                className="bg-primary/90 hover:bg-primary rounded-lg px-6 py-2 text-white transition disabled:opacity-50"
              >
                {loading ? "Chargement..." : "Appliquer"}
              </button>
            </div>
          )}

          {(period === "week" || period === "month") && (
            <button
              onClick={fetchStats}
              disabled={loading}
              className="bg-primary/90 hover:bg-primary rounded-lg px-6 py-2 text-white transition disabled:opacity-50"
            >
              {loading ? "Chargement..." : "Rafraîchir"}
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {stats && (
          <>
            {/* Cartes statistiques */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Ventes totales"
                value={stats.summary.totalSales}
                icon={ShoppingCart}
                color="text-primary"
                subtitle={`${stats.summary.completedSales} complétées`}
              />
              <StatCard
                title="Revenu total"
                value={formatCurrency(stats.summary.totalRevenue)}
                icon={DollarSign}
                color="text-green-600"
              />
              <StatCard
                title="Revenu complété"
                value={formatCurrency(stats.summary.completedRevenue)}
                icon={TrendingUp}
                color="text-emerald-600"
              />
              <StatCard
                title="Vente moyenne"
                value={formatCurrency(stats.summary.averageSaleAmount)}
                icon={Calendar}
                color="text-purple-600"
              />
            </div>

            {/* Graphiques */}
            <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Timeline des ventes */}
              <div className="bg-card rounded-lg p-6 shadow">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Évolution des ventes
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.timeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name: string) => {
                        if (
                          name === "totalRevenue" ||
                          name === "completedRevenue"
                        ) {
                          return formatCurrency(value);
                        }
                        return value;
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="totalSales"
                      stroke="#3b82f6"
                      name="Ventes"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="completedSales"
                      stroke="#10b981"
                      name="Complétées"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Revenu */}
              <div className="bg-card rounded-lg p-6 shadow">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Revenus
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.timeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Bar
                      dataKey="totalRevenue"
                      fill="#3b82f6"
                      name="Revenu total"
                    />
                    <Bar
                      dataKey="completedRevenue"
                      fill="#10b981"
                      name="Revenu complété"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Méthodes de paiement */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-card rounded-lg p-6 shadow">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Répartition par méthode de paiement
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={
                        stats.paymentMethods as unknown as Record<
                          string,
                          string
                        >[]
                      }
                      dataKey="count"
                      nameKey="_id"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry) => entry.payload._id}
                    >
                      {stats.paymentMethods.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card rounded-lg p-6 shadow">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Détails par méthode de paiement
                </h3>
                <div className="space-y-4">
                  {stats.paymentMethods.map((method, index) => (
                    <div
                      key={method._id}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <div>
                          <p className="font-medium text-white capitalize">
                            {method._id.replace("_", " ")}
                          </p>
                          <p className="text-sm text-white">
                            {method.count} transaction
                            {method.count > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-white">
                        {formatCurrency(method.totalAmount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
