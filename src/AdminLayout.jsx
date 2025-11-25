import AdminSidebar from "./components/layouts/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* SIDEBAR */}
      {/* On mobile: absolute (overlays) */}
      {/* On desktop: normal fixed width */}
      <div className="md:w-64">
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
  