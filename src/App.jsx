import React from "react";
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

//Pages
import Login from "./pages/Login";
import Home, { profileLoader } from "./pages/Home";
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
      <Route 
        path="home" 
        element={<Home />} 
        loader={profileLoader}
        />
      <Route path="map" element={<Map/>} />
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
      <Route path="profile/:profileId" element={<Profile />} />
      <Route path="edit" element={<EditProfile />} />
      <Route path="contact" element={<Contact />} />
      <Route path="faqs" element={<FAQs />} />

    </Route>
  )
)

function App() {
  const dispatch = useDispatch();
  const sessionCheck = async () => {
    const res = await axios.get('/api/session-check')
    if (res.data.success) {
        dispatch({
            type: 'USER_AUTH',
            payload: {
                userId: res.data.userId,
                username: res.data.username,
                password: res.data.password,
                bio: res.data.bio,
                userPic: res.data.userPic
            }
        });
    };
};

useEffect(() => {
    sessionCheck()
}, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
