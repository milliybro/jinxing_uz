import Navigation from './navigation'

const Header = () => {
  return (
    <header
      id="header"
      className="fixed bottom-0 left-0 w-full bg-white dark:bg-primary-dark z-[110] h-[70px]"
    >
      <Navigation />
    </header>
  )
}

export default Header
