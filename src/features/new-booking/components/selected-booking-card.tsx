import { Card, Flex, Typography } from 'antd'
import { FC, useState } from 'react'

// import CSelect from '@/components/cselect'
import DeleteIcon from '@/components/icons/delete'
// import SelectChildrenInput from './select-children-input'
import ConfirmationModal from '@/components/confirmation-modal'
// import { IAvailableRoom } from '../types'
import { formatAmount } from '@/helpers/format-amount'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { getShortRooms } from '../api'
import { useBranchIdStore } from '@/store/branch-id-store'

const { Text } = Typography

const SelectedBookingCard: FC<{
  price: number
  startDate: string | null
  endDate: string | null
  typeNumber?: string
  order: any
}> = ({
  price,
  startDate,
  endDate,
  typeNumber,
  order,
  // setTypeNumber,
}) => {
  const [modalDelete, setModalDelete] = useState(false)
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const { data: roomTypes } = useQuery({
    queryKey: ['room-type'],
    queryFn: async () => {
      const res = await getShortRooms({ branch })
      return res
    },
  })

  const typeName = roomTypes?.results?.find((room) => {
    const roomId = order?.items[0]?.room?.id
    return room.id === typeNumber || room.id === roomId
  })?.name

  // const { pathname, search: restQueries } = useLocation()
  // const queries = queryString.parse(restQueries)

  const nights =
    (startDate || order?.start_date) && (endDate || order?.end_date)
      ? dayjs(endDate || order?.end_date).diff(
          dayjs(startDate || order?.start_date),
          'day',
        )
      : 0

  const subtotal = (price ? price : order?.items[0]?.price) * nights
  return (
    <>
      <Card className="rounded-lg" classNames={{ body: 'p-4' }}>
        <Flex vertical gap={16}>
          <div className="flex items-center justify-between">
            <Text className="flex items-center gap-2 text-sm flex-wrap">
              <Text className="text-secondary/70">
                {t('common.check-in')}{' '}
                {startDate || order?.start_date
                  ? dayjs(startDate || (order?.start_date as any))
                      .locale('ru')
                      .format('D MMM, YYYY') // 9 янв, 2024 kabi format
                  : ''}
              </Text>

              <Text className="text-secondary/70">|</Text>
              <Text className="text-secondary/70">
                {t('common.check-out')}{' '}
                {endDate || order?.end_date
                  ? dayjs(endDate || (order?.end_date as any))
                      .locale('ru')
                      .format('D MMM, YYYY')
                  : ''}
              </Text>
            </Text>

            {/* <Button
              type="text"
              danger
              onClick={() => setModalDelete(true)}
              className="p-0"
              size="small"
            >
              {t('common.delete')}
            </Button> */}
          </div>
          <div className="flex items-center justify-between">
            <Text className="flex items-center gap-2 text-sm">
              <Text className=" text-primary-dark text-lg font-semibold">
                {typeName}
              </Text>
              <Text className="text-secondary/70">
                {price
                  ? formatAmount(price)
                  : formatAmount(order?.items[0]?.price)}{' '}
                UZS
              </Text>
            </Text>
            <Text className="flex items-center gap-2 text-sm">
              <Text className="text-secondary/70">x</Text>
              <Text className="text-secondary/70">
                {nights} {t('common.nights')}
              </Text>
            </Text>
          </div>
          <Text className="text-[24px] font-semibold">
            {subtotal ? formatAmount(subtotal) : formatAmount(order?.total)} UZS
          </Text>
          {/* <div className="grid grid-cols-2 gap-4">
            <CSelect
              size="large"
              containerClassName="w-full"
              className="w-full"
              defaultValue="2 взрослых"
              options={[{ label: '2 взрослых', value: '2 взрослых' }]}
            />
            <CSelect
              disabled
              containerClassName="w-full"
              className="w-full"
              size="large"
              defaultValue="0 детей"
              options={[{ label: '0 детей', value: '0 детей' }]}
            />
            <SelectChildrenInput />
          </div> */}
        </Flex>
      </Card>
      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={modalDelete}
        setOpen={setModalDelete}
        title={t('new-booking-page.delete-room-modal.label')}
        subTitle={t('new-booking-page.delete-room-modal.subtitle')}
        primaryBtnText={t('common.delete')}
      />
    </>
  )
}

export default SelectedBookingCard
