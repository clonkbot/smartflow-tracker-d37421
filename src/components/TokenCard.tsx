import { TokenData } from '../App';

interface TokenCardProps {
  token: TokenData;
  index: number;
}

export function TokenCard({ token, index }: TokenCardProps) {
  const flowRatio = token.inflow24h / (token.inflow24h + token.outflow24h);
  const isPositive = token.netFlow > 0;
  const intensity = Math.min(Math.abs(token.netFlow) / 50000, 1);

  const chainColors: Record<string, string> = {
    ETH: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    BASE: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    SOL: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    ARB: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  const activityIcons: Record<string, { icon: string; color: string }> = {
    accumulating: { icon: '↗', color: 'text-green-400' },
    distributing: { icon: '↘', color: 'text-red-400' },
    neutral: { icon: '→', color: 'text-gray-400' },
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  return (
    <div
      className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-3 md:p-4 hover:border-gray-700 transition-all duration-300 overflow-hidden"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.5s ease-out forwards',
        opacity: 0,
      }}
    >
      {/* Glow effect based on net flow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isPositive
            ? `radial-gradient(ellipse at center, rgba(0, 240, 255, ${intensity * 0.15}) 0%, transparent 70%)`
            : `radial-gradient(ellipse at center, rgba(255, 0, 102, ${intensity * 0.15}) 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3 relative">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <div
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm"
              style={{
                background: `linear-gradient(135deg, ${isPositive ? '#00f0ff' : '#ff0066'} 0%, ${isPositive ? '#00ff88' : '#ff6600'} 100%)`,
              }}
            >
              {token.symbol.slice(0, 2)}
            </div>
            {token.topWalletActivity === 'accumulating' && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-[8px] md:text-[10px]">🔥</span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              <h3 className="font-mono font-bold text-white text-sm md:text-base truncate">{token.symbol}</h3>
              <span className={`text-[9px] md:text-[10px] px-1.5 py-0.5 rounded border ${chainColors[token.chain]}`}>
                {token.chain}
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-gray-500 font-mono truncate">{token.name}</p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <div className="text-[10px] md:text-xs text-gray-500 font-mono">MCAP</div>
          <div className="font-mono font-bold text-white text-sm md:text-base">{formatNumber(token.marketCap)}</div>
        </div>
      </div>

      {/* Flow Bar */}
      <div className="mb-3 md:mb-4">
        <div className="flex justify-between text-[9px] md:text-[10px] font-mono mb-1">
          <span className="text-cyan-400">IN: {formatNumber(token.inflow24h)}</span>
          <span className="text-pink-400">OUT: {formatNumber(token.outflow24h)}</span>
        </div>
        <div className="h-1.5 md:h-2 bg-gray-800 rounded-full overflow-hidden relative">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-1000"
            style={{ width: `${flowRatio * 100}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-gradient-to-l from-pink-500 to-pink-400 transition-all duration-1000"
            style={{ width: `${(1 - flowRatio) * 100}%` }}
          />
          {/* Center divider */}
          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-900 transform -translate-x-1/2" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        <div className="bg-gray-800/50 rounded p-1.5 md:p-2">
          <div className="text-[9px] md:text-[10px] text-gray-500 font-mono mb-0.5">NET FLOW</div>
          <div className={`font-mono font-bold text-xs md:text-sm ${isPositive ? 'text-cyan-400' : 'text-pink-400'}`}>
            {isPositive ? '+' : ''}{formatNumber(token.netFlow)}
          </div>
        </div>
        <div className="bg-gray-800/50 rounded p-1.5 md:p-2">
          <div className="text-[9px] md:text-[10px] text-gray-500 font-mono mb-0.5">WALLETS</div>
          <div className="font-mono font-bold text-amber-400 text-xs md:text-sm">{token.smartWallets}</div>
        </div>
        <div className="bg-gray-800/50 rounded p-1.5 md:p-2">
          <div className="text-[9px] md:text-[10px] text-gray-500 font-mono mb-0.5">24H</div>
          <div className={`font-mono font-bold text-xs md:text-sm ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-2 md:pt-3 border-t border-gray-800">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className={`text-base md:text-lg ${activityIcons[token.topWalletActivity].color}`}>
            {activityIcons[token.topWalletActivity].icon}
          </span>
          <span className="text-[10px] md:text-xs text-gray-400 font-mono capitalize">
            {token.topWalletActivity}
          </span>
        </div>
        <span className="text-[10px] md:text-xs text-gray-600 font-mono">{token.lastActivity}</span>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
