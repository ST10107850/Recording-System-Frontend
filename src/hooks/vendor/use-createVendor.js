import { useState } from "react";
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";
import { useCreateVendorMutation } from "../../features/user/vendorSlice";

export const useCreateVendor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const [createVendor, { isLoading }] = useCreateVendorMutation();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setStreet("");
    setCity("");
    setZip("");
    setError("");
  };

  const handleCreateVendor = async () => {
    try {
      if (
        !name ||
        !email ||
        !phoneNumber ||
        !street ||
        !city ||
        !zip 
      ) {
        setError("All fields are required.");
        toast({
          title: "Validation Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
        return;
      }

      const address = { street, city, zip };
      const vendorData = { name, email, phoneNumber, address };

      const response = await createVendor(vendorData).unwrap();

      console.log("Response: ", response);
      

      toast({
        title: "Vendor Created",
        description: `Vendor "${name}" was successfully created.`,
      });

      resetForm();
      navigate("/vendors");
    } catch (err) {
      const message = err?.data?.message || "Failed to create vendor.";
      setError(message);

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return {
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
    error,
    setError,
    isLoading,
    handleCreateVendor,
    resetForm,
  };
};
