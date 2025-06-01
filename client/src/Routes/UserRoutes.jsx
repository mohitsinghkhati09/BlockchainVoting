import React from 'react';
import { Route } from "react-router-dom";

// Your existing page imports
import UserLogin from "../Pages/UserLogin";
import UserRegister from "../Pages/UserRegister";
import Home from "../Pages/Home"; // Your original Home component
import Election from "../Pages/Election";
import ViewElection from "../Pages/ViewElection";
import ResultElection from "../Pages/ResultElection";
import ResultCandidate from "../Pages/ResultCandidate";
import Login from "../Pages/Login";

// Your global Navbar and Footer
import Navbar from "../Components/User/Navbar";
import Footer from "../Components/User/Footer";

// Import the NEW page components for forms, services, faqs
import FormsPage from "../Pages/FormsPage";     // You'll need to create this
import ServicesPage from "../Pages/ServicesPage"; // You'll need to create this
import FaqsPage from "../Pages/FaqsPage";       // You'll need to create this
import NotFoundPage from '../Pages/NotFoundPage'; // Good practice to have a 404

import Form6DetailPage from "../Pages/Forms/Form6DetailPage";
import Form6ADetailPage from "../Pages/Forms/Form6ADetailPage";
import Form6BDetailPage from "../Pages/Forms/Form6BDetailPage";
import Form7DetailPage from "../Pages/Forms/Form7DetailPage";
import Form8DetailPage from "../Pages/Forms/Form8DetailPage";

export const userRoutes = [
  // --- EXISTING ROUTES (UNCHANGED) ---
  <Route
    path="/"
    key="home"
    element={
      <>
        {/* Assuming your original Home.jsx might be structured differently
            or you might decide to add Navbar/Footer here if it doesn't have its own.
            If Home.jsx is self-contained with its own Nav/Footer like NewHomePage,
            then you'd just have <Home />.
            Based on your provided structure, it seems Home might be a content component.
            If your original Home page needs the global Navbar/Footer, include them:
        */}
        {/* <Navbar /> */}
        <Home />
        {/* <Footer /> */}
      </>
    }
  />,
  <Route
    path="/login"
    key="login"
    element={
      <>
        <Navbar />
        <Login />
        <Footer />
      </>
    }
  />,
  <Route path="/election" key="election-group"> {/* Changed key for clarity */}
    <Route
      index
      key="election-index"
      element={
        <>
          <Navbar />
          <Election />
          <Footer />
        </>
      }
    />
    <Route
      path=":id"
      key="election-detail"
      element={
        <>
          <Navbar />
          <ViewElection />
          <Footer />
        </>
      }
    />
  </Route>,
  <Route path="/result" key="result-group"> {/* Changed key for clarity */}
    <Route
      index
      key="result-index"
      element={
        <>
          <Navbar />
          <ResultElection />
          <Footer />
        </>
      }
    />
    <Route
      path=":id"
      key="result-detail"
      element={
        <>
          <Navbar />
          <ResultCandidate />
          <Footer />
        </>
      }
    />
 </Route>,
        <Route path="/user-login" key="user-login" element={<UserLogin />} />,
        <Route path="/register" key="register" element={<UserRegister />} />,

  // --- NEW ROUTES FOR FORMS, SERVICES, FAQS ---
  <Route
    path="/forms"
    key="forms-page"
    element={
      <>
        <Navbar />
        <FormsPage />
        <Footer />
      </>
    }
  />,
  <Route
    path="/services"
    key="services-page"
    element={
      <>
        <Navbar />
        <ServicesPage />
        <Footer />
      </>
    }
  />,
  <Route
    path="/faqs"
    key="faqs-page"
    element={
      <>
        <Navbar />
        <FaqsPage />
        <Footer />
      </>
    }
  />,

  <Route
    path="/forms/form-6"
    key="form-6-detail"
    element={
      <>
        
        <Form6DetailPage />
        
      </>
    }
  />,
  <Route
    path="/forms/form-6a"
    key="form-6a-detail"
    element={
      <>
        <Navbar />
        <Form6ADetailPage />
        <Footer />
      </>
    }
  />,
  <Route
    path="/forms/form-6b"
    key="form-6b-detail"
    element={
      <>
        <Navbar />
        <Form6BDetailPage />
        <Footer />
      </>
    }
  />,
  <Route
    path="/forms/form-7"
    key="form-7-detail"
    element={
      <>
        <Navbar />
        <Form7DetailPage />
        <Footer />
      </>
    }
  />,
  <Route
    path="/forms/form-8"
    key="form-8-detail"
    element={
      <>
        <Navbar />
        <Form8DetailPage />
        <Footer />
      </>
    }
  />,

  // It's good practice to have a catch-all 404 route at the end
  <Route path="*" key="not-found" element={
      <>
        <Navbar /> {/* Optional: Navbar on 404 page */}
        <NotFoundPage />
        <Footer /> {/* Optional: Footer on 404 page */}
      </>
    }
  />,
];