// components/EditVendorForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateVendorMutation } from "../features/user/vendorSlice";
import { useToast } from "../hooks/use-toast";

export const EditVendorForm = ({ isOpen, onClose, vendor }) => {
  const { toast } = useToast();

  // ◆ trigger fn + status object
  const [updateVendor, { isLoading }] = useUpdateVendorMutation();

  // ◆ react‑hook‑form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
      zip: "",
    },
  });

  // ◆ When the selected vendor arrives, prime the form
  useEffect(() => {
    if (vendor) {
      reset({
        name: vendor.name,
        email: vendor.email,
        phoneNumber: vendor.phoneNumber,
        street: vendor.address?.street,
        city: vendor.address?.city,
        zip: vendor.address?.zip,
      });
    }
  }, [vendor, reset]);

  const onSubmit = async (data) => {
    if (!vendor?._id) return;
    try {
      await updateVendor({ id: vendor._id, ...data }).unwrap();
      toast({
        title: "Supplier updated",
        description: "Changes have been saved to the Dough Better system.",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Update failed",
        description: err?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Supplier / Vendor</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter supplier name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Supplier Email
            </label>
            <input
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter supplier email"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Supplier Phone Number
            </label>
            <input
              {...register("phoneNumber", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter phone number"
            />
          </div>
          <div className="flex justify-center pt-3 font-bold">
            Address Information
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Street
            </label>
            <input
              {...register("street", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter street"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register("city", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter city"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              {...register("zip", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter postal code"
            />
          </div>

          {/* ---------- Buttons ---------- */}
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
              disabled={!isDirty || isLoading}
              className={`px-4 py-2 rounded-md text-sm text-white ${
                !isDirty || isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              {isLoading ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
