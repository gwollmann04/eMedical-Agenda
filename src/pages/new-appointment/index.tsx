import { Header } from '@/src/components/Header'
import { Footer } from '@/src/components/Footer'
import { NavBar } from '@/src/components/NavBar'
import { NewAppointmentForm } from '@/src/components/NewAppointmentForm'
import { AppointmentsTableType } from '@/src/@types/appointments'
import { extractFileData, buildFilePath } from '@/src/helpers/apiHandlers'

export default function NewAppointment({
  appointments,
  doctors,
}: AppointmentsTableType) {
  return (
    <>
      <Header />
      <div className="d-flex">
        <NavBar />
        <NewAppointmentForm appointments={appointments} doctors={doctors} />
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const filePath = buildFilePath('appointments')
  const appointmentsData = extractFileData(filePath)
  const doctorsFilePath = buildFilePath('doctors')
  const doctorsData = extractFileData(doctorsFilePath)
  return {
    props: {
      appointments: appointmentsData,
      doctors: doctorsData,
    },
  }
}
