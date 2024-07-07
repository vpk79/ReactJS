import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage'
import AboutPage from './components/AboutPage/AboutPage';
import TestimonialPage from './components/TestimonialPage/TestimonialPage';
import ServicePage from './components/ServicePage/ServicePage';
import ContactPage from './components/ContactPage/ContactPage';
import TeamPage from './components/TeamPage/TeamPage';
import FeaturePage from './components/FeaturePage/FeaturePage';

function App() {
  const [count, setCount] = useState(0);



  return (
    <>

      {/* Spinner Start */}
      {/* <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-grow text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}
      {/* Spinner End */}


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/feature" element={<FeaturePage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
      </Routes>

      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
      >
        <i className="bi bi-arrow-up" />
      </a>


    </>
  )
}

export default App
