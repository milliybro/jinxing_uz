import { Navigate } from 'react-router-dom'

import { useAuthContext } from '@/contexts'

import FAQ from '../containers/faq'
import Intro from '../containers/intro'
import Steps from '../containers/steps'
import Banner from '../containers/banner'
import CFooter from '../components/cfooter'
import Reviews from '../containers/reviews'
import Management from '../containers/management'
import SearchIsland from '../components/search-island'

export default function Main(): React.ReactElement {
  const { isAuth } = useAuthContext()

  if (isAuth) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="bg-[#FAFAFA]">
      <Intro />
      <SearchIsland />
      <Steps />
      <Banner />
      <Management />
      <FAQ />
      <Reviews />
      <CFooter />
    </div>
  )
}
