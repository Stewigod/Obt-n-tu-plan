
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import HomePage from "@/pages/HomePage";
import PricingPage from "@/pages/PricingPage";
import DashboardPage from "@/pages/DashboardPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";

function App() {
  return (
    <Router>
      <SubscriptionProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </SubscriptionProvider>
    </Router>
  );
}

export default App;
