import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import Orders from "./components/Orders";

function App() {
  return (
    <div className="App">
      <Layout title="Orders">
        <Orders />
      </Layout>
    </div>
  );
}

export default App;
