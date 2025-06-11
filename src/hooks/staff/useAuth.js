import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/user/userSlice";
import { setCredentials } from "../../features/auth/authApiSlice";
import { useToast } from "../../hooks/use-toast";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && window.location.pathname === "/") {
      navigate("/vendors");
    }
  }, [navigate, userInfo]);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      alert("Please fill in all fields.");
      return;
    }

    const payload = { email, password };
    setError("");

    try {
      const res = await login(payload, { credentials: "include" }).unwrap();

      console.log("Login user: ", res);

      if (res.refreshToken) {
        localStorage.setItem("jwt", res.refreshToken);
      }

      dispatch(setCredentials({ ...res.data }));
      toast({
        title: "Login Successful!",
        description: "Welcome back to Dough Better Records System",
      });

      navigate("/vendors");
    } catch (err) {
      console.error("Login Error:", err);

      let errorMessage = "Something went wrong.";

      if (err?.data?.error?.length > 0) {
        errorMessage = err.data.error.map((e) => e.message).join(", ");
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.error) {
        errorMessage = err.error;
      }

      setError(errorMessage);

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return { loginHandler, error, email, setEmail, password, setPassword };
};
