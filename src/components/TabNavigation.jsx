import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['Favourites', 'Forex', 'Crypto', 'Indices', 'Derivatives'];

  return (
    <nav className="flex items-center gap-8 px-4 py-3 bg-black border-b border-[#1a1a1a] overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-[13px] whitespace-nowrap transition-colors ${
            activeTab === tab
              ? 'text-white font-medium'
              : 'text-[#666666]'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;