import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, FileText, PresentationIcon, Copy, Download, Check, Calendar, ChevronDown, Info, CheckCircle, Layers, Clock, ArrowUpRight, Mail, Phone, MessageSquare, FileIcon, Headphones, X, AlertCircle, Users, ExternalLink } from 'lucide-react';
export function QuoteStep() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Get values from URL parameters, with fallbacks to default values
  const totalValue = parseInt(queryParams.get('tcv') || '156000');
  const contractTerm = parseInt(queryParams.get('term') || '12');
  const monthlyValue = parseInt(queryParams.get('monthly') || Math.round(totalValue / contractTerm));
  // Get POC settings from URL
  const pocEnabled = queryParams.get('poc') === 'true';
  const pocMonths = parseInt(queryParams.get('pocMonths') || '2');
  const pocProducts = queryParams.get('pocProducts')?.split(',') || [];
  const deploymentModel = queryParams.get('deploymentModel') || 'annual-commitment';
  const billingCycle = queryParams.get('billingCycle') || 'monthly';
  // State for quote options
  const [startDate, setStartDate] = useState(queryParams.get('startDate') || '2025-10-01');
  const [billingTerms, setBillingTerms] = useState(billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1));
  const [paymentTerms, setPaymentTerms] = useState('Net-30');
  const [selectedQuoteOption, setSelectedQuoteOption] = useState(pocEnabled ? 'poc' : 'standard');
  // State for export options
  const [exportFormat, setExportFormat] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  // State for approval workflow
  const [approvalStatus, setApprovalStatus] = useState('pending');
  const [showApprovalDetails, setShowApprovalDetails] = useState(false);
  // State for additional options
  const [includeRoi, setIncludeRoi] = useState(true);
  const [includeImplementation, setIncludeImplementation] = useState(true);
  // Quote options
  const quoteOptions = [{
    id: 'standard',
    name: 'Standard Annual',
    description: 'Annual commitment with standard pricing',
    value: totalValue,
    term: contractTerm,
    type: 'Annual Commitment'
  }, {
    id: 'poc',
    name: 'POC → Production',
    description: '2-month free POC followed by production',
    value: totalValue,
    term: contractTerm,
    type: 'POC → Production'
  }, {
    id: 'multi-year',
    name: 'Multi-Year Option',
    description: '3-year commitment with additional discounts',
    value: totalValue * 3,
    term: 36,
    type: 'Multi-Year Contract'
  }, {
    id: 'outcome',
    name: 'Outcome-Based',
    description: 'Pay per successful load booked',
    value: 'Variable',
    term: contractTerm,
    type: 'Outcome-Based'
  }];
  // Handle export action
  const handleExport = (format: string) => {
    setExportFormat(format);
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setExportComplete(false);
        setExportFormat(null);
      }, 3000);
    }, 1500);
  };
  // Get selected quote details
  const selectedQuote = quoteOptions.find(option => option.id === selectedQuoteOption) || quoteOptions[0];
  return <div className="w-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            FreightWave Logistics
          </Link>
          <ArrowRight size={12} />
          <Link to="/configure" className="hover:text-gray-700">
            Configure
          </Link>
          <ArrowRight size={12} />
          <Link to="/volume" className="hover:text-gray-700">
            Volume
          </Link>
          <ArrowRight size={12} />
          <Link to="/pricing" className="hover:text-gray-700">
            Pricing
          </Link>
          <ArrowRight size={12} />
          <span className="font-medium text-black">Quote</span>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-2">Generate Quote</h1>
        <p className="text-gray-500 mb-8">
          Customize quote options and generate customer-facing materials
        </p>
        <div className="space-y-8">
          {/* Commercial Terms */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-6">Commercial Terms</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Length
                </label>
                <select value={contractTerm} onChange={e => setContractTerm(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value={12}>12 months</option>
                  <option value={14}>
                    14 months (2-month POC + 12-month Production)
                  </option>
                  <option value={24}>24 months</option>
                  <option value={36}>36 months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Terms
                </label>
                <select value={billingTerms} onChange={e => setBillingTerms(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Terms
                </label>
                <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="Net-30">Net-30</option>
                  <option value="Net-45">Net-45</option>
                  <option value="Net-60">Net-60</option>
                </select>
              </div>
            </div>
          </div>
          {/* Additional Options */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Additional Options</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="include-roi" checked={includeRoi} onChange={e => setIncludeRoi(e.target.checked)} className="w-4 h-4 text-black border-gray-300 rounded" />
                  <div>
                    <label htmlFor="include-roi" className="font-medium text-sm">
                      Include ROI Analysis
                    </label>
                    <p className="text-xs text-gray-500">
                      Add detailed ROI calculations based on industry benchmarks
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Recommended
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="include-implementation" checked={includeImplementation} onChange={e => setIncludeImplementation(e.target.checked)} className="w-4 h-4 text-black border-gray-300 rounded" />
                  <div>
                    <label htmlFor="include-implementation" className="font-medium text-sm">
                      Include Implementation Timeline
                    </label>
                    <p className="text-xs text-gray-500">
                      Add detailed implementation plan with milestones
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Recommended
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="include-case-studies" className="w-4 h-4 text-black border-gray-300 rounded" />
                  <div>
                    <label htmlFor="include-case-studies" className="font-medium text-sm">
                      Include Similar Customer Case Studies
                    </label>
                    <p className="text-xs text-gray-500">
                      Add relevant freight broker success stories
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  Optional
                </span>
              </div>
            </div>
          </div>
          {/* Quote Summary */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-6">Quote Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Customer</span>
                <span className="font-medium">FreightWave Logistics</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Customer Type</span>
                <span className="font-medium">Freight Broker</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Deployment Type</span>
                <span className="font-medium">
                  {pocEnabled ? 'POC → Production' : 'Annual Commitment'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Included Services</span>
                <div className="flex items-center gap-1">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center" title="Voice Minutes">
                    <Phone size={14} className="text-gray-600" />
                  </span>
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center" title="Email">
                    <Mail size={14} className="text-gray-600" />
                  </span>
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center" title="Messaging">
                    <MessageSquare size={14} className="text-gray-600" />
                  </span>
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center" title="Document Parsing">
                    <FileIcon size={14} className="text-gray-600" />
                  </span>
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center" title="Engineer Support">
                    <Headphones size={14} className="text-gray-600" />
                  </span>
                </div>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Contract Period</span>
                <span className="font-medium">
                  {new Date(startDate).toLocaleDateString()} -{' '}
                  {new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + contractTerm)).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Billing Cadence</span>
                <span className="font-medium">{billingTerms}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Payment Terms</span>
                <span className="font-medium">{paymentTerms}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Total Contract Value</span>
                <span className="font-medium">
                  ${totalValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          {/* Export Options */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-medium">Export Quote</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <button className={`p-4 border rounded-lg text-center flex flex-col items-center justify-center gap-2 ${exportFormat === 'order-form' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handleExport('order-form')} disabled={isExporting}>
                  {exportComplete && exportFormat === 'order-form' ? <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <Check size={20} />
                    </div> : <FileText size={32} className="text-gray-400" />}
                  <span className="font-medium">Order Form</span>
                  <span className="text-xs text-gray-500">
                    HappyRobot branded quote document
                  </span>
                </button>
                <button className={`p-4 border rounded-lg text-center flex flex-col items-center justify-center gap-2 ${exportFormat === 'presentation' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handleExport('presentation')} disabled={isExporting}>
                  {exportComplete && exportFormat === 'presentation' ? <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <Check size={20} />
                    </div> : <PresentationIcon size={32} className="text-gray-400" />}
                  <span className="font-medium">Pitch Deck</span>
                  <span className="text-xs text-gray-500">
                    Presentation with ROI analysis
                  </span>
                </button>
                <button className={`p-4 border rounded-lg text-center flex flex-col items-center justify-center gap-2 ${exportFormat === 'comparison' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handleExport('comparison')} disabled={isExporting}>
                  {exportComplete && exportFormat === 'comparison' ? <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                      <Check size={20} />
                    </div> : <Layers size={32} className="text-gray-400" />}
                  <span className="font-medium">Option Comparison</span>
                  <span className="text-xs text-gray-500">
                    Side-by-side quote options
                  </span>
                </button>
              </div>
              {/* Export Status */}
              {isExporting && <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                  <span>
                    Generating{' '}
                    {exportFormat === 'order-form' ? 'Order Form' : exportFormat === 'presentation' ? 'Pitch Deck' : 'Option Comparison'}
                    ...
                  </span>
                </div>}
              {exportComplete && <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                      <Check size={12} />
                    </div>
                    <span>Quote successfully generated!</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm">
                      <Copy size={14} />
                      <span>Copy link</span>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-black text-white rounded-md text-sm">
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>}
              {/* Approval Workflow */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-800 flex items-center gap-2">
                    <Users size={16} className="text-blue-500" />
                    Approval Workflow
                  </h3>
                  <button className="text-xs text-blue-600 flex items-center gap-1" onClick={() => setShowApprovalDetails(!showApprovalDetails)}>
                    {showApprovalDetails ? 'Hide details' : 'Show details'}
                    <ChevronDown size={12} className={`transition-transform ${showApprovalDetails ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  This quote requires manager approval due to custom pricing.
                </p>
                {showApprovalDetails && <div className="mb-3 space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-blue-500" />
                        <span>Requested approval from Michael Chen</span>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={14} className="text-amber-500" />
                        <span>Voice Minutes margin below threshold</span>
                      </div>
                      <span className="text-xs text-amber-500">
                        Requires approval
                      </span>
                    </div>
                  </div>}
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm">
                    <ArrowUpRight size={14} />
                    <span>
                      {approvalStatus === 'pending' ? 'Request Approval' : 'Check Approval Status'}
                    </span>
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-blue-300 text-blue-700 rounded-md text-sm">
                    <ExternalLink size={14} />
                    <span>View in Salesforce</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Clone & Create New Version */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium">Create Alternative Quote Version</h3>
              <p className="text-sm text-gray-500">
                Clone this quote with different terms or pricing
              </p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm">
              <Copy size={14} />
              <span>Clone Quote</span>
            </button>
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <Link to={`/pricing?term=${contractTerm}&poc=${pocEnabled}&pocMonths=${pocMonths}&pocProducts=${pocProducts.join(',')}&deploymentModel=${deploymentModel}&billingCycle=${billingCycle}`} className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium">
            Back
          </Link>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium">
              Save as Draft
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium">
              Finalize Quote
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <div>
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-xl font-semibold">
                ${totalValue.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Term</div>
              <div className="text-xl font-semibold">{contractTerm} months</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Monthly Value</div>
              <div className="text-xl font-semibold">
                ${monthlyValue.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to={`/volume?term=${contractTerm}&poc=${pocEnabled}&pocMonths=${pocMonths}&pocProducts=${pocProducts.join(',')}&deploymentModel=${deploymentModel}&billingCycle=${billingCycle}`} className="px-4 py-2 border border-gray-200 rounded-md text-sm">
              Back
            </Link>
            <Link to="/" className="px-4 py-2 bg-black text-white rounded-md text-sm">
              Finalize Quote
            </Link>
          </div>
        </div>
      </div>
    </div>;
}