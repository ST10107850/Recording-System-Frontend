import { useCreateVendor } from "../hooks/vendor/use-createVendor";

export const AddVendorForm = ({ isOpen, onClose }) => {

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
      isLoading,
      handleCreateVendor,
    } = useCreateVendor(onClose);

    
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Add New Supplier/Vendor</h2>
        <form onSubmit={handleCreateVendor} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Supplier Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter supplier name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Supplier Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter supplier email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Supplier Phone Number
            </label>
            <input
              id="name"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter supplier phone name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="flex justify-center pt-3 font-bold">
            Address Information
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Street
            </label>
            <input
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Enter street name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter postal code"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900"
            >
              { isLoading ? "Saving…" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
