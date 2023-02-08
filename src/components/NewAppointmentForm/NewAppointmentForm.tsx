import { AppointmentsTable } from '@/src/components/AppointmentsTable'
import { AppointmentsTableType } from '@/src/@types/appointments'
import { useState, useRef } from 'react'
import { toast } from 'react-toastify'

import DatePicker from 'react-datepicker'
import { getDay } from 'date-fns'

import {
  validateDate,
  validatePatientName,
  validateDoctorName,
  validateDayAvailable,
} from '@/src/helpers/validators'

const NewAppointmentForm = ({
  appointments,
  doctors,
}: AppointmentsTableType) => {
  const [allAppointments, setAllAppointments] = useState(appointments)
  const [isNameInvalid, setNameIsInvalid] = useState(false)
  const [isDoctorInvalid, setDoctorIsInvalid] = useState(false)
  const [dateIsInvalid, setDateIsInvalid] = useState(false)
  const [selectedDoctorName, setSelectedDoctorName] = useState('')
  const [dateIsUnavailable, setDateIsUnavailable] = useState(false)
  const [startDate, setStartDate] = useState(new Date())

  const patientNameInputRef = useRef()
  const doctorNameInputRef = useRef()

  const handleDoctorNamgeCHange = (event) => {
    const doctorName = event?.currentTarget?.value
    const getDoctorName = doctors.find(
      (doctor) => doctor.id === Number(doctorName),
    )
    setSelectedDoctorName(getDoctorName?.doctorName)
  }

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const filterPassedTime = (date) => {
    const selectedDate = new Date(date)

    return selectedDate.getHours() > 7 && selectedDate.getHours() <= 19
  }

  const handlePost = (event: any) => {
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

    fetch(`/api/appointments`, {
      method: 'POST',
      body: JSON.stringify(appointmentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setAllAppointments(data?.appointments))

    toast.success('Consulta criada com sucesso!')
  }

  return (
    <div>
      <div className='p-5'>
        <form onSubmit={handlePost}>
          <label htmlFor="text" className="form-label">
            Nome do paciente
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nome e sobrenome"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={patientNameInputRef}
          />
          <label htmlFor="text" className="form-label mt-3">
            Nome do médico
          </label>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            ref={doctorNameInputRef}
            onChange={(event) => handleDoctorNamgeCHange(event)}
          >
            <option>Escolha o(a) médico(a)</option>
            {doctors?.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.doctorName}
              </option>
            ))}
          </select>
          <label htmlFor="text" className="form-label">
            Selecione a data e o horário
          </label>

          <DatePicker
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            selected={startDate}
            filterDate={isWeekday}
            filterTime={filterPassedTime}
            locale="pt-BR"
            timeFormat="HH:mm"
            timeIntervals={60}
          />

          {isNameInvalid && (
            <p className="text-danger mt-3">Por favor digite um nome válido!</p>
          )}
          {isDoctorInvalid && (
            <p className="text-danger mt-3">
              Por favor escolha um(a) médico(a)!
            </p>
          )}
          {dateIsInvalid && (
            <p className="text-danger mt-3">
              Por favor escolha uma data válida!
            </p>
          )}
          {dateIsUnavailable && (
            <p className="text-danger mt-3">
              Data com este médico(a) já tem consulta marcada
            </p>
          )}
          <div className="modal-footer flex-nowrap p-0 border-top-0">
            <button type="submit" className="btn btn-info mt-3 me-3">
              Salvar alterações
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-3"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <AppointmentsTable
        appointments={allAppointments}
        doctors={doctors}
        filterByDoctor
        doctorNameToFilter={selectedDoctorName}
      />
    </div>
  )
}

export default NewAppointmentForm
