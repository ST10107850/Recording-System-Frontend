export const useCreateInventory = () => {
  const createInventory = async (inventoryData) => {
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to create inventory');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating inventory:', error);
      throw error;
    }
  };

  return { createInventory };
}