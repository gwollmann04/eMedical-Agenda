import DatePicker, { registerLocale } from 'react-datepicker'
import { getDay, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

const EditModal = ({
  handleEdit,
  patientNameInputRef,
  doctorNameInputRef,
  doctors,
  startDate,
  setStartDate,
  isNameInvalid,
  isDoctorInvalid,
  dateIsInvalid,
  dateIsUnavailable
}) => {
  registerLocale('pt-BR', ptBR)

  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }
  const filterPassedTime = (date) => {
    const selectedDate = new Date(date)

    return selectedDate.getHours() > 7 && selectedDate.getHours() <= 19
  }

  return (
    <div className="modal fade py-5" role="dialog" id="editModal" tabIndex={-1}>
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 bg-light">
          <div className="modal-body p-4">
            <form onSubmit={handleEdit}>
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
                <p className="text-danger mt-3">
                  Por favor digite um nome válido!
                </p>
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
                <button
                  type="submit"
                  className="btn btn-info mt-3"
                >
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
        </div>
      </div>
    </div>
  )
}

export default EditModal
