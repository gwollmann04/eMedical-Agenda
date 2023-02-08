import { AppointmentsTable } from '@/src/components/AppointmentsTable'
import { AppointmentsTableType } from '@/src/@types/appointments'
import { useState } from 'react'

const NewAppointmentForm = ({
  appointments,
  doctors,
}: AppointmentsTableType) => {
  const [selectedDoctorName, setSelectedDoctorName] = useState('')

  const totalPatientsTreated = doctors.reduce(
    (startingNumber, doctor) => startingNumber + doctor.patientsTreated,
    0,
  )

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center p-5">
          <div className="d-flex col px-0">
            <div className="card me-4">
              <h5
                className="card-header"
                style={{ backgroundColor: '#115551', color: '#e3fcfb' }}
              >
                Informações gerais
              </h5>
              <div className="card-body">
                <h5 className="card-title">
                  Total de médicos(as) cadastrados(as):
                </h5>
                <p className="card-text">{doctors?.length}</p>
                <h5 className="card-title">Total de consultas realizadas:</h5>
                <p className="card-text">{totalPatientsTreated}</p>
                <h5 className="card-title">Total de consultas marcadas:</h5>
                <p className="card-text">{appointments?.length}</p>
              </div>
            </div>

            <div className="panel panel-primary" id="result_panel">
              <div className="panel-heading">
                <h4>Todos os(as) médicos(as)</h4>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {doctors?.map((doctor) => (
                    <li
                      className="list-group-item"
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedDoctorName(doctor.doctorName)}
                      key={doctor.id}
                    >
                      <div>
                        <div className="card-body">
                          <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                              <img
                                src="https://github.com/gwollmann04.png"
                                alt="Generic placeholder image"
                                className="img-fluid"
                                style={{ width: '50px', borderRadius: '10px' }}
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5 className="mb-1">{doctor.doctorName}</h5>
                              <p
                                className="mb-0 pb-1"
                                style={{ color: '#2b2a2a' }}
                              >
                                Consultas realizadas: {doctor.patientsTreated}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentsTable
        appointments={appointments}
        doctors={doctors}
        filterByDoctor
        doctorNameToFilter={selectedDoctorName}
      />
    </div>
  )
}

export default NewAppointmentForm
