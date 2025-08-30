import React from 'react';
import AdminMenu from '../../../components/adminPagesComponents/adminlayout/AdminMenu';
import AdminHeader from '../../../components/adminPagesComponents/adminlayout/AdminHeader';
import Footer from '../../common/Footer';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      
      <div className="fixed top-0 left-0 h-screen overflow-y-auto z-50">
        <AdminMenu />
      </div>

     
      <div className="flex-1 ml-0 sm:ml-10 lg:ml-[250px]  sm:mt-10 overflow-y-auto">
        
        <div className="fixed top-0 left-0 w-full z-50">
          <AdminHeader />
        </div>

        
        <div className="p-4  sm:mt-20 ml-10">
          <Outlet />
        </div>

        
      </div>
    </div>
  );
}

export default AdminLayout;