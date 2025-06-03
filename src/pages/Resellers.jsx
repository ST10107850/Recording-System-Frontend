import React from 'react'
import Topbar from '../components/TopBar';

const Resellers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Reseller Management"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add Reseller"
      />
    </div>
  );
}

export default Resellers