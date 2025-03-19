
import React, { useState } from "react";
import { 
  Building2, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2,
  MapPin,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Sample properties data
const sampleProperties = [
  {
    id: 1,
    name: "Sunrise Residence",
    address: "123 Main Street, Anytown",
    totalRooms: 30,
    occupiedRooms: 25,
    monthlyRevenue: "$8,750",
  },
  {
    id: 2,
    name: "Blue Mountain Lodge",
    address: "456 Park Avenue, Somewhere",
    totalRooms: 25,
    occupiedRooms: 18,
    monthlyRevenue: "$6,300",
  },
  {
    id: 3,
    name: "Green Valley Apartments",
    address: "789 Oak Lane, Nowhere",
    totalRooms: 15,
    occupiedRooms: 12,
    monthlyRevenue: "$4,200",
  },
];

const Properties = () => {
  const [properties, setProperties] = useState(sampleProperties);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
    totalRooms: "",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value,
    });
  };

  const handleAddProperty = () => {
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    
    const propertyToAdd = {
      id: newId,
      name: newProperty.name,
      address: newProperty.address,
      totalRooms: parseInt(newProperty.totalRooms) || 0,
      occupiedRooms: 0,
      monthlyRevenue: "$0",
    };
    
    setProperties([...properties, propertyToAdd]);
    setNewProperty({ name: "", address: "", totalRooms: "" });
    setIsAddPropertyOpen(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-3xl">Properties</h1>
        <p className="text-muted-foreground mt-1">Manage your properties</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search properties..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Button onClick={() => setIsAddPropertyOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <DashboardCard key={property.id} className="flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.address}
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-secondary">
                <div className="text-sm text-muted-foreground">Total Rooms</div>
                <div className="font-semibold flex items-center mt-1">
                  <Home className="h-4 w-4 mr-1 text-primary" />
                  {property.totalRooms}
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-secondary">
                <div className="text-sm text-muted-foreground">Occupied</div>
                <div className="font-semibold mt-1">
                  {property.occupiedRooms}/{property.totalRooms}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-secondary">
              <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              <div className="font-semibold text-lg mt-1">{property.monthlyRevenue}</div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Building2 className="mr-2 h-4 w-4" /> View Details
              </Button>
            </div>
          </DashboardCard>
        ))}
      </div>
      
      {/* Add Property Dialog */}
      <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Enter the details of your new property.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter property name"
                value={newProperty.name}
                onChange={handlePropertyChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter full address"
                value={newProperty.address}
                onChange={handlePropertyChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="totalRooms">Total Rooms</Label>
              <Input
                id="totalRooms"
                name="totalRooms"
                type="number"
                placeholder="Enter number of rooms"
                value={newProperty.totalRooms}
                onChange={handlePropertyChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPropertyOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProperty}>Add Property</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Properties;
