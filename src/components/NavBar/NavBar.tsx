import { useRouter } from 'next/router'

const NavBar = () => {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="col-2 shadow p-3 mb-5 bg-white rounded" id="navBarItem">
      <div className="d-flex flex-column align-items-sm-start px-3 pt-2 min-vh-100">
        <ul className="nav nav-pills flex-column mb-0">
          <li className="nav-item">
            <a
              href="#"
              className="nav-link align-middle px-0"
              id="navBarItem"
              onClick={() => handleNavigation('/')}
            >
              <i className="fs-4 bi-house"></i>
              <span className="ms-1">Início</span>
            </a>
            <a
              href="#"
              className="nav-link align-middle px-0"
              id="navBarItem"
              onClick={() => handleNavigation('/new-appointment')}
            >
              <i className="fs-4 bi-calendar4"></i>
              <span className="ms-1">Realizar Agendamento</span>
            </a>
            <a
              href="#"
              className="nav-link align-middle px-0"
              id="navBarItem"
              onClick={() => handleNavigation('/appointments')}
            >
              <i className="fs-4 bi-table"></i>
              <span className="ms-1">Consultar Agenda</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
