import React from "react";

const ForexItem = ({ item }) => {
  return (
    <div className="px-4 py-3 border-b border-[#1a1a1a] hover:bg-[#151515] transition-colors">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Flags - Overlapping circles */}
          <div className="flex items-center relative" style={{ width: "40px" }}>
            <div className="absolute left-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-white flex items-center justify-center text-[10px]">
              <img
                src="https://flagcdn.com/us.svg"
                alt="US Flag"
                className="w-5 h-5 object-cover rounded-full"
              />
            </div>
            <div className="absolute left-2 top-[-8px] w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-blue-800 border-2 border-white flex items-center justify-center text-[10px] z-10">
              <img
                src="https://flagcdn.com/be.svg"
                alt="US Flag"
                className="w-5 h-5 object-cover rounded-full"
              />
            </div>
          </div>

          {/* Pair and Change */}
          <div className="flex flex-col ml-2">
            <span className="text-[11px] text-[#858585] leading-none mb-1">
              {item.time}
            </span>
            <span className="text-[13px] font-normal text-white leading-none mb-1">
              {item.pair}
            </span>
            <span className="text-[11px] text-[#22c55e] leading-none">
              {item.change}{" "}
              <span className="text-[#858585]">{item.changePercent}</span>
            </span>
          </div>
        </div>

        {/* Right Section - Prices */}
        <div className="flex items-center gap-8">
          {/* Bid Price */}
          <div className="flex flex-col">
            <div className="text-[13px] leading-none mb-1">
              <span>
                <span className="text-white">
                  {item.bidInteger?.toString().slice(0, 3)}
                </span>
                <span
                  className={
                    item.bidColor === "red"
                      ? "text-[#ef4444]"
                      : "text-[#22c55e]"
                  }
                >
                  {item.bidInteger?.toString().slice(3)}
                  {item.bidDecimal}
                </span>
              </span>
            </div>
            <span className="text-[11px] text-[#858585] leading-none">
              {item.low}
            </span>
          </div>

          {/* Ask Price */}
          <div className="flex flex-col">
            <div className="text-[13px] leading-none mb-1">
              <span>
                <span className="text-white">
                  {item.askInteger?.toString().slice(0, 3)}
                </span>
                <span
                  className={
                    item.askColor === "red"
                      ? "text-[#ef4444]"
                      : "text-[#22c55e]"
                  }
                >
                  {item.askInteger?.toString().slice(3)}
                  {item.askDecimal}
                </span>
              </span>
            </div>
            <span className="text-[11px] text-[#858585] leading-none">
              {item.high}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForexItem;
