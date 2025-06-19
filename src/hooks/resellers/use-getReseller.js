import { useEffect, useMemo, useState } from "react";
import { useGetCustomerCountSalesQuery } from "../../features/user/sale-slice";

const TARGET_SALES = 15;

export const useResellers = () => {
  const { data = {} } = useGetCustomerCountSalesQuery();
  const resellersData = useMemo(
    () => (Array.isArray(data.data) ? data.data : []),
    [data.data]
  );

  const [resellers, setResellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState(null);

  useEffect(() => {
    setResellers(resellersData);
  }, [resellersData]);

  const filteredResellers = useMemo(() => {
    return resellers.filter((reseller) => {
      const shopName = reseller.customer?.shopName?.toLowerCase() || "";
      const name = reseller.customer?.name?.toLowerCase() || "";
      return (
        shopName.includes(searchTerm.toLowerCase()) ||
        name.includes(searchTerm.toLowerCase())
      );
    });
  }, [resellers, searchTerm]);

  const calculateDiscountProgress = (salesCount) => {
    return Math.min((salesCount / TARGET_SALES) * 100, 100);
  };

  const getDiscountStatus = (salesCount) => {
    if (salesCount >= TARGET_SALES) {
      return { eligible: true, remaining: 0 };
    }
    return { eligible: false, remaining: TARGET_SALES - salesCount };
  };

  const handleAddReseller = (newReseller) => {
    setResellers((prev) => [...prev, newReseller]);
  };

  const handleUpdateReseller = (updatedReseller) => {
    setResellers((prev) =>
      prev.map((reseller) =>
        reseller._id === updatedReseller._id ? updatedReseller : reseller
      )
    );
    setSelectedReseller(null);
  };

  const handleDeleteReseller = (id) => {
    if (window.confirm("Are you sure you want to delete this reseller?")) {
      setResellers((prev) => prev.filter((reseller) => reseller._id !== id));
    }
  };

  const handleViewReseller = (id) => {
    const reseller = resellers.find((reseller) => reseller._id === id);
    setSelectedReseller(reseller || null);
    setIsViewModalOpen(true);
  };

  const handleEditReseller = (id) => {
    const reseller = resellers.find((r) => r._id === id);
    setSelectedReseller(reseller || null);
    setIsEditFormOpen(true);
  };

  return {
    resellers,
    filteredResellers,
    searchTerm,
    setSearchTerm,
    isAddFormOpen,
    setIsAddFormOpen,
    isEditFormOpen,
    setIsEditFormOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    selectedReseller,
    setSelectedReseller,
    calculateDiscountProgress,
    getDiscountStatus,
    handleAddReseller,
    handleUpdateReseller,
    handleDeleteReseller,
    handleViewReseller,
    handleEditReseller,
  };
};
