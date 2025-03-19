
import React, { useState } from "react";
import { 
  Receipt, 
  Plus, 
  Search, 
  Download, 
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  Calendar,
  ArrowUpDown,
  DollarSign
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sample properties and tenants data
const sampleProperties = [
  { id: 1, name: "Sunrise Residence" },
  { id: 2, name: "Blue Mountain Lodge" },
  { id: 3, name: "Green Valley Apartments" },
];

const sampleTenants = [
  { id: 1, name: "Alex Johnson", propertyId: 1, roomName: "A-101" },
  { id: 2, name: "Maria Garcia", propertyId: 2, roomName: "B-205" },
  { id: 3, name: "Sam Wilson", propertyId: 3, roomName: "C-310" },
  { id: 4, name: "Emma Davis", propertyId: 1, roomName: "A-105" },
];

// Sample invoices data
const sampleInvoices = [
  {
    id: "INV-2023-001",
    tenantId: 1,
    tenantName: "Alex Johnson",
    propertyId: 1,
    propertyName: "Sunrise Residence",
    roomName: "A-101",
    amount: 350,
    status: "Paid",
    dueDate: "2023-08-01",
    paidDate: "2023-07-28",
    period: "Monthly",
    description: "Rent for August 2023",
  },
  {
    id: "INV-2023-002",
    tenantId: 2,
    tenantName: "Maria Garcia",
    propertyId: 2,
    propertyName: "Blue Mountain Lodge",
    roomName: "B-205",
    amount: 3200,
    status: "Paid",
    dueDate: "2023-01-15",
    paidDate: "2023-01-10",
    period: "Yearly",
    description: "Yearly rent for 2023",
  },
  {
    id: "INV-2023-003",
    tenantId: 3,
    tenantName: "Sam Wilson",
    propertyId: 3,
    propertyName: "Green Valley Apartments",
    roomName: "C-310",
    amount: 425,
    status: "Pending",
    dueDate: "2023-09-01",
    paidDate: null,
    period: "Monthly",
    description: "Rent for September 2023",
  },
  {
    id: "INV-2023-004",
    tenantId: 4,
    tenantName: "Emma Davis",
    propertyId: 1,
    propertyName: "Sunrise Residence",
    roomName: "A-105",
    amount: 350,
    status: "Overdue",
    dueDate: "2023-08-01",
    paidDate: null,
    period: "Monthly",
    description: "Rent for August 2023",
  },
];

// Payment methods
const paymentMethods = [
  "Cash",
  "Bank Transfer",
  "Credit Card",
  "Debit Card",
  "Digital Wallet",
];

const Billing = () => {
  const [invoices, setInvoices] = useState(sampleInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isReceivePaymentOpen, setIsReceivePaymentOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof sampleInvoices[0] | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [newInvoice, setNewInvoice] = useState({
    tenantId: "",
    amount: "",
    dueDate: new Date(),
    period: "Monthly",
    description: "",
  });
  const [payment, setPayment] = useState({
    amount: "",
    method: "Bank Transfer",
    date: new Date(),
    reference: "",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInvoice({
      ...newInvoice,
      [name]: value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value,
    });
  };

  const handleAddInvoice = () => {
    const tenant = sampleTenants.find(t => t.id.toString() === newInvoice.tenantId);
    const property = sampleProperties.find(p => p.id === tenant?.propertyId);
    
    if (!tenant || !property) return;
    
    const newId = `INV-${new Date().getFullYear()}-${(invoices.length + 1).toString().padStart(3, '0')}`;
    
    const invoiceToAdd = {
      id: newId,
      tenantId: tenant.id,
      tenantName: tenant.name,
      propertyId: property.id,
      propertyName: property.name,
      roomName: tenant.roomName,
      amount: parseFloat(newInvoice.amount),
      status: "Pending" as const,
      dueDate: format(newInvoice.dueDate, "yyyy-MM-dd"),
      paidDate: null,
      period: newInvoice.period,
      description: newInvoice.description,
    };
    
    setInvoices([invoiceToAdd, ...invoices]);
    setNewInvoice({
      tenantId: "",
      amount: "",
      dueDate: new Date(),
      period: "Monthly",
      description: "",
    });
    setIsAddInvoiceOpen(false);
  };

  const handleReceivePayment = () => {
    if (!selectedInvoice) return;
    
    const updatedInvoices = invoices.map(invoice => {
      if (invoice.id === selectedInvoice.id) {
        return {
          ...invoice,
          status: "Paid",
          paidDate: format(payment.date, "yyyy-MM-dd"),
        };
      }
      return invoice;
    });
    
    setInvoices(updatedInvoices);
    setSelectedInvoice(null);
    setIsReceivePaymentOpen(false);
    setPayment({
      amount: "",
      method: "Bank Transfer",
      date: new Date(),
      reference: "",
    });
  };

  // Filter invoices based on search term, selected property, and status
  const filteredInvoices = invoices
    .filter((invoice) => {
      const matchesSearch = 
        invoice.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProperty = 
        selectedProperty === "all" || 
        invoice.propertyId.toString() === selectedProperty;
      
      const matchesStatus =
        selectedStatus === "all" ||
        invoice.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesProperty && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by due date
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Get tenants for the selected property (for the new invoice form)
  const filteredTenants = selectedProperty === "all" 
    ? sampleTenants 
    : sampleTenants.filter(tenant => tenant.propertyId.toString() === selectedProperty);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" /> Paid
          </Badge>
        );
      case "Pending":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "Overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" /> Overdue
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-3xl">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage invoices and payments</p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
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
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
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
                placeholder="Search invoices..."
                className="pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <Button onClick={() => setIsAddInvoiceOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Invoice
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="animate-fade-in">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>All Invoices</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  className="text-sm font-normal"
                >
                  Sort by Date <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </div>
              <CardDescription>
                Manage and track all invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Invoice</th>
                      <th className="text-left py-3 px-2 font-medium">Tenant</th>
                      <th className="text-left py-3 px-2 font-medium">Property / Room</th>
                      <th className="text-left py-3 px-2 font-medium">Amount</th>
                      <th className="text-left py-3 px-2 font-medium">Due Date</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-left py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-dashed hover:bg-muted/20 transition-colors">
                        <td className="py-3 px-2 font-medium">{invoice.id}</td>
                        <td className="py-3 px-2">{invoice.tenantName}</td>
                        <td className="py-3 px-2">
                          {invoice.propertyName} / {invoice.roomName}
                        </td>
                        <td className="py-3 px-2">${invoice.amount}</td>
                        <td className="py-3 px-2">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                        <td className="py-3 px-2">{renderStatusBadge(invoice.status)}</td>
                        <td className="py-3 px-2">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            
                            {invoice.status !== "Paid" && (
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setSelectedInvoice(invoice);
                                  setPayment({
                                    ...payment,
                                    amount: invoice.amount.toString(),
                                  });
                                  setIsReceivePaymentOpen(true);
                                }}
                              >
                                <DollarSign className="h-4 w-4 mr-1" /> Pay
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>
                Invoices awaiting payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Invoice</th>
                      <th className="text-left py-3 px-2 font-medium">Tenant</th>
                      <th className="text-left py-3 px-2 font-medium">Property / Room</th>
                      <th className="text-left py-3 px-2 font-medium">Amount</th>
                      <th className="text-left py-3 px-2 font-medium">Due Date</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-left py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices
                      .filter(invoice => invoice.status === "Pending")
                      .map((invoice) => (
                        <tr key={invoice.id} className="border-b border-dashed hover:bg-muted/20 transition-colors">
                          <td className="py-3 px-2 font-medium">{invoice.id}</td>
                          <td className="py-3 px-2">{invoice.tenantName}</td>
                          <td className="py-3 px-2">
                            {invoice.propertyName} / {invoice.roomName}
                          </td>
                          <td className="py-3 px-2">${invoice.amount}</td>
                          <td className="py-3 px-2">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                          <td className="py-3 px-2">{renderStatusBadge(invoice.status)}</td>
                          <td className="py-3 px-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setSelectedInvoice(invoice);
                                  setPayment({
                                    ...payment,
                                    amount: invoice.amount.toString(),
                                  });
                                  setIsReceivePaymentOpen(true);
                                }}
                              >
                                <DollarSign className="h-4 w-4 mr-1" /> Pay
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="paid">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Paid Invoices</CardTitle>
              <CardDescription>
                Invoices that have been paid
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Invoice</th>
                      <th className="text-left py-3 px-2 font-medium">Tenant</th>
                      <th className="text-left py-3 px-2 font-medium">Property / Room</th>
                      <th className="text-left py-3 px-2 font-medium">Amount</th>
                      <th className="text-left py-3 px-2 font-medium">Due Date</th>
                      <th className="text-left py-3 px-2 font-medium">Paid Date</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-left py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices
                      .filter(invoice => invoice.status === "Paid")
                      .map((invoice) => (
                        <tr key={invoice.id} className="border-b border-dashed hover:bg-muted/20 transition-colors">
                          <td className="py-3 px-2 font-medium">{invoice.id}</td>
                          <td className="py-3 px-2">{invoice.tenantName}</td>
                          <td className="py-3 px-2">
                            {invoice.propertyName} / {invoice.roomName}
                          </td>
                          <td className="py-3 px-2">${invoice.amount}</td>
                          <td className="py-3 px-2">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                          <td className="py-3 px-2">{invoice.paidDate && new Date(invoice.paidDate).toLocaleDateString()}</td>
                          <td className="py-3 px-2">{renderStatusBadge(invoice.status)}</td>
                          <td className="py-3 px-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overdue">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Overdue Invoices</CardTitle>
              <CardDescription>
                Invoices that are past their due date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Invoice</th>
                      <th className="text-left py-3 px-2 font-medium">Tenant</th>
                      <th className="text-left py-3 px-2 font-medium">Property / Room</th>
                      <th className="text-left py-3 px-2 font-medium">Amount</th>
                      <th className="text-left py-3 px-2 font-medium">Due Date</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-left py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices
                      .filter(invoice => invoice.status === "Overdue")
                      .map((invoice) => (
                        <tr key={invoice.id} className="border-b border-dashed hover:bg-muted/20 transition-colors">
                          <td className="py-3 px-2 font-medium">{invoice.id}</td>
                          <td className="py-3 px-2">{invoice.tenantName}</td>
                          <td className="py-3 px-2">
                            {invoice.propertyName} / {invoice.roomName}
                          </td>
                          <td className="py-3 px-2">${invoice.amount}</td>
                          <td className="py-3 px-2">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                          <td className="py-3 px-2">{renderStatusBadge(invoice.status)}</td>
                          <td className="py-3 px-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setSelectedInvoice(invoice);
                                  setPayment({
                                    ...payment,
                                    amount: invoice.amount.toString(),
                                  });
                                  setIsReceivePaymentOpen(true);
                                }}
                              >
                                <DollarSign className="h-4 w-4 mr-1" /> Pay
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Invoice Dialog */}
      <Dialog open={isAddInvoiceOpen} onOpenChange={setIsAddInvoiceOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Enter the details for the new invoice.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tenantId">Tenant</Label>
              <Select 
                value={newInvoice.tenantId} 
                onValueChange={(value) => setNewInvoice({ ...newInvoice, tenantId: value })}
              >
                <SelectTrigger id="tenantId">
                  <SelectValue placeholder="Select tenant" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTenants.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id.toString()}>
                      {tenant.name} ({tenant.roomName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="amount"
                  name="amount"
                  className="pl-10"
                  placeholder="e.g. 350"
                  value={newInvoice.amount}
                  onChange={handleInvoiceChange}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="period">Rental Period</Label>
              <Select 
                value={newInvoice.period} 
                onValueChange={(value) => setNewInvoice({ ...newInvoice, period: value })}
              >
                <SelectTrigger id="period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    {format(newInvoice.dueDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={newInvoice.dueDate}
                    onSelect={(date) => date && setNewInvoice({ ...newInvoice, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="e.g. Rent for September 2023"
                value={newInvoice.description}
                onChange={handleInvoiceChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddInvoiceOpen(false)}>Cancel</Button>
            <Button onClick={handleAddInvoice}>Create Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Receive Payment Dialog */}
      <Dialog open={isReceivePaymentOpen} onOpenChange={setIsReceivePaymentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Receive Payment</DialogTitle>
            <DialogDescription>
              Record payment for invoice {selectedInvoice?.id}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">Invoice Total:</span>
              <span>${selectedInvoice?.amount}</span>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="amount"
                  name="amount"
                  className="pl-10"
                  value={payment.amount}
                  onChange={handlePaymentChange}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select 
                value={payment.method} 
                onValueChange={(value) => setPayment({ ...payment, method: value })}
              >
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Payment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    {format(payment.date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={payment.date}
                    onSelect={(date) => date && setPayment({ ...payment, date: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reference">Reference / Notes</Label>
              <Input
                id="reference"
                name="reference"
                placeholder="e.g. Bank transfer confirmation #"
                value={payment.reference}
                onChange={handlePaymentChange}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReceivePaymentOpen(false)}>Cancel</Button>
            <Button onClick={handleReceivePayment} className="gap-2">
              <CreditCard className="h-4 w-4" /> Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Billing;
