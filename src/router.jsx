import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

// user pages
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import CoursesPage from "./pages/CoursesPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import RequestsPage from "./pages/RequestsPage";
import WhyChooseUsPage from "./pages/WhyChooseUsPage";
import PaymentPage from "./pages/PaymentPage";
import CoursePlayerPage from "./pages/CoursePlayerPage";
import MyLearningPage from "./pages/MyLearningPage";
import DashboardPage from "./pages/DashboardPage";

// admin pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import CreateCoursePage from "./pages/admin/CreateCoursePage";
import ManageCoursesPage from "./pages/admin/ManageCoursesPage";
import EditCoursePage from "./pages/admin/EditCoursePage";
import ManageUsersPage from "./pages/admin/ManageUsersPage";
import AdminLayout from "./AdminLayout";


// wrappers
import PrivateRoute from "./routes/PrivateRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

export const router = createBrowserRouter([
  /* =============================
     USER ROUTES (inside AppLayout)
  ============================== */
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "courses", element: <CoursesPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "support", element: <RequestsPage /> },
      { path: "why", element: <WhyChooseUsPage /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "course/:id", element: <CoursePlayerPage /> },
      { path: "dashboard", element: <DashboardPage /> },

      {
        path: "my-learning",
        element: (
          <PrivateRoute>
            <MyLearningPage />
          </PrivateRoute>
        ),
      },
    ],
  },

{
  path: "/admin",
  element: <AdminLoginPage />
},
{
  path: "/admin/login",
  element: <AdminLoginPage />
},


{
  path: "/admin/dashboard",
  element: (
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminDashboardPage />
      </AdminLayout>
    </AdminProtectedRoute>
  ),
},

{
  path: "/admin/courses",
  element: (
    <AdminProtectedRoute>
      <AdminLayout>
        <ManageCoursesPage />
      </AdminLayout>
    </AdminProtectedRoute>
  ),
},

{
  path: "/admin/course/create",
  element: (
    <AdminProtectedRoute>
      <AdminLayout>
        <CreateCoursePage />
      </AdminLayout>
    </AdminProtectedRoute>
  ),
},

{
  path: "/admin/course/:id",
  element: (
    <AdminProtectedRoute>
      <AdminLayout>
        <EditCoursePage />
      </AdminLayout>
    </AdminProtectedRoute>
  ),
},

{
  path: "/admin/users",
  element: (
    <AdminProtectedRoute>
      <AdminLayout>
        <ManageUsersPage />
      </AdminLayout>
    </AdminProtectedRoute>
  ),
},


]);
  