import { getNominalByCoords } from '@/features/content-for-emehmon/api'
import { Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps'
import { useMutation } from '@tanstack/react-query'
import { FormInstance } from 'antd'
import { useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export default function YandexMap({
  long,
  lat,
  form,
}: {
  long?: number
  lat?: number
  form?: FormInstance<any>
}): ReactNode {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(
    lat && long ? [lat, long] : null,
  )

  const {
    i18n: { language: lang },
  } = useTranslation()

  const { mutate: getAddressFromCoords } = useMutation(
    async ({ lang, coords }: { lang: string; coords: [number, number] }) => {
      return await getNominalByCoords(coords[0], coords[1], lang)
    },
    {
      onSuccess: (data) => {
        form?.setFieldValue('address', data)
      },
    },
  )

  const handleClick = (event: {
    get: (property: string) => [number, number]
  }): void => {
    const coords = event.get('coords')
    form?.setFieldsValue({ lat: coords[0], long: coords[1] })
    setCoordinates(coords)
    getAddressFromCoords({ lang, coords })
  }

  return (
    <YMaps>
      <Map
        onClick={handleClick}
        width="100%"
        height="100%"
        defaultState={{
          center: coordinates
            ? coordinates
            : lat && long
            ? [lat, long]
            : [41.311081, 69.240562],
          zoom: 12,
        }}
      >
        <ZoomControl />
        <Placemark geometry={coordinates || [lat, long]} />
      </Map>
    </YMaps>
  )
}
