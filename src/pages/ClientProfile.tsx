import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { sampleClients } from "../data/sampleClients";
import { ArrowLeft, Activity, Award, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function ClientProfile() {
  const { id } = useParams();
  const client = useMemo(() => sampleClients.find((c) => c.id === id), [id]);

  if (!client) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-3xl font-bold">Client profile</h1>
          <p className="text-gray-600">
            We could not find this client in the current demo dataset. The Firebase-backed version
            has been removed, so feel free to customise <code>src/data/sampleClients.ts</code> with
            your own success stories.
          </p>
          <Link
            to="/admin/clients"
            className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to clients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Client journey overview</p>
            <h1 className="text-3xl font-bold text-gray-900">{client.name}</h1>
          </div>
          <Link
            to="/admin/clients"
            className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to clients
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Started on {new Date(client.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-teal-600" />
                <span>
                  {client.startWeight}kg → {client.currentWeight}kg
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>{client.location}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-600" />
                <span>{client.email || "Not provided"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{client.phone || "Not provided"}</span>
              </div>
              <div className="text-gray-500 text-sm">
                Update these fields in <code>sampleClients.ts</code> to personalise demos.
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {client.goals.map((goal) => (
                <div key={goal} className="flex items-start gap-3 text-gray-700">
                  <Activity className="w-4 h-4 text-teal-600 mt-1" />
                  <span>{goal}</span>
                </div>
              ))}
              {client.goals.length === 0 && (
                <p className="text-sm text-gray-500">Add ambitions to each client story.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {client.achievements.map((achievement) => (
                <div key={achievement} className="flex items-start gap-3 text-gray-700">
                  <Award className="w-4 h-4 text-teal-600 mt-1" />
                  <span>{achievement}</span>
                </div>
              ))}
              {client.achievements.length === 0 && (
                <p className="text-sm text-gray-500">Celebrate wins to inspire prospects.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{client.notes}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
