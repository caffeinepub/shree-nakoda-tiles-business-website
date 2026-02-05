import { useGetIsCallerAdmin, useGetAllProducts, useGetAllSubmissions } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, Package, MessageSquare, Plus, LogIn, LogOut, Info, Key, FileText } from 'lucide-react';
import ProductManagement from '../components/admin/ProductManagement';
import SubmissionsView from '../components/admin/SubmissionsView';
import BusinessCardUpload from '../components/admin/BusinessCardUpload';
import PdfUpload from '../components/admin/PdfUpload';

export default function AdminPage() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: isAdminLoading } = useGetIsCallerAdmin();
  const { data: products } = useGetAllProducts();
  const { data: submissions } = useGetAllSubmissions();

  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Shield className="w-6 h-6" />
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please log in with your admin account to access the admin panel.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login with Internet Identity
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAdminLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Shield className="w-6 h-6" />
                Access Denied
              </CardTitle>
              <CardDescription>
                You do not have permission to access the admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your Internet Identity principal does not have admin permissions. To gain admin access, you need to use the admin token.
              </p>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-amber-300 text-amber-900 hover:bg-amber-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>

          <Alert className="border-amber-300 bg-amber-50">
            <Key className="h-5 w-5 text-amber-700" />
            <AlertTitle className="text-amber-900 font-semibold">How to Gain Admin Access</AlertTitle>
            <AlertDescription className="text-amber-800 space-y-3 mt-2">
              <p>
                To become an admin, you need to log in with the admin token in the URL. Follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Log out from your current session</li>
                <li>Add the admin token to the URL: <code className="bg-amber-100 px-2 py-1 rounded text-sm">#caffeineAdminToken=YOUR_TOKEN</code></li>
                <li>Log in again with your Internet Identity</li>
              </ol>
              <p className="text-sm mt-3">
                <strong>Example URL:</strong><br />
                <code className="bg-amber-100 px-2 py-1 rounded text-xs break-all">
                  {window.location.origin}{window.location.pathname}#caffeineAdminToken=YOUR_TOKEN
                </code>
              </p>
              <p className="text-sm mt-3 text-amber-700">
                <Info className="inline w-4 h-4 mr-1" />
                The token will be automatically removed from the URL after login for security.
              </p>
            </AlertDescription>
          </Alert>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <Info className="w-5 h-5" />
                First Time Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <p>
                If this is your first time setting up the admin panel, you can use any token of your choice. The first user to log in with a token becomes the admin.
              </p>
              <p className="text-sm">
                For subsequent logins, you'll need to use the same token, or an existing admin can grant you permissions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-amber-900 mb-2 flex items-center gap-3">
            <Shield className="w-10 h-10" />
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your products, view submissions, and update business information
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-amber-300 text-amber-900 hover:bg-amber-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Products</p>
                <p className="text-3xl font-bold text-amber-900">{products?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Contact Submissions</p>
                <p className="text-3xl font-bold text-amber-900">{submissions?.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Admin Status</p>
                <p className="text-lg font-semibold text-green-600">Active</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="bg-amber-100">
          <TabsTrigger value="products" className="data-[state=active]:bg-white">
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="submissions" className="data-[state=active]:bg-white">
            <MessageSquare className="w-4 h-4 mr-2" />
            Submissions
          </TabsTrigger>
          <TabsTrigger value="business-card" className="data-[state=active]:bg-white">
            <Plus className="w-4 h-4 mr-2" />
            Business Card
          </TabsTrigger>
          <TabsTrigger value="pdf" className="data-[state=active]:bg-white">
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="submissions">
          <SubmissionsView />
        </TabsContent>

        <TabsContent value="business-card">
          <BusinessCardUpload />
        </TabsContent>

        <TabsContent value="pdf">
          <PdfUpload />
        </TabsContent>
      </Tabs>
    </div>
  );
}
