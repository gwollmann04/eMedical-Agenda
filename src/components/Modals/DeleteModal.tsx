const DeleteModal = ({ handleDelete }) => {
  return (
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
            <p className="mb-0">Esta consulta será permanentemente excluída!</p>
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
  )
}

export default DeleteModal
