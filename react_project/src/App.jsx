import { Routes, Route, useLocation, useNavigate, Router } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

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
import Topbar from './components/Main/Topbar/Topbar';
import Footer from './components/Main/Footer';
import Navbar from './components/Main/Navbar';
import HomeHeader from './components/Main/HomeHeader';
import DefaultHeader from './components/Main/DefaultHeader';
import Logout from './components/Main/Logout';
import AuthGuard from './Guards/AuthGuard';
import usePersistedState from './hooks/usePersistedState';
import { loginValidator, registerValidator } from './services/validators';
import { ToastContainer } from 'react-toastify';
import * as toast from "./Toasts/toastsMsg";
import AuthModal from './components/Main/Modals/AuthModal';
import Register from './components/Main/Modals/Register';
import Login from './components/Main/Modals/Login';
import { UserProfile } from './components/UserProfile/UserProfile';


const CurrentPath = () => {
  const location = useLocation();

  // useEffect(() => {
  //   console.log('Текущ път:', location.pathname);
  // }, [location]);

  return null; 
};

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState({})
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const loginSubmitHandler = async (values) => {
    try {
      loginValidator(values);

      const result = await authService.login(values.email, values.password);
      if (result.name === 'Error') throw new Error(result.message, { toastId: "loginError" });

      setAuth(result);
      localService.setItem(result);
      toast.showSuccessToast("Login Successfull!", { toastId: "loginSuccess" });
      navigate('/');

    } catch (error) {
      // alert(error.message);
      toast.showErrorToast(error.message, { toastId: "loginError" });
      return
    }
  };

  const handleScroll = () => {
  let scrollThreshold = 0;

  if(location.pathname == '/'){
    scrollThreshold = 1000;
  } else {
    scrollThreshold = 400;
  }

    if (window.scrollY >= scrollThreshold) {
      setIsAuthModalOpen(true);
    } else {
      setIsAuthModalOpen(false);
    }
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const registerSubmitHandler = async (values) => {
    try {
      // console.log('values', values);
      registerValidator(values);
      values.imageUrl = '';
      
      const keysToLowerCase = obj => {
        return Object.keys(obj).reduce((acc, key) => {
          acc[key.toLowerCase()] = obj[key];
          return acc;
        }, {});
      };

      const newValues = keysToLowerCase(values);
      const result = await authService.register(newValues);
      setAuth(result);
      localService.setItem(result);
      toast.showSuccessToast("Registration Successfull!", { toastId: "registerSuccess" });

      navigate('/');

    } catch (error) {
      toast.showErrorToast(error.message, { toastId: "registerError" });
      return
    }
  }

  function updateHandler(value){
    setAuth(value);
  }

  const logoutHandler = () => {
    try {
      setAuth({});
      localStorage.removeItem('userData');
      toast.showSuccessToast("Logout Successfull!", { toastId: "logoutSuccess" });
      navigate('/');
    } catch (error) {
      toast.showErrorToast(error.message, { toastId: "logoutError" });
      localStorage.removeItem('userData');
      navigate('/');
    }

  }

  const pageTitles = {
    '/about': 'About',
    '/service': 'Service',
    '/contact': 'Contact',
    '/team': 'Team',
    '/feature': 'Feature',
    '/appointment': 'Appointment',
    '/testimonial': 'Testemonial',
    '/userProfile': 'User Profile',
    '/404': '404 Error'
  };


  // home header is different than all other pages, they use default header and we set their titles also
  const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const title = pageTitles[currentPath] || '404 Error';
    return currentPath === '/' ? <HomeHeader /> : <DefaultHeader title={title} />;
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    updateHandler,
    logoutHandler,
    username: auth.name || auth.username ? auth.name || auth.username || auth.email.split('@')[0]: 'guest',
    email: auth.email,
    userId: auth._id,
    isAuthenticated: !!auth.accessToken
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
        <Navbar handleCloseAuthModal={handleCloseAuthModal}/>
        <Header />
        
          {!values.isAuthenticated && isAuthModalOpen && <AuthModal onClose={handleCloseAuthModal} />}
        
        <CurrentPath />
        <Login />
        <Register />

        <Routes>
          <Route path="/" element={<><HomePage /></>} />
          
          <Route path="/userProfile" element={<AuthGuard><UserProfile /></AuthGuard>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<AuthGuard><ServicePage /></AuthGuard>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/feature" element={<FeaturePage />} />
          <Route path="/appointment" element={<AuthGuard><AppointmentPage /></AuthGuard>} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/logout" element={<AuthGuard><Logout /></AuthGuard>} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
          
        <Footer />

        <ToastContainer
          progressClassName="toastProgress"
          bodyClassName="toastBody"
        />
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
