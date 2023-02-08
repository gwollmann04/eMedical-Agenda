import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

import { AppointmentsTableType } from '@/src/@types/appointments'

import { DeleteModal, EditModal } from '../Modals'

import {
  validateDate,
  validatePatientName,
  validateDoctorName,
  validateDayAvailable,
} from '@/src/helpers/validators'

const APPOINTMENTS_TABLE_HEADER = [
  'Nº da consulta',
  'Paciente',
  'Médico(a)',
  'Data e hora',
  '',
]

const AppointmentsTable = ({
  appointments,
  doctors,
  filterByDoctor,
  doctorNameToFilter,
}: AppointmentsTableType) => {
  const [appointment, setAppointment] = useState()
  const [allAppointments, setAllAppointments] = useState(appointments)
  const [isNameInvalid, setNameIsInvalid] = useState(false)
  const [isDoctorInvalid, setDoctorIsInvalid] = useState(false)
  const [dateIsInvalid, setDateIsInvalid] = useState(false)
  const [dateIsUnavailable, setDateIsUnavailable] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  const patientNameInputRef = useRef()
  const doctorNameInputRef = useRef()

  const filteredAppointments = filterByDoctor
    ? allAppointments?.filter(
        (appointment) => appointment.doctorName === doctorNameToFilter,
      )
    : allAppointments

  const handleDelete = () => {
    fetch(`/api/appointments/${appointment?.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => setAllAppointments(data?.appointmentData))

    toast.success('Consulta excluída com sucesso!')
  }

  const handleEdit = (event: any) => {
    event.preventDefault()
    const patientName = patientNameInputRef?.current?.value
    const doctorName = doctorNameInputRef?.current?.value

    const isInvalidaDate = validateDate(startDate)
    setDateIsInvalid(isInvalidaDate)

    const isInvalidaPatientName = validatePatientName(patientName)
    setNameIsInvalid(isInvalidaPatientName)

    const isInvalidaDoctorName = validateDoctorName(doctorName)
    setDoctorIsInvalid(isInvalidaDoctorName)

    const getDoctorName = doctors.find(
      (doctor) => doctor.id === Number(doctorName),
    )

    const isUnavailableDate = validateDayAvailable(
      startDate,
      allAppointments,
      getDoctorName,
    )
    setDateIsUnavailable(isUnavailableDate)

    if (
      isInvalidaDate ||
      isInvalidaPatientName ||
      isInvalidaDoctorName ||
      isUnavailableDate
    )
      return

    const appointmentData = {
      doctorName: getDoctorName?.doctorName,
      patientName: patientName,
      date: startDate,
    }

    fetch(`/api/appointments/${appointment?.id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setAllAppointments(data?.appointmentData))

    toast.success('Consulta alterada com sucesso!')
  }

  return (
    <div className="table table-hover table-fixed p-5">
      <table className="table">
        <thead>
          <tr>
            {APPOINTMENTS_TABLE_HEADER.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredAppointments?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.patientName}</td>
              <td>{item.doctorName}</td>
              <td>{format(new Date(item.dateTime), 'dd/MM/yyyy - HH:mm')}</td>
              <td
                className="d-flex justify-content-end border-bottom-0"
                style={{
                  cursor: 'pointer',
                }}
              >
                <i
                  className="fs-5 bi-pen me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => setAppointment(item)}
                />
                <i
                  className="fs-5 bi-trash"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                  onClick={() => setAppointment(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditModal
        handleEdit={handleEdit}
        patientNameInputRef={patientNameInputRef}
        doctorNameInputRef={doctorNameInputRef}
        doctors={doctors}
        startDate={startDate}
        setStartDate={setStartDate}
        isNameInvalid={isNameInvalid}
        isDoctorInvalid={isDoctorInvalid}
        dateIsInvalid={dateIsInvalid}
        dateIsUnavailable={dateIsUnavailable}
      />

      <DeleteModal handleDelete={handleDelete} />
    </div>
  )
}

export default AppointmentsTable
