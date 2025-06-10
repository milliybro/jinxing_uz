import Navigation from './navigation'

const Header = () => {
  return (
    <header
      id="header"
      className="relative bg-white dark:bg-primary-dark sticky bottom-0 z-[110] mb-0"
    >
      {/* <div className="absolute z-10 top-0 left-0 w-full h-0 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] z-[-1] mb-0" /> */}
      <Navigation />
    </header>
  )
}

export default Header
