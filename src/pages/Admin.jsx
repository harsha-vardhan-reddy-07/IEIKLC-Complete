import React, { useEffect } from 'react'
import OtherNav from '../components/OtherNav'
import '../styles/Admin.css'
import AdminHero from '../components/admin/AdminHero'
import Authorities from '../components/admin/Authorities'
import AdminAmenities from '../components/admin/AdminAmenities'
import AdminEvents from '../components/admin/AdminEvents'
import AdminUpcommingEvents from '../components/admin/AdminUpcommingEvents'
import AdminContact from '../components/admin/AdminContact'
import AdminMembers from '../components/admin/AdminMembers'
import AdminNav from '../components/AdminNav'
import { useNavigate } from 'react-router-dom'



const Admin = () => {



  const navigate = useNavigate()

  useEffect(() => {

    if (localStorage.getItem('email') !="ieiklc@ieikadapa.org"  ) {
      window.location.href = '/authenticate';
    }
  }, [localStorage]);




  return (

    <div>

      <AdminNav />

      <div className="admin_page">

        <div className="admin_head">
          <h1>Welcome Admin!!</h1>
        </div>

        <AdminHero />
        <Authorities />
        <AdminMembers />
        <AdminAmenities />
        <AdminEvents />
        <AdminUpcommingEvents />

      </div>

    </div>
  )
}

export default Admin