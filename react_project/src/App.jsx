import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import * as authService from './services/authService'
import AuthContext from './contexts/authContext';
import * as localService from './services/localStorageService';

import HomePage from './components/HomePage/HomePage'
import AboutPage from './components/AboutPage/AboutPage';
import TestimonialPage from './components/TestimonialPage/TestimonialPage';
import ServicePage from './components/ServicePage/ServicePage';
import ContactPage from './components/ContactPage/ContactPage';
import TeamPage from './components/TeamPage/TeamPage';
import FeaturePage from './components/FeaturePage/FeaturePage';
import AppointmentPage from './components/AppointmentPage/AppointmentPage';
import ErrorPage from './components/Main/404';
import Topbar from './components/Main/Topbar';
import Footer from './components/Main/Footer';
import Navbar from './components/Main/Navbar';
import HomeHeader from './components/Main/HomeHeader';
import DefaultHeader from './components/Main/DefaultHeader';


function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});


  useEffect(()=> {
    
  },[])


  const loginSubmitHandler = async (values) => {
    try {
      const result = await authService.login(values.email, values.password);

      setAuth(result);

      navigate('/');

    } catch (error) {
      alert(error);
      console.log('error', error);
    }

  
    // console.log(result);
  };

  const registerSubmitHandler = async (values) => {
    try {
      const result = await authService.register(values.email, values.password)

      setAuth(result);

      navigate('/');
    } catch (error) {

      alert(error);
      console.log('error', error);
    }

   
    // console.log(values);
  }



  const pageTitles = {
    '/about': 'About',
    '/service': 'Service',
    '/contact': 'Contact',
    '/team': 'Team',
    '/feature': 'Feature',
    '/appointment': 'Appointment',
    '/testimonial': 'Testemonial',
    '/login': 'Login',
    '/register': 'Register',
    '/404': '404 Error'
  };


  // home header is different - all other pages use default header and set their titles also
  const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const title = pageTitles[currentPath] || '404 Error';
    return currentPath === '/' ? <HomeHeader /> : <DefaultHeader title={title} />;
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.email
  }

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

      <AuthContext.Provider value={values}>

        <Topbar />
        <Navbar />
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/feature" element={<FeaturePage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />

      </AuthContext.Provider>

      {/* Back to Top Arrow*/}
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
