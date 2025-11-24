import "./App.css"; 
import React, { useState, useEffect } from 'react';
import Navbar from './components/layouts/Navbar';
import LandingPage from './pages/LandingPage';
// import CoursesPage from './pages/CoursesPage';
import CoursesPage from './pages/CoursesPage';
import AuthPage from './pages/AuthPage';
import Footer from './components/layouts/Footer';
import Sidebar from './components/layouts/Sidebar';
// import DashboardPage from './pages/DashboardPage';
// import MyCoursesPage from './pages/MyCoursesPage';
import MyCoursesPage from './pages/BookManagementPage';
// import SupportPage from './pages/SupportPage';
import SupportPage from './pages/RequestsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminSidebar from './components/layouts/AdminSidebar';




const App = () => {

   
    const [view, setView] = useState('home');
    const [auth, setAuth] = useState({ token: null, userType: null });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // For desktop
    const [history, setHistory] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    
    useEffect(() => {
        if (window.__initial_auth_token) {
            setAuth({ token: window.__initial_auth_token, userType: 'user' });
            setView('dashboard');
        }
    }, []);

    const navigate = (newView) => {
        if (view !== newView) {
            setHistory(prev => [...prev, view]);
        }
        setView(newView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        if (history.length > 0) {
            const previousView = history[history.length - 1];
            setHistory(prev => prev.slice(0, -1));
            setView(previousView);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSignInSuccess = (token) => {
        setAuth({ token, userType: 'user' });
        window.__initial_auth_token = token;
        navigate('dashboard');
    };

    const handleSignUpSuccess = (token) => {
        setAuth({ token, userType: 'user' });
        window.__initial_auth_token = token;
        navigate('courses');
    };
    
    const handleAdminSignInSuccess = (token) => {
        setAuth({ token, userType: 'admin' });
        navigate('admin-dashboard');
    };

    const handleSignOut = () => {
        const wasAdmin = auth.userType === 'admin';
        setAuth({ token: null, userType: null });
        delete window.__initial_auth_token;
        navigate(wasAdmin ? 'admin-login' : 'home');
    };

    // --- Cart Functions ---
    const addToCart = (course) => {
        setCartItems(prevItems => {
            const isItemInCart = prevItems.find(item => item.id === course.id);
            if (isItemInCart) {
                return prevItems; // Item already in cart
            }
            return [...prevItems, course];
        });
    };

    const removeFromCart = (courseId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== courseId));
    };

    const clearCart = () => {
        setCartItems([]);
    };
    // --- End Cart Functions ---

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleCollapse = () => setIsSidebarCollapsed(prev => !prev);

    const renderView = () => {
        const pageProps = { navigate, handleBack, history };
        const authStatus = !!auth.token;
        
        switch (view) {
            case 'home':
                return <LandingPage {...pageProps} />;
            case 'courses':
                return <CoursesPage {...pageProps} authStatus={authStatus} addToCart={addToCart} />;
            case 'about':
                return <AboutPage {...pageProps} />;
            case 'why-choose-us':
                return <WhyChooseUsPage {...pageProps} />;
            case 'cart':
                return <CartPage {...pageProps} cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />;
            case 'sign-in':
                return <AuthPage {...pageProps} title='Login' onAuthSuccess={handleSignInSuccess} />;
            case 'sign-up':
                return <AuthPage {...pageProps} title='Sign Up' onAuthSuccess={handleSignUpSuccess} />;
            case 'dashboard':
                return <DashboardPage navigate={navigate} />;
            case 'my-courses':
                return <MyCoursesPage navigate={navigate} />;
            case 'support':
                return <SupportPage navigate={navigate} />;
            case 'profile':
                return <ProfilePage navigate={navigate} />;
            // Admin Views
            case 'admin-dashboard':
                return <AdminDashboardPage navigate={navigate} />;
            case 'admin-courses':
            case 'admin-users':
                return <div className="p-8 md:p-12"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage {view.split('-')[1]}</h1><p className="text-gray-600 dark:text-gray-400 mt-2">This page is under construction.</p></div>;
            default:
                return <LandingPage {...pageProps} />;
        }
    };

    const isAdminView = view.startsWith('admin-');
    const authStatus = !!auth.token;

    if (isAdminView) {
        if (auth.userType === 'admin') {
            return (
                 <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-['Inter'] min-h-screen flex">
                    <AdminSidebar 
                        navigate={navigate}
                        handleSignOut={handleSignOut}
                        currentView={view}
                    />
                    <main className="grow overflow-y-auto">
                          {renderView()}
                    </main>

                </div>
            );
        }
        return <AdminLoginPage onAuthSuccess={handleAdminSignInSuccess} navigate={navigate} />;
    }


    const isCoursePlayerView = view === 'my-courses' && authStatus;

    return (
       <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-['Inter'] min-h-screen">
            
             <div className={`relative flex flex-col min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'}`}>

                {!isCoursePlayerView && (
                    <Navbar 
                        navigate={navigate} 
                        toggleSidebar={toggleSidebar}
                        cartItemCount={cartItems.length}
                    />
                )}
                <main className="grow">
                    {renderView()}
                </main>
                {!isCoursePlayerView && (
                    <Footer 
                        userId={authStatus ? 'user-123' : undefined} 
                        navigate={navigate} 
                        authStatus={authStatus} 
                        handleSignOut={handleSignOut} 
                    />
                )}
            </div>
        </div>
    );
};

export default App;