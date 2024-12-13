import React from 'react';
import Header from './compoment/Header.js';
import BookingForm from './compoment/BookingForm.js';
import Footer from './compoment/Footer.js';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ width: '100vw', height: '100vh' }}>
    <div className="App">
      <Header />
      <main className="booking-section">
        <h1><main className="datban-section">ĐẶT BÀN</main></h1>
        <p>LIÊN HỆ ĐẶT BÀN</p>
        <BookingForm />
      </main>
      <Footer />
    </div>
    </div>
    </div>
  );
}

export default App;
