import React, { useState } from "react";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import ForexList from "./components/ForexList";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  const [activeTab, setActiveTab] = useState("Forex");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      <Header />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <ForexList />
      <BottomNavigation />
    </div>
  );
}

export default App;
