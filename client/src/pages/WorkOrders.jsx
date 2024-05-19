import React, { useState } from "react";
import WorkOrderForm from "../components/WorkOrder/WorkOrderForm"; // Ensure this import is correct

const WorkOrders = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div className="work-orders-page">
      <h1>Work Orders</h1>
      <button onClick={handleToggleForm} className="add-service">
        {showForm ? 'Hide Work Order Form' : 'Show Work Order Form'}
      </button>
      {showForm && <WorkOrderForm />}
      <div className="service-list">
        {/* Display work orders in a grid */}
        <div className="service-item">Work Order 1</div>
        <div className="service-item">Work Order 2</div>
        <div className="service-item">Work Order 3</div>
      </div>
    </div>
  );
};

export default WorkOrders;