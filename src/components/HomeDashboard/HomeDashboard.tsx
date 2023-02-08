import { AppointmentsTable } from '@/src/components/AppointmentsTable'
import { AppointmentsTableType } from '@/src/@types/appointments'
import { useState } from 'react'

const NewAppointmentForm = ({
  appointments,
  doctors,
}: AppointmentsTableType) => {
  const [selectedDoctorName, setSelectedDoctorName] = useState('')

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center p-5">

          <div className='d-flex col'>
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
            Dashboard
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
