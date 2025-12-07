import React, { useState } from 'react';
import PaymentList from '../components/PaymentList';
import PaymentForm from '../components/PaymentForm';

function Payment() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [inputTerm, setInputTerm] = useState(''); // Input field එකේ අගය
  const [finalSearchTerm, setFinalSearchTerm] = useState(''); // PaymentList එකට යවන අගය

  const handlePaymentAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSearchClick = () => {
    // Search Button එක එබුවම විතරක් finalSearchTerm එක update වෙනවා
    setFinalSearchTerm(inputTerm);
  };

  // අමතර දෙයක්: Input එකේ Enter ගැහුවත් Search වෙන්න හැදුවා (User Experience එකට හොඳයි)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSearchClick();
    }
  };

  return (
    <div className="inventory-page">
      <h1 className="page-title">Payment Management</h1>

      {/* Search Bar (Search by Order ID) */}
      <div className="inventory-search-group">
        <input
          type="number"
          placeholder="Search by Order ID..."
          className="inventory-search-input"
          value={inputTerm}
          onChange={(e) => setInputTerm(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>

      {/* Split Layout */}
      <div className="inventory-content">
        <div className="inventory-form-section">
          <PaymentForm onPaymentAdded={handlePaymentAdded} />
        </div>

        <div className="inventory-list-section">
          
          {/* මෙතන දැන් යවන්නේ finalSearchTerm එක. 
              ඒ නිසා Type කරද්දිම ලිස්ට් එක වෙනස් වෙන්නේ නෑ. 
              Search Button එක එබුවම විතරයි වෙනස් වෙන්නේ. */}
              
          <PaymentList
            refreshKey={refreshKey}
            searchTerm={finalSearchTerm} 
          />
        </div>
      </div>
    </div>
  );
}

export default Payment;