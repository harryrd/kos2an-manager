
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, DoorOpen, Users, Receipt } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  // Redirect if accessed directly
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 100);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-2 animate-fade-in">
        <Building2 className="w-8 h-8 text-white" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-slide-in">
        Kos2an Manager
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: "100ms" }}>
        Simplify your boarding house management with our comprehensive property and tenant management system.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-4xl animate-slide-in" style={{ animationDelay: "200ms" }}>
        <div className="p-6 rounded-xl glass text-center">
          <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Properties</h3>
        </div>
        
        <div className="p-6 rounded-xl glass text-center">
          <DoorOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Rooms</h3>
        </div>
        
        <div className="p-6 rounded-xl glass text-center">
          <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Tenants</h3>
        </div>
        
        <div className="p-6 rounded-xl glass text-center">
          <Receipt className="w-8 h-8 mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Billing</h3>
        </div>
      </div>
      
      <Button 
        size="lg" 
        className="animate-slide-in mt-8" 
        style={{ animationDelay: "300ms" }}
        onClick={() => navigate("/dashboard")}
      >
        Get Started <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};

export default Index;
