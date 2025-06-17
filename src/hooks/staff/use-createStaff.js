import { useState } from "react";
import { useCreateUserMutation } from "../../features/user/userSlice";

export const useAddStaffForm = (onSuccess) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
  });

  const [createUser, { isLoading: saving }] = useCreateUserMutation();

  const handleInputChange = (field, value) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = formData;
    if (!name || !email) return;

    try {
      await createUser(formData).unwrap();
      setFormData({ name: "", email: "", role: "employee" });
      onSuccess?.();
    } catch (err) {
      console.error("Create user failed:", err);
      alert(err?.data?.message || "Failed to create user");
    }
  };

  return { formData, saving, handleInputChange, handleSubmit };
};
