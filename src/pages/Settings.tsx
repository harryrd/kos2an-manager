
import React, { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Building2,
  CreditCard,
  Bell,
  Mail,
  Lock,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    companyName: "Property Management Inc.",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentAlerts: true,
    tenantAlerts: true,
    marketingEmails: false,
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    currency: "USD",
    defaultPaymentMethod: "Bank Transfer",
    invoicePrefix: "INV",
    invoiceFooter: "Thank you for your business!",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value,
    });
  };

  const handlePaymentSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentSettings({
      ...paymentSettings,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSavePaymentSettings = () => {
    toast({
      title: "Payment settings updated",
      description: "Your payment configuration has been saved.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-3xl">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and application preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Payments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal and business information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-primary" />
                  Business Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={profileForm.companyName}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-primary" />
                  Security
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                </div>
                
                <Button className="mt-4">
                  Change Password
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-end pt-4">
              <Button onClick={handleSaveProfile} className="gap-2">
                <Save className="h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  Communication Channels
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts via text message
                    </p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(value) => handleNotificationChange('smsNotifications', value)}
                  />
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Alert Types</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="paymentAlerts">Payment Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for payments and invoices
                    </p>
                  </div>
                  <Switch
                    id="paymentAlerts"
                    checked={notificationSettings.paymentAlerts}
                    onCheckedChange={(value) => handleNotificationChange('paymentAlerts', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="tenantAlerts">Tenant Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for tenant activities
                    </p>
                  </div>
                  <Switch
                    id="tenantAlerts"
                    checked={notificationSettings.tenantAlerts}
                    onCheckedChange={(value) => handleNotificationChange('tenantAlerts', value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features and offers
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(value) => handleNotificationChange('marketingEmails', value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-end pt-4">
              <Button onClick={handleSaveNotifications} className="gap-2">
                <Save className="h-4 w-4" /> Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>
                    Configure your billing and payment preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={paymentSettings.currency}
                    onValueChange={(value) => setPaymentSettings({ ...paymentSettings, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultPaymentMethod">Default Payment Method</Label>
                  <Select
                    value={paymentSettings.defaultPaymentMethod}
                    onValueChange={(value) => setPaymentSettings({ ...paymentSettings, defaultPaymentMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="Digital Wallet">Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Invoice Settings</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                  <Input
                    id="invoicePrefix"
                    name="invoicePrefix"
                    value={paymentSettings.invoicePrefix}
                    onChange={handlePaymentSettingChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Example: {paymentSettings.invoicePrefix}-2023-001
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="invoiceFooter">Invoice Footer Text</Label>
                  <Input
                    id="invoiceFooter"
                    name="invoiceFooter"
                    value={paymentSettings.invoiceFooter}
                    onChange={handlePaymentSettingChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Custom text to display at the bottom of invoices
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t flex justify-end pt-4">
              <Button onClick={handleSavePaymentSettings} className="gap-2">
                <Save className="h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
