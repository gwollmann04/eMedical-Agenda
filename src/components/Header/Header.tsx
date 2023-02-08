import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/')
  }

  return (
    <header
      className="w-100 py-4 d-flex justify-content-between align-items-center"
      style={{
        background:
          'linear-gradient(90deg, rgba(40,194,186,1) 0%, rgba(111,237,231,1) 21%, rgba(227,252,251,1) 100%)',
        cursor: 'pointer',
      }}
      onClick={handleNavigation}
    >
      <h2 className="font-weight-bold">eMedical Agenda</h2>
      <h5 className='mb-0'>A sua agenda para consultas médicas</h5>
    </header>
  )
}

export default Header
