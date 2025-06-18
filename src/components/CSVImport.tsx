import React, { useState } from 'react';
import { Upload, Download, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'sonner';

function parseDate(value: string): Date | null {
  if (!value) return null;
  const iso = new Date(value);
  if (!isNaN(iso.getTime())) return iso;
  const parts = value.split('-');
  if (parts.length === 3) {
    const [d, m, y] = parts;
    const date = new Date(`${y}-${m}-${d}`);
    if (!isNaN(date.getTime())) return date;
  }
  return null;
}

interface ClientData {
  name: string;
  startDate: string;
  startWeight: number;
  notes: string;
  status: 'active' | 'inactive' | 'yet-to-start' | 'completed';
  // month -> day -> weight
  weights: { [month: string]: { [day: string]: number } };
}

interface CSVImportProps {
  onClose: () => void;
}

export default function CSVImport({ onClose }: CSVImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<{ success: number; errors: string[] } | null>(null);
  const queryClient = useQueryClient();

  const parseCSV = (csvText: string): ClientData[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    console.log('Headers found:', headers);
    
    const clients: ClientData[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      // Skip empty rows (all values are empty)
      if (values.every(v => !v)) continue;
      
      const client: ClientData = {
        name: '',
        startDate: '',
        startWeight: 0,
        notes: '',
        status: 'yet-to-start',
        weights: {}
      };
      
      let hasRequiredData = false;
      
      // Parse each column based on header
      headers.forEach((header, index) => {
        const value = values[index] || '';
        
        if (!value) return; // Skip empty values
        
        switch (header) {
          case 'name':
          case 'client name':
          case 'client_name':
            client.name = value;
            hasRequiredData = true;
            break;
          case 'start date':
          case 'start_date':
          case 'startdate':
            // Handle different date formats
            if (value) {
              // Convert DD-MM-YYYY to YYYY-MM-DD
              if (value.includes('-') && value.split('-')[0].length === 2) {
                const parts = value.split('-');
                client.startDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
              } else {
                client.startDate = value;
              }
            }
            break;
          case 'start weight':
          case 'start_weight':
          case 'startweight':
            const weight = parseFloat(value);
            if (!isNaN(weight) && weight > 0) {
              client.startWeight = weight;
            }
            break;
          case 'notes':
          case 'note':
            client.notes = value;
            break;
          case 'status':
            const statusValue = value.toLowerCase().replace(/\s+/g, '-');
            if (['active', 'inactive', 'yet-to-start', 'completed'].includes(statusValue)) {
              client.status = statusValue as any;
            }
            break;
          default:
            // Check if it's a day column (day1, day2, etc.)
            if (header.startsWith('day')) {
              const dayWeight = parseFloat(value);
              if (!isNaN(dayWeight) && dayWeight > 0) {
                const dayMatch = header.match(/day\s*(\d+)/); // extract the numeric part
                const dayKey = dayMatch ? dayMatch[1] : header;

                const monthName =
                  parseDate(client.startDate)?.toLocaleString('default', { month: 'long' }) || 'June';
                if (!client.weights[monthName]) {
                  client.weights[monthName] = {};
                }
                client.weights[monthName][dayKey] = dayWeight;
                console.log(`Added weight for ${client.name || 'Unknown'} ${monthName} ${dayKey}: ${dayWeight}`);
              }
            }
            break;
        }
      });
      
      // Only add client if they have a name and either start weight or some day weights
      if (hasRequiredData && (client.startWeight > 0 || Object.keys(client.weights).length > 0)) {
        // If no start weight but has day weights, use the first day weight as start weight
        if (client.startWeight === 0 && Object.keys(client.weights).length > 0) {
          const firstMonth = Object.keys(client.weights)[0];
          const firstDayWeight = firstMonth ? Object.values(client.weights[firstMonth])[0] : 0;
          if (typeof firstDayWeight === 'number' && firstDayWeight > 0) {
            client.startWeight = firstDayWeight;
          }
        }
        
        // Set default start date if not provided
        if (!client.startDate) {
          client.startDate = new Date().toISOString().split('T')[0];
        }
        
        console.log('Adding client:', client);
        clients.push(client);
      }
    }
    
    console.log('Parsed clients:', clients);
    return clients;
  };

  const importMutation = useMutation({
    mutationFn: async (clients: ClientData[]) => {
      const results = { success: 0, errors: [] as string[] };
      
      for (const client of clients) {
        try {
          console.log('Importing client:', client);
          await addDoc(collection(db, 'clients'), {
            ...client,
            createdAt: serverTimestamp()
          });
          results.success++;
        } catch (error: any) {
          console.error('Error importing client:', client.name, error);
          results.errors.push(`Failed to import ${client.name}: ${error.message}`);
        }
      }
      
      return results;
    },
    onSuccess: (results) => {
      setResults(results);
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success(`Successfully imported ${results.success} clients`);
      if (results.errors.length > 0) {
        toast.error(`${results.errors.length} clients failed to import`);
      }
    },
    onError: (error: any) => {
      console.error('Import mutation error:', error);
      toast.error(`Import failed: ${error.message}`);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setImporting(true);
    
    try {
      const text = await file.text();
      console.log('File content preview:', text.substring(0, 500));
      
      const clients = parseCSV(text);
      
      if (clients.length === 0) {
        toast.error('No valid client data found in the file. Please check the format and ensure at least one row has a name and weight data.');
        setImporting(false);
        return;
      }
      
      console.log(`Found ${clients.length} valid clients to import`);
      importMutation.mutate(clients);
    } catch (error: any) {
      console.error('File reading error:', error);
      toast.error(`Failed to read file: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = `name,start_date,start_weight,status,notes,day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,day11,day12,day13,day14,day15,day16,day17,day18,day19,day20,day21,day22,day23,day24,day25,day26,day27,day28,day29,day30,day31
John Doe,2024-01-01,80.5,active,Initial consultation,80.5,80.2,79.8,79.5,79.2,78.9,78.6,78.3,78.0,77.7,77.4,77.1,76.8,76.5,76.2,75.9,75.6,75.3,75.0,74.7,74.4,74.1,73.8,73.5,73.2,72.9,72.6,72.3,72.0
Jane Smith,15-01-2024,65.0,yet-to-start,Weight loss program,65.0,64.8,64.5,64.2,64.0,63.7,63.5,63.2,63.0,62.7,62.5,62.2,62.0,61.7,61.5,61.2,61.0,60.7,60.5,60.2,60.0,59.7,59.5,59.2,59.0,58.7,58.5,58.2,58.0`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'client_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Import Client Data</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={importing || importMutation.isPending}
            >
              ×
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Download the CSV template below</li>
              <li>Fill in your client data following the template format</li>
              <li>Save as CSV file and upload it here</li>
              <li>Weight columns should be named: day1, day2, day3, etc.</li>
              <li>Date format can be: YYYY-MM-DD or DD-MM-YYYY</li>
              <li>Status can be: active, inactive, yet-to-start, or completed</li>
              <li>Make sure to include client name and at least one weight value</li>
              <li>Empty rows will be automatically skipped</li>
            </ol>
          </div>

          {/* Download Template */}
          <div className="mb-6">
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <Download className="w-4 h-4" />
              Download CSV Template
            </button>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload CSV File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
                disabled={importing || importMutation.isPending}
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer text-teal-600 hover:text-teal-700"
              >
                Click to upload CSV file
              </label>
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </div>

          {/* Import Button */}
          <div className="mb-6">
            <button
              onClick={handleImport}
              disabled={!file || importing || importMutation.isPending}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {importing || importMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Importing...
                </>
              ) : (
                'Import Clients'
              )}
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-4">
              {results.success > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      Successfully imported {results.success} clients
                    </span>
                  </div>
                </div>
              )}
              
              {results.errors.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-red-800">
                        {results.errors.length} clients failed to import:
                      </span>
                      <ul className="mt-2 space-y-1">
                        {results.errors.map((error, index) => (
                          <li key={index} className="text-sm text-red-700">
                            • {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}