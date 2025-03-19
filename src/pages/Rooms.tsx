
import React, { useState } from "react";
import { 
  DoorOpen, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2,
  Building2,
  Users,
  DollarSign,
  CalendarClock,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Sample properties list for filtering
const sampleProperties = [
  { id: 1, name: "Sunrise Residence" },
  { id: 2, name: "Blue Mountain Lodge" },
  { id: 3, name: "Green Valley Apartments" },
];

// Sample duration options
const durationOptions = ["Daily", "Monthly", "Yearly"];

// Sample rooms data
const sampleRooms = [
  {
    id: 1,
    name: "A-101",
    propertyId: 1,
    propertyName: "Sunrise Residence",
    status: "Occupied",
    rentalPeriod: "Monthly",
    price: "$350",
    tenant: "Alex Johnson",
  },
  {
    id: 2,
    name: "A-102",
    propertyId: 1,
    propertyName: "Sunrise Residence",
    status: "Vacant",
    rentalPeriod: "Monthly",
    price: "$375",
    tenant: null,
  },
  {
    id: 3,
    name: "B-205",
    propertyId: 2,
    propertyName: "Blue Mountain Lodge",
    status: "Occupied",
    rentalPeriod: "Yearly",
    price: "$3,200",
    tenant: "Maria Garcia",
  },
  {
    id: 4,
    name: "C-310",
    propertyId: 3,
    propertyName: "Green Valley Apartments",
    status: "Occupied",
    rentalPeriod: "Monthly",
    price: "$425",
    tenant: "Sam Wilson",
  },
  {
    id: 5,
    name: "B-210",
    propertyId: 2,
    propertyName: "Blue Mountain Lodge",
    status: "Vacant",
    rentalPeriod: "Daily",
    price: "$45",
    tenant: null,
  },
];

const Rooms = () => {
  const [rooms, setRooms] = useState(sampleRooms);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    propertyId: "",
    rentalPeriod: "Monthly",
    price: "",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoom({
      ...newRoom,
      [name]: value,
    });
  };

  const handleAddRoom = () => {
    const property = sampleProperties.find(p => p.id.toString() === newRoom.propertyId);
    
    if (!property) return;
    
    const newId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
    
    const roomToAdd = {
      id: newId,
      name: newRoom.name,
      propertyId: parseInt(newRoom.propertyId),
      propertyName: property.name,
      status: "Vacant",
      rentalPeriod: newRoom.rentalPeriod,
      price: `$${newRoom.price}`,
      tenant: null,
    };
    
    setRooms([...rooms, roomToAdd]);
    setNewRoom({ name: "", propertyId: "", rentalPeriod: "Monthly", price: "" });
    setIsAddRoomOpen(false);
  };

  // Filter rooms based on search term and selected property
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = 
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.tenant && room.tenant.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProperty = 
      selectedProperty === "all" || 
      room.propertyId.toString() === selectedProperty;
    
    return matchesSearch && matchesProperty;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-3xl">Rooms</h1>
        <p className="text-muted-foreground mt-1">Manage your rooms across all properties</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search rooms..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <Select 
            value={selectedProperty} 
            onValueChange={(value) => setSelectedProperty(value)}
          >
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue placeholder="Filter by Property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {sampleProperties.map((property) => (
                <SelectItem key={property.id} value={property.id.toString()}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={() => setIsAddRoomOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Room
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <DashboardCard key={room.id} className="flex flex-col">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DoorOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{room.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Building2 className="h-3 w-3 mr-1" />
                    {room.propertyName}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Badge 
                  variant={room.status === "Occupied" ? "default" : "secondary"}
                  className="mr-2"
                >
                  {room.status}
                </Badge>
                
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
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-secondary">
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-semibold flex items-center mt-1">
                  <DollarSign className="h-4 w-4 mr-1 text-primary" />
                  {room.price}
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-secondary">
                <div className="text-sm text-muted-foreground">Period</div>
                <div className="font-semibold flex items-center mt-1">
                  <CalendarClock className="h-4 w-4 mr-1 text-primary" />
                  {room.rentalPeriod}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-secondary">
              <div className="text-sm text-muted-foreground">Tenant</div>
              <div className="flex items-center mt-1">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <span className="font-semibold">
                  {room.tenant || "No tenant"}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t flex gap-2">
              <Button variant="outline" className="flex-1">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              {room.status === "Vacant" ? (
                <Button className="flex-1">
                  <Check className="mr-2 h-4 w-4" /> Assign Tenant
                </Button>
              ) : (
                <Button variant="destructive" className="flex-1">
                  <X className="mr-2 h-4 w-4" /> Mark Vacant
                </Button>
              )}
            </div>
          </DashboardCard>
        ))}
      </div>
      
      {/* Add Room Dialog */}
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>
              Enter the details of your new room.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Room Name/Number</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. A-101"
                value={newRoom.name}
                onChange={handleRoomChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="propertyId">Property</Label>
              <Select 
                value={newRoom.propertyId} 
                onValueChange={(value) => setNewRoom({ ...newRoom, propertyId: value })}
              >
                <SelectTrigger id="propertyId">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {sampleProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id.toString()}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="rentalPeriod">Rental Period</Label>
              <Select 
                value={newRoom.rentalPeriod} 
                onValueChange={(value) => setNewRoom({ ...newRoom, rentalPeriod: value })}
              >
                <SelectTrigger id="rentalPeriod">
                  <SelectValue placeholder="Select rental period" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="price"
                  name="price"
                  className="pl-10"
                  placeholder="e.g. 350"
                  value={newRoom.price}
                  onChange={handleRoomChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoomOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRoom}>Add Room</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rooms;
