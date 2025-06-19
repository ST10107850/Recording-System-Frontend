import React, {  useState } from "react";
import Topbar from "../components/TopBar";
import { Card } from "../components/ui/Card";
import { Plus, Upload, X, Image } from "lucide-react";
import { SupplierList } from "../components/SupplierList";
import { AddItemForm } from "../components/AddItemForm";
import { useCreatePurchase } from "../hooks/purchase/use-createPurchase";

export const Purchase = () => {
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const {
    purchaseItems,
    selectedSupplier,
    predefinedItems,
    receiptPreview,
    isLoading,
    formError,
    subtotal,
    vat,
    total,
    addPurchaseItem,
    removePurchaseItem,
    updatePurchaseItem,
    handleSupplierSelect,
    handleReceiptUpload,
    removeReceipt,
    handleAddNewItem,
    handleSavePurchase,
    showSupplierList,
    setShowSupplierList,
  } = useCreatePurchase();

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Purchases - New Purchase" />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {formError && (
            <div className="mb-4 text-red-600 font-medium text-center">
              {formError}
            </div>
          )}

          <Card className="p-8 hover:shadow-lg transition-shadow shadow-md border-b border-gray-200 bg-white">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Supplier
                  </label>
                  <div className="text-lg font-medium">
                    {selectedSupplier?.name || "Select Supplier"}
                  </div>
                  {selectedSupplier && (
                    <div className="text-sm text-gray-600 mt-1">
                      {selectedSupplier?.address
                        ? [
                            selectedSupplier.address.street,
                            selectedSupplier.address.city,
                            selectedSupplier.address.zip,
                          ]
                            .filter(Boolean)
                            .join(", ")
                        : "No address"}
                    </div>
                  )}
                </div>
                <button
                  className="text-blue-500 text-sm font-semibold hover:underline"
                  onClick={() => setShowSupplierList(true)}
                >
                  Find in supplier list
                </button>
              </div>
            </div>

            {/* Receipt Upload */}
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
                    onChange={handleReceiptUpload}
                    className="hidden"
                    id="receipt-upload"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("receipt-upload")?.click()
                    }
                    className="text-sm font-semibold border px-4 py-2 rounded border-gray-200  hover:bg-gray-100 text-gray-700"
                  >
                    <Image className="h-4 w-4 inline-block mr-1" />
                    Choose Image
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={receiptPreview}
                    alt="Receipt preview"
                    className="max-w-xs h-auto rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeReceipt}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Purchase Items */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Items</h3>
                <button
                  onClick={() => setShowAddItemForm(true)}
                  className="text-sm border border-gray-200 px-3 py-1 rounded hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4 inline-block mr-1" />
                  Add New Item
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
                <div>Item</div>
                <div>Quantity</div>
                <div>Amount</div>
                <div></div>
              </div>

              {purchaseItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-4 gap-4 mb-4 items-center"
                >
                  <select
                    value={item.name}
                    onChange={(e) =>
                      updatePurchaseItem(item.id, "name", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select or type item name
                    </option>
                    {predefinedItems.map((itemName, unit, idx) => (
                      <option key={`${itemName}-${idx}`} value={itemName}>
                        {itemName} - {(unit)}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="0"
                    value={item.quantity === 0 ? "" : item.quantity}
                    onChange={(e) =>
                      updatePurchaseItem(
                        item.id,
                        "quantity",
                        e.target.value === "" ? 0 : Number(e.target.value)
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                  />

                  <div className="flex items-center">
                    <span className="mr-2">R</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={item.amount === 0 ? "" : item.amount}
                      onChange={(e) =>
                        updatePurchaseItem(
                          item.id,
                          "amount",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                    />
                  </div>

                  <button
                    onClick={() => removePurchaseItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <button
                onClick={addPurchaseItem}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4 inline-block mr-1" />
                Add Item
              </button>
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 pt-6">
              <div className="max-w-sm ml-auto">
                <h3 className="text-lg font-semibold mb-4">Purchase Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT</span>
                    <span>{vat}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>R{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSavePurchase}
                disabled={isLoading}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                Save Purchase
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Supplier List Modal */}
      {showSupplierList && (
        <SupplierList
          onSelect={handleSupplierSelect}
          onClose={() => setShowSupplierList(false)}
        />
      )}

      {/* Add Item Form Modal (commented out) */}
      <AddItemForm
        isOpen={showAddItemForm}
        onClose={() => setShowAddItemForm(false)}
        onAddItem={handleAddNewItem}
      />
    </div>
  );
};
