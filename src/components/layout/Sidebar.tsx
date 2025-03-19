
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Building2, 
  DoorOpen, 
  Users, 
  Receipt, 
  Settings, 
  Menu, 
  X, 
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
        "hover:bg-sidebar-accent group",
        isActive
          ? "bg-sidebar-accent text-sidebar-primary"
          : "text-sidebar-foreground"
      )
    }
  >
    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      {label}
    </span>
  </NavLink>
);

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Toggle button (mobile) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40 w-64 bg-sidebar-DEFAULT border-r border-sidebar-border",
          "transition-transform duration-300 ease-in-out",
          "flex flex-col shadow-smooth",
          "glass backdrop-blur-md bg-opacity-50",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="py-6 px-4 border-b border-sidebar-border">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">Kos2an Manager</span>
          </NavLink>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/properties" icon={Building2} label="Properties" />
          <NavItem to="/rooms" icon={DoorOpen} label="Rooms" />
          <NavItem to="/tenants" icon={Users} label="Tenants" />
          <NavItem to="/billing" icon={Receipt} label="Billing" />
        </nav>
        
        <div className="border-t border-sidebar-border py-4 px-4">
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </div>
      </aside>
    </>
  );
}
