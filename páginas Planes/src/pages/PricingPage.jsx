
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { Check, X, HelpCircle, ArrowRight } from "lucide-react";

const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Ideal para emprendedores y pequeños negocios",
    features: [
      { name: "Hasta 5 plataformas digitales", included: true },
      { name: "Hasta 50 suscriptores", included: true },
      { name: "Pagos mensuales y anuales", included: true },
      { name: "Analíticas básicas", included: true },
      { name: "Soporte por email", included: true },
      { name: "Personalización básica", included: true },
      { name: "Integraciones avanzadas", included: false },
      { name: "Soporte prioritario", included: false },
      { name: "API para desarrolladores", included: false },
    ],
    popular: false,
    color: "bg-blue-500",
  },
  {
    id: "professional",
    name: "Professional",
    price: 79,
    description: "Perfecto para negocios en crecimiento",
    features: [
      { name: "Hasta 15 plataformas digitales", included: true },
      { name: "Hasta 500 suscriptores", included: true },
      { name: "Pagos mensuales y anuales", included: true },
      { name: "Analíticas avanzadas", included: true },
      { name: "Soporte por email y chat", included: true },
      { name: "Personalización completa", included: true },
      { name: "Integraciones avanzadas", included: true },
      { name: "Soporte prioritario", included: false },
      { name: "API para desarrolladores", included: false },
    ],
    popular: true,
    color: "bg-purple-600",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    description: "Para empresas y grandes operaciones",
    features: [
      { name: "Plataformas digitales ilimitadas", included: true },
      { name: "Suscriptores ilimitados", included: true },
      { name: "Pagos mensuales y anuales", included: true },
      { name: "Analíticas avanzadas y reportes", included: true },
      { name: "Soporte 24/7 por email, chat y teléfono", included: true },
      { name: "Personalización completa y marca blanca", included: true },
      { name: "Integraciones avanzadas", included: true },
      { name: "Soporte prioritario", included: true },
      { name: "API para desarrolladores", included: true },
    ],
    popular: false,
    color: "bg-pink-600",
  },
];

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { subscribeToPlan, activeSubscription } = useSubscription();
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    const success = subscribeToPlan({
      ...plan,
      billingCycle,
      actualPrice: billingCycle === "monthly" ? plan.price : plan.price * 10,
    });

    if (success) {
      navigate("/dashboard");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">Precios</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Planes diseñados para <span className="gradient-text">maximizar tus ingresos</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Elige el plan que mejor se adapte a tus necesidades y comienza a generar ingresos recurrentes con suscripciones digitales.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
              className={billingCycle === "monthly" ? "gradient-bg" : ""}
            >
              Mensual
            </Button>
            <Button
              variant={billingCycle === "annual" ? "default" : "outline"}
              onClick={() => setBillingCycle("annual")}
              className={billingCycle === "annual" ? "gradient-bg" : ""}
            >
              Anual
              <Badge variant="success" className="ml-2">
                -20%
              </Badge>
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
              variants={item}
            >
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {billingCycle === "monthly" ? plan.price : Math.round(plan.price * 10 * 0.8)}€
                  </span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mes" : "año"}</span>
                </div>
                {billingCycle === "annual" && (
                  <div className="text-sm text-green-600 font-medium">
                    Ahorras {Math.round(plan.price * 2.4)}€ al año
                  </div>
                )}
                <Button 
                  className={`w-full mt-6 ${plan.popular ? "gradient-bg" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan)}
                  disabled={activeSubscription && activeSubscription.plan.id === plan.id}
                >
                  {activeSubscription && activeSubscription.plan.id === plan.id 
                    ? "Plan actual" 
                    : "Seleccionar plan"}
                </Button>
              </div>

              <Separator />

              <div className="p-6">
                <h4 className="font-medium mb-4">Incluye:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas un plan personalizado?</h2>
          <p className="text-muted-foreground mb-6">
            Si tienes necesidades específicas o requieres funcionalidades adicionales, contáctanos para crear un plan a medida.
          </p>
          <Button variant="outline" className="mx-auto">
            Contactar con ventas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-muted/50 rounded-xl p-8">
            <div className="flex items-start space-x-4">
              <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Preguntas frecuentes sobre precios</h3>
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-medium">¿Puedo cambiar de plan en cualquier momento?</h4>
                    <p className="text-muted-foreground mt-1">
                      Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo de facturación.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">¿Hay algún cargo adicional?</h4>
                    <p className="text-muted-foreground mt-1">
                      No, el precio mostrado incluye todas las funcionalidades del plan. No hay cargos ocultos ni comisiones por transacción.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">¿Ofrecen período de prueba?</h4>
                    <p className="text-muted-foreground mt-1">
                      Sí, todos los planes incluyen un período de prueba de 14 días sin compromiso. Puedes cancelar en cualquier momento durante este período.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
