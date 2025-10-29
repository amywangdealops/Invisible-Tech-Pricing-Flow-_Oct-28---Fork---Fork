import React, { useEffect, useState, Component } from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Info, ChevronDown, ChevronRight, Check, AlertCircle, Phone, Mail, MessageSquare, FileText, Headphones, Settings, DollarSign, Shield, TrendingUp, BarChart3, Plus, Minus, Calendar, Clock, Sliders, ExternalLink, Share2, Link2, X, Database, Users, Zap, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { RampDrawer } from './RampDrawer';
import { PricingCategoriesTable } from './PricingCategoriesTable';
// Intercom products with pricing details
const products = [{
  id: 'platform-essential',
  name: 'Essential Plan',
  category: 'Core Platform',
  basePrice: 29,
  unit: 'per seat/month',
  unitShort: 'seats',
  volume: 120,
  pricingType: 'Subscription',
  pricingMetric: 'per-seat',
  tiers: [{
    min: 0,
    max: 10,
    price: 29
  }, {
    min: 10,
    max: 50,
    price: 27
  }, {
    min: 50,
    max: Infinity,
    price: 25
  }],
  cost: 10
}, {
  id: 'platform-advanced',
  name: 'Advanced Plan',
  category: 'Core Platform',
  basePrice: 85,
  unit: 'per seat/month',
  unitShort: 'seats',
  volume: 120,
  pricingType: 'Subscription',
  pricingMetric: 'per-seat',
  tiers: [{
    min: 0,
    max: 10,
    price: 85
  }, {
    min: 10,
    max: 50,
    price: 80
  }, {
    min: 50,
    max: Infinity,
    price: 75
  }],
  cost: 30
}, {
  id: 'platform-expert',
  name: 'Expert Plan',
  category: 'Core Platform',
  basePrice: 132,
  unit: 'per seat/month',
  unitShort: 'seats',
  volume: 120,
  pricingType: 'Subscription',
  pricingMetric: 'per-seat',
  tiers: [{
    min: 0,
    max: 10,
    price: 132
  }, {
    min: 10,
    max: 50,
    price: 125
  }, {
    min: 50,
    max: Infinity,
    price: 120
  }],
  cost: 45
}, {
  id: 'fin-ai-agent',
  name: 'Fin AI Agent',
  category: 'AI Services',
  basePrice: 0.99,
  unit: 'per resolution',
  unitShort: 'resolutions',
  volume: 12000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-resolution',
  tiers: [{
    min: 0,
    max: 5000,
    price: 0.99
  }, {
    min: 5000,
    max: 20000,
    price: 0.89
  }, {
    min: 20000,
    max: Infinity,
    price: 0.79
  }],
  cost: 0.35
}, {
  id: 'fin-ai-copilot',
  name: 'Fin AI Copilot',
  category: 'AI Services',
  basePrice: 29,
  unit: 'per seat/month',
  unitShort: 'seats',
  volume: 120,
  pricingType: 'Subscription',
  pricingMetric: 'per-seat',
  tiers: [{
    min: 0,
    max: 10,
    price: 29
  }, {
    min: 10,
    max: 50,
    price: 27
  }, {
    min: 50,
    max: Infinity,
    price: 25
  }],
  cost: 10
}, {
  id: 'proactive-messaging',
  name: 'Proactive Support Plus',
  category: 'Messaging',
  basePrice: 99,
  unit: 'per month (base)',
  unitShort: 'months',
  volume: 12,
  pricingType: 'Subscription',
  pricingMetric: 'base-subscription',
  tiers: [{
    min: 0,
    max: 12,
    price: 99
  }, {
    min: 12,
    max: 24,
    price: 95
  }, {
    min: 24,
    max: Infinity,
    price: 90
  }],
  cost: 35
}, {
  id: 'sms',
  name: 'SMS',
  category: 'Communication Channels',
  basePrice: 0.05,
  unit: 'per segment',
  unitShort: 'segments',
  volume: 60000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-segment',
  tiers: [{
    min: 0,
    max: 10000,
    price: 0.05
  }, {
    min: 10000,
    max: 50000,
    price: 0.045
  }, {
    min: 50000,
    max: Infinity,
    price: 0.04
  }],
  cost: 0.02
}, {
  id: 'whatsapp',
  name: 'WhatsApp',
  category: 'Communication Channels',
  basePrice: 0.06,
  unit: 'per conversation',
  unitShort: 'conversations',
  volume: 24000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-conversation',
  tiers: [{
    min: 0,
    max: 5000,
    price: 0.06
  }, {
    min: 5000,
    max: 20000,
    price: 0.055
  }, {
    min: 20000,
    max: Infinity,
    price: 0.05
  }],
  cost: 0.025
}, {
  id: 'phone',
  name: 'Phone (Fin Voice)',
  category: 'Communication Channels',
  basePrice: 0.0035,
  unit: 'per minute',
  unitShort: 'minutes',
  volume: 360000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-minute',
  tiers: [{
    min: 0,
    max: 100000,
    price: 0.0035
  }, {
    min: 100000,
    max: 500000,
    price: 0.003
  }, {
    min: 500000,
    max: Infinity,
    price: 0.0025
  }],
  cost: 0.001
}, {
  id: 'bulk-email',
  name: 'Bulk Email',
  category: 'Communication Channels',
  basePrice: 0.01,
  unit: 'per email',
  unitShort: 'emails',
  volume: 120000,
  pricingType: 'Usage-based',
  pricingMetric: 'per-email',
  tiers: [{
    min: 0,
    max: 50000,
    price: 0.01
  }, {
    min: 50000,
    max: 200000,
    price: 0.008
  }, {
    min: 200000,
    max: Infinity,
    price: 0.006
  }],
  cost: 0.003
}];
// Pricing guardrails
const pricingGuardrails = {
  marginBands: [{
    min: 0,
    max: 100000,
    minMargin: 0.4
  }, {
    min: 100000,
    max: 500000,
    minMargin: 0.35
  }, {
    min: 500000,
    max: 1000000,
    minMargin: 0.3
  }, {
    min: 1000000,
    max: Infinity,
    minMargin: 0.25
  }],
  contractTerms: [{
    months: 12,
    marginAdjustment: 0
  }, {
    months: 24,
    marginAdjustment: -0.02
  }, {
    months: 36,
    marginAdjustment: -0.05
  }],
  competitorAdjustments: {
    'Manual Processes': 0,
    'In-house Team': -0.02,
    'Competitor AI': -0.05
  },
  approvalLevels: [{
    threshold: 0.3,
    level: 'VP of Sales',
    color: 'red'
  }, {
    threshold: 0.11,
    level: 'Manager',
    color: 'amber'
  }, {
    threshold: 0,
    level: 'None',
    color: 'green'
  }]
};
// Deployment models
const deploymentModels = [{
  id: 'poc-production',
  name: 'POC → Production',
  description: '2-month POC followed by full production rollout'
}, {
  id: 'annual-commitment',
  name: 'Annual Commitment',
  description: 'Standard 12-month contract with monthly billing'
}, {
  id: 'annual-drawdown',
  name: 'Annual Pool with Drawdown',
  description: 'Annual volume commitment with monthly drawdown'
}, {
  id: 'multi-year',
  name: 'Multi-Year Contract',
  description: '2-3 year commitment with additional discounts'
}];
// AI development seasonality patterns
const seasonalityPatterns = [{
  id: 'standard',
  name: 'Standard Distribution',
  distribution: [25, 25, 25, 25]
}, {
  id: 'model-training',
  name: 'Model Training Cycle',
  distribution: [15, 35, 35, 15]
}, {
  id: 'product-launch',
  name: 'Product Launch',
  distribution: [20, 20, 25, 35]
}, {
  id: 'research-cycle',
  name: 'Research Cycle',
  distribution: [22, 28, 28, 22]
}];
// Pricing metrics options
const pricingMetrics = [{
  id: 'per-seat',
  name: 'Per Seat/Month',
  icon: Users,
  description: 'Fixed monthly fee per agent or user seat',
  defaultFor: ['platform-essential', 'platform-advanced', 'platform-expert', 'fin-ai-copilot']
}, {
  id: 'per-resolution',
  name: 'Per Resolution',
  icon: Check,
  description: 'Pay per successful AI-resolved conversation',
  defaultFor: ['fin-ai-agent']
}, {
  id: 'per-segment',
  name: 'Per Message Segment',
  icon: MessageSquare,
  description: 'Pay per SMS segment sent or received',
  defaultFor: ['sms']
}, {
  id: 'per-conversation',
  name: 'Per 24-hour Conversation',
  icon: MessageSquare,
  description: 'Pay per WhatsApp conversation window',
  defaultFor: ['whatsapp']
}, {
  id: 'per-minute',
  name: 'Per Minute',
  icon: Phone,
  description: 'Pay per minute of voice call',
  defaultFor: ['phone']
}, {
  id: 'per-email',
  name: 'Per Email Sent',
  icon: Mail,
  description: 'Pay per bulk email sent',
  defaultFor: ['bulk-email']
}, {
  id: 'base-subscription',
  name: 'Base Subscription',
  icon: DollarSign,
  description: 'Fixed monthly base fee with included usage',
  defaultFor: ['proactive-messaging']
}];
// Get pricing metric display name
const getPricingMetricName = (metricId: string) => {
  switch (metricId) {
    case 'per-seat':
      return 'Per Seat/Month';
    case 'per-resolution':
      return 'Per Resolution';
    case 'per-segment':
      return 'Per Message Segment';
    case 'per-conversation':
      return 'Per 24-hour Conversation';
    case 'per-minute':
      return 'Per Minute';
    case 'per-email':
      return 'Per Email Sent';
    case 'base-subscription':
      return 'Base Subscription';
    default:
      return metricId;
  }
};
export function VolumeAndPricingStep() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // Read configuration from URL params
  const customerType = searchParams.get('type') || '';
  const customIndustryName = searchParams.get('customName') || '';
  const coreServices = searchParams.get('core')?.split(',') || [];
  const selectedUseCases = searchParams.get('useCases')?.split(',').filter(Boolean) || [];
  const productsParam = searchParams.get('products') || '';
  // Parse products with their pricing metrics
  const configuredProducts = productsParam.split(',').filter(Boolean).map(item => {
    const [id, pricingMetric] = item.split(':');
    return {
      id,
      pricingMetric
    };
  });
  // Use default use case if none provided
  const defaultUseCase = 'default';
  const [activeUseCase, setActiveUseCase] = useState(selectedUseCases[0] || defaultUseCase);
  // Use case configurations - separate for each use case
  const [useCaseConfigs, setUseCaseConfigs] = useState<Record<string, {
    projectParams: typeof projectParams;
    saasConfig: typeof saasConfig;
    tableCalculations: typeof tableCalculations;
  }>>(() => {
    const configs: Record<string, any> = {};
    const useCasesToInitialize = selectedUseCases.length > 0 ? selectedUseCases : [defaultUseCase];
    useCasesToInitialize.forEach(useCase => {
      configs[useCase] = {
        projectParams: {
          workflows: 5,
          dataIntegrations: 3,
          sops: 2,
          teamSize: 'small',
          engagementLength: 12
        },
        saasConfig: {
          pricingModel: 'pay-as-you-go',
          activeUsers: 100,
          apiCalls: 50000,
          dataStorage: 500,
          dataThroughput: 1000
        },
        tableCalculations: {
          platformTotal: 0,
          projectTotal: 0,
          saasTotal: 0
        }
      };
    });
    return configs;
  });
  // State for pricing configuration
  const [contractTerm, setContractTerm] = useState(parseInt(searchParams.get('term') || '12'));
  const [competitor, setCompetitor] = useState('Manual Processes');
  const [deploymentModel, setDeploymentModel] = useState(searchParams.get('deploymentModel') || 'annual-commitment');
  const [billingCycle, setBillingCycle] = useState(searchParams.get('billingCycle') || 'monthly');
  // State for commercial terms
  const [subscriptionStartDate, setSubscriptionStartDate] = useState('');
  const [contractDuration, setContractDuration] = useState(12);
  const [billingFrequency, setBillingFrequency] = useState('monthly');
  const [paymentTerms, setPaymentTerms] = useState('net-30');
  // State for product pricing and volumes
  const [margins, setMargins] = useState<Record<string, number>>({});
  const [productVolumes, setProductVolumes] = useState<Record<string, number>>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  // State for view mode
  const [viewMode, setViewMode] = useState<'sales' | 'client'>('sales');
  // State for phase configuration
  const [selectedPhaseType, setSelectedPhaseType] = useState('annual-commitment');
  const [phases, setPhases] = useState([{
    name: 'POC',
    months: 2,
    discount: 100
  }, {
    name: 'Production',
    months: 12,
    discount: 0
  }]);
  // State for POC configuration
  const [pocEnabled, setPocEnabled] = useState(searchParams.get('poc') === 'true');
  const [showPocDrawer, setShowPocDrawer] = useState(false);
  const [pocMonths, setPocMonths] = useState(parseInt(searchParams.get('pocMonths') || '2'));
  const [pocProducts, setPocProducts] = useState<string[]>(searchParams.get('pocProducts') ? searchParams.get('pocProducts')!.split(',') : []);
  const [pocVolumes, setPocVolumes] = useState<Record<string, number>>({});
  const [pocPrices, setPocPrices] = useState<Record<string, number>>({});
  // State for seasonality
  const [selectedSeasonality, setSelectedSeasonality] = useState('standard');
  const [quarterDistribution, setQuarterDistribution] = useState([25, 25, 25, 25]);
  // State for ramp drawer
  const [rampDrawerOpen, setRampDrawerOpen] = useState(false);
  const [selectedRampProduct, setSelectedRampProduct] = useState<string | null>(null);
  // State for price tiers drawer
  const [showPriceTiersDrawer, setShowPriceTiersDrawer] = useState(false);
  const [selectedTierProduct, setSelectedTierProduct] = useState<string | null>(null);
  const [tierData, setTierData] = useState<Array<{
    qty: number;
    suggested: number;
    you: number;
  }>>([]);
  const [tierRows, setTierRows] = useState<Array<{
    tier: number;
    start: number;
    end: number | string;
    price: number;
  }>>([]);
  // State for discount percentages (0-90)
  const [discountPct, setDiscountPct] = useState<Record<string, number>>({});
  // State for Add Product drawer
  const [showAddProductDrawer, setShowAddProductDrawer] = useState(false);
  // State for platform plans expansion
  const [platformPlansExpanded, setPlatformPlansExpanded] = useState(true);
  // New state for accordion sections
  const [expandedSection, setExpandedSection] = useState<string | null>('platform');
  const [selectedPlans, setSelectedPlans] = useState<Array<{
    planId: string;
    quantity: number;
    discount: number;
  }>>([{
    planId: 'growth',
    quantity: 120,
    discount: 15
  }]);
  // Add separate state for outcome-based platform plans
  const [outcomeSelectedPlans, setOutcomeSelectedPlans] = useState<Array<{
    planId: string;
    quantity: number;
    discount: number;
  }>>([{
    planId: 'growth',
    quantity: 120,
    discount: 15
  }]);
  const [platformTier, setPlatformTier] = useState('growth');
  const [processScale, setProcessScale] = useState(5);
  const [projectParams, setProjectParams] = useState({
    workflows: 5,
    dataIntegrations: 3,
    sops: 2,
    teamSize: 'small',
    engagementLength: 12
  });
  const [saasConfig, setSaasConfig] = useState({
    pricingModel: 'pay-as-you-go',
    activeUsers: 100,
    apiCalls: 50000,
    dataStorage: 500,
    dataThroughput: 1000
  });
  const [outcomeMetrics, setOutcomeMetrics] = useState({
    speedGain: 2,
    throughputGain: 1.5,
    baselineCost: 100000,
    newCost: 60000,
    hoursSaved: 1000,
    costPerHour: 50,
    benchmarkAccuracy: 85,
    achievedAccuracy: 95
  });
  // Add state for outcome category selection
  const [outcomeCategories, setOutcomeCategories] = useState({
    efficiency: true,
    costSavings: true,
    laborSavings: true,
    accuracy: true
  });
  // Add state for pricing formula weights
  const [outcomeWeights, setOutcomeWeights] = useState({
    costSavingsWeight: 0.3,
    efficiencyWeight: 0.1,
    accuracyWeight: 0.05
  });
  const [expandedOutcome, setExpandedOutcome] = useState<string | null>(null);
  // Add state for outcome-based pricing toggle
  const [outcomeBasedEnabled, setOutcomeBasedEnabled] = useState(false);
  // Add state for outcome display mode
  const [outcomeDisplayMode, setOutcomeDisplayMode] = useState<'multiplier' | 'dollar'>('multiplier');
  // Add state to track table calculations
  const [tableCalculations, setTableCalculations] = useState({
    platformTotal: 0,
    projectTotal: 0,
    saasTotal: 0
  });
  // Utility functions - MUST be defined before other functions use them
  const money = (n: number) => Math.max(0, Math.round(n * 100) / 100);
  const approvalForDiscount = (pct: number | undefined): 'Manager' | 'VP of Sales' | 'CEO' => {
    const d = Math.max(0, Math.min(90, Number(pct) || 0));
    if (d <= 15) return 'Manager';
    if (d <= 30) return 'VP of Sales';
    return 'CEO';
  };
  // Update discount percentage
  const updateDiscountPct = (productId: string, value: number) => {
    const clamped = Math.max(0, Math.min(90, value));
    setDiscountPct({
      ...discountPct,
      [productId]: clamped
    });
  };
  // Get tiered price based on volume
  const getTieredPrice = (productId: string, volume: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    // Find the appropriate tier based on volume
    const tier = product.tiers.find(t => volume >= t.min && volume < t.max);
    return tier ? tier.price : product.basePrice;
  };
  // Initialize product volumes, margins, and discount percentages
  useEffect(() => {
    const customerType = searchParams.get('segment') || 'saas';
    const useCase = searchParams.get('primaryUseCase') || 'customer-support';
    let selectedProductIds: string[] = [];
    // Default products based on customer type
    if (customerType === 'saas') {
      selectedProductIds = ['platform-advanced', 'fin-ai-agent', 'fin-ai-copilot', 'sms', 'bulk-email'];
    } else if (customerType === 'ecommerce') {
      selectedProductIds = ['platform-essential', 'fin-ai-agent', 'sms', 'whatsapp'];
    } else if (customerType === 'fintech') {
      selectedProductIds = ['platform-expert', 'fin-ai-agent', 'fin-ai-copilot', 'sms', 'phone'];
    } else {
      selectedProductIds = ['platform-advanced', 'fin-ai-agent', 'sms'];
    }
    const initialVolumes: Record<string, number> = {};
    const initialMargins: Record<string, number> = {};
    const initialDiscounts: Record<string, number> = {};
    const filteredProducts = products.filter(product => selectedProductIds.includes(product.id));
    filteredProducts.forEach(product => {
      initialVolumes[product.id] = product.volume;
      initialMargins[product.id] = 0.15;
      initialDiscounts[product.id] = 15;
    });
    setProductVolumes(initialVolumes);
    setMargins(initialMargins);
    setDiscountPct(initialDiscounts);
    // Initialize POC products
    setPocProducts(['platform-advanced', 'fin-ai-agent']);
    const initialPocVolumes: Record<string, number> = {};
    const initialPocPrices: Record<string, number> = {};
    filteredProducts.forEach(product => {
      initialPocVolumes[product.id] = Math.round(product.volume * 0.1);
      initialPocPrices[product.id] = 0;
    });
    setPocVolumes(initialPocVolumes);
    setPocPrices(initialPocPrices);
    if (filteredProducts.length > 0) {
      initializeTierData(filteredProducts[0].id);
    }
  }, []);
  // Initialize tier data
  const initializeTierData = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const initialTierData = product.tiers.map(tier => ({
      qty: tier.min,
      suggested: tier.price * 1.1,
      you: tier.price
    }));
    const initialTierRows = product.tiers.map((tier, index) => ({
      tier: index + 1,
      start: tier.min,
      end: tier.max === Infinity ? '∞' : tier.max,
      price: tier.price
    }));
    setTierData(initialTierData);
    setTierRows(initialTierRows);
  };
  // Update tier price
  const updateTierPrice = (index: number, price: number) => {
    const newTierRows = [...tierRows];
    newTierRows[index].price = price;
    setTierRows(newTierRows);
    const newTierData = [...tierData];
    newTierData[index].you = price;
    setTierData(newTierData);
  };
  // Handle POC toggle
  const togglePoc = () => {
    const newPocEnabled = !pocEnabled;
    setPocEnabled(newPocEnabled);
    if (newPocEnabled) {
      setDeploymentModel('poc-production');
      setContractTerm(12 + pocMonths);
    } else {
      setDeploymentModel('annual-commitment');
      setContractTerm(12);
    }
  };
  // Calculate min margin
  const getMinMargin = () => {
    const totalValue = calculateTotalValue();
    const band = pricingGuardrails.marginBands.find(band => totalValue >= band.min && totalValue < band.max) || pricingGuardrails.marginBands[0];
    const termAdjustment = pricingGuardrails.contractTerms.find(term => term.months === contractTerm)?.marginAdjustment || 0;
    const competitorAdjustment = pricingGuardrails.competitorAdjustments[competitor] || 0;
    return band.minMargin + termAdjustment + competitorAdjustment;
  };
  // Calculate total value
  const calculateTotalValue = () => {
    let total = 0;
    products.forEach(product => {
      const margin = margins[product.id] || 0;
      const volume = productVolumes[product.id] || product.volume;
      const discountedPrice = product.basePrice * (1 - margin);
      total += discountedPrice * volume;
    });
    if (pocEnabled) {
      pocProducts.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          const pocVolume = pocVolumes[productId] || 0;
          const pocPrice = pocPrices[productId] || 0;
          const regularPrice = product.basePrice * (1 - (margins[productId] || 0));
          const discount = regularPrice - pocPrice;
          total -= discount * pocVolume;
        }
      });
    }
    return total;
  };
  // Calculate total margin
  const calculateTotalMargin = () => {
    let totalRevenue = 0;
    let totalCost = 0;
    products.forEach(product => {
      const margin = margins[product.id] || 0;
      const volume = productVolumes[product.id] || product.volume;
      const discountedPrice = product.basePrice * (1 - margin);
      totalRevenue += discountedPrice * volume;
      totalCost += product.cost * volume;
    });
    if (pocEnabled) {
      pocProducts.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (product) {
          const pocVolume = pocVolumes[productId] || 0;
          const pocPrice = pocPrices[productId] || 0;
          totalRevenue -= (product.basePrice * (1 - (margins[productId] || 0)) - pocPrice) * pocVolume;
        }
      });
    }
    return totalRevenue - totalCost;
  };
  // Calculate average margin percentage
  const calculateAverageMarginPercentage = () => {
    const totalRevenue = calculateTotalValue();
    const totalMargin = calculateTotalMargin();
    return totalRevenue > 0 ? totalMargin / totalRevenue : 0;
  };
  // Update margin
  const updateMargin = (productId: string, margin: number) => {
    setMargins({
      ...margins,
      [productId]: margin
    });
  };
  // Update volume
  const updateVolume = (productId: string, volume: number) => {
    setProductVolumes({
      ...productVolumes,
      [productId]: volume
    });
  };
  // Update volume with phases
  const updateVolumeWithPhases = (productId: string, phaseVolumes: {
    [key: string]: number;
  }) => {
    const totalVolume = Object.values(phaseVolumes).reduce((sum, vol) => sum + vol, 0);
    updateVolume(productId, totalVolume);
  };
  // Toggle product expansion
  const toggleProductExpansion = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };
  // Get approval level based on discount percentage
  const getApprovalLevel = (productId: string) => {
    const discount = discountPct[productId] || 0;
    const level = approvalForDiscount(discount);
    if (level === 'CEO') {
      return {
        level: 'CEO',
        color: 'red',
        threshold: 30
      };
    }
    if (level === 'VP of Sales') {
      return {
        level: 'VP of Sales',
        color: 'amber-dark',
        threshold: 15
      };
    }
    return {
      level: 'Manager',
      color: 'amber',
      threshold: 0
    };
  };
  // Check if requires approval
  const requiresApproval = () => {
    return Object.entries(margins).some(([productId, margin]) => {
      return margin >= pricingGuardrails.approvalLevels[1].threshold;
    });
  };
  // Get highest approval level
  const getHighestApprovalLevel = () => {
    if (!requiresApproval()) return null;
    let highestLevel = pricingGuardrails.approvalLevels[pricingGuardrails.approvalLevels.length - 1];
    products.forEach(product => {
      const margin = margins[product.id] || 0;
      for (const level of pricingGuardrails.approvalLevels) {
        if (margin >= level.threshold && level.threshold > highestLevel.threshold) {
          highestLevel = level;
          break;
        }
      }
    });
    return highestLevel;
  };
  // Calculate monthly value
  const calculateMonthlyValue = () => {
    return calculateTotalValue() / contractTerm;
  };
  // Get effective price (quote price) - uses tiered pricing by default
  const getEffectivePrice = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const volume = productVolumes[productId] || product.volume;
    const margin = margins[productId];
    // If margin is explicitly set (user has manually adjusted price), use it
    if (margin !== undefined && margin !== null && margin !== 0.15) {
      return money(product.basePrice * (1 - margin));
    }
    // Otherwise, use tiered pricing based on volume
    const tieredPrice = getTieredPrice(productId, volume);
    const discount = discountPct[productId] || 0;
    return money(tieredPrice * (1 - discount / 100));
  };
  // Get product total
  const getProductTotal = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const volume = productVolumes[productId] || product.volume;
    return getEffectivePrice(productId) * volume;
  };
  // Get monthly revenue using quote price or suggested price
  const getMonthlyRevenue = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const volume = productVolumes[productId] || product.volume;
    // Use effective price (quote price if set, otherwise suggested price)
    const price = getEffectivePrice(productId);
    const rawMonthlyVolume = volume / 12;
    const roundingFactor = rawMonthlyVolume < 1000 ? 10 : 100;
    const monthlyVolume = Math.round(rawMonthlyVolume / roundingFactor) * roundingFactor;
    const monthlyRevenue = monthlyVolume * price;
    if (pocEnabled && pocProducts.includes(productId)) {
      const rawPocMonthlyVolume = (pocVolumes[productId] || 0) / pocMonths;
      const pocRoundingFactor = rawPocMonthlyVolume < 1000 ? 10 : 100;
      const pocMonthlyVolume = Math.round(rawPocMonthlyVolume / pocRoundingFactor) * pocRoundingFactor;
      const pocPrice = pocPrices[productId] || 0;
      const regularPrice = getEffectivePrice(productId);
      const pocDiscount = pocMonthlyVolume * (regularPrice - pocPrice);
      const pocAdjustment = pocDiscount * (pocMonths / contractTerm);
      return monthlyRevenue - pocAdjustment;
    }
    return monthlyRevenue;
  };
  // Get margin status color
  const getMarginStatusColor = (productId: string) => {
    const margin = margins[productId] || 0;
    if (margin >= pricingGuardrails.approvalLevels[0].threshold) return 'red';
    if (margin >= pricingGuardrails.approvalLevels[1].threshold) return 'amber';
    return 'green';
  };
  // Get discount percentage
  const getDiscountPercentage = (productId: string) => {
    const margin = margins[productId] || 0;
    return margin * 100;
  };
  // Open ramp drawer
  const openRampDrawer = (productId: string) => {
    setSelectedRampProduct(productId);
    setRampDrawerOpen(true);
  };
  // Open price tiers drawer
  const openPriceTiersDrawer = (productId: string) => {
    setSelectedTierProduct(productId);
    initializeTierData(productId);
    setShowPriceTiersDrawer(true);
  };
  // Toggle POC product
  const togglePocProduct = (productId: string) => {
    if (pocProducts.includes(productId)) {
      setPocProducts(pocProducts.filter(id => id !== productId));
    } else {
      setPocProducts([...pocProducts, productId]);
    }
  };
  // Update POC volume
  const updatePocVolume = (productId: string, volume: number) => {
    setPocVolumes({
      ...pocVolumes,
      [productId]: volume
    });
  };
  // Update POC price
  const updatePocPrice = (productId: string, price: number) => {
    setPocPrices({
      ...pocPrices,
      [productId]: price
    });
  };
  // Get product name
  const getProductName = (id: string) => {
    const product = products.find(p => p.id === id);
    return product ? product.name : id;
  };
  // Get suggested price based on list rate and discount percentage
  const getSuggestedPrice = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const discount = discountPct[productId] || 0;
    return money(product.basePrice * (1 - discount / 100));
  };
  // Get suggested discount percentage
  const getSuggestedDiscountPercentage = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const suggestedPrice = getSuggestedPrice(productId);
    return Math.round((product.basePrice - suggestedPrice) / product.basePrice * 100);
  };
  // Calculate suggested minimum
  const calculateSuggestedMinimum = () => {
    const monthlyRev = calculateMonthlyValue();
    return Math.round(monthlyRev * (minimumPercentage / 100));
  };
  // Update quote minimum
  const updateQuoteMinimum = (amount: number) => {
    setQuoteMinimum(amount);
  };
  // Calculate percent of revenue
  const calculatePercentOfRevenue = () => {
    return Math.round(quoteMinimum / monthlyValue * 100);
  };
  // Calculate annually contracted revenue
  const calculateAnnuallyContractedRevenue = () => {
    return monthlyMinimumEnabled ? quoteMinimum * 12 : 0;
  };
  // Add product to quote
  const addProductToQuote = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    setProductVolumes({
      ...productVolumes,
      [productId]: product.volume
    });
    setMargins({
      ...margins,
      [productId]: 0.15
    });
    setDiscountPct({
      ...discountPct,
      [productId]: 15
    });
  };
  // Remove product from quote
  const removeProductFromQuote = (productId: string) => {
    const newVolumes = {
      ...productVolumes
    };
    const newMargins = {
      ...margins
    };
    const newDiscounts = {
      ...discountPct
    };
    delete newVolumes[productId];
    delete newMargins[productId];
    delete newDiscounts[productId];
    setProductVolumes(newVolumes);
    setMargins(newMargins);
    setDiscountPct(newDiscounts);
  };
  // Calculate metrics
  const totalValue = calculateTotalValue();
  const monthlyValue = calculateMonthlyValue();
  const totalMargin = calculateTotalMargin();
  const averageMarginPercentage = calculateAverageMarginPercentage();
  const minMargin = getMinMargin();
  const highestApprovalLevel = getHighestApprovalLevel();
  // Calculate total months
  const totalMonths = phases.reduce((sum, phase) => sum + phase.months, 0);
  // Generate revenue data
  const generateRevenueData = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return [];
    const volume = productVolumes[productId] || product.volume;
    const price = getEffectivePrice(productId);
    const monthlyVolume = volume / 12;
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push({
        month: `M${i + 1}`,
        revenue: Math.round(monthlyVolume * price)
      });
    }
    return data;
  };
  // Generate terms chart data
  const generateTermsChartData = () => {
    const data = [];
    let cumulative = 0;
    if (pocEnabled) {
      for (let i = 0; i < pocMonths; i++) {
        const monthRevenue = pocProducts.reduce((sum, productId) => {
          const pocVolume = pocVolumes[productId] || 0;
          const pocPrice = pocPrices[productId] || 0;
          return sum + pocVolume / pocMonths * pocPrice;
        }, 0);
        cumulative += monthRevenue;
        data.push({
          month: `M${i + 1}`,
          revenue: Math.round(monthRevenue),
          cumulative: Math.round(cumulative),
          phase: 'POC'
        });
      }
      const remainingMonths = contractTerm - pocMonths;
      const monthlyRevenue = (totalValue - cumulative) / remainingMonths;
      for (let i = 0; i < remainingMonths; i++) {
        cumulative += monthlyRevenue;
        data.push({
          month: `M${pocMonths + i + 1}`,
          revenue: Math.round(monthlyRevenue),
          cumulative: Math.round(cumulative),
          phase: 'Production'
        });
      }
    } else {
      const monthlyRevenue = totalValue / contractTerm;
      for (let i = 0; i < contractTerm; i++) {
        cumulative += monthlyRevenue;
        data.push({
          month: `M${i + 1}`,
          revenue: Math.round(monthlyRevenue),
          cumulative: Math.round(cumulative),
          phase: 'Standard'
        });
      }
    }
    return data;
  };
  // Generate summary chart data
  const generateSummaryChartData = () => {
    const data = [];
    const categories: Record<string, number> = {};
    products.forEach(product => {
      const volume = productVolumes[product.id] || product.volume;
      const price = getEffectivePrice(product.id);
      const total = volume * price;
      if (categories[product.category]) {
        categories[product.category] += total;
      } else {
        categories[product.category] = total;
      }
    });
    Object.entries(categories).forEach(([category, value]) => {
      data.push({
        name: category,
        value: Math.round(value)
      });
    });
    return data;
  };
  const summaryChartData = generateSummaryChartData();
  const termsChartData = generateTermsChartData();
  const companyName = searchParams.get('company') || 'Customer';
  // Calculate Platform Fee - now accounts for months
  const calculatePlatformFee = () => {
    return selectedPlans.reduce((total, plan) => {
      const platformPlan = [{
        id: 'essential',
        listRate: 29
      }, {
        id: 'growth',
        listRate: 75
      }, {
        id: 'enterprise',
        listRate: 132
      }].find(p => p.id === plan.planId);
      if (!platformPlan) return total;
      const discount = isNaN(plan.discount) ? 0 : plan.discount;
      const quantity = isNaN(plan.quantity) ? 0 : plan.quantity;
      const months = isNaN(plan.months) ? 12 : plan.months;
      const discountedPrice = platformPlan.listRate * (1 - discount / 100);
      return total + discountedPrice * quantity * months;
    }, 0);
  };
  // Calculate Outcome-Based Platform Fee
  const calculateOutcomePlatformFee = () => {
    return outcomeSelectedPlans.reduce((total, plan) => {
      const platformPlan = [{
        id: 'essential',
        listRate: 29
      }, {
        id: 'growth',
        listRate: 75
      }, {
        id: 'enterprise',
        listRate: 132
      }].find(p => p.id === plan.planId);
      if (!platformPlan) return total;
      const discountedPrice = platformPlan.listRate * (1 - plan.discount / 100);
      return total + discountedPrice * plan.quantity;
    }, 0);
  };
  // Calculate Project Fee
  const calculateProjectFee = () => {
    const workflowCost = projectParams.workflows * 500;
    const integrationCost = projectParams.dataIntegrations * 1000;
    const sopCost = projectParams.sops * 750;
    const teamMultiplier = {
      small: 1,
      medium: 1.5,
      large: 2
    }[projectParams.teamSize];
    const lengthDiscount = projectParams.engagementLength >= 12 ? 0.9 : 1;
    return Math.round((workflowCost + integrationCost + sopCost) * teamMultiplier * lengthDiscount);
  };
  // Calculate SaaS Fee
  const calculateSaasFee = () => {
    if (saasConfig.pricingModel === 'enterprise') {
      return 5000 + saasConfig.activeUsers * 10;
    }
    const userCost = saasConfig.activeUsers * 15;
    const apiCost = saasConfig.apiCalls / 1000 * 0.5;
    const storageCost = saasConfig.dataStorage * 0.1;
    return Math.round(userCost + apiCost + storageCost);
  };
  // Calculate ROI
  const calculateROI = () => {
    const totalCost = calculateTotalEstimate();
    const costSavings = outcomeMetrics.baselineCost - outcomeMetrics.newCost;
    const laborSavings = outcomeMetrics.hoursSaved * outcomeMetrics.costPerHour;
    const totalBenefit = costSavings + laborSavings;
    return totalCost > 0 ? (totalBenefit / totalCost * 100).toFixed(0) : 0;
  };
  // Toggle section
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  // Calculate base fees (Platform + Project + SaaS)
  const calculateBaseFees = () => {
    // Use table calculations if available, otherwise use component calculations
    if (tableCalculations.platformTotal > 0 || tableCalculations.projectTotal > 0 || tableCalculations.saasTotal > 0) {
      return tableCalculations.platformTotal + tableCalculations.projectTotal + tableCalculations.saasTotal;
    }
    return calculatePlatformFee() + calculateProjectFee() + calculateSaasFee();
  };
  // Calculate Outcome Multiplier (as a percentage, e.g., 0.15 for 15%)
  const calculateOutcomeMultiplier = () => {
    if (!outcomeBasedEnabled) return 0;
    const baseFees = calculateBaseFees();
    let multiplier = 0;
    // Efficiency contribution
    if (outcomeCategories.efficiency) {
      const efficiencyIndex = outcomeMetrics.speedGain * 0.5 + outcomeMetrics.throughputGain * 0.5;
      multiplier += efficiencyIndex * outcomeWeights.efficiencyWeight;
    }
    // Cost savings contribution (as percentage of base fees)
    if (outcomeCategories.costSavings && baseFees > 0) {
      const costSavings = outcomeMetrics.baselineCost - outcomeMetrics.newCost;
      multiplier += costSavings / baseFees * outcomeWeights.costSavingsWeight;
    }
    // Labor savings contribution (as percentage of base fees)
    if (outcomeCategories.laborSavings && baseFees > 0) {
      const laborROI = outcomeMetrics.hoursSaved * outcomeMetrics.costPerHour;
      multiplier += laborROI / baseFees * 0.3;
    }
    // Accuracy contribution
    if (outcomeCategories.accuracy) {
      const accuracyBonus = (outcomeMetrics.achievedAccuracy - outcomeMetrics.benchmarkAccuracy) / 100;
      multiplier += accuracyBonus * outcomeWeights.accuracyWeight;
    }
    return multiplier;
  };
  // Calculate Outcome Fee (dollar amount of the adjustment)
  const calculateOutcomeFee = () => {
    const baseFees = calculateBaseFees();
    const multiplier = calculateOutcomeMultiplier();
    return Math.round(baseFees * multiplier);
  };
  // Calculate Total Estimate with outcome multiplier
  const calculateTotalEstimate = () => {
    const baseFees = calculateBaseFees();
    const multiplier = calculateOutcomeMultiplier();
    return Math.round(baseFees * (1 + multiplier));
  };
  const totalEstimate = calculateTotalEstimate();
  const platformFee = calculatePlatformFee();
  const projectFee = calculateProjectFee();
  const saasFee = calculateSaasFee();
  const baseFees = calculateBaseFees();
  const outcomeMultiplier = calculateOutcomeMultiplier();
  const outcomeFee = calculateOutcomeFee();
  const roi = calculateROI();
  // Chart data for summary
  const costBreakdownChartData = [{
    name: 'Platform',
    value: platformFee,
    color: '#ff6b35'
  }, {
    name: 'Project',
    value: projectFee,
    color: '#4ecdc4'
  }, {
    name: 'SaaS',
    value: saasFee,
    color: '#45b7d1'
  }, {
    name: 'Outcome',
    value: outcomeFee,
    color: '#f7b731'
  }];
  // Update project param
  const updateProjectParam = (param: string, value: number) => {
    setProjectParams({
      ...projectParams,
      [param]: value
    });
  };
  // Update saas config
  const updateSaasConfig = (param: string, value: number) => {
    setSaasConfig({
      ...saasConfig,
      [param]: value
    });
  };
  // Update handlers to work with active use case
  const updateProjectParamForUseCase = (param: string, value: number) => {
    setUseCaseConfigs(prev => ({
      ...prev,
      [activeUseCase]: {
        ...prev[activeUseCase],
        projectParams: {
          ...prev[activeUseCase].projectParams,
          [param]: value
        }
      }
    }));
  };
  const updateSaasConfigForUseCase = (param: string, value: number) => {
    setUseCaseConfigs(prev => ({
      ...prev,
      [activeUseCase]: {
        ...prev[activeUseCase],
        saasConfig: {
          ...prev[activeUseCase].saasConfig,
          [param]: value
        }
      }
    }));
  };
  const handleTableCalculationsUpdateForUseCase = (calculations: {
    platformTotal: number;
    projectTotal: number;
    saasTotal: number;
  }) => {
    setUseCaseConfigs(prev => ({
      ...prev,
      [activeUseCase]: {
        ...prev[activeUseCase],
        tableCalculations: calculations
      }
    }));
  };
  // Get current use case config with fallback
  const currentConfig = useCaseConfigs[activeUseCase] || useCaseConfigs[defaultUseCase] || {
    projectParams: {
      workflows: 5,
      dataIntegrations: 3,
      sops: 2,
      teamSize: 'small',
      engagementLength: 12
    },
    saasConfig: {
      pricingModel: 'pay-as-you-go',
      activeUsers: 100,
      apiCalls: 50000,
      dataStorage: 500,
      dataThroughput: 1000
    },
    tableCalculations: {
      platformTotal: 0,
      projectTotal: 0,
      saasTotal: 0
    }
  };
  const currentProjectParams = currentConfig.projectParams;
  const currentSaasConfig = currentConfig.saasConfig;
  const currentTableCalculations = currentConfig.tableCalculations;
  // Calculate aggregated totals across all use cases
  const calculateAggregatedTotals = () => {
    let totalPlatform = 0;
    let totalProject = 0;
    let totalSaas = 0;
    Object.values(useCaseConfigs).forEach(config => {
      totalPlatform += config.tableCalculations.platformTotal || calculatePlatformFee();
      totalProject += config.tableCalculations.projectTotal || calculateProjectFee();
      totalSaas += config.tableCalculations.saasTotal || calculateSaasFee();
    });
    return {
      platformTotal: totalPlatform,
      projectTotal: totalProject,
      saasTotal: totalSaas,
      baseFees: totalPlatform + totalProject + totalSaas
    };
  };
  const aggregatedTotals = calculateAggregatedTotals();
  // Use case metadata
  const useCaseMetadata: Record<string, {
    name: string;
    icon: string;
  }> = {
    'rag-pipeline': {
      name: 'RAG Pipeline Optimization',
      icon: '🗄️'
    },
    'seo-content': {
      name: 'SEO Content Optimization',
      icon: '📈'
    },
    'ai-red-teaming': {
      name: 'AI Red-Teaming',
      icon: '🛡️'
    },
    'llm-training': {
      name: 'LLM Training Acceleration',
      icon: '⚡'
    },
    'synthetic-data': {
      name: 'Synthetic Data Generation',
      icon: '🧬'
    }
  };
  // Redirect back if no configuration exists
  useEffect(() => {
    if (!customerType || coreServices.length === 0) {
      navigate('/configure');
    }
  }, [customerType, coreServices, navigate]);
  return <div className="w-full bg-white">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            Intercom
          </Link>
          <ArrowRight size={12} />
          <Link to="/configure" className="hover:text-gray-700">
            Configure
          </Link>
          <ArrowRight size={12} />
          <span className="font-medium text-black">Volume & Pricing</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold mb-1">Pricing Calculator</h1>
            <p className="text-sm text-gray-500">
              Configure your custom automation solution
            </p>
          </div>
          <div className="flex items-center gap-2">
            {viewMode === 'client' && <button className="flex items-center gap-1 px-2 py-1 border border-gray-200 rounded-md text-sm">
                <Share2 size={14} />
                <span>Share link</span>
              </button>}
            <div className="flex rounded-md overflow-hidden border border-gray-200">
              <button className={`px-2 py-1 text-sm ${viewMode === 'sales' ? 'bg-gray-100 font-medium' : 'bg-white'}`} onClick={() => setViewMode('sales')}>
                Sales
              </button>
              <button className={`px-2 py-1 text-sm ${viewMode === 'client' ? 'bg-gray-100 font-medium' : 'bg-white'}`} onClick={() => setViewMode('client')}>
                Client
              </button>
            </div>
          </div>
        </div>
        {/* Use Case Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <div className="flex gap-1 overflow-x-auto">
            {selectedUseCases.map(useCase => <button key={useCase} onClick={() => setActiveUseCase(useCase)} className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeUseCase === useCase ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                {useCaseMetadata[useCase]?.name || useCase}
              </button>)}
          </div>
        </div>
        {/* Show active use case name if multiple tabs */}
        {selectedUseCases.length > 1 && <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Info size={14} className="text-blue-600" />
              <span className="text-blue-900">
                Configuring pricing for:{' '}
                <strong>{useCaseMetadata[activeUseCase]?.name}</strong>
              </span>
            </div>
          </div>}
        {viewMode === 'sales' ? <div className="space-y-3">
            {/* Outcome-Based Pricing Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-sm">
                  Outcome-Based Pricing Multiplier
                </h3>
                <p className="text-xs text-gray-500">
                  Apply performance-based multiplier on top of base fees
                </p>
              </div>
              <button onClick={() => {
            const newValue = !outcomeBasedEnabled;
            setOutcomeBasedEnabled(newValue);
            if (newValue) {
              setExpandedSection('outcome');
            }
          }} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${outcomeBasedEnabled ? 'bg-black' : 'bg-gray-300'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${outcomeBasedEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            {/* Unified Pricing Table */}
            <PricingCategoriesTable platformFee={platformFee} projectFee={projectFee} saasFee={saasFee} selectedPlans={selectedPlans} projectParams={projectParams} saasConfig={saasConfig} outcomeBasedEnabled={outcomeBasedEnabled} outcomeCategories={outcomeCategories} outcomeMetrics={outcomeMetrics} outcomeWeights={outcomeWeights} outcomeSelectedPlans={outcomeSelectedPlans} outcomeBaseFee={baseFees} outcomePerformanceBonus={outcomeFee} outcomeFee={outcomeFee} roi={roi} onUpdateSelectedPlans={setSelectedPlans} onUpdateProjectParam={updateProjectParamForUseCase} onUpdateSaasConfig={updateSaasConfigForUseCase} onUpdateOutcomeCategories={setOutcomeCategories} onUpdateOutcomeMetrics={setOutcomeMetrics} onUpdateOutcomeWeights={setOutcomeWeights} onUpdateOutcomeSelectedPlans={setOutcomeSelectedPlans} onCalculationsUpdate={handleTableCalculationsUpdateForUseCase} />
            {/* Outcome-Based Adjustment Section - Show when toggle is ON */}
            {outcomeBasedEnabled && <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button className="w-full bg-gray-50 px-3 py-2 flex items-center justify-between hover:bg-gray-100 transition-colors" onClick={() => toggleSection('outcome')}>
                  <div className="flex items-center gap-2">
                    <ChevronRight size={16} className={`transition-transform ${expandedSection === 'outcome' ? 'rotate-90' : ''}`} />
                    <div className="text-left">
                      <h3 className="font-medium text-sm">
                        Outcome-Based Performance Multiplier
                      </h3>
                      <p className="text-xs text-gray-500">
                        Performance-based adjustment applied to base fees
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <button onClick={e => {
                  e.stopPropagation();
                  setOutcomeDisplayMode(outcomeDisplayMode === 'multiplier' ? 'dollar' : 'multiplier');
                }} className="text-xs text-gray-600 hover:text-gray-900 underline">
                        Switch to{' '}
                        {outcomeDisplayMode === 'multiplier' ? '$' : '×'}
                      </button>
                    </div>
                    <div className="text-sm font-semibold">
                      {outcomeDisplayMode === 'multiplier' ? <>×{(1 + outcomeMultiplier).toFixed(2)}</> : <>+${outcomeFee.toLocaleString()}</>}
                    </div>
                    <div className="text-xs text-gray-500">
                      {(outcomeMultiplier * 100).toFixed(1)}% premium
                    </div>
                  </div>
                </button>
                {expandedSection === 'outcome' && <div className="p-4 bg-white">
                    {/* Formula Display */}
                    <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs font-medium text-gray-700 mb-1">
                        Pricing Formula
                      </div>
                      <div className="text-sm font-mono font-semibold text-gray-900">
                        Total = Base × (1 + Outcome %)
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        ${baseFees.toLocaleString()} ×{' '}
                        {(1 + outcomeMultiplier).toFixed(2)} = $
                        {totalEstimate.toLocaleString()}
                      </div>
                    </div>
                    {/* Outcome Metrics Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase w-8"></th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              CATEGORY
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              METRIC 1
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              METRIC 2
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              CONTRIBUTION
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              WEIGHT
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* Efficiency Gains */}
                          <tr>
                            <td className="px-3 py-2">
                              <input type="checkbox" checked={outcomeCategories.efficiency} onChange={e => setOutcomeCategories({
                        ...outcomeCategories,
                        efficiency: e.target.checked
                      })} className="h-4 w-4 text-black rounded border-gray-300" />
                            </td>
                            <td className="px-3 py-2 text-sm font-medium">
                              Efficiency Gains
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" step="0.1" value={outcomeMetrics.speedGain} onChange={e => setOutcomeMetrics({
                          ...outcomeMetrics,
                          speedGain: parseFloat(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" disabled={!outcomeCategories.efficiency} />
                                <div className="text-xs text-gray-500">
                                  Speed Gain (×)
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" step="0.1" value={outcomeMetrics.throughputGain} onChange={e => setOutcomeMetrics({
                          ...outcomeMetrics,
                          throughputGain: parseFloat(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" disabled={!outcomeCategories.efficiency} />
                                <div className="text-xs text-gray-500">
                                  Throughput Gain (×)
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {outcomeCategories.efficiency ? `+${((outcomeMetrics.speedGain * 0.5 + outcomeMetrics.throughputGain * 0.5) * outcomeWeights.efficiencyWeight * 100).toFixed(1)}%` : '—'}
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" step="0.01" min="0" max="1" value={outcomeWeights.efficiencyWeight} onChange={e => setOutcomeWeights({
                          ...outcomeWeights,
                          efficiencyWeight: parseFloat(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" />
                                <div className="text-xs text-gray-500">
                                  Multiplier
                                </div>
                              </div>
                            </td>
                          </tr>
                          {/* Cost Savings */}
                          <tr>
                            <td className="px-3 py-2">
                              <input type="checkbox" checked={outcomeCategories.costSavings} onChange={e => setOutcomeCategories({
                        ...outcomeCategories,
                        costSavings: e.target.checked
                      })} className="h-4 w-4 text-black rounded border-gray-300" />
                            </td>
                            <td className="px-3 py-2 text-sm font-medium">
                              Cost Savings
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" value={outcomeMetrics.baselineCost} onChange={e => setOutcomeMetrics({
                          ...outcomeMetrics,
                          baselineCost: parseInt(e.target.value) || 0
                        })} className="w-28 px-2 py-1 border border-gray-300 rounded-md text-xs" disabled={!outcomeCategories.costSavings} />
                                <div className="text-xs text-gray-500">
                                  Baseline Cost ($)
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" value={outcomeMetrics.newCost} onChange={e => setOutcomeMetrics({
                          ...outcomeMetrics,
                          newCost: parseInt(e.target.value) || 0
                        })} className="w-28 px-2 py-1 border border-gray-300 rounded-md text-xs" disabled={!outcomeCategories.costSavings} />
                                <div className="text-xs text-gray-500">
                                  New Cost ($)
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {outcomeCategories.costSavings && baseFees > 0 ? `+${((outcomeMetrics.baselineCost - outcomeMetrics.newCost) / baseFees * outcomeWeights.costSavingsWeight * 100).toFixed(1)}%` : '—'}
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" step="0.01" min="0" max="1" value={outcomeWeights.costSavingsWeight} onChange={e => setOutcomeWeights({
                          ...outcomeWeights,
                          costSavingsWeight: parseFloat(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" />
                                <div className="text-xs text-gray-500">
                                  % of savings
                                </div>
                              </div>
                            </td>
                          </tr>
                          {/* Labor & Time Savings */}
                          <tr>
                            <td className="px-3 py-2">
                              <input type="checkbox" checked={outcomeCategories.laborSavings} onChange={e => setOutcomeCategories({
                        ...outcomeCategories,
                        laborSavings: e.target.checked
                      })} className="h-4 w-4 text-black rounded border-gray-300" />
                            </td>
                            <td className="px-3 py-2 text-sm font-medium">
                              Labor & Time Savings
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" value={outcomeMetrics.hoursSaved} onChange={e => setOutcomeMetrics({
                          ...outcomeMetrics,
                          hoursSaved: parseInt(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" disabled={!outcomeCategories.laborSavings} />
                                <div className="text-xs text-gray-500">
                                  Hours Saved
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" value={outcomeMetrics.costPerHour} onChange={e => setOutcomeMetrics({
                          ...outcomeMetrics,
                          costPerHour: parseInt(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" disabled={!outcomeCategories.laborSavings} />
                                <div className="text-xs text-gray-500">
                                  Cost per Hour ($)
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {outcomeCategories.laborSavings && baseFees > 0 ? `+${(outcomeMetrics.hoursSaved * outcomeMetrics.costPerHour / baseFees * 0.3 * 100).toFixed(1)}%` : '—'}
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" step="0.01" min="0" max="1" value={0.3} disabled className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs bg-gray-50" />
                                <div className="text-xs text-gray-500">
                                  Fixed at 30%
                                </div>
                              </div>
                            </td>
                          </tr>
                          {/* Accuracy & Quality */}
                          <tr>
                            <td className="px-3 py-2">
                              <input type="checkbox" checked={outcomeCategories.accuracy} onChange={e => setOutcomeCategories({
                        ...outcomeCategories,
                        accuracy: e.target.checked
                      })} className="h-4 w-4 text-black rounded border-gray-300" />
                            </td>
                            <td className="px-3 py-2 text-sm font-medium">
                              Accuracy & Quality
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" value={outcomeMetrics.benchmarkAccuracy} onChange={e => setOutcomeMetrics({
                          ...outcomeMetrics,
                          benchmarkAccuracy: parseInt(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" disabled={!outcomeCategories.accuracy} />
                                <div className="text-xs text-gray-500">
                                  Benchmark (%)
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" value={outcomeMetrics.achievedAccuracy} onChange={e => setOutcomeMetrics({
                          ...outcomeMetrics,
                          achievedAccuracy: parseInt(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" disabled={!outcomeCategories.accuracy} />
                                <div className="text-xs text-gray-500">
                                  Achieved (%)
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-sm text-gray-500">
                              {outcomeCategories.accuracy ? `+${((outcomeMetrics.achievedAccuracy - outcomeMetrics.benchmarkAccuracy) / 100 * outcomeWeights.accuracyWeight * 100).toFixed(1)}%` : '—'}
                            </td>
                            <td className="px-3 py-2">
                              <div className="space-y-1">
                                <input type="number" step="0.01" min="0" max="1" value={outcomeWeights.accuracyWeight} onChange={e => setOutcomeWeights({
                          ...outcomeWeights,
                          accuracyWeight: parseFloat(e.target.value) || 0
                        })} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-xs" />
                                <div className="text-xs text-gray-500">
                                  Per accuracy pt
                                </div>
                              </div>
                            </td>
                          </tr>
                          {/* Summary Row */}
                          <tr className="bg-gray-100">
                            <td colSpan={6} className="px-3 py-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-medium text-gray-700">
                                    Total Outcome Multiplier
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Applied to base fees of $
                                    {baseFees.toLocaleString()}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-gray-900">
                                    +{(outcomeMultiplier * 100).toFixed(1)}%
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    = +${outcomeFee.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>}
              </div>}
            {/* Grand Total Summary - Show aggregated if multiple use cases */}
            <div className="border-2 border-gray-300 bg-gray-50 rounded-lg overflow-hidden">
              <div className="px-4 py-3">
                <div className="space-y-2">
                  {selectedUseCases.length > 1 && <div className="mb-2 pb-2 border-b border-gray-300">
                      <div className="text-xs font-medium text-gray-700 mb-1">
                        Aggregated Across {selectedUseCases.length} Use Cases
                      </div>
                    </div>}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Base Fees (Platform + Project + SaaS)
                    </span>
                    <span className="font-semibold">
                      $
                      {(selectedUseCases.length > 1 ? aggregatedTotals.baseFees : baseFees).toLocaleString()}
                    </span>
                  </div>
                  {outcomeBasedEnabled && <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Outcome-Based Multiplier
                        </span>
                        <span className="font-semibold text-gray-900">
                          ×{(1 + outcomeMultiplier).toFixed(2)} (+
                          {(outcomeMultiplier * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          Outcome Adjustment
                        </span>
                        <span className="font-semibold text-gray-900">
                          +${outcomeFee.toLocaleString()}
                        </span>
                      </div>
                    </>}
                  <div className="h-px bg-gray-300"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Grand Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${totalEstimate.toLocaleString()}
                    </span>
                  </div>
                  {outcomeBasedEnabled && <div className="text-xs text-gray-500 text-center">
                      Formula: $
                      {(selectedUseCases.length > 1 ? aggregatedTotals.baseFees : baseFees).toLocaleString()}{' '}
                      × {(1 + outcomeMultiplier).toFixed(2)} = $
                      {totalEstimate.toLocaleString()}
                    </div>}
                </div>
              </div>
            </div>
            {/* Add blank space to prevent bottom bar from hiding content */}
            <div className="h-32"></div>
          </div> : <div className="space-y-4">
            {/* Commercial Terms and Cost Breakdown - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Commercial Terms */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-base font-semibold mb-3">
                  Commercial Terms
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">
                      Subscription start date
                    </div>
                    <div className="text-sm font-medium">
                      {subscriptionStartDate ? new Date(subscriptionStartDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Not set'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Duration</div>
                    <div className="text-sm font-medium">
                      {contractDuration} months
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">
                      Billing frequency
                    </div>
                    <div className="text-sm font-medium capitalize">
                      {billingFrequency}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">
                      Payment terms
                    </div>
                    <div className="text-sm font-medium">
                      {paymentTerms.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                  </div>
                </div>
              </div>
              {/* Cost Breakdown Chart */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h2 className="text-base font-semibold mb-3">Cost Breakdown</h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{
                  name: 'Platform',
                  base: 0,
                  value: tableCalculations.platformTotal > 0 ? tableCalculations.platformTotal : platformFee
                }, {
                  name: 'Implementation',
                  base: tableCalculations.platformTotal > 0 ? tableCalculations.platformTotal : platformFee,
                  value: tableCalculations.projectTotal > 0 ? tableCalculations.projectTotal : projectFee
                }, {
                  name: 'Usage',
                  base: (tableCalculations.platformTotal > 0 ? tableCalculations.platformTotal : platformFee) + (tableCalculations.projectTotal > 0 ? tableCalculations.projectTotal : projectFee),
                  value: tableCalculations.saasTotal > 0 ? tableCalculations.saasTotal : saasFee
                }, ...(outcomeBasedEnabled ? [{
                  name: 'Outcome',
                  base: baseFees,
                  value: outcomeFee
                }] : []), {
                  name: 'Total',
                  base: 0,
                  value: totalEstimate
                }]} margin={{
                  top: 10,
                  right: 10,
                  left: 40,
                  bottom: 10
                }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{
                    fontSize: 11
                  }} />
                      <YAxis tick={{
                    fontSize: 11
                  }} tickFormatter={value => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{
                    fontSize: 11
                  }} />
                      <Bar dataKey="base" stackId="a" fill="transparent" />
                      <Bar dataKey="value" stackId="a" radius={[4, 4, 0, 0]}>
                        {[{
                      name: 'Platform',
                      fill: '#ff6b35'
                    }, {
                      name: 'Implementation',
                      fill: '#4ecdc4'
                    }, {
                      name: 'Usage',
                      fill: '#45b7d1'
                    }, ...(outcomeBasedEnabled ? [{
                      name: 'Outcome',
                      fill: '#f59e0b'
                    }] : []), {
                      name: 'Total',
                      fill: '#10b981'
                    }].map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            {/* Pricing Breakdown */}
            <div>
              <h2 className="text-sm font-medium mb-3">Investment Breakdown</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Description
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Platform Fee */}
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">
                        Platform Access
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {selectedPlans.reduce((sum, p) => sum + p.quantity, 0)}{' '}
                        total seats across{' '}
                        {selectedPlans.map(p => p.planId.charAt(0).toUpperCase() + p.planId.slice(1)).join(', ')}{' '}
                        plan(s)
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        $
                        {(tableCalculations.platformTotal > 0 ? tableCalculations.platformTotal : platformFee).toLocaleString()}
                      </td>
                    </tr>
                    {/* Project Fee */}
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">
                        Implementation
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {projectParams.workflows} custom workflows,{' '}
                        {projectParams.dataIntegrations} data integrations,{' '}
                        {projectParams.sops} standard operating procedures
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        $
                        {(tableCalculations.projectTotal > 0 ? tableCalculations.projectTotal : projectFee).toLocaleString()}
                      </td>
                    </tr>
                    {/* SaaS Fee */}
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium">
                        Usage & Services
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {saasConfig.pricingModel === 'enterprise' ? `Enterprise plan with ${saasConfig.activeUsers} active users` : `Pay-as-you-go: ${saasConfig.activeUsers} users, ${(saasConfig.apiCalls / 1000).toFixed(0)}K API calls, ${saasConfig.dataStorage}GB storage`}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-medium">
                        $
                        {(tableCalculations.saasTotal > 0 ? tableCalculations.saasTotal : saasFee).toLocaleString()}
                      </td>
                    </tr>
                    {/* Base Subtotal */}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold" colSpan={2}>
                        Base Investment
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-semibold">
                        ${baseFees.toLocaleString()}
                      </td>
                    </tr>
                    {/* Outcome-Based Adjustment */}
                    {outcomeBasedEnabled && <>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">
                            Outcome-Based Performance Premium
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {(outcomeMultiplier * 100).toFixed(1)}% multiplier
                            based on efficiency gains, cost savings, and quality
                            improvements
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-medium text-blue-600">
                            +${outcomeFee.toLocaleString()}
                          </td>
                        </tr>
                      </>}
                    {/* Grand Total */}
                    <tr className="bg-gray-100">
                      <td className="px-4 py-4 text-base font-bold" colSpan={2}>
                        Total Investment
                      </td>
                      <td className="px-4 py-4 text-base text-right font-bold">
                        ${totalEstimate.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {outcomeBasedEnabled && <div className="mt-2 text-xs text-gray-500 italic">
                  * Outcome-based pricing: Base fees ($
                  {baseFees.toLocaleString()}) ×{' '}
                  {(1 + outcomeMultiplier).toFixed(2)} = $
                  {totalEstimate.toLocaleString()}
                </div>}
            </div>
            {/* ROI Summary - Only show if outcome-based pricing is enabled */}
            {outcomeBasedEnabled && <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                <h3 className="font-medium text-sm mb-3">
                  Expected Outcomes & Performance Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {outcomeCategories.efficiency && <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Efficiency Gains
                      </div>
                      <div className="text-lg font-semibold">
                        {outcomeMetrics.speedGain}× speed,{' '}
                        {outcomeMetrics.throughputGain}× throughput
                      </div>
                    </div>}
                  {outcomeCategories.costSavings && <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Cost Savings
                      </div>
                      <div className="text-lg font-semibold">
                        $
                        {(outcomeMetrics.baselineCost - outcomeMetrics.newCost).toLocaleString()}
                      </div>
                    </div>}
                  {outcomeCategories.laborSavings && <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Time Savings
                      </div>
                      <div className="text-lg font-semibold">
                        {outcomeMetrics.hoursSaved.toLocaleString()} hours
                      </div>
                    </div>}
                  {outcomeCategories.accuracy && <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Quality Improvement
                      </div>
                      <div className="text-lg font-semibold">
                        {outcomeMetrics.benchmarkAccuracy}% →{' '}
                        {outcomeMetrics.achievedAccuracy}%
                      </div>
                    </div>}
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Estimated ROI</span>
                    <span className="text-xl font-bold text-blue-600">
                      {roi}%
                    </span>
                  </div>
                </div>
              </div>}
            {/* Contract Terms */}
            <div>
              <h2 className="text-sm font-medium mb-3">Contract Terms</h2>
            </div>
            {/* Visual Breakdown Chart */}
            <div></div>
            {/* Add blank space to prevent bottom bar from hiding content */}
            <div className="h-32"></div>
          </div>}
      </div>
      {/* Updated Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-xs text-gray-500">Base Fees</div>
              <div className="text-lg font-semibold">
                ${baseFees.toLocaleString()}
              </div>
            </div>
            {outcomeBasedEnabled && <>
                <div>
                  <div className="text-xs text-gray-500">
                    Outcome Multiplier
                  </div>
                  <div className="text-lg font-semibold text-blue-600">
                    ×{(1 + outcomeMultiplier).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Outcome Premium</div>
                  <div className="text-lg font-semibold text-blue-600">
                    +${outcomeFee.toLocaleString()}
                  </div>
                </div>
              </>}
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <div className="text-xs text-gray-500">Grand Total</div>
              <div className="text-xl font-bold">
                ${totalEstimate.toLocaleString()}
              </div>
            </div>
          </div>
          {requiresApproval()}
          <div className="flex gap-3">
            <Link to="/configure" className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50">
              Back
            </Link>
            <Link to={`/quote?total=${totalEstimate}`} className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800">
              Next
            </Link>
          </div>
        </div>
      </div>
      {/* Ramp Drawer */}
      {selectedRampProduct && <RampDrawer isOpen={rampDrawerOpen} onClose={() => setRampDrawerOpen(false)} productId={selectedRampProduct} productName={products.find(p => p.id === selectedRampProduct)?.name || ''} initialVolume={productVolumes[selectedRampProduct] || products.find(p => p.id === selectedRampProduct)?.volume || 0} unit={products.find(p => p.id === selectedRampProduct)?.unitShort || ''} onVolumeChange={updateVolumeWithPhases} />}
      {/* POC Configuration Drawer */}
      {showPocDrawer && <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowPocDrawer(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium">Configure POC</h2>
                  <button onClick={() => setShowPocDrawer(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        POC Duration
                      </label>
                      <select value={pocMonths} onChange={e => {
                    const newMonths = parseInt(e.target.value);
                    setPocMonths(newMonths);
                    // Update contract term to include POC months
                    setContractTerm(12 + newMonths);
                  }} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value={1}>1 month</option>
                        <option value={2}>2 months</option>
                        <option value={3}>3 months</option>
                        <option value={4}>4 months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Included Products
                      </label>
                      <div className="space-y-2">
                        {products.map(product => <div key={product.id} className="flex items-center">
                            <input type="checkbox" id={`poc-${product.id}`} checked={pocProducts.includes(product.id)} onChange={() => togglePocProduct(product.id)} className="h-4 w-4 text-black rounded border-gray-300" />
                            <label htmlFor={`poc-${product.id}`} className="ml-2 text-sm">
                              {product.name}
                            </label>
                          </div>)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        POC Volumes & Pricing
                      </label>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Product
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Volume
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {pocProducts.map(productId => {
                          const product = products.find(p => p.id === productId);
                          if (!product) return null;
                          return <tr key={productId}>
                                  <td className="px-3 py-2 text-sm">
                                    {product.name}
                                  </td>
                                  <td className="px-3 py-2">
                                    <input type="number" value={pocVolumes[productId] || 0} onChange={e => updatePocVolume(productId, parseInt(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                  </td>
                                  <td className="px-3 py-2">
                                    <input type="number" step="0.01" value={pocPrices[productId] || 0} onChange={e => updatePocPrice(productId, parseFloat(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                  </td>
                                </tr>;
                        })}
                            {pocProducts.length === 0 && <tr>
                                <td colSpan={3} className="px-3 py-4 text-sm text-center text-gray-500">
                                  Select products to include in POC
                                </td>
                              </tr>}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
                  <button onClick={() => setShowPocDrawer(false)} className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                    Cancel
                  </button>
                  <button onClick={() => setShowPocDrawer(false)} className="px-4 py-2 bg-black text-white rounded-md text-sm">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
      {/* Price Tiers Drawer */}
      {showPriceTiersDrawer && selectedTierProduct && <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setShowPriceTiersDrawer(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium">
                    Price tiers:{' '}
                    {products.find(p => p.id === selectedTierProduct)?.name}
                  </h2>
                  <button onClick={() => setShowPriceTiersDrawer(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        Set quantity-based price tiers to deliver greater value
                        at scale. Going lower than that company suggested price
                        may trigger an approval.
                      </p>
                      <div className="h-64 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={tierData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="qty" label={{
                          value: 'End quantity',
                          position: 'bottom'
                        }} />
                            <YAxis label={{
                          value: 'Price',
                          angle: -90,
                          position: 'insideLeft'
                        }} />
                            <Tooltip />
                            <Area type="stepAfter" dataKey="suggested" stroke="#ff6b35" fill="#ff6b3580" name="Suggested price" />
                            <Area type="stepAfter" dataKey="you" stroke="#0066cc" fill="#0066cc80" name="You" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      {/* Volume-based pricing tiers summary */}
                      <div className="space-y-2 mb-6">
                        {tierRows.map((row, index) => <div key={index} className="flex justify-between text-sm">
                            <span>
                              {row.start.toLocaleString()} -{' '}
                              {typeof row.end === 'string' ? row.end : row.end.toLocaleString()}
                            </span>
                            <span className="font-medium">
                              ${row.price.toFixed(2)}
                            </span>
                          </div>)}
                      </div>
                      {/* Tier editing table */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                Tier
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                Start Qty
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                End Qty
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                                Price
                              </th>
                              <th className="px-3 py-2"></th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {tierRows.map((row, index) => <tr key={index}>
                                <td className="px-3 py-2 text-sm">
                                  {row.tier}
                                </td>
                                <td className="px-3 py-2 text-sm">
                                  {row.start}
                                </td>
                                <td className="px-3 py-2 text-sm">{row.end}</td>
                                <td className="px-3 py-2 text-sm">
                                  <input type="number" step="0.01" value={row.price} onChange={e => updateTierPrice(index, parseFloat(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm" />
                                </td>
                                <td className="px-3 py-2 text-sm">
                                  <button className="text-gray-400 hover:text-gray-600">
                                    <X size={14} />
                                  </button>
                                </td>
                              </tr>)}
                            <tr>
                              <td colSpan={5} className="px-3 py-2">
                                <button className="flex items-center gap-1 text-sm text-gray-600">
                                  <Plus size={14} />
                                  <span>Add new tier</span>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* Approval warnings */}
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            Approvals required of:
                          </span>
                          <span className="px-2 py-0.5 bg-black text-white text-xs font-medium rounded">
                            VP of Sales
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Info size={14} className="text-gray-400" />
                            <span>
                              Change start quantity of Tier 3 to 15,000
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Info size={14} className="text-gray-400" />
                            <span>
                              Change price of Tier 2 to below minimum margin
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Summary metrics */}
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Discount</span>
                        <span className="font-medium">
                          {Math.round(getDiscountPercentage(selectedTierProduct))}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Effective Price</span>
                        <span className="font-medium">
                          ${getEffectivePrice(selectedTierProduct).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
                  <button onClick={() => setShowPriceTiersDrawer(false)} className="px-4 py-2 border border-gray-200 rounded-md text-sm">
                    Cancel
                  </button>
                  <button onClick={() => setShowPriceTiersDrawer(false)} className="px-4 py-2 bg-black text-white rounded-md text-sm">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
}