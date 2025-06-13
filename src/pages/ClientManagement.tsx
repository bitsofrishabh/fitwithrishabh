import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useRequireAuth } from '../lib/auth';
import { Plus, Edit, Trash2, Save, X, Calendar, Loader2, AlertCircle, Upload, Filter } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { onAuthStateChanged } from 'firebase/auth';
import CSVImport from '../components/CSVImport';
import { MONTHS, getDaysInMonth } from '../lib/months';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';

interface Client {
  id: string;
  name: string;
  startDate: string;
  startWeight: number;
  notes: string;
  status: 'active' | 'inactive' | 'yet-to-start' | 'completed';
  weights: Record<string, Record<string, number>>;
  createdAt: any;
}

interface NewClient {
  name: string;
  startDate: string;
  startWeight: number;
  notes: string;
  status: 'active' | 'inactive' | 'yet-to-start' | 'completed';
}

const statusOptions = [
  { value: 'yet-to-start', label: 'Yet to Start', variant: 'secondary' as const },
  { value: 'active', label: 'Active', variant: 'success' as const },
  { value: 'inactive', label: 'Inactive', variant: 'warning' as const },
  { value: 'completed', label: 'Completed', variant: 'default' as const }
];

export default function ClientManagement() {
  useRequireAuth();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCSVImport, setShowCSVImport] = useState(false);
  const [editingClient, setEditingClient] = useState<string | null>(null);
  const [editingWeight, setEditingWeight] = useState<{clientId: string, day: string} | null>(null);
  const [editedClientData, setEditedClientData] = useState<Partial<Client> | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[0]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [authUser, setAuthUser] = useState<any>(null);
  const [newClient, setNewClient] = useState<NewClient>({
    name: '',
    startDate: '',
    startWeight: 0,
    notes: '',
    status: 'yet-to-start'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => unsubscribe();
  }, []);

  const days = Array.from({ length: getDaysInMonth(selectedMonth) }, (_, i) => (i + 1).toString());

  const { data: clients, isLoading, error, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      try {
        if (!auth.currentUser) {
          throw new Error('User not authenticated');
        }

        const snapshot = await getDocs(collection(db, 'clients'));
        return snapshot.docs.map(doc => {
          const data = doc.data() as Client;
          let weights = data.weights || {};
          if (weights && !MONTHS.some(m => m in weights)) {
            weights = { [MONTHS[0]]: weights as any };
          }
          const status = data.status || 'yet-to-start';
          return { id: doc.id, ...data, weights, status } as Client;
        });
      } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }
    },
    enabled: !!authUser,
    retry: 2,
    retryDelay: 1000,
  });

  const filteredClients = clients?.filter(client => 
    statusFilter === 'all' || client.status === statusFilter
  ) || [];

  const addClientMutation = useMutation({
    mutationFn: async (clientData: NewClient) => {
      if (!auth.currentUser) throw new Error('User not authenticated');
      if (!clientData.name || !clientData.startDate || !clientData.startWeight) {
        throw new Error('Please fill in all required fields');
      }
      
      const docRef = await addDoc(collection(db, 'clients'), {
        ...clientData,
        weights: {},
        createdAt: serverTimestamp()
      });
      return docRef;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setShowAddForm(false);
      setNewClient({ name: '', startDate: '', startWeight: 0, notes: '', status: 'yet-to-start' });
      toast.success('Client added successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add client');
    }
  });

  const updateWeightMutation = useMutation({
    mutationFn: async ({ clientId, month, day, weight }: { clientId: string, month: string, day: string, weight: number }) => {
      if (!auth.currentUser) throw new Error('User not authenticated');
      
      const clientRef = doc(db, 'clients', clientId);
      await updateDoc(clientRef, {
        [`weights.${month}.${day}`]: weight
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setEditingWeight(null);
      toast.success('Weight updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update weight');
    }
  });

  const updateClientMutation = useMutation({
    mutationFn: async ({ clientId, updates }: { clientId: string, updates: Partial<Client> }) => {
      if (!auth.currentUser) throw new Error('User not authenticated');
      
      const clientRef = doc(db, 'clients', clientId);
      await updateDoc(clientRef, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setEditingClient(null);
      toast.success('Client updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update client');
    }
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (clientId: string) => {
      if (!auth.currentUser) throw new Error('User not authenticated');
      await deleteDoc(doc(db, 'clients', clientId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete client');
    }
  });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.startDate || !newClient.startWeight) {
      toast.error('Please fill in all required fields');
      return;
    }
    addClientMutation.mutate(newClient);
  };

  const handleWeightUpdate = (clientId: string, day: string, weight: string) => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      toast.error('Please enter a valid weight');
      return;
    }
    updateWeightMutation.mutate({ clientId, month: selectedMonth, day, weight: weightNum });
  };

  const handleDeleteClient = (clientId: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete ${clientName}?`)) {
      deleteClientMutation.mutate(clientId);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption || statusOptions[0];
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-lg text-foreground/80 mb-2">Loading clients...</p>
            <p className="text-sm text-muted-foreground">Please wait while we fetch your client data</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <Card className="max-w-md text-center">
              <CardContent className="pt-6">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Unable to Load Clients</h2>
                <p className="text-muted-foreground mb-4">
                  {error.message.includes('permissions') 
                    ? 'You don\'t have permission to access client data.'
                    : error.message || 'An error occurred while loading client data.'
                  }
                </p>
                <Button onClick={() => refetch()}>
                  Try Again
                </Button>
                <div className="text-sm text-muted-foreground mt-2">
                  Current user: {authUser?.email || 'Not logged in'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Client Management</h1>
            <p className="text-muted-foreground">Logged in as: {authUser?.email}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowCSVImport(true)}
              variant="outline"
              className="border-primary/20 hover:bg-primary/10"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button
              onClick={() => setShowAddForm(true)}
              disabled={addClientMutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {addClientMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              Add Client
            </Button>
          </div>
        </div>

        {/* Add Client Form */}
        {showAddForm && (
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Add New Client</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                  disabled={addClientMutation.isPending}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="name">Client Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    disabled={addClientMutation.isPending}
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    required
                    value={newClient.startDate}
                    onChange={(e) => setNewClient({ ...newClient, startDate: e.target.value })}
                    disabled={addClientMutation.isPending}
                  />
                </div>
                <div>
                  <Label htmlFor="startWeight">Start Weight (kg) *</Label>
                  <Input
                    id="startWeight"
                    type="number"
                    step="0.1"
                    min="1"
                    required
                    value={newClient.startWeight || ''}
                    onChange={(e) => setNewClient({ ...newClient, startWeight: parseFloat(e.target.value) || 0 })}
                    disabled={addClientMutation.isPending}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={newClient.status}
                    onValueChange={(value: any) => setNewClient({ ...newClient, status: value })}
                    disabled={addClientMutation.isPending}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    type="text"
                    value={newClient.notes}
                    onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                    disabled={addClientMutation.isPending}
                  />
                </div>
                <div className="md:col-span-2 lg:col-span-5">
                  <Button
                    type="submit"
                    disabled={addClientMutation.isPending}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {addClientMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Client'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* CSV Import Modal */}
        {showCSVImport && (
          <CSVImport onClose={() => setShowCSVImport(false)} />
        )}

        {/* Filters */}
        <Card className="mb-6 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div>
                <Label htmlFor="month">Month:</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map(m => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status:</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredClients.length} of {clients?.length || 0} clients
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="border-primary/20">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider sticky left-0 bg-muted/50 z-10">
                      Client Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Start Weight
                    </th>
                    {days.map(day => (
                      <th key={day} className="px-3 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider min-w-[60px]">
                        {day}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium sticky left-0 bg-background z-10">
                        <Link
                          to={`/admin/clients/${client.id}`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {client.name}
                        </Link>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {editingClient === client.id ? (
                          <Select
                            value={editedClientData?.status ?? client.status}
                            onValueChange={(value: any) => setEditedClientData({ ...(editedClientData || {}), status: value })}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant={getStatusBadge(client.status).variant}>
                            {getStatusBadge(client.status).label}
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground max-w-[150px] truncate">
                        {editingClient === client.id ? (
                          <Input
                            type="text"
                            value={editedClientData?.notes ?? client.notes}
                            onChange={e => setEditedClientData({ ...(editedClientData || {}), notes: e.target.value })}
                            className="w-full"
                          />
                        ) : (
                          client.notes
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {editingClient === client.id ? (
                          <Input
                            type="date"
                            value={editedClientData?.startDate ?? client.startDate}
                            onChange={e => setEditedClientData({ ...(editedClientData || {}), startDate: e.target.value })}
                          />
                        ) : (
                          client.startDate
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {editingClient === client.id ? (
                          <Input
                            type="number"
                            step="0.1"
                            value={editedClientData?.startWeight ?? client.startWeight}
                            onChange={e => setEditedClientData({ ...(editedClientData || {}), startWeight: parseFloat(e.target.value) })}
                            className="w-20"
                          />
                        ) : (
                          `${client.startWeight} kg`
                        )}
                      </td>
                      {days.map(day => (
                        <td key={day} className="px-3 py-4 text-center text-sm">
                          {editingWeight?.clientId === client.id && editingWeight?.day === day ? (
                            <Input
                              type="number"
                              step="0.1"
                              min="1"
                              defaultValue={client.weights[selectedMonth]?.[day] || ''}
                              onBlur={(e) => {
                                if (e.target.value) {
                                  handleWeightUpdate(client.id, day, e.target.value);
                                } else {
                                  setEditingWeight(null);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleWeightUpdate(client.id, day, e.currentTarget.value);
                                } else if (e.key === 'Escape') {
                                  setEditingWeight(null);
                                }
                              }}
                              className="w-16 text-center"
                              autoFocus
                              disabled={updateWeightMutation.isPending}
                            />
                          ) : (
                            <div
                              onClick={() => setEditingWeight({ clientId: client.id, day })}
                              className="cursor-pointer hover:bg-muted rounded px-2 py-1 min-h-[24px] flex items-center justify-center transition-colors"
                            >
                              {updateWeightMutation.isPending &&
                               editingWeight?.clientId === client.id &&
                               editingWeight?.day === day ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                client.weights[selectedMonth]?.[day] || '-'
                              )}
                            </div>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          {editingClient === client.id ? (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  if (editedClientData) {
                                    updateClientMutation.mutate({ clientId: client.id, updates: editedClientData });
                                  } else {
                                    setEditingClient(null);
                                  }
                                }}
                                disabled={updateClientMutation.isPending}
                              >
                                {updateClientMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => { setEditingClient(null); setEditedClientData(null); }}
                                disabled={updateClientMutation.isPending}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => { 
                                  setEditingClient(client.id); 
                                  setEditedClientData({ 
                                    startDate: client.startDate, 
                                    startWeight: client.startWeight, 
                                    notes: client.notes,
                                    status: client.status
                                  }); 
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteClient(client.id, client.name)}
                                disabled={deleteClientMutation.isPending}
                              >
                                {deleteClientMutation.isPending ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </Button>
                            </>
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

        {filteredClients.length === 0 && clients && clients.length > 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No clients found with the selected status filter.</p>
          </div>
        )}

        {clients?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No clients found. Add your first client to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}