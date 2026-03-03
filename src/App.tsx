import { useState, useEffect } from 'react';
import { TokenCard } from './components/TokenCard';
import { StatsHeader } from './components/StatsHeader';
import { FilterBar } from './components/FilterBar';

export interface TokenData {
  id: string;
  name: string;
  symbol: string;
  marketCap: number;
  inflow24h: number;
  outflow24h: number;
  netFlow: number;
  smartWallets: number;
  topWalletActivity: 'accumulating' | 'distributing' | 'neutral';
  chain: string;
  priceChange24h: number;
  lastActivity: string;
}

const generateMockData = (): TokenData[] => {
  const names = [
    { name: 'MicroDoge', symbol: 'MDOGE', chain: 'ETH' },
    { name: 'NanoShib', symbol: 'NSHIB', chain: 'BASE' },
    { name: 'PicoFloki', symbol: 'PFLOKI', chain: 'SOL' },
    { name: 'AtomPepe', symbol: 'APEPE', chain: 'ETH' },
    { name: 'QuarkCat', symbol: 'QCAT', chain: 'ARB' },
    { name: 'FemtoInu', symbol: 'FINU', chain: 'BASE' },
    { name: 'ZeptoMoon', symbol: 'ZMOON', chain: 'SOL' },
    { name: 'YoctoSun', symbol: 'YSUN', chain: 'ETH' },
    { name: 'PlankApe', symbol: 'PAPE', chain: 'ARB' },
    { name: 'QuantumFrog', symbol: 'QFROG', chain: 'BASE' },
    { name: 'WaveBonk', symbol: 'WBONK', chain: 'SOL' },
    { name: 'ParticlePup', symbol: 'PPUP', chain: 'ETH' },
  ];

  return names.map((token, i) => {
    const marketCap = Math.floor(Math.random() * 900000) + 50000;
    const inflow = Math.floor(Math.random() * 150000) + 5000;
    const outflow = Math.floor(Math.random() * 100000) + 2000;
    const activities: ('accumulating' | 'distributing' | 'neutral')[] = ['accumulating', 'distributing', 'neutral'];
    const times = ['2m ago', '5m ago', '12m ago', '23m ago', '45m ago', '1h ago'];

    return {
      id: `token-${i}`,
      name: token.name,
      symbol: token.symbol,
      marketCap,
      inflow24h: inflow,
      outflow24h: outflow,
      netFlow: inflow - outflow,
      smartWallets: Math.floor(Math.random() * 45) + 3,
      topWalletActivity: activities[Math.floor(Math.random() * 3)],
      chain: token.chain,
      priceChange24h: (Math.random() - 0.3) * 100,
      lastActivity: times[Math.floor(Math.random() * times.length)],
    };
  }).sort((a, b) => b.netFlow - a.netFlow);
};

function App() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [filter, setFilter] = useState<'all' | 'accumulating' | 'distributing'>('all');
  const [chainFilter, setChainFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'netFlow' | 'marketCap' | 'smartWallets'>('netFlow');

  useEffect(() => {
    setTokens(generateMockData());

    const interval = setInterval(() => {
      setTokens(prev => prev.map(token => ({
        ...token,
        inflow24h: token.inflow24h + Math.floor(Math.random() * 1000) - 400,
        outflow24h: token.outflow24h + Math.floor(Math.random() * 800) - 350,
        netFlow: token.inflow24h - token.outflow24h,
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredTokens = tokens
    .filter(t => filter === 'all' || t.topWalletActivity === filter)
    .filter(t => chainFilter === 'all' || t.chain === chainFilter)
    .sort((a, b) => {
      if (sortBy === 'netFlow') return b.netFlow - a.netFlow;
      if (sortBy === 'marketCap') return b.marketCap - a.marketCap;
      return b.smartWallets - a.smartWallets;
    });

  const totalInflow = tokens.reduce((sum, t) => sum + t.inflow24h, 0);
  const totalOutflow = tokens.reduce((sum, t) => sum + t.outflow24h, 0);
  const activeWallets = tokens.reduce((sum, t) => sum + t.smartWallets, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      {/* Scan line overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
      }} />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <header className="mb-6 md:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight font-mono">
                  <span className="text-cyan-400">SMART</span>
                  <span className="text-white">FLOW</span>
                </h1>
                <p className="text-[10px] md:text-xs text-gray-500 font-mono tracking-widest">MICRO-CAP INTELLIGENCE</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="px-2 md:px-3 py-1 md:py-1.5 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-[10px] md:text-xs font-mono flex items-center gap-1.5 md:gap-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse" />
                LIVE
              </div>
              <div className="px-2 md:px-3 py-1 md:py-1.5 bg-gray-800/50 border border-gray-700 rounded text-gray-400 text-[10px] md:text-xs font-mono">
                &lt;$1M MCAP
              </div>
            </div>
          </div>
        </header>

        {/* Stats */}
        <StatsHeader
          totalInflow={totalInflow}
          totalOutflow={totalOutflow}
          activeWallets={activeWallets}
          tokenCount={tokens.length}
        />

        {/* Filters */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          chainFilter={chainFilter}
          setChainFilter={setChainFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Token Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
          {filteredTokens.map((token, index) => (
            <TokenCard key={token.id} token={token} index={index} />
          ))}
        </div>

        {filteredTokens.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <div className="text-gray-600 font-mono text-sm">NO TOKENS MATCH FILTERS</div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-800/50">
          <p className="text-center text-gray-600 text-[10px] md:text-xs font-mono tracking-wide">
            Requested by <span className="text-gray-500">@modzzdude</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
