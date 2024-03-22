import React from "react";
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

//Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Parks, { parksLoader } from "./pages/Parks";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import ParkProfile, { parkProfileLoader } from "./pages/ParkProfile";

//Layouts
import RootLayout from "./layouts/RootLayout";

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <RootLayout />}>

      <Route index element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="map" element={<Map />} />
      <Route 
        path="parks" 
        element={<Parks />} 
        loader={parksLoader} 
        />
      <Route 
        path="park/:parkId" 
        element={<ParkProfile />} 
        loader={parkProfileLoader}
        />
      <Route path="profile" element={<Profile />} />
      <Route path="edit" element={<EditProfile />} />
      <Route path="contact" element={<Contact />} />
      <Route path="faqs" element={<FAQs />} />

    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
