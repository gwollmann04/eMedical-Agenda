import { Header } from '@/src/components/Header'
import { Footer } from '@/src/components/Footer'
import { NavBar } from '@/src/components/NavBar'
import { AppointmentsTable } from '@/src/components/AppointmentsTable'
import { AppointmentsTableType } from '@/src/@types/appointments'

import { buildFilePath, extractAppointmentstData } from '../api/appointments';



export default function Appointments({appointments}: AppointmentsTableType) {
  return (
    <>
      <Header />
      <div className='d-flex'>
      <NavBar />
      <AppointmentsTable appointments={appointments}/>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const filePath = buildFilePath();
  const data = extractAppointmentstData(filePath)
  return {
    props: {
      appointments: data,
    },
  };
}