
import React, { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2,
  Phone,
  Mail,
  Building2,
  DoorOpen,
  Calendar,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sample properties list for filtering
const sampleProperties = [
  { id: 1, name: "Sunrise Residence" },
  { id: 2, name: "Blue Mountain Lodge" },
  { id: 3, name: "Green Valley Apartments" },
];

// Sample rooms data for assignment
const availableRooms = [
  { id: 1, name: "A-102", propertyId: 1 },
  { id: 2, name: "B-210", propertyId: 2 },
];

// Sample tenants data
const sampleTenants = [
  {
    id: 1,
    name: "Alex Johnson",
    phone: "+1 (555) 123-4567",
    email: "alex.j@example.com",
    status: "Active",
    propertyId: 1,
    propertyName: "Sunrise Residence",
    roomName: "A-101",
    startDate: "2023-06-15",
    endDate: "2024-06-14",
  },
  {
    id: 2,
    name: "Maria Garcia",
    phone: "+1 (555) 987-6543",
    email: "maria.g@example.com",
    status: "Active",
    propertyId: 2,
    propertyName: "Blue Mountain Lodge",
    roomName: "B-205",
    startDate: "2023-01-10",
    endDate: "2024-01-09",
  },
  {
    id: 3,
    name: "Sam Wilson",
    phone: "+1 (555) 456-7890",
    email: "sam.w@example.com",
    status: "Active",
    propertyId: 3,
    propertyName: "Green Valley Apartments",
    roomName: "C-310",
    startDate: "2023-03-20",
    endDate: "2024-03-19",
  },
  {
    id: 4,
    name: "Emma Davis",
    phone: "+1 (555) 234-5678",
    email: "emma.d@example.com",
    status: "Inactive",
    propertyId: 1,
    propertyName: "Sunrise Residence",
    roomName: "A-105",
    startDate: "2022-08-05",
    endDate: "2023-08-04",
  },
];

const Tenants = () => {
  const [tenants, setTenants] = useState(sampleTenants);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: "",
    phone: "",
    email: "",
    propertyId: "",
    roomId: "",
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTenantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTenant({
      ...newTenant,
      [name]: value,
    });
  };

  const handleAddTenant = () => {
    const property = sampleProperties.find(p => p.id.toString() === newTenant.propertyId);
    const room = availableRooms.find(r => r.id.toString() === newTenant.roomId);
    
    if (!property || !room) return;
    
    const newId = tenants.length > 0 ? Math.max(...tenants.map(t => t.id)) + 1 : 1;
    
    const tenantToAdd = {
      id: newId,
      name: newTenant.name,
      phone: newTenant.phone,
      email: newTenant.email,
      status: "Active",
      propertyId: parseInt(newTenant.propertyId),
      propertyName: property.name,
      roomName: room.name,
      startDate: format(newTenant.startDate, "yyyy-MM-dd"),
      endDate: format(newTenant.endDate, "yyyy-MM-dd"),
    };
    
    setTenants([...tenants, tenantToAdd]);
    setNewTenant({
      name: "",
      phone: "",
      email: "",
      propertyId: "",
      roomId: "",
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
    setIsAddTenantOpen(false);
  };

  // Filter tenants based on search term, selected property, and status
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = 
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone.includes(searchTerm);
    
    const matchesProperty = 
      selectedProperty === "all" || 
      tenant.propertyId.toString() === selectedProperty;
    
    const matchesStatus =
      selectedStatus === "all" ||
      tenant.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesProperty && matchesStatus;
  });

  // Get available rooms based on selected property
  const filteredAvailableRooms = availableRooms.filter(
    room => room.propertyId.toString() === newTenant.propertyId
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-3xl">Tenants</h1>
        <p className="text-muted-foreground mt-1">Manage your tenants across all properties</p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Tenants</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Filter by Property</h4>
                    <Select 
                      value={selectedProperty} 
                      onValueChange={(value) => setSelectedProperty(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property" />
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
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Filter by Status</h4>
                    <Select 
                      value={selectedStatus} 
                      onValueChange={(value) => setSelectedStatus(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      setSelectedProperty("all");
                      setSelectedStatus("all");
                      setIsFiltersOpen(false);
                    }}
                    variant="outline"
                  >
                    Reset Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tenants..."
                className="pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <Button onClick={() => setIsAddTenantOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Tenant
            </Button>
          </div>
        </div>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTenants.map((tenant) => (
              <Card key={tenant.id} className="overflow-hidden animate-scale-in">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tenant.name}</CardTitle>
                    <Badge variant={tenant.status === "Active" ? "default" : "secondary"}>
                      {tenant.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex flex-col space-y-1 mt-2">
                    <span className="flex items-center">
                      <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      {tenant.phone}
                    </span>
                    <span className="flex items-center">
                      <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                      {tenant.email}
                    </span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Building2 className="h-4 w-4 mr-2 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{tenant.propertyName}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <DoorOpen className="h-3.5 w-3.5 mr-1" /> Room {tenant.roomName}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Lease Period</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(tenant.startDate).toLocaleDateString()} - {new Date(tenant.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTenants
              .filter(tenant => tenant.status === "Active")
              .map((tenant) => (
                <Card key={tenant.id} className="overflow-hidden animate-scale-in">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tenant.name}</CardTitle>
                      <Badge>Active</Badge>
                    </div>
                    <CardDescription className="flex flex-col space-y-1 mt-2">
                      <span className="flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        {tenant.phone}
                      </span>
                      <span className="flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        {tenant.email}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Building2 className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">{tenant.propertyName}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <DoorOpen className="h-3.5 w-3.5 mr-1" /> Room {tenant.roomName}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">Lease Period</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(tenant.startDate).toLocaleDateString()} - {new Date(tenant.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTenants
              .filter(tenant => tenant.status === "Inactive")
              .map((tenant) => (
                <Card key={tenant.id} className="overflow-hidden animate-scale-in">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tenant.name}</CardTitle>
                      <Badge variant="secondary">Inactive</Badge>
                    </div>
                    <CardDescription className="flex flex-col space-y-1 mt-2">
                      <span className="flex items-center">
                        <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        {tenant.phone}
                      </span>
                      <span className="flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        {tenant.email}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Building2 className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">{tenant.propertyName}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <DoorOpen className="h-3.5 w-3.5 mr-1" /> Room {tenant.roomName}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">Lease Period</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(tenant.startDate).toLocaleDateString()} - {new Date(tenant.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add Tenant Dialog */}
      <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
            <DialogDescription>
              Enter the details of the new tenant.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter tenant's full name"
                value={newTenant.name}
                onChange={handleTenantChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                value={newTenant.phone}
                onChange={handleTenantChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={newTenant.email}
                onChange={handleTenantChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="propertyId">Property</Label>
              <Select 
                value={newTenant.propertyId} 
                onValueChange={(value) => setNewTenant({ 
                  ...newTenant, 
                  propertyId: value,
                  roomId: "", // Reset room when property changes
                })}
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
              <Label htmlFor="roomId">Room</Label>
              <Select 
                value={newTenant.roomId} 
                onValueChange={(value) => setNewTenant({ ...newTenant, roomId: value })}
                disabled={!newTenant.propertyId}
              >
                <SelectTrigger id="roomId">
                  <SelectValue placeholder={
                    newTenant.propertyId 
                      ? (filteredAvailableRooms.length > 0 
                        ? "Select room" 
                        : "No available rooms")
                      : "Select property first"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {filteredAvailableRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id.toString()}>
                      Room {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      {format(newTenant.startDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={newTenant.startDate}
                      onSelect={(date) => date && setNewTenant({ ...newTenant, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      {format(newTenant.endDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={newTenant.endDate}
                      onSelect={(date) => date && setNewTenant({ ...newTenant, endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTenantOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTenant}>Add Tenant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tenants;
