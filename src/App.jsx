import React from 'react';
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header />
      <main className="flex-grow">
        <Form />
      </main>
      <Footer />
    </div>
  );
}

export default App;
