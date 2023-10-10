import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTemplate from "../template/main-template";
import Home from "../pages/Home";



const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
       
          <Route index element={<MainTemplate><Home /></MainTemplate>} />
          {/* <Route path="elements-produits" element={<AdminTemplate><ElementsProduits /></AdminTemplate>} />
          <Route path="factures" element={<AdminTemplate><Factures /></AdminTemplate>} />
         */}

      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
