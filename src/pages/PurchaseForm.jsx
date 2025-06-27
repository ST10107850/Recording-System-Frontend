import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { Plus, Upload, X, Image } from "lucide-react";
import { SupplierList } from "../components/SupplierList";
import { usePurchaseForm } from "../hooks/purchase/use-editPurchase";

export const PurchaseForm = () => {
  const {
    isEditing,
    register,
    fields,
    remove,
    updatePurchaseItem,
    addPurchaseItem,
    receiptPreview,
    setReceiptPreview,
    setValue,
    watch,
    handleSubmit,
    onSubmit,
    inventoryItems,
    isDirty,
    showSupplierList,
    setShowSupplierList,
    handleSupplierSelect,
    subtotal,
    updating,
    vat,
    total,
    selectedInventoryIds,
  } = usePurchaseForm();

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title={isEditing ? "Edit Purchase" : "New Purchase"} />

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="p-8 shadow-md border border-gray-200 bg-white">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Supplier
                    </label>
                    <div className="text-lg font-medium">
                      {watch("vendor.name") || "Select Supplier"}
                    </div>
                    {watch("vendor.email") && (
                      <div className="text-sm text-gray-600 mt-1">
                        {watch("vendor.email")}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="text-blue-500 text-sm font-semibold hover:underline"
                    onClick={() => setShowSupplierList(true)}
                  >
                    Find in supplier list
                  </button>
                </div>
              </div>

              {/* Receipt */}
              <div className="mb-8">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Receipt Image
                </label>
                {!receiptPreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload receipt image
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      id="receipt-upload"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setReceiptPreview(URL.createObjectURL(file));
                          setValue("receipt", file);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("receipt-upload")?.click()
                      }
                      className="text-sm font-semibold border px-4 py-2 rounded border-gray-200 hover:bg-gray-100"
                    >
                      <Image className="inline-block h-4 w-4 mr-1" /> Choose
                      Image
                    </button>
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={receiptPreview}
                      alt="Receipt"
                      className="max-w-xs rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setReceiptPreview(null);
                        setValue("receipt", null);
                      }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Items</h3>
                  <button
                    type="button"
                    onClick={addPurchaseItem}
                    className="text-sm border border-gray-200 px-3 py-1 rounded hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 inline-block mr-1" /> Add Item
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-1">
                  <div>Inventory Item</div>
                  <div>Quantity</div>
                  <div>Unit Cost</div>
                  <div></div>
                </div>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-4 gap-4 mb-3 items-center"
                  >
                    <select
                      {...register(`items.${index}.inventoryId`)}
                      className={`w-full border border-gray-200 rounded-md px-3 py-2 text-sm
    ${selectedInventoryIds.includes(field.inventoryId) ? "bg-green-100" : ""}
  `}
                      onChange={(e) =>
                        updatePurchaseItem(index, "inventoryId", e.target.value)
                      }
                    >
                      <option value="">Select inventory item</option>
                      {inventoryItems.map((inv) => {
                        const isSelected = selectedInventoryIds.includes(
                          inv._id
                        );
                        const isThisItem =
                          watch(`items.${index}.inventoryId`) === inv._id;

                        return (
                          <option
                            key={inv._id}
                            value={inv._id}
                            disabled={!isThisItem && isSelected} // disable if selected elsewhere
                          >
                            {inv.itemName || `Item ${inv._id}`}
                          </option>
                        );
                      })}
                    </select>

                    <input
                      type="number"
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="0"
                    />

                    <input
                      type="number"
                      step="0.01"
                      {...register(`items.${index}.unitCost`, {
                        valueAsNumber: true,
                      })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="0"
                    />

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-200 pt-6">
                <div className="max-w-sm ml-auto space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT</span>
                    <span>R{vat}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>R{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Save */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={!isDirty || updating}
                  className={`px-5 py-2 rounded-md text-white
    ${!isDirty || updating ? "bg-gray-400" : "bg-gray-800 hover:bg-gray-900"}`}
                >
                  {updating
                    ? "Saving..."
                    : isEditing
                    ? "Update Purchase"
                    : "Save Purchase"}
                </button>
              </div>
            </Card>
          </form>
        </div>
      </div>

      {/* Supplier Modal */}
      {showSupplierList && (
        <SupplierList
          onSelect={handleSupplierSelect}
          onClose={() => setShowSupplierList(false)}
        />
      )}
    </div>
  );
};
