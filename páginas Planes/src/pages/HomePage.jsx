
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  CreditCard, 
  BarChart3, 
  Users, 
  Globe, 
  Shield, 
  Zap
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
};

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="premium" className="mb-4">La plataforma #1 de suscripciones</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Genera ingresos con <span className="gradient-text">suscripciones digitales</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Maximiza tus ingresos recurrentes con nuestra plataforma de gestión de suscripciones digitales. Fácil de usar, potente y escalable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/pricing">
                  <Button size="lg" className="gradient-bg w-full sm:w-auto">
                    Comenzar ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver demostración
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-primary" />
                  <span>Sin comisiones</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-primary" />
                  <span>Soporte 24/7</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-primary" />
                  <span>Cancelación flexible</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 blur"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
                  <img  alt="Dashboard de gestión de suscripciones" className="w-full h-auto rounded-lg" src="https://images.unsplash.com/photo-1678227547327-ec5745559b29" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            CONFÍAN EN NOSOTROS MÁS DE 10,000 CREADORES Y EMPRESAS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Netflix", "Spotify", "Disney+", "HBO Max", "Amazon Prime"].map((brand, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-xl font-bold text-muted-foreground/60"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Características</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todo lo que necesitas para gestionar tus <span className="gradient-text">suscripciones digitales</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Nuestra plataforma te ofrece todas las herramientas necesarias para crear, gestionar y escalar tus suscripciones digitales.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: <CreditCard className="h-10 w-10" />,
                title: "Gestión de pagos",
                description: "Procesa pagos de forma segura con múltiples pasarelas de pago y monedas."
              },
              {
                icon: <BarChart3 className="h-10 w-10" />,
                title: "Analíticas detalladas",
                description: "Visualiza el rendimiento de tus suscripciones con informes detallados."
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Gestión de clientes",
                description: "Administra tus suscriptores y personaliza su experiencia."
              },
              {
                icon: <Globe className="h-10 w-10" />,
                title: "Múltiples plataformas",
                description: "Integra con Netflix, Spotify, Disney+ y muchas más plataformas."
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Seguridad avanzada",
                description: "Protección de datos y cumplimiento con regulaciones internacionales."
              },
              {
                icon: <Zap className="h-10 w-10" />,
                title: "Automatizaciones",
                description: "Automatiza renovaciones, recordatorios y comunicaciones."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md card-hover border"
                variants={item}
              >
                <div className="feature-icon mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "+10,000", label: "Usuarios activos" },
              { value: "+50M€", label: "Ingresos generados" },
              { value: "99.9%", label: "Tiempo de actividad" },
              { value: "+20", label: "Plataformas integradas" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Cómo funciona</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comienza a generar ingresos en <span className="gradient-text">3 simples pasos</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Nuestra plataforma está diseñada para que puedas empezar a generar ingresos con suscripciones digitales de forma rápida y sencilla.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Elige tu plan",
                description: "Selecciona el plan que mejor se adapte a tus necesidades y objetivos de negocio."
              },
              {
                step: "02",
                title: "Configura tus suscripciones",
                description: "Personaliza tus ofertas, precios y configura las plataformas que quieres ofrecer."
              },
              {
                step: "03",
                title: "Comienza a vender",
                description: "Comparte tu página de suscripción y empieza a generar ingresos recurrentes."
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-full w-24 h-0.5 bg-primary/30">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Preguntas frecuentes</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Resolvemos tus <span className="gradient-text">dudas</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma de suscripciones digitales.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "¿Cómo funciona el sistema de suscripciones?",
                  answer: "Nuestra plataforma te permite gestionar suscripciones a múltiples servicios digitales como Netflix, Spotify, Disney+ y más. Tú eliges qué servicios ofrecer, estableces los precios y nosotros nos encargamos de la gestión de pagos y accesos."
                },
                {
                  question: "¿Qué plataformas digitales puedo ofrecer?",
                  answer: "Actualmente trabajamos con más de 20 plataformas populares incluyendo Netflix, Spotify, Disney+, HBO Max, Amazon Prime, YouTube Premium, Apple Music, Deezer, Tidal, y muchas más. Constantemente añadimos nuevas plataformas."
                },
                {
                  question: "¿Cuáles son las comisiones por venta?",
                  answer: "No cobramos comisiones por venta. Nuestro modelo de negocio se basa en una suscripción mensual fija según el plan que elijas, lo que te permite maximizar tus márgenes de beneficio."
                },
                {
                  question: "¿Puedo cancelar mi suscripción en cualquier momento?",
                  answer: "Sí, puedes cancelar tu suscripción en cualquier momento sin penalizaciones. Tendrás acceso a la plataforma hasta el final del período facturado."
                },
                {
                  question: "¿Ofrecen soporte técnico?",
                  answer: "Sí, todos nuestros planes incluyen soporte técnico. Los planes Business y Enterprise incluyen soporte prioritario 24/7 por chat, email y teléfono."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-12 relative overflow-hidden animated-gradient-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-white/50 dark:bg-black/50 backdrop-blur-sm -z-10"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Listo para empezar a generar ingresos recurrentes?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Únete a miles de emprendedores y empresas que ya están generando ingresos con nuestra plataforma de suscripciones digitales.
              </p>
              <Link to="/pricing">
                <Button size="lg" className="gradient-bg">
                  Ver planes y precios
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
