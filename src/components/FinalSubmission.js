import React, { useState, useEffect } from 'react';

const FinalSubmission = ({ finalProducts, onFinalSubmission }) => {
  const [companyData, setCompanyData] = useState({
    companyName: '',
    mobileNumber: '',
    email: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [id]: value
    }));
  };

const sendWhatsAppMessage = () => {
  const now = new Date();
  const dateTime = now.toLocaleString();
  
  let message = `🧾 *New Product Procurement* \n\n`;
  message += `🏢 Company: ${companyData.companyName}\n`;
  message += `📞 Mobile: ${companyData.mobileNumber}\n`;
  message += `📧 Email: ${companyData.email}\n`;
  message += `🕒 Time: ${dateTime}\n\n`;
  message += `🛍 *Products Ordered:*\n`;
  
  finalProducts.forEach(item => {
    message += `- ${item.name}: ${item.count}\n`;
  });

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/9094751218?text=${encodedMessage}`;
  
  // Most direct method - replaces current window
  window.location.href = whatsappURL;
};
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!companyData.companyName || !companyData.mobileNumber || !companyData.email) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    // Set submitted state
    setSubmitted(true);
    setShowThankYou(true);
    
    // Send WhatsApp message directly
    sendWhatsAppMessage();
    
    // Call parent cleanup function
    onFinalSubmission(companyData);
  };

  // Auto-redirect after form submission
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        // Any additional cleanup if needed
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div>
      <h2>Final Submitted Data:</h2>

      <table className="final-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {finalProducts.length > 0 ? (
            finalProducts.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data submitted.</td>
            </tr>
          )}
        </tbody>
      </table>

      <hr />

      <h3>Company & Contact Details</h3>
      
      {!submitted ? (
        <form id="companyForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name:
            </label>
            <input
              type="text"
              id="companyName"
              className="form-control"
              placeholder="Enter company name"
              value={companyData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="mobileNumber"
              className="form-control"
              placeholder="Enter mobile number"
              value={companyData.mobileNumber}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={companyData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Procured Your Product
          </button>
        </form>
      ) : (
        <div className="thank-you-message">
          ✅ Thank you for booking! Your order has been submitted to WhatsApp successfully.
          <br />
          <small>Redirecting to homepage in 3 seconds...</small>
        </div>
      )}
    </div>
  );
};

export default FinalSubmission;