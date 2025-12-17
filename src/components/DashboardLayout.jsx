"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { LogOut, Menu, Bell, ChevronRight } from "lucide-react"

const DashboardLayout = ({ children, menuItems }) => {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-corporate-50 flex font-sans">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-corporate-900 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 flex flex-col
      `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-corporate-800 bg-corporate-900">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
            <span className="font-bold text-white text-sm">CN</span>
          </div>
          <span className="font-semibold text-lg tracking-wide">ERP System</span>
        </div>

        {/* User Profile Mini */}
        <div className="p-4 border-b border-corporate-800 bg-corporate-800/50">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-primary-500"
            />
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.roleLabel}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((menu, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${
                  menu.active
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-900/20"
                    : "text-gray-400 hover:bg-corporate-800 hover:text-white"
                }
              `}
            >
              <menu.icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{menu.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-corporate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 text-gray-500 overflow-hidden">
            <span className="hidden md:inline truncate">CV. Cemilan Nusantara</span>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-corporate-900 truncate">{user.roleLabel}</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-primary-600 transition relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
