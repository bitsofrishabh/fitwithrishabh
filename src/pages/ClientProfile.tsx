import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import WeightGraph from '../components/WeightGraph';
import { useRequireAuth } from '../lib/auth';

interface Client {
  id: string;
  name: string;
  startDate: string;
  startWeight: number;
  notes: string;
  weights: { [key: string]: number };
}

export default function ClientProfile() {
  useRequireAuth();
  const { id } = useParams();

  const { data: client, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      if (!id) return null;
      const docRef = doc(db, 'clients', id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() } as Client;
    },
  });

  if (isLoading) return <div className="pt-24">Loading...</div>;
  if (!client) return <div className="pt-24">Client not found</div>;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/admin/clients" className="text-teal-600 hover:text-teal-800">
          ← Back to Clients
        </Link>
        <h1 className="text-3xl font-bold mt-4 mb-2">{client.name}</h1>
        <p className="text-gray-600 mb-4">Start Date: {client.startDate}</p>
        <p className="text-gray-600 mb-4">Start Weight: {client.startWeight} kg</p>
        {client.notes && (
          <p className="text-gray-700 mb-4">Notes: {client.notes}</p>
        )}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Weight Progress</h2>
          <WeightGraph weights={client.weights || {}} />
        </div>
      </div>
    </div>
  );
}
