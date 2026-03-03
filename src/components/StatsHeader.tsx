interface StatsHeaderProps {
  totalInflow: number;
  totalOutflow: number;
  activeWallets: number;
  tokenCount: number;
}

export function StatsHeader({ totalInflow, totalOutflow, activeWallets, tokenCount }: StatsHeaderProps) {
  const netFlow = totalInflow - totalOutflow;
  const isPositive = netFlow > 0;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
      {/* Total Inflow */}
      <div className="relative group bg-gray-900/60 border border-cyan-500/20 rounded-lg p-3 md:p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <span className="text-[10px] md:text-xs text-gray-400 font-mono tracking-wider">TOTAL INFLOW</span>
          </div>
          <div className="font-mono font-bold text-lg md:text-xl lg:text-2xl text-cyan-400">{formatNumber(totalInflow)}</div>
          <div className="text-[10px] md:text-xs text-gray-500 font-mono mt-0.5 md:mt-1">24H VOLUME</div>
        </div>
      </div>

      {/* Total Outflow */}
      <div className="relative group bg-gray-900/60 border border-pink-500/20 rounded-lg p-3 md:p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
            <span className="text-[10px] md:text-xs text-gray-400 font-mono tracking-wider">TOTAL OUTFLOW</span>
          </div>
          <div className="font-mono font-bold text-lg md:text-xl lg:text-2xl text-pink-400">{formatNumber(totalOutflow)}</div>
          <div className="text-[10px] md:text-xs text-gray-500 font-mono mt-0.5 md:mt-1">24H VOLUME</div>
        </div>
      </div>

      {/* Net Flow */}
      <div className="relative group bg-gray-900/60 border border-amber-500/20 rounded-lg p-3 md:p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-[10px] md:text-xs text-gray-400 font-mono tracking-wider">NET FLOW</span>
          </div>
          <div className={`font-mono font-bold text-lg md:text-xl lg:text-2xl ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{formatNumber(netFlow)}
          </div>
          <div className="text-[10px] md:text-xs text-gray-500 font-mono mt-0.5 md:mt-1">{isPositive ? 'BULLISH' : 'BEARISH'}</div>
        </div>
      </div>

      {/* Tracking */}
      <div className="relative group bg-gray-900/60 border border-gray-700/50 rounded-lg p-3 md:p-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent" />
        <div className="relative">
          <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-[10px] md:text-xs text-gray-400 font-mono tracking-wider">TRACKING</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-lg md:text-xl lg:text-2xl text-white">{activeWallets}</span>
            <span className="text-[10px] md:text-xs text-gray-500">wallets</span>
          </div>
          <div className="text-[10px] md:text-xs text-gray-500 font-mono mt-0.5 md:mt-1">{tokenCount} TOKENS</div>
        </div>
      </div>
    </div>
  );
}
