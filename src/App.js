import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; // Adjust the path according to your project structure
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home"; // Adjust the path according to your project structure
import { UserProvider } from "./context/UserContext"; // Adjust the path according to your project structure

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/home" element={<Home />} />
        </Routes>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
