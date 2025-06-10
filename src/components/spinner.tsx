import ProjectLogo from '../assets/jinxing.jpg'

export default function Spinner(): React.ReactElement {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center">
      <img src={ProjectLogo} className="animate-pulse" />
    </div>
  )
}
