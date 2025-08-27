import React from "react";
import AdsCard from "./AdsCard";
import AdsList from "./AdsList";

const AdsManagement = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-7">Ads Management</h1>
      <AdsCard />
      <AdsList/>
    </div>
  );
};

export default AdsManagement;
