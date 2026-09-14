import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { CheckCircle2, AlertCircle } from "lucide-react";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, addToast } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        addToast("🎉 Payment verified! Your order is being prepared.", "success");
        navigate("/myorders");
      } else {
        addToast("Payment was not completed.", "error");
        navigate("/");
      }
    } catch (error) {
      console.error("Verification error:", error);
      // Fallback
      addToast("Order recorded.", "info");
      navigate("/myorders");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify animate-fade-in">
      <div className="verify-card">
        <div className="verify-spinner"></div>
        <h2>Verifying Payment Status</h2>
        <p>Please wait while we secure and confirm your transaction...</p>
      </div>
    </div>
  );
};

export default Verify;
