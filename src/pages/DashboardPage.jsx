
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart3,
  Users,
  CreditCard,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  X
} from "lucide-react";

const DashboardPage = () => {
  const { activeSubscription, cancelSubscription, loading } = useSubscription();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeUsers: 0,
    averageRevenue: 0,
    growthRate: 0
  });

  // Simular datos para el dashboard
  useEffect(() => {
    if (!loading && !activeSubscription) {
      navigate("/pricing");
      toast({
        title: "Acceso restringido",
        description: "Necesitas una suscripción activa para acceder al dashboard",
        variant: "destructive",
      });
    } else if (activeSubscription) {
      // Generar datos de ejemplo basados en el plan
      const multiplier = 
        activeSubscription.plan.id === "starter" ? 1 :
        activeSubscription.plan.id === "professional" ? 5 : 15;
      
      setStats({
        totalRevenue: 1250 * multiplier,
        activeUsers: 28 * multiplier,
        averageRevenue: 45 * multiplier,
        growthRate: 12 + (multiplier * 2)
      });
    }
  }, [activeSubscription, loading, navigate, toast]);

  const handleCancelSubscription = () => {
    if (window.confirm("¿Estás seguro de que deseas cancelar tu suscripción?")) {
      if (activeSubscription) {
        cancelSubscription(activeSubscription.id);
        navigate("/pricing");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  if (!activeSubscription) {
    return null; // El useEffect redirigirá al usuario
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Calcular fecha de renovación (30 días después de la fecha de inicio)
  const startDate = new Date(activeSubscription.startDate);
  const renewalDate = new Date(startDate);
  renewalDate.setDate(renewalDate.getDate() + 30);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Gestiona tus suscripciones y analiza tu rendimiento
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" onClick={handleCancelSubscription}>
              Cancelar suscripción
            </Button>
          </div>
        </div>

        {/* Subscription Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Información de suscripción</CardTitle>
              <CardDescription>Detalles de tu plan actual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Plan actual</h3>
                  <div className="flex items-center">
                    <span className="text-xl font-semibold">{activeSubscription.plan.name}</span>
                    <Badge variant="premium" className="ml-2">Activo</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Fecha de inicio</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatDate(activeSubscription.startDate)}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Próxima renovación</h3>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatDate(renewalDate)}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Detalles del plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>
                        {activeSubscription.plan.id === "starter" 
                          ? "Hasta 5 plataformas digitales" 
                          : activeSubscription.plan.id === "professional"
                            ? "Hasta 15 plataformas digitales"
                            : "Plataformas digitales ilimitadas"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>
                        {activeSubscription.plan.id === "starter" 
                          ? "Hasta 50 suscriptores" 
                          : activeSubscription.plan.id === "professional"
                            ? "Hasta 500 suscriptores"
                            : "Suscriptores ilimitados"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>Pagos mensuales y anuales</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>
                        {activeSubscription.plan.id === "starter" 
                          ? "Analíticas básicas" 
                          : "Analíticas avanzadas"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      <span>
                        {activeSubscription.plan.id === "starter" 
                          ? "Soporte por email" 
                          : activeSubscription.plan.id === "professional"
                            ? "Soporte por email y chat"
                            : "Soporte 24/7 por email, chat y teléfono"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {activeSubscription.plan.id === "starter" ? (
                        <>
                          <X className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-muted-foreground">Integraciones avanzadas</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Integraciones avanzadas</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-muted-foreground text-sm">
                Ciclo de facturación: {activeSubscription.billingCycle === "monthly" ? "Mensual" : "Anual"}
              </div>
              <div className="font-semibold">
                {activeSubscription.actualPrice}€/{activeSubscription.billingCycle === "monthly" ? "mes" : "año"}
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Resumen de rendimiento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Ingresos totales",
                value: `${stats.totalRevenue}€`,
                icon: <BarChart3 className="h-5 w-5" />,
                change: 8.2,
                positive: true
              },
              {
                title: "Usuarios activos",
                value: stats.activeUsers,
                icon: <Users className="h-5 w-5" />,
                change: 12.5,
                positive: true
              },
              {
                title: "Ingreso promedio",
                value: `${stats.averageRevenue}€`,
                icon: <CreditCard className="h-5 w-5" />,
                change: 3.2,
                positive: true
              },
              {
                title: "Tasa de crecimiento",
                value: `${stats.growthRate}%`,
                icon: <TrendingUp className="h-5 w-5" />,
                change: -2.4,
                positive: false
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-2 rounded-full ${stat.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      {stat.positive ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                      )}
                      <span className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}%
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">vs. mes anterior</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>Últimas transacciones y eventos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "payment",
                    title: "Pago recibido",
                    description: `Pago de suscripción - Plan ${activeSubscription.plan.name}`,
                    amount: `${activeSubscription.actualPrice}€`,
                    date: "Hoy",
                    status: "success"
                  },
                  {
                    type: "subscription",
                    title: "Nueva suscripción",
                    description: `Te has suscrito al plan ${activeSubscription.plan.name}`,
                    date: formatDate(activeSubscription.startDate),
                    status: "success"
                  },
                  {
                    type: "user",
                    title: "Nuevo usuario",
                    description: "María García se ha unido a tu plataforma",
                    date: "Hace 2 días",
                    status: "info"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${
                      activity.status === "success" ? "bg-green-100 text-green-600" :
                      activity.status === "warning" ? "bg-yellow-100 text-yellow-600" :
                      activity.status === "error" ? "bg-red-100 text-red-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {activity.type === "payment" ? (
                        <CreditCard className="h-5 w-5" />
                      ) : activity.type === "subscription" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : activity.type === "user" ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                        {activity.amount && (
                          <span className="font-semibold">{activity.amount}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
