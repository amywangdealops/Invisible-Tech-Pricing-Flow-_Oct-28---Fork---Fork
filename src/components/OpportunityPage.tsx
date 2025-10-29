import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RefreshCw, ExternalLink, Plus, ChevronRight, Clock, Building2, Truck, Globe, DollarSign, CalendarDays, BarChart3, Check, X, FileText, Headphones, Users, Settings, MessageSquare, AlertCircle, Trash2 } from 'lucide-react';
import { CompareDrawer } from './CompareDrawer';
// Sample quotes for FreightWave Logistics
const existingQuotes = [{
  id: 1,
  name: 'Annual Voice + Messaging',
  description: 'Standard voice minutes and messaging package',
  term: 12,
  totalValue: 145000,
  services: ['Voice Minutes', 'Messaging', 'Document Parsing'],
  deployment: 'Annual Commitment',
  createdAt: '3 days ago',
  status: 'Approved'
}, {
  id: 2,
  name: 'POC → Production Package',
  description: '2-month POC with full production rollout',
  term: 14,
  totalValue: 168000,
  services: ['Voice Minutes', 'Email', 'Messaging', 'Document Parsing', 'Engineer Support'],
  deployment: 'POC → Production',
  createdAt: '1 day ago',
  status: 'Pending Approval'
}, {
  id: 3,
  name: 'Multi-Year Premium',
  description: '3-year commitment with all services',
  term: 36,
  totalValue: 420000,
  services: ['Voice Minutes', 'Email', 'Messaging', 'Document Parsing', 'Engineer Support'],
  deployment: 'Multi-Year Contract',
  createdAt: '2 hours ago',
  status: 'Draft'
}];
export function OpportunityPage() {
  const [selectedQuotes, setSelectedQuotes] = useState<number[]>([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState(false);
  const [compareViewMode, setCompareViewMode] = useState<'partner' | 'customer'>('partner');
  const [quotes, setQuotes] = useState(existingQuotes);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const toggleQuoteSelection = (quoteId: number) => {
    if (selectedQuotes.includes(quoteId)) {
      setSelectedQuotes(selectedQuotes.filter(id => id !== quoteId));
    } else {
      setSelectedQuotes([...selectedQuotes, quoteId]);
    }
  };
  const handleDeleteQuote = (quoteId: number) => {
    setQuotes(quotes.filter(q => q.id !== quoteId));
    setSelectedQuotes(selectedQuotes.filter(id => id !== quoteId));
    setDeleteConfirmId(null);
  };
  // Add BDO Grotesk font styles
  const fontStyle = {
    fontFamily: '"BDO Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };
  return <div className="w-full bg-white" style={fontStyle}>
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            Opportunities
          </Link>
          <ArrowRight size={12} />
          <span className="font-medium text-black">FreightWave Logistics</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">FreightWave Logistics</h1>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* Customer Info Card */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
              <h2 className="font-medium">Customer Information</h2>
              <button className="text-xs text-gray-500 hover:text-gray-700">
                Edit
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                  <Truck size={20} />
                </div>
                <div>
                  <h3 className="font-medium">FreightWave Logistics</h3>
                  <p className="text-sm text-gray-500">
                    Mid-Market Freight Broker
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 mt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Annual Revenue</span>
                  <span className="text-sm">$45M - $60M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Load Volume</span>
                  <span className="text-sm">2,500 - 5,000 monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Carrier Network</span>
                  <span className="text-sm">8,500+ carriers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Region</span>
                  <span className="text-sm">AMER (West Coast Focus)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Target Use Case</span>
                  <span className="text-sm">Carrier Sales Automation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Current Solution
                  </span>
                  <span className="text-sm">Manual Processes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Opportunity Owner
                  </span>
                  <span className="text-sm">Sarah Johnson</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="text-sm px-3 py-1.5 border border-gray-200 rounded-md flex items-center gap-1 hover:bg-gray-50">
                  <RefreshCw size={14} />
                  <span>Refresh</span>
                </button>
                <button className="text-sm px-3 py-1.5 border border-gray-200 rounded-md flex items-center gap-1 hover:bg-gray-50">
                  <ExternalLink size={14} />
                  <span>Open in Salesforce</span>
                </button>
              </div>
            </div>
          </div>
          {/* Quotes Section */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
              <h2 className="font-medium">Quotes</h2>
              <div className="flex gap-2">
                {selectedQuotes.length > 0 && <button className="text-xs border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-1" onClick={() => setShowCompareDrawer(true)}>
                    <BarChart3 size={14} />
                    <span>Compare ({selectedQuotes.length})</span>
                  </button>}
                <Link to="/configure" className="text-xs border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-1">
                  <Plus size={14} />
                  <span>Create New Quote</span>
                </Link>
              </div>
            </div>
            {quotes.length === 0 ? <div className="p-6 flex flex-col items-center justify-center text-center h-48">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <Clock size={20} className="text-gray-400" />
                </div>
                <h3 className="font-medium mb-2">No quotes yet</h3>
                <p className="text-sm text-gray-500 mb-4 max-w-sm">
                  Create your first quote to start configuring products and
                  pricing for FreightWave Logistics
                </p>
                <Link to="/configure" className="text-sm bg-black text-white rounded-md px-4 py-2 flex items-center gap-1">
                  <Plus size={14} />
                  <span>Create New Quote</span>
                </Link>
              </div> : <div className="divide-y divide-gray-200">
                {quotes.map(quote => <div key={quote.id} className="flex items-center px-4 py-2.5 hover:bg-gray-50">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer ${selectedQuotes.includes(quote.id) ? 'bg-black border-black' : 'border-gray-300'}`} onClick={() => toggleQuoteSelection(quote.id)}>
                        {selectedQuotes.includes(quote.id) && <Check size={12} className="text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{quote.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${quote.status === 'Approved' ? 'bg-green-100 text-green-800' : quote.status === 'Pending Approval' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                            {quote.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            Created {quote.createdAt}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {quote.deployment} • $
                          {quote.totalValue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          View
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Edit
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Clone
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1" onClick={() => setDeleteConfirmId(quote.id)} title="Delete quote">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {deleteConfirmId && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold">Delete Quote</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "
              {quotes.find(q => q.id === deleteConfirmId)?.name}"? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700" onClick={() => handleDeleteQuote(deleteConfirmId)}>
                Delete Quote
              </button>
            </div>
          </div>
        </div>}
      {/* Compare Drawer */}
      <CompareDrawer isOpen={showCompareDrawer} onClose={() => setShowCompareDrawer(false)} selectedQuotes={selectedQuotes} quotes={quotes} viewMode={compareViewMode} onViewModeChange={setCompareViewMode} />
    </div>;
}