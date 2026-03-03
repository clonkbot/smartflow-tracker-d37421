interface FilterBarProps {
  filter: 'all' | 'accumulating' | 'distributing';
  setFilter: (filter: 'all' | 'accumulating' | 'distributing') => void;
  chainFilter: string;
  setChainFilter: (chain: string) => void;
  sortBy: 'netFlow' | 'marketCap' | 'smartWallets';
  setSortBy: (sort: 'netFlow' | 'marketCap' | 'smartWallets') => void;
}

export function FilterBar({
  filter,
  setFilter,
  chainFilter,
  setChainFilter,
  sortBy,
  setSortBy,
}: FilterBarProps) {
  const chains = ['all', 'ETH', 'BASE', 'SOL', 'ARB'];

  return (
    <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
      {/* Activity Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] md:text-xs text-gray-500 font-mono mr-1 md:mr-2">ACTIVITY:</span>
        {(['all', 'accumulating', 'distributing'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 md:px-3 py-1.5 md:py-2 rounded text-[10px] md:text-xs font-mono transition-all min-h-[36px] md:min-h-[40px] ${
              filter === f
                ? 'bg-gray-700 text-white border border-gray-600'
                : 'bg-gray-900/50 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            {f === 'all' ? 'ALL' : f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chain & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        {/* Chain Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] md:text-xs text-gray-500 font-mono mr-1 md:mr-2">CHAIN:</span>
          {chains.map((chain) => (
            <button
              key={chain}
              onClick={() => setChainFilter(chain)}
              className={`px-2 md:px-2.5 py-1.5 md:py-2 rounded text-[10px] md:text-xs font-mono transition-all min-h-[36px] md:min-h-[40px] ${
                chainFilter === chain
                  ? chain === 'ETH'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : chain === 'BASE'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : chain === 'SOL'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : chain === 'ARB'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'bg-gray-700 text-white border border-gray-600'
                  : 'bg-gray-900/50 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              {chain === 'all' ? 'ALL' : chain}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          <span className="text-[10px] md:text-xs text-gray-500 font-mono mr-1 md:mr-2">SORT:</span>
          {([
            { key: 'netFlow', label: 'NET FLOW' },
            { key: 'marketCap', label: 'MCAP' },
            { key: 'smartWallets', label: 'WALLETS' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-2 md:px-2.5 py-1.5 md:py-2 rounded text-[10px] md:text-xs font-mono transition-all min-h-[36px] md:min-h-[40px] ${
                sortBy === key
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-gray-900/50 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
