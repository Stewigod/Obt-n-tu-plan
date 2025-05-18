
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const { toast } = useToast();
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const loadSubscriptionData = () => {
      try {
        const savedActiveSubscription = localStorage.getItem("activeSubscription");
        const savedSubscriptions = localStorage.getItem("subscriptions");
        
        if (savedActiveSubscription) {
          setActiveSubscription(JSON.parse(savedActiveSubscription));
        }
        
        if (savedSubscriptions) {
          setSubscriptions(JSON.parse(savedSubscriptions));
        }
      } catch (error) {
        console.error("Error loading subscription data:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de suscripción",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadSubscriptionData();
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("activeSubscription", JSON.stringify(activeSubscription));
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
    }
  }, [activeSubscription, subscriptions, loading]);

  const subscribeToPlan = (plan) => {
    try {
      const subscriptionId = Date.now().toString();
      const newSubscription = {
        id: subscriptionId,
        plan: plan,
        startDate: new Date().toISOString(),
        status: "active",
      };
      
      setActiveSubscription(newSubscription);
      setSubscriptions([...subscriptions, newSubscription]);
      
      toast({
        title: "¡Suscripción exitosa!",
        description: `Te has suscrito al plan ${plan.name}`,
      });
      
      return true;
    } catch (error) {
      console.error("Error subscribing to plan:", error);
      toast({
        title: "Error",
        description: "No se pudo completar la suscripción",
        variant: "destructive",
      });
      return false;
    }
  };

  const cancelSubscription = (subscriptionId) => {
    try {
      const updatedSubscriptions = subscriptions.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: "cancelled", cancelDate: new Date().toISOString() } 
          : sub
      );
      
      setSubscriptions(updatedSubscriptions);
      
      if (activeSubscription && activeSubscription.id === subscriptionId) {
        setActiveSubscription(null);
      }
      
      toast({
        title: "Suscripción cancelada",
        description: "Tu suscripción ha sido cancelada correctamente",
      });
      
      return true;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast({
        title: "Error",
        description: "No se pudo cancelar la suscripción",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        activeSubscription,
        subscriptions,
        loading,
        subscribeToPlan,
        cancelSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
