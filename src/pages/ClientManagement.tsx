import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRequireAuth } from '../lib/auth';
import { Plus, Edit, Trash2, Save, X, Calendar } from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface Client {
  id: string;
  name: string;
  startDate: string;
  startWeight: number;
  notes: string;
  weights: { [key: string]: number }; // day1: weight, day2: weight, etc.
  createdAt: any;
}

interface NewClient {
  name: string;
  startDate: string;
  startWeight: number;
  notes: string;
}

export default function ClientManagement() {
  useRequireAuth();
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClient, setEditingClient] = useState<string | null>(null);
  const [editingWeight, setEditingWeight] = useState<{clientId: string, day: string} | null>(null);
  const [newClient, setNewClient] = useState<NewClient>({
    name: '',
    startDate: '',
    startWeight: 0,
    notes: ''
  });

  // Generate days array (1-31 for now, can be made dynamic)
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'clients'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Client[];
    },
  });

  const addClientMutation = useMutation({
    mutationFn: async (clientData: NewClient) => {
      await addDoc(collection(db, 'clients'), {
        ...clientData,
        weights: {},
        createdAt: serverTimestamp()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setShowAddForm(false);
      setNewClient({ name: '', startDate: '', startWeight: 0, notes: '' });
      toast.success('Client added successfully!');
    },
    onError: () => {
      toast.error('Failed to add client');
    }
  });

  const updateWeightMutation = useMutation({
    mutationFn: async ({ clientId, day, weight }: { clientId: string, day: string, weight: number }) => {
      const clientRef = doc(db, 'clients', clientId);
      const client = clients?.find(c => c.id === clientId);
      if (client) {
        await updateDoc(clientRef, {
          weights: {
            ...client.weights,
            [day]: weight
          }
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setEditingWeight(null);
      toast.success('Weight updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update weight');
    }
  });

  const updateClientMutation = useMutation({
    mutationFn: async ({ clientId, updates }: { clientId: string, updates: Partial<Client> }) => {
      const clientRef = doc(db, 'clients', clientId);
      await updateDoc(clientRef, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setEditingClient(null);
      toast.success('Client updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update client');
    }
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (clientId: string) => {
      await deleteDoc(doc(db, 'clients', clientId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete client');
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
    if (isNaN(weightNum)) return;
    updateWeightMutation.mutate({ clientId, day, weight: weightNum });
  };

  const handleDeleteClient = (clientId: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete ${clientName}?`)) {
      deleteClientMutation.mutate(clientId);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading clients...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
          >
            <Plus className="w-5 h-5" />
            Add Client
          </button>
        </div>

        {/* Add Client Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Client</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Weight (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newClient.startWeight || ''}
                  onChange={(e) => setNewClient({ ...newClient, startWeight: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
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
                />
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <button
                  type="submit"
                  disabled={addClientMutation.isPending}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                >
                  {addClientMutation.isPending ? 'Adding...' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                    Client Name
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
                {clients?.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                      {client.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 max-w-[150px] truncate">
                      {client.notes}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {client.startDate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {client.startWeight} kg
                    </td>
                    {days.map(day => (
                      <td key={day} className="px-3 py-4 text-center text-sm">
                        {editingWeight?.clientId === client.id && editingWeight?.day === day ? (
                          <input
                            type="number"
                            step="0.1"
                            defaultValue={client.weights[day] || ''}
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
                          />
                        ) : (
                          <div
                            onClick={() => setEditingWeight({ clientId: client.id, day })}
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded min-h-[24px] flex items-center justify-center"
                          >
                            {client.weights[day] || '-'}
                          </div>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleDeleteClient(client.id, client.name)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {clients?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No clients found. Add your first client to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}