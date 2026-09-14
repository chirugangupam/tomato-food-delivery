import React, { useContext } from "react";
import "./Toast.css";
import { StoreContext } from "../../context/StoreContext";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

const Toast = () => {
  const { toasts } = useContext(StoreContext);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-${toast.type} animate-pop-in`}>
          <div className="toast-icon">
            {toast.type === "success" && <CheckCircle2 size={18} />}
            {toast.type === "error" && <AlertTriangle size={18} />}
            {toast.type === "info" && <Info size={18} />}
          </div>
          <div className="toast-text">{toast.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
