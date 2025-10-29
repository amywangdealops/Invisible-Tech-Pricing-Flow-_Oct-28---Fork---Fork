import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ConfigurationStep } from './components/ConfigurationStep';
import { VolumeAndPricingStep } from './components/VolumeAndPricingStep';
import { QuoteStep } from './components/QuoteStep';
import { OpportunityPage } from './components/OpportunityPage';
export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OpportunityPage />} />
          <Route path="configure" element={<ConfigurationStep />} />
          <Route path="volume" element={<VolumeAndPricingStep />} />
          <Route path="pricing" element={<VolumeAndPricingStep />} />
          <Route path="quote" element={<QuoteStep />} />
        </Route>
      </Routes>
    </Router>;
}