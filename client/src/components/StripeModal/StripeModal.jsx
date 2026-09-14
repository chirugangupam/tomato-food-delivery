import React, { useState } from "react";
import "./StripeModal.css";
import { CreditCard, Lock, ShieldCheck, CheckCircle2, X, Sparkles } from "lucide-react";

const StripeModal = ({ orderData, onComplete, onCancel }) => {
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("888");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onComplete(true);
      }, 1200);
    }, 1800);
  };

  return (
    <div className="stripe-modal-overlay">
      <div className="stripe-backdrop" onClick={!processing ? onCancel : undefined}></div>
      
      <div className="stripe-card-modal animate-pop-in">
        <div className="stripe-modal-header">
          <div className="stripe-brand">
            <span className="stripe-logo-text">stripe</span>
            <span className="stripe-checkout-tag">Secure Checkout</span>
          </div>
          {!processing && (
            <button className="stripe-close" onClick={onCancel}>
              <X size={18} />
            </button>
          )}
        </div>

        {success ? (
          <div className="stripe-success-view animate-fade-in">
            <div className="success-check-circle">
              <CheckCircle2 size={48} />
            </div>
            <h3>Payment Confirmed!</h3>
            <p>Your transaction of <strong>₹{orderData?.amount?.toFixed(2)}</strong> was successful.</p>
            <span className="redirect-note">Redirecting to order tracking...</span>
          </div>
        ) : (
          <form onSubmit={handlePay} className="stripe-form">
            <div className="stripe-amount-banner">
              <div>
                <p className="amount-label">Amount Due</p>
                <h2 className="amount-val">₹{orderData?.amount?.toFixed(2)}</h2>
              </div>
              <div className="stripe-badge">
                <ShieldCheck size={16} />
                <span>Test Mode</span>
              </div>
            </div>

            <div className="card-mockup-visual">
              <div className="card-chip"></div>
              <div className="card-digits">{cardNumber}</div>
              <div className="card-meta">
                <div>
                  <span className="card-meta-label">CARD HOLDER</span>
                  <p className="card-meta-val">{orderData?.address?.firstName || "Alex"} {orderData?.address?.lastName || "Johnson"}</p>
                </div>
                <div>
                  <span className="card-meta-label">EXPIRES</span>
                  <p className="card-meta-val">{expiry}</p>
                </div>
              </div>
            </div>

            <div className="stripe-inputs">
              <div className="form-field">
                <label>Card Number</label>
                <div className="field-input-box">
                  <CreditCard size={18} className="field-icon" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    required
                  />
                  <span className="card-brand-badge">VISA</span>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Expiration</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM / YY"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>CVC / CVV</label>
                  <div className="field-input-box">
                    <Lock size={15} className="field-icon" />
                    <input
                      type="password"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="stripe-pay-btn" disabled={processing}>
              {processing ? (
                <div className="pay-loader">
                  <span className="spinner"></span>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="pay-label">
                  <Lock size={16} />
                  <span>Pay ₹{orderData?.amount?.toFixed(2)}</span>
                </div>
              )}
            </button>

            <div className="stripe-security-footer">
              <Lock size={13} />
              <span>Guaranteed safe & 256-bit encrypted checkout</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StripeModal;
