import React from "react";
import { useVendor } from "../hooks/use-vendor";
import Topbar from "./TopBar";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export const CreateVendors = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    street,
    setStreet,
    city,
    setCity,
    zip,
    setZip,
    handleCreateVendor,
    isLoading,
    error,
  } = useVendor();

  const navigate = useNavigate();
  const handleAddVendor = () => {
    navigate("/vendors/create");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateVendor();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Vendor - New Vendor"
        showSearch={true}
        showAddButton={true}
        addButtonText="Add Vendor"
        onAddClick={handleAddVendor}
      />
      <button
        variant="ghost"
        onClick={() => navigate("/vendors")}
        className="mb-4 text-blue-600 hover:text-blue-800 px-6 flex items-center py-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Vendors
      </button>
      <div className="h-auto flex justify-center py-3 px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-10"
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Vendor Registration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Supplies Co."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., vendor@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g., +1 555-123-4567"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="e.g., 123 Main St"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g., New York"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="e.g., 10001"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-400 hover:bg-blue-500 text-white px-16 py-3 rounded-full"
            >
              {isLoading ? "Submitting..." : "Submit Vendor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
