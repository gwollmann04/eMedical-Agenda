import { ToastContainer, toast } from 'react-toastify'

const Footer = () => {
  const notify = (event: any) => {
    navigator.clipboard.writeText(event.target.text)
    event.preventDefault()
    toast.success('Copiado para a Área de transferência!')
  }
  //To Do on click, copy to clipboard and show toast
  return (
    <footer className="fixed-bottom text-center">
      <div className="container p-4 col ">
        <h4>Canais de atendimento eMedical Agenda:</h4>
        <div>
          E-mail:
          <a href="" onClick={(event) => notify(event)}>
            atendimento@medical.com.br
          </a>
        </div>

        <div>
          WhatsApp:
          <a href="" onClick={(event) => notify(event)}>
            (75) 9 8445-1539
          </a>
        </div>
      </div>
      <div className=" p-3">
        © 2023 Copyright:
        <a href="https://github.com/gwollmann04">github.com/gwollmann04</a>
      </div>
      <ToastContainer />
    </footer>
  )
}

export default Footer
