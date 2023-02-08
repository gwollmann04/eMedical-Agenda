import { AppointmentsTableType } from '@/src/@types/appointments'
import { useState } from 'react'

const APPOINTMENTS_TABLE_HEADER = [
  'Nº da consulta',
  'Paciente',
  'Médico(a)',
  'Data e hora',
  '',
]

const AppointmentsTable = ({ appointments }: AppointmentsTableType) => {
  const [appointment, setAppointment] = useState()
  const [allAppointment, setAllAppointment] = useState(appointments)

  const handleDelete = () => {
    fetch(`/api/appointments/${appointment?.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => setAllAppointment(data?.appointmentData))
  }

  const handleEdit = () => {
    fetch(`/api/appointments/${appointment?.id}`, {
      method: 'PUT',
      body: 'aa'
    })
      .then((response) => response.json())
      /* .then((data) => setAllAppointment(data?.appointmentData)) */
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
          {allAppointment.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.doctorName}</td>
              <td>{item.patientName}</td>
              <td>{item.dateTime}</td>
              <td
                className="d-flex justify-content-end border-bottom-0"
                style={{
                  cursor: 'pointer',
                }}
              >
                <i className="fs-5 bi-pen me-3" />
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

      <div
        className="modal fade py-5"
        role="dialog"
        id="deleteModal"
        tabIndex={-1}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 bg-light">
            <div className="modal-body p-4 text-center">
              <h5 className="mb-1">Apagar esta consulta?</h5>
              <p className="mb-0">
                Esta consulta será permanentemente excluída!
              </p>
            </div>

            <div className="modal-footer flex-nowrap p-0">
              <button
                type="button"
                className="btn btn-info"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                onClick={handleDelete}
              >
                Apagar consulta
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentsTable
