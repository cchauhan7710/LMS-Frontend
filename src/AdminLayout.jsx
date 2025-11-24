// import AdminSidebar from "../components/admin/AdminSidebar";
import AdminSidebar from "./components/layouts/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="w-64 h-screen fixed left-0 top-0 bg-gray-900 text-white">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="ml-64 w-full h-screen overflow-y-auto bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}
