import React, { useEffect, useState, createElement } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, Info, Building2, ChevronDown, Plus, Search, Package, X, Cpu, Database, Zap, Target, GitBranch, LineChart, Shield, TrendingUp, Activity, Briefcase, Landmark, Building, ShoppingBag, Code, Users, Trophy, Cloud, DollarSign, MessageSquare, Mail, FileText, BarChart3, AlertCircle } from 'lucide-react';
// Core AI Services for Invisible Tech
const coreProducts = [{
  id: 'model-orchestration',
  name: 'Model Orchestration',
  icon: GitBranch,
  description: 'Coordinate multiple AI models for optimal performance',
  defaultFor: ['finance', 'healthcare', 'insurance', 'retail', 'technology', 'public-sector', 'sports', 'model-provider']
}, {
  id: 'rag-context',
  name: 'RAG & Context Optimization',
  icon: Database,
  description: 'Retrieve and refine information pipelines for context',
  defaultFor: ['finance', 'healthcare', 'insurance', 'technology', 'public-sector', 'model-provider']
}, {
  id: 'synthetic-data',
  name: 'Synthetic Data & Fine-Tuning',
  icon: Zap,
  description: 'Generate datasets to enhance model accuracy and fit',
  defaultFor: ['ai-training', 'finance', 'healthcare', 'model-provider']
}, {
  id: 'evaluation',
  name: 'Evaluation & Benchmarking',
  icon: Target,
  description: 'Test models for relevance, accuracy, and compliance',
  defaultFor: ['ai-training', 'finance', 'healthcare', 'insurance', 'model-provider']
}, {
  id: 'agent-workflow',
  name: 'Agent Workflow Automation',
  icon: Cpu,
  description: 'Deploy multi-step AI agents for business automation',
  defaultFor: ['finance', 'healthcare', 'insurance', 'retail', 'technology', 'public-sector']
}];
// Use cases by industry
const useCasesByIndustry = {
  'ai-training': [{
    id: 'rag-optimization',
    name: 'RAG Pipeline Optimization',
    icon: Database,
    description: 'Improve retrieval accuracy and reduce hallucinations'
  }, {
    id: 'llm-training-speed',
    name: 'LLM Training Acceleration',
    icon: Zap,
    description: 'Automate data curation to reduce training costs'
  }, {
    id: 'red-teaming',
    name: 'AI Red-Teaming',
    icon: Shield,
    description: 'Test and harden model behavior against adversarial attacks'
  }, {
    id: 'synthetic-edge-cases',
    name: 'Synthetic Data Generation',
    icon: GitBranch,
    description: 'Create rare examples for improved model coverage'
  }, {
    id: 'seo-content-gen',
    name: 'SEO Content Optimization',
    icon: TrendingUp,
    description: 'Generate optimized content aligned with search trends'
  }],
  finance: [{
    id: 'investment-strategy',
    name: 'Investment Strategy AI',
    icon: TrendingUp,
    description: 'Real-time insights and portfolio optimization'
  }, {
    id: 'credit-risk',
    name: 'Credit Risk Modeling',
    icon: BarChart3,
    description: 'Evaluate creditworthiness using real-time data'
  }, {
    id: 'compliance-monitoring',
    name: 'Compliance Monitoring',
    icon: Shield,
    description: 'Automate detection of regulatory non-compliance'
  }, {
    id: 'fraud-detection',
    name: 'Fraud Detection',
    icon: AlertCircle,
    description: 'Flag suspicious transactions with anomaly detection'
  }, {
    id: 'deal-sourcing',
    name: 'Intelligent Deal Sourcing',
    icon: Search,
    description: 'Identify opportunities using AI-powered scanning'
  }],
  healthcare: [{
    id: 'clinical-workflow',
    name: 'Clinical Workflow Optimization',
    icon: Activity,
    description: 'Triage requests and reduce administrative burden'
  }, {
    id: 'automated-documentation',
    name: 'Automated Documentation',
    icon: FileText,
    description: 'Generate clinical notes from voice or EHR data'
  }, {
    id: 'predictive-care',
    name: 'Predictive Care Planning',
    icon: TrendingUp,
    description: 'Identify at-risk patients and recommend interventions'
  }, {
    id: 'medical-image-triage',
    name: 'Medical Image Triage',
    icon: Target,
    description: 'Pre-screen imaging results to flag anomalies'
  }, {
    id: 'knowledge-retrieval',
    name: 'Clinical Knowledge Retrieval',
    icon: Database,
    description: 'Surface relevant medical research at point of care'
  }],
  insurance: [{
    id: 'claims-automation',
    name: 'Claims Automation',
    icon: Zap,
    description: 'Automate validation and fraud detection workflows'
  }, {
    id: 'underwriting-automation',
    name: 'Underwriting Automation',
    icon: FileText,
    description: 'Extract data for faster risk evaluation'
  }, {
    id: 'predictive-analytics',
    name: 'Predictive Analytics',
    icon: TrendingUp,
    description: 'Predict profitability and improve premium pricing'
  }, {
    id: 'insurance-fraud',
    name: 'Fraud Detection',
    icon: Shield,
    description: 'Identify vulnerabilities and strengthen detection'
  }, {
    id: 'self-service-chatbot',
    name: 'Customer Self-Service',
    icon: MessageSquare,
    description: 'Enable instant claim status and quote updates'
  }],
  retail: [{
    id: 'recruitment-automation',
    name: 'Recruitment Automation',
    icon: Users,
    description: 'Pre-screen candidates and reduce time-to-hire'
  }, {
    id: 'onboarding-speed',
    name: 'Seller Onboarding',
    icon: Zap,
    description: 'Automate document validation and catalog syncing'
  }, {
    id: 'sku-enrichment',
    name: 'SKU Enrichment',
    icon: Package,
    description: 'Auto-fill metadata and enhance discoverability'
  }, {
    id: 'dynamic-pricing',
    name: 'Dynamic Pricing',
    icon: DollarSign,
    description: 'Optimize pricing based on demand predictions'
  }, {
    id: 'visual-search',
    name: 'Visual Search',
    icon: Search,
    description: 'Enable image recognition and contextual matching'
  }],
  technology: [{
    id: 'product-adoption',
    name: 'Product Adoption Insights',
    icon: TrendingUp,
    description: 'Identify friction points and personalize onboarding'
  }, {
    id: 'data-enrichment',
    name: 'Data Quality Enrichment',
    icon: Database,
    description: 'Standardize and complete customer data fields'
  }, {
    id: 'developer-support',
    name: 'Developer Support Agents',
    icon: Code,
    description: 'Resolve technical issues and reduce support backlog'
  }, {
    id: 'api-integration',
    name: 'API Integration Acceleration',
    icon: Cpu,
    description: 'Automate code generation and documentation'
  }, {
    id: 'predictive-rollout',
    name: 'Predictive Feature Rollout',
    icon: GitBranch,
    description: 'Simulate adoption outcomes before deployment'
  }],
  'public-sector': [{
    id: 'document-processing',
    name: 'Smart Document Processing',
    icon: FileText,
    description: 'Digitize and classify government records'
  }, {
    id: 'citizen-chatbots',
    name: 'Citizen Service Chatbots',
    icon: MessageSquare,
    description: 'Provide multilingual assistance for permits and benefits'
  }, {
    id: 'infrastructure-maintenance',
    name: 'Predictive Maintenance',
    icon: Activity,
    description: 'Predict failures in utilities and transportation'
  }, {
    id: 'policy-simulation',
    name: 'Policy Impact Simulation',
    icon: BarChart3,
    description: 'Model outcomes of proposed policies'
  }, {
    id: 'fraud-waste-detection',
    name: 'Fraud & Waste Detection',
    icon: Shield,
    description: 'Identify misuse of public funds'
  }],
  sports: [{
    id: 'athlete-performance',
    name: 'Athlete Performance Optimization',
    icon: Activity,
    description: 'Analyze data to personalize training and prevent injuries'
  }, {
    id: 'fan-engagement',
    name: 'Fan Engagement Analytics',
    icon: Users,
    description: 'Recommend content and merchandise to increase loyalty'
  }, {
    id: 'game-summarization',
    name: 'Automated Game Summarization',
    icon: FileText,
    description: 'Generate highlights and statistics from footage'
  }, {
    id: 'sponsorship-roi',
    name: 'Sponsorship ROI Analysis',
    icon: DollarSign,
    description: 'Measure brand partnership impact'
  }, {
    id: 'predictive-scouting',
    name: 'Predictive Scouting',
    icon: Search,
    description: 'Identify emerging talent across leagues'
  }],
  'model-provider': [{
    id: 'fine-tuning-service',
    name: 'Fine-Tuning as a Service',
    icon: Zap,
    description: 'Domain-specific model adaptation pipelines'
  }, {
    id: 'automated-benchmarking',
    name: 'Automated Benchmarking',
    icon: Target,
    description: 'Test performance across standardized datasets'
  }, {
    id: 'rag-frameworks',
    name: 'RAG Optimization Frameworks',
    icon: Database,
    description: 'APIs for retrieval-augmented generation'
  }, {
    id: 'interpretability',
    name: 'Model Interpretability',
    icon: LineChart,
    description: 'Visualize reasoning and explainability metrics'
  }, {
    id: 'multi-model-orchestration',
    name: 'Multi-Model Orchestration',
    icon: GitBranch,
    description: 'Dynamic routing between models based on query type'
  }]
};
// Additional custom products for drawer
const customProducts = [...coreProducts, {
  id: 'analytics',
  name: 'Advanced Analytics',
  icon: LineChart,
  description: 'Comprehensive reporting and business intelligence',
  defaultFor: []
}, {
  id: 'api-access',
  name: 'API Access',
  icon: Cpu,
  description: 'Direct integration with your systems',
  defaultFor: []
}];
// Pricing metrics options
const pricingMetrics = [{
  id: 'per-seat',
  name: 'Per Seat/Month',
  icon: Users,
  description: 'Fixed monthly fee per agent or user seat',
  defaultFor: ['technology', 'finance', 'healthcare']
}, {
  id: 'per-api-call',
  name: 'Per API Call',
  icon: Cpu,
  description: 'Pay per API request to AI services',
  defaultFor: ['model-provider', 'technology']
}, {
  id: 'per-transaction',
  name: 'Per Transaction',
  icon: DollarSign,
  description: 'Pay per completed business transaction',
  defaultFor: ['finance', 'insurance', 'retail']
}, {
  id: 'per-document',
  name: 'Per Document',
  icon: Package,
  description: 'Pay per document processed or analyzed',
  defaultFor: ['healthcare', 'insurance', 'public-sector']
}, {
  id: 'per-model-run',
  name: 'Per Model Run',
  icon: Zap,
  description: 'Pay per model inference or evaluation',
  defaultFor: ['ai-training', 'model-provider']
}, {
  id: 'base-subscription',
  name: 'Base Subscription',
  icon: DollarSign,
  description: 'Fixed monthly base fee with included usage',
  defaultFor: []
}];
// Customer types
const customerTypes = [{
  id: 'ai-training',
  name: 'AI Training & Operations',
  icon: Activity,
  description: 'Model iteration and quality assurance'
}, {
  id: 'finance',
  name: 'Finance & Investment',
  icon: TrendingUp,
  description: 'Analytics, risk, and compliance automation'
}, {
  id: 'healthcare',
  name: 'Healthcare',
  icon: Activity,
  description: 'Clinical documentation and predictive care'
}, {
  id: 'insurance',
  name: 'Insurance',
  icon: Shield,
  description: 'Claims processing and underwriting'
}, {
  id: 'retail',
  name: 'Retail & E-Commerce',
  icon: ShoppingBag,
  description: 'Marketplace intelligence and automation'
}, {
  id: 'technology',
  name: 'Technology & SaaS',
  icon: Code,
  description: 'Product enablement and data enrichment'
}, {
  id: 'public-sector',
  name: 'Public Sector',
  icon: Landmark,
  description: 'Government services and infrastructure'
}, {
  id: 'sports',
  name: 'Sports & Entertainment',
  icon: Trophy,
  description: 'Performance analytics and fan engagement'
}, {
  id: 'model-provider',
  name: 'Model Provider',
  icon: Cloud,
  description: 'AI infrastructure and orchestration'
}, {
  id: 'custom',
  name: 'Custom',
  icon: Plus,
  description: 'Create your own industry category'
}];
export function ConfigurationStep() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [customerType, setCustomerType] = useState('');
  const [customIndustryName, setCustomIndustryName] = useState('');
  const [customIndustryDescription, setCustomIndustryDescription] = useState('');
  const [showCustomIndustryModal, setShowCustomIndustryModal] = useState(false);
  const [selectedCore, setSelectedCore] = useState<string[]>([]);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    id: string;
    pricingMetric: string;
  }>>([]);
  const [showCustomerTypeDropdown, setShowCustomerTypeDropdown] = useState(false);
  const [showCustomProductDrawer, setShowCustomProductDrawer] = useState(false);
  const [customProductSearch, setCustomProductSearch] = useState('');
  const [customProductCategory, setCustomProductCategory] = useState<string | null>(null);
  // Restore state from URL params on mount
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const coreParam = searchParams.get('core');
    const useCasesParam = searchParams.get('useCases');
    const customNameParam = searchParams.get('customName');
    const customDescParam = searchParams.get('customDesc');
    if (typeParam) {
      setCustomerType(typeParam);
    }
    if (customNameParam) {
      setCustomIndustryName(customNameParam);
    }
    if (customDescParam) {
      setCustomIndustryDescription(customDescParam);
    }
    if (coreParam) {
      const coreIds = coreParam.split(',');
      setSelectedCore(coreIds);
    }
    if (useCasesParam) {
      const useCaseIds = useCasesParam.split(',');
      setSelectedUseCases(useCaseIds);
    }
  }, []);
  const toggleCore = (id: string) => {
    if (selectedCore.includes(id)) {
      setSelectedCore(selectedCore.filter(item => item !== id));
      setSelectedProducts(selectedProducts.filter(item => item.id !== id));
    } else {
      setSelectedCore([...selectedCore, id]);
      let defaultMetric = 'per-api-call';
      if (id === 'agent-workflow') defaultMetric = 'per-transaction';
      setSelectedProducts([...selectedProducts, {
        id,
        pricingMetric: defaultMetric
      }]);
    }
  };
  const toggleUseCase = (id: string) => {
    if (selectedUseCases.includes(id)) {
      setSelectedUseCases(selectedUseCases.filter(item => item !== id));
      setSelectedProducts(selectedProducts.filter(item => item.id !== id));
    } else {
      setSelectedUseCases([...selectedUseCases, id]);
      let defaultMetric = 'per-transaction';
      setSelectedProducts([...selectedProducts, {
        id,
        pricingMetric: defaultMetric
      }]);
    }
  };
  const addCustomProduct = (id: string) => {
    const isCore = coreProducts.some(product => product.id === id);
    let defaultMetric = 'per-api-call';
    if (isCore && !selectedCore.includes(id)) {
      setSelectedCore([...selectedCore, id]);
      setSelectedProducts([...selectedProducts, {
        id,
        pricingMetric: defaultMetric
      }]);
    } else if (!isCore) {
      setSelectedProducts([...selectedProducts, {
        id,
        pricingMetric: defaultMetric
      }]);
    }
    setShowCustomProductDrawer(false);
  };
  const updatePricingMetric = (productId: string, metric: string) => {
    setSelectedProducts(selectedProducts.map(product => product.id === productId ? {
      ...product,
      pricingMetric: metric
    } : product));
  };
  const getProductName = (id: string) => {
    const coreProduct = coreProducts.find(p => p.id === id);
    if (coreProduct) return coreProduct.name;
    for (const industry in useCasesByIndustry) {
      const useCase = useCasesByIndustry[industry as keyof typeof useCasesByIndustry].find(uc => uc.id === id);
      if (useCase) return useCase.name;
    }
    const customProduct = customProducts.find(p => p.id === id);
    return customProduct ? customProduct.name : id;
  };
  const getProductIcon = (id: string) => {
    const coreProduct = coreProducts.find(p => p.id === id);
    if (coreProduct) return coreProduct.icon;
    for (const industry in useCasesByIndustry) {
      const useCase = useCasesByIndustry[industry as keyof typeof useCasesByIndustry].find(uc => uc.id === id);
      if (useCase) return useCase.icon;
    }
    const customProduct = customProducts.find(p => p.id === id);
    return customProduct ? customProduct.icon : Cpu;
  };
  const filteredCustomProducts = customProducts.filter(product => {
    const matchesSearch = customProductSearch === '' || product.name.toLowerCase().includes(customProductSearch.toLowerCase()) || product.description.toLowerCase().includes(customProductSearch.toLowerCase());
    const matchesCategory = customProductCategory === null || customProductCategory === 'core' && coreProducts.some(p => p.id === product.id) || customProductCategory === 'custom' && !coreProducts.some(p => p.id === product.id);
    return matchesSearch && matchesCategory;
  });
  const isProductSelected = (id: string) => {
    return selectedProducts.some(product => product.id === id);
  };
  const canProceed = customerType && selectedCore.length > 0;
  const availableUseCases = customerType ? useCasesByIndustry[customerType as keyof typeof useCasesByIndustry] || [] : [];
  const handleCustomerTypeSelect = (typeId: string) => {
    if (typeId === 'custom') {
      setShowCustomIndustryModal(true);
      setShowCustomerTypeDropdown(false);
    } else {
      setCustomerType(typeId);
      setShowCustomerTypeDropdown(false);
    }
  };
  const saveCustomIndustry = () => {
    if (customIndustryName.trim()) {
      setCustomerType('custom');
      setShowCustomIndustryModal(false);
    }
  };
  useEffect(() => {
    if (customerType) {
      const defaultCore = coreProducts.filter(product => product.defaultFor.includes(customerType)).map(product => product.id);
      setSelectedCore(defaultCore);
      setSelectedUseCases([]);
      const initialProducts = [...defaultCore].map(id => {
        let defaultMetric = 'per-api-call';
        if (id === 'agent-workflow') defaultMetric = 'per-transaction';
        return {
          id,
          pricingMetric: defaultMetric
        };
      });
      setSelectedProducts(initialProducts);
    }
  }, [customerType]);
  const handleNext = () => {
    const params = new URLSearchParams();
    params.set('type', customerType);
    params.set('core', selectedCore.join(','));
    if (selectedUseCases.length > 0) {
      params.set('useCases', selectedUseCases.join(','));
    }
    if (customerType === 'custom') {
      params.set('customName', customIndustryName);
      params.set('customDesc', customIndustryDescription);
    }
    // Pass all selected products with their pricing metrics
    const productsData = selectedProducts.map(p => `${p.id}:${p.pricingMetric}`).join(',');
    params.set('products', productsData);
    navigate(`/volume?${params.toString()}`);
  };
  return <div className="w-full bg-white">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            Customer Opportunities
          </Link>
          <ArrowRight size={12} />
          <span className="font-medium text-black">Configure</span>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-5">
        <h1 className="text-2xl font-semibold mb-2">Configure Quote</h1>
        <p className="text-gray-500 mb-6">
          Select AI services and pricing metrics for your customer
        </p>
        <div className="space-y-6">
          {/* Customer Type Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium">Industry</h2>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Info size={14} />
                <span>This will pre-select recommended services</span>
              </div>
            </div>
            <div className="relative">
              <button className="w-full p-3 border border-gray-200 rounded-lg flex justify-between items-center hover:border-gray-300" onClick={() => setShowCustomerTypeDropdown(!showCustomerTypeDropdown)}>
                {customerType ? <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      {createElement(customerType === 'custom' ? Plus : customerTypes.find(type => type.id === customerType)?.icon || Building2, {
                    size: 18,
                    className: 'text-gray-600'
                  })}
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="font-medium">
                        {customerType === 'custom' ? customIndustryName || 'Custom Industry' : customerTypes.find(type => type.id === customerType)?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {customerType === 'custom' ? customIndustryDescription || 'Custom industry category' : customerTypes.find(type => type.id === customerType)?.description}
                      </div>
                    </div>
                  </div> : <span className="text-gray-500">Select industry</span>}
                <ChevronDown size={16} className={showCustomerTypeDropdown ? 'transform rotate-180' : ''} />
              </button>
              {showCustomerTypeDropdown && <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  {customerTypes.map(type => <button key={type.id} className="w-full p-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0" onClick={() => handleCustomerTypeSelect(type.id)}>
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <type.icon size={18} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-gray-500">
                          {type.description}
                        </div>
                      </div>
                      {customerType === type.id && <Check size={16} className="ml-auto text-black" />}
                    </button>)}
                </div>}
            </div>
          </div>
          {/* Core Products */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium">Core AI Services</h2>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Info size={14} />
                <span>Select the core AI-powered services</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {coreProducts.map(product => {
              const ProductIcon = product.icon;
              return <button key={product.id} className={`p-3 border rounded-lg text-left transition-colors ${selectedCore.includes(product.id) ? 'border-black bg-gray-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => toggleCore(product.id)}>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ProductIcon size={18} className="text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.description}
                          </div>
                        </div>
                      </div>
                      {selectedCore.includes(product.id) && <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>}
                    </div>
                  </button>;
            })}
            </div>
          </div>
          {/* Industry-Specific Use Cases */}
          {customerType && availableUseCases.length > 0 && <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">Industry Use Cases</h2>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Info size={14} />
                  <span>Select specific use cases for this industry</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {availableUseCases.map(useCase => {
              const UseCaseIcon = useCase.icon;
              return <button key={useCase.id} className={`p-3 border rounded-lg text-left transition-colors ${selectedUseCases.includes(useCase.id) ? 'border-black bg-gray-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => toggleUseCase(useCase.id)}>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <UseCaseIcon size={18} className="text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{useCase.name}</div>
                            <div className="text-sm text-gray-500">
                              {useCase.description}
                            </div>
                          </div>
                        </div>
                        {selectedUseCases.includes(useCase.id) && <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>}
                      </div>
                    </button>;
            })}
              </div>
            </div>}
          {/* Selected Products & Pricing Metrics */}
          {selectedProducts.length > 0 && <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium">Pricing Metrics</h2>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Info size={14} />
                  <span>Select how each service will be priced</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pricing Metric
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedProducts.map(product => {
                  const ProductIcon = getProductIcon(product.id);
                  return <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <ProductIcon size={18} className="text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {getProductName(product.id)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <select value={product.pricingMetric} onChange={e => updatePricingMetric(product.id, e.target.value)} className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm">
                              {pricingMetrics.map(metric => <option key={metric.id} value={metric.id}>
                                  {metric.name}
                                </option>)}
                            </select>
                          </td>
                        </tr>;
                })}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900" onClick={() => setShowCustomProductDrawer(true)}>
                  <Plus size={14} />
                  <span>Add Custom Service</span>
                </button>
              </div>
            </div>}
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <Link to="/" className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium transition-colors hover:bg-gray-50">
            Cancel
          </Link>
          <button onClick={handleNext} disabled={!canProceed} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${canProceed ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
            Next
          </button>
        </div>
      </div>
      {/* Custom Industry Modal */}
      {showCustomIndustryModal && <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowCustomIndustryModal(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">Create Custom Industry</h2>
              <button onClick={() => setShowCustomIndustryModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Industry Name
                </label>
                <input type="text" value={customIndustryName} onChange={e => setCustomIndustryName(e.target.value)} placeholder="e.g., Manufacturing, Education, etc." className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea value={customIndustryDescription} onChange={e => setCustomIndustryDescription(e.target.value)} placeholder="Brief description of your industry" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button onClick={() => setShowCustomIndustryModal(false)} className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                Cancel
              </button>
              <button onClick={saveCustomIndustry} disabled={!customIndustryName.trim()} className={`px-4 py-2 rounded-md text-sm ${customIndustryName.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                Save
              </button>
            </div>
          </div>
        </div>}
      {/* Custom Product Drawer */}
      {showCustomProductDrawer && <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowCustomProductDrawer(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium">Add Custom Service</h2>
                  <button onClick={() => setShowCustomProductDrawer(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input type="text" placeholder="Search services..." value={customProductSearch} onChange={e => setCustomProductSearch(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className={`px-3 py-1.5 text-sm rounded-md ${customProductCategory === null ? 'bg-gray-100 font-medium' : 'bg-white border border-gray-200'}`} onClick={() => setCustomProductCategory(null)}>
                      All
                    </button>
                    <button className={`px-3 py-1.5 text-sm rounded-md ${customProductCategory === 'core' ? 'bg-gray-100 font-medium' : 'bg-white border border-gray-200'}`} onClick={() => setCustomProductCategory('core')}>
                      Core
                    </button>
                    <button className={`px-3 py-1.5 text-sm rounded-md ${customProductCategory === 'custom' ? 'bg-gray-100 font-medium' : 'bg-white border border-gray-200'}`} onClick={() => setCustomProductCategory('custom')}>
                      Custom
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {filteredCustomProducts.map(product => {
                  const ProductIcon = product.icon;
                  const isSelected = isProductSelected(product.id);
                  return <div key={product.id} className={`p-3 border rounded-lg ${isSelected ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                          <div className="flex justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <ProductIcon size={18} className="text-gray-600" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {product.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.description}
                                </div>
                              </div>
                            </div>
                            <button className={`px-3 py-1 text-xs rounded ${isSelected ? 'bg-gray-200 text-gray-700' : 'bg-black text-white'}`} onClick={() => addCustomProduct(product.id)} disabled={isSelected}>
                              {isSelected ? 'Added' : 'Add'}
                            </button>
                          </div>
                        </div>;
                })}
                    {filteredCustomProducts.length === 0 && <div className="text-center py-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Package size={20} className="text-gray-400" />
                        </div>
                        <h3 className="font-medium mb-1">No services found</h3>
                        <p className="text-sm text-gray-500">
                          Try adjusting your search or filters
                        </p>
                      </div>}
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-end">
                  <button onClick={() => setShowCustomProductDrawer(false)} className="px-4 py-2 bg-black text-white rounded-md text-sm">
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}