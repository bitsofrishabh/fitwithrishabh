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

interface Client {
  id: string;
  name: string;
  startDate: string;
  startWeight: number;
  notes: string;
  status: 'active' | 'inactive' | 'yet-to-start' | 'completed';
  // month -> day -> weight
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
  { value: 'yet-to-start', label: 'Yet to Start', color: 'bg-gray-100 text-gray-800' },
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'inactive', label: 'Inactive', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' }
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

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      if (user) {
        console.log('User authenticated:', user.email);
      } else {
        console.log('User not authenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  const days = Array.from({ length: getDaysInMonth(selectedMonth) }, (_, i) => (i + 1).toString());

  const { data: clients, isLoading, error, refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      try {
        console.log('Fetching clients...');
        console.log('Auth user:', authUser);
        console.log('Current user:', auth.currentUser);
        
        if (!auth.currentUser) {
          throw new Error('User not authenticated');
        }

        const snapshot = await getDocs(collection(db, 'clients'));
        console.log('Clients fetched successfully:', snapshot.size, 'documents');
        
        return snapshot.docs.map(doc => {
          const data = doc.data() as Client;
          let weights = data.weights || {};
          // migrate old flat structure
          if (weights && !MONTHS.some(m => m in weights)) {
            weights = { [MONTHS[0]]: weights as any };
          }
          // Add default status if not present
          const status = data.status || 'yet-to-start';
          return { id: doc.id, ...data, weights, status } as Client;
        });
      } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }
    },
    enabled: !!authUser, // Only run query when user is authenticated
    retry: (failureCount, error) => {
      console.log('Query retry attempt:', failureCount, error);
      return failureCount < 2; // Retry up to 2 times
    },
    retryDelay: 1000,
  });

  // Filter clients by status
  const filteredClients = clients?.filter(client => 
    statusFilter === 'all' || client.status === statusFilter
  ) || [];

  const addClientMutation = useMutation({
    mutationFn: async (clientData: NewClient) => {
      try {
        console.log('Adding client:', clientData);
        
        if (!auth.currentUser) {
          throw new Error('User not authenticated');
        }
        
        if (!clientData.name || !clientData.startDate || !clientData.startWeight) {
          throw new Error('Please fill in all required fields');
        }
        
        const docRef = await addDoc(collection(db, 'clients'), {
          ...clientData,
          weights: {},
          createdAt: serverTimestamp()
        });
        
        console.log('Client added successfully with ID:', docRef.id);
        return docRef;
      } catch (error) {
        console.error('Error adding client:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setShowAddForm(false);
      setNewClient({ name: '', startDate: '', startWeight: 0, notes: '', status: 'yet-to-start' });
      toast.success('Client added successfully!');
    },
    onError: (error: any) => {
      console.error('Add client error:', error);
      toast.error(error.message || 'Failed to add client');
    }
  });

  const updateWeightMutation = useMutation({
    mutationFn: async ({ clientId, month, day, weight }: { clientId: string, month: string, day: string, weight: number }) => {
      try {
        console.log('Updating weight:', { clientId, month, day, weight });
        
        if (!auth.currentUser) {
          throw new Error('User not authenticated');
        }
        
        const client = clients?.find(c => c.id === clientId);
        if (!client) {
          throw new Error('Client not found');
        }
        
        const clientRef = doc(db, 'clients', clientId);
        await updateDoc(clientRef, {
          [`weights.${month}.${day}`]: weight
        });
        
        console.log('Weight updated successfully');
      } catch (error) {
        console.error('Error updating weight:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setEditingWeight(null);
      toast.success('Weight updated successfully!');
    },
    onError: (error: any) => {
      console.error('Update weight error:', error);
      toast.error(error.message || 'Failed to update weight');
    }
  });

  const updateClientMutation = useMutation({
    mutationFn: async ({ clientId, updates }: { clientId: string, updates: Partial<Client> }) => {
      try {
        console.log('Updating client:', { clientId, updates });
        
        if (!auth.currentUser) {
          throw new Error('User not authenticated');
        }
        
        const clientRef = doc(db, 'clients', clientId);
        await updateDoc(clientRef, updates);
        
        console.log('Client updated successfully');
      } catch (error) {
        console.error('Error updating client:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setEditingClient(null);
      toast.success('Client updated successfully!');
    },
    onError: (error: any) => {
      console.error('Update client error:', error);
      toast.error(error.message || 'Failed to update client');
    }
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (clientId: string) => {
      try {
        console.log('Deleting client:', clientId);
        
        if (!auth.currentUser) {
          throw new Error('User not authenticated');
        }
        
        await deleteDoc(doc(db, 'clients', clientId));
        console.log('Client deleted successfully');
      } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Delete client error:', error);
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

  const handleRetry = () => {
    refetch();
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption || statusOptions[0]; // Default to 'yet-to-start' if not found
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="w-full px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600 mb-4" />
            <p className="text-lg text-gray-600 mb-2">Loading clients...</p>
            <p className="text-sm text-gray-500">Please wait while we fetch your client data</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="w-full px-4">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Clients</h2>
              <p className="text-gray-600 mb-4">
                {error.message.includes('permissions') 
                  ? 'You don\'t have permission to access client data. Please make sure you\'re logged in with the correct account.'
                  : error.message || 'An error occurred while loading client data.'
                }
              </p>
              <div className="space-y-2">
                <button
                  onClick={handleRetry}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                >
                  Try Again
                </button>
                <div className="text-sm text-gray-500">
                  Current user: {authUser?.email || 'Not logged in'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <Toaster position="top-center" />
      <div className="w-full px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600 mt-1">Logged in as: {authUser?.email}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCSVImport(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Upload className="w-5 h-5" />
              Import CSV
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              disabled={addClientMutation.isPending}
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
            >
              {addClientMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              Add Client
            </button>
          </div>
        </div>

        {/* Add Client Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Client</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
                disabled={addClientMutation.isPending}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  disabled={addClientMutation.isPending}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={newClient.startDate}
                  onChange={(e) => setNewClient({ ...newClient, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  disabled={addClientMutation.isPending}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Weight (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  required
                  value={newClient.startWeight || ''}
                  onChange={(e) => setNewClient({ ...newClient, startWeight: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  disabled={addClientMutation.isPending}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({ ...newClient, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  disabled={addClientMutation.isPending}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  disabled={addClientMutation.isPending}
                />
              </div>
              <div className="md:col-span-2 lg:col-span-5">
                <button
                  type="submit"
                  disabled={addClientMutation.isPending}
                  className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                >
                  {addClientMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Client'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CSV Import Modal */}
        {showCSVImport && (
          <CSVImport onClose={() => setShowCSVImport(false)} />
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              {MONTHS.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Statuses</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="text-sm text-gray-600 px-3 py-2">
              Showing {filteredClients.length} of {clients?.length || 0} clients
            </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                    Client Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Weight
                  </th>
                  {days.map(day => (
                    <th key={day} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px]">
                      {day}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                      <Link
                        to={`/admin/clients/${client.id}`}
                        className="text-teal-600 hover:text-teal-800"
                      >
                        {client.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {editingClient === client.id ? (
                        <select
                          value={editedClientData?.status ?? client.status}
                          onChange={e => setEditedClientData({ ...(editedClientData || {}), status: e.target.value as any })}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(client.status).color}`}>
                          {getStatusBadge(client.status).label}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 max-w-[150px] truncate">
                      {editingClient === client.id ? (
                        <input
                          type="text"
                          value={editedClientData?.notes ?? client.notes}
                          onChange={e => setEditedClientData({ ...(editedClientData || {}), notes: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        client.notes
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {editingClient === client.id ? (
                        <input
                          type="date"
                          value={editedClientData?.startDate ?? client.startDate}
                          onChange={e => setEditedClientData({ ...(editedClientData || {}), startDate: e.target.value })}
                          className="px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        client.startDate
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {editingClient === client.id ? (
                        <input
                          type="number"
                          step="0.1"
                          value={editedClientData?.startWeight ?? client.startWeight}
                          onChange={e => setEditedClientData({ ...(editedClientData || {}), startWeight: parseFloat(e.target.value) })}
                          className="w-20 px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        `${client.startWeight} kg`
                      )}
                    </td>
                    {days.map(day => (
                      <td key={day} className="px-3 py-4 text-center text-sm">
                        {editingWeight?.clientId === client.id && editingWeight?.day === day ? (
                          <input
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
                            className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                            autoFocus
                            disabled={updateWeightMutation.isPending}
                          />
                        ) : (
                          <div
                            onClick={() => setEditingWeight({ clientId: client.id, day })}
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded min-h-[24px] flex items-center justify-center"
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
                            <button
                              onClick={() => {
                                if (editedClientData) {
                                  updateClientMutation.mutate({ clientId: client.id, updates: editedClientData });
                                } else {
                                  setEditingClient(null);
                                }
                              }}
                              className="text-teal-600 hover:text-teal-800"
                              disabled={updateClientMutation.isPending}
                            >
                              {updateClientMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => { setEditingClient(null); setEditedClientData(null); }}
                              className="text-gray-600 hover:text-gray-800"
                              disabled={updateClientMutation.isPending}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => { 
                                setEditingClient(client.id); 
                                setEditedClientData({ 
                                  startDate: client.startDate, 
                                  startWeight: client.startWeight, 
                                  notes: client.notes,
                                  status: client.status
                                }); 
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClient(client.id, client.name)}
                              className="text-red-600 hover:text-red-800 disabled:opacity-50"
                              title="Delete Client"
                              disabled={deleteClientMutation.isPending}
                            >
                              {deleteClientMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredClients.length === 0 && clients && clients.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No clients found with the selected status filter.</p>
          </div>
        )}

        {clients?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No clients found. Add your first client to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}