import YandexMap from '@/components/maps/yandexMap'
// import { YMaps, Map } from '@pbe/react-yandex-maps'
import { Flex, FormInstance } from 'antd'
import { useState } from 'react'
const YandexMapComponent = ({
  lat,
  long,
  form,
}: {
  lat?: number
  long?: number
  form: FormInstance
}) => {
  const [selectedMapType, _] = useState<string>('yandex')
  const maps = [
    {
      id: 'yandex',
      component: <YandexMap form={form} lat={lat} long={long} />,
    },
  ]
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   })
  // }
  return (
    <Flex className="h-[450px]">
      {maps.find((val) => val.id === selectedMapType)?.component}
    </Flex>
    // <YMaps>
    //     <Map
    //         defaultState={{ center: [41.310715, 69.281820], zoom: 16 }}
    //         style={{ width: '100%', height: '584px' }}
    //     />
    // </YMaps>
  )
}

export default YandexMapComponent
