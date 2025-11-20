import { FormEvent, useMemo, useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { sampleClients, type SampleClient, type ClientStatus } from '../data/sampleClients';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';

const statusOptions: { value: ClientStatus; label: string }[] = [
  { value: 'yet-to-start', label: 'Yet to Start' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'On Hold' },
  { value: 'completed', label: 'Completed' }
];

type EditableClient = Pick<SampleClient, 'name' | 'startDate' | 'startWeight' | 'currentWeight' | 'status' | 'notes'>;

export default function ClientManagement() {
  const [clients, setClients] = useState<SampleClient[]>(sampleClients);
  const [statusFilter, setStatusFilter] = useState<'all' | ClientStatus>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedClient, setEditedClient] = useState<EditableClient | null>(null);
  const [newClient, setNewClient] = useState<EditableClient>({
    name: '',
    startDate: '',
    startWeight: 0,
    currentWeight: 0,
    status: 'yet-to-start',
    notes: ''
  });

  const filteredClients = useMemo(() => {
    if (statusFilter === 'all') return clients;
    return clients.filter((client) => client.status === statusFilter);
  }, [clients, statusFilter]);

  const startEdit = (client: SampleClient) => {
    setEditingId(client.id);
    setEditedClient({
      name: client.name,
      startDate: client.startDate,
      startWeight: client.startWeight,
      currentWeight: client.currentWeight,
      status: client.status,
      notes: client.notes
    });
  };

  const handleUpdateClient = (id: string) => {
    if (!editedClient) return;
    setClients((prev) =>
      prev.map((client) =>
        client.id === id
          ? {
              ...client,
              ...editedClient
            }
          : client
      )
    );
    setEditingId(null);
    setEditedClient(null);
  };

  const handleAddClient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newClient.name || !newClient.startDate || !newClient.startWeight) {
      alert('Please fill in name, start date, and starting weight.');
      return;
    }

    const created: SampleClient = {
      id: `cl-${Date.now()}`,
      name: newClient.name,
      startDate: newClient.startDate,
      startWeight: Number(newClient.startWeight),
      currentWeight: newClient.currentWeight || newClient.startWeight,
      status: newClient.status,
      notes: newClient.notes,
      goals: [],
      achievements: [],
      location: 'Remote',
      email: '',
      phone: ''
    };

    setClients((prev) => [created, ...prev]);
    setShowAddForm(false);
    setNewClient({
      name: '',
      startDate: '',
      startWeight: 0,
      currentWeight: 0,
      status: 'yet-to-start',
      notes: ''
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Remove this client from the shortlist?')) {
      setClients((prev) => prev.filter((client) => client.id !== id));
    }
  };

  const renderEditableField = (
    field: keyof EditableClient,
    type: 'text' | 'date' | 'number' | 'textarea' = 'text'
  ) => {
    if (!editedClient) return null;

    if (type === 'textarea') {
      return (
        <Textarea
          value={editedClient[field] as string}
          onChange={(e) =>
            setEditedClient((prev) => (prev ? { ...prev, [field]: e.target.value } : prev))
          }
          className="min-h-[120px]"
        />
      );
    }

    return (
      <Input
        type={type}
        value={editedClient[field] as string | number}
        onChange={(e) =>
          setEditedClient((prev) =>
            prev
              ? {
                  ...prev,
                  [field]: type === 'number' ? Number(e.target.value) : e.target.value
                }
              : prev
          )
        }
      />
    );
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Management (Demo)</h1>
            <p className="text-gray-600">
              Firebase has been removed. This section now uses sample data so you can still
              showcase workflows during demos.
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? 'default' : 'outline'}
              onClick={() => setStatusFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Add client form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add new client</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4 md:grid-cols-2" onSubmit={handleAddClient}>
                <div>
                  <Label>Name</Label>
                  <Input
                    required
                    value={newClient.name}
                    onChange={(e) => setNewClient((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Start date</Label>
                  <Input
                    type="date"
                    required
                    value={newClient.startDate}
                    onChange={(e) =>
                      setNewClient((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Starting weight (kg)</Label>
                  <Input
                    type="number"
                    required
                    value={newClient.startWeight}
                    onChange={(e) =>
                      setNewClient((prev) => ({ ...prev, startWeight: Number(e.target.value) }))
                    }
                  />
                </div>
                <div>
                  <Label>Current weight (kg)</Label>
                  <Input
                    type="number"
                    value={newClient.currentWeight}
                    onChange={(e) =>
                      setNewClient((prev) => ({ ...prev, currentWeight: Number(e.target.value) }))
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={newClient.notes}
                    onChange={(e) => setNewClient((prev) => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
                <div className="flex gap-3 md:col-span-2">
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    Save Client
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Client cards */}
        <div className="space-y-6">
          {filteredClients.map((client) => {
            const isEditing = editingId === client.id && editedClient;
            return (
              <Card key={client.id}>
                <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    {isEditing ? (
                      <>
                        <Label>Name</Label>
                        {renderEditableField('name')}
                      </>
                    ) : (
                      <>
                        <CardTitle className="text-2xl">{client.name}</CardTitle>
                        <p className="text-sm text-gray-500">
                          Started on {new Date(client.startDate).toLocaleDateString()}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={client.status === 'completed' ? 'default' : 'secondary'}>
                      {statusOptions.find((option) => option.value === client.status)?.label ??
                        client.status}
                    </Badge>
                    {isEditing ? (
                      <>
                        <Button size="icon" onClick={() => handleUpdateClient(client.id)}>
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={() => setEditingId(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="icon" variant="outline" onClick={() => startEdit(client)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => handleDelete(client.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Start weight</Label>
                      {isEditing
                        ? renderEditableField('startWeight', 'number')
                        : <p className="text-lg font-semibold">{client.startWeight} kg</p>}
                    </div>
                    <div>
                      <Label>Current weight</Label>
                      {isEditing
                        ? renderEditableField('currentWeight', 'number')
                        : <p className="text-lg font-semibold">{client.currentWeight} kg</p>}
                    </div>
                    <div className="md:col-span-2">
                      <Label>Notes</Label>
                      {isEditing
                        ? renderEditableField('notes', 'textarea')
                        : <p className="text-gray-700">{client.notes}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredClients.length === 0 && (
            <Card>
              <CardContent className="py-10 text-center text-gray-600">
                No clients for this filter yet. Add your first success story!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
