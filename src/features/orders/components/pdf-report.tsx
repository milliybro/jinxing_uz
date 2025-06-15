// import tempLogo from '@/assets/FRANK-FORT.png'
import { getHotelContent } from '@/features/content-for-emehmon/api'
import { getDayDifference } from '@/helpers/get-day-difference'
import { useQuery } from '@tanstack/react-query'
import { Button, Spin } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { getOrderItemById } from '../api'
import { getPricesArray } from '../helpers/getPricesArray'
import { useBranchIdStore } from '@/store/branch-id-store'

interface PDFReportProps {
  id: number | null
  onClose: () => void
}

const PDFReport: React.FC<PDFReportProps> = ({ id, onClose }) => {
  const layoutRef = useRef<HTMLDivElement | null>(null)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const { branch } = useBranchIdStore()

  const { data: hotel, isLoading: isHotelLoading } = useQuery(
    ['getHotelContent'],
    getHotelContent,
    {
      cacheTime: 0,
    },
  )

  const { data: order, isLoading: isOrderLoading } = useQuery({
    queryKey: ['getOrder', id],
    queryFn: async () => {
      if (!id) return null
      const res = await getOrderItemById(branch, id)
      return res
    },
    enabled: !!id,
    cacheTime: 0,
  })

  const mainGuest = order?.order_guests.find((g) => g.main_guest)
  const days = getDayDifference(order?.start_date, order?.end_date)

  const debt = getPricesArray(order?.price, order?.start_date, order?.end_date)

  useEffect(() => {
    if (!!order && !!hotel && imageLoaded) {
      handlePrint()
    }
  }, [order, hotel, imageLoaded])

  const handlePrint = () => {
    if (layoutRef.current) {
      const printContent = layoutRef.current
      const printWindow = window.open('', '', 'width=800,height=900')
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print</title>')
        const styles = `
          body {
            font-family: Arial, sans-serif;
            color: black;
          }
          h1 {
            font-size: 24px;
            text-align: center;
          }
          p {
            text-align: justify;
            font-size: 16px;
            line-height: 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
          }
        `

        printWindow.document.write(`<style>${styles}</style></head><body>`)
        printWindow.document.write(printContent.innerHTML)
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.print()
        setImageLoaded(false)
        printWindow.close()
        onClose()
      }
    }
  }

  return (
    <div style={{ padding: '20px', color: 'black' }}>
      <Button type="primary" onClick={handlePrint} className="mb-4">
        Print
      </Button>
      <Spin spinning={isHotelLoading || isOrderLoading}>
        <div
          ref={layoutRef}
          style={{
            padding: '40px 20px 20px',
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid black',
            width: '8.5in',
            minHeight: '11in',
            margin: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div
              style={{
                flexBasis: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={
                    'https://frankfort.uz/wp-content/uploads/2021/04/FRANK-FORT.png'
                  }
                  style={{
                    width: '100%',
                    height: 'max-content',
                    objectFit: 'contain',
                  }}
                  alt="Temporary logo"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>
            <div style={{ flexBasis: '50%' }}>
              <h1
                style={{
                  fontSize: '16px',
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 700,
                }}
              >
                {hotel?.results[0]?.translations.ru?.name}
              </h1>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  lineHeight: '24px',
                  color: 'black',
                  lineClamp: 1,
                }}
              >
                {hotel?.results[0]?.translations.ru?.address}
              </p>
              {/* Will be added when hotel will have phone number and email ⬇️ */}
              {/* <p
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  lineHeight: '24px',
                  color: 'black',
                }}
              >
                {hotel?.results[0]?.phone}
              </p> */}
              {/* <p
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  lineHeight: '24px',
                  color: 'black',
                }}
              >
                {hotel?.results[0]?.email}
              </p> */}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '14px',
              gap: '50px',
              marginTop: '40px',
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <p>№ брони {order?.order?.id}</p>
              <p>
                {mainGuest?.first_name} {mainGuest?.last_name}{' '}
                {mainGuest?.middle_name}
              </p>
              <p style={{ marginTop: '20px' }}>
                {mainGuest?.birth_country?.translations?.ru?.name}
              </p>
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Ночей:</span>
                <span>{days}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Комната:</span>
                <span>{order?.room_item.name}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                }}
              >
                <span>Заезд:</span>
                <span>{order?.start_date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Выезд:</span>
                <span>{order?.end_date}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                }}
              >
                <span>Тариф:</span>
                <span>{order?.price}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  gap: '10px',
                  marginTop: '20px',
                }}
              >
                <span>Дата:</span>
                <span>{dayjs().format('DD.MM.YYYY HH:mm:ss')}</span>
              </div>
            </div>
          </div>
          <h2 style={{ fontSize: '20px' }}>Счёт № {order?.id}</h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
              fontSize: '14px',
              borderBlock: '1px solid black',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid #000' }}>
                <th style={{ textAlign: 'left', paddingBottom: '10px' }}>
                  Дата
                </th>
                <th style={{ textAlign: 'left', paddingBottom: '10px' }}>
                  Описание
                </th>
                <th style={{ textAlign: 'left', paddingBottom: '10px' }}>
                  Кол-во
                </th>
                <th style={{ textAlign: 'left', paddingBottom: '10px' }}>
                  Дебет
                </th>
                <th style={{ textAlign: 'left', paddingBottom: '10px' }}>
                  Кредит
                </th>
              </tr>
            </thead>
            <tbody>
              {/* There is no api for this yet so it is temporary */}
              {debt?.map((d) => (
                <tr style={{ paddingBlock: '5px' }}>
                  <td>{d.date}</td>
                  <td>Проживание</td>
                  <td>1</td>
                  <td>{d.price}</td>
                  <td>0.00</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            <div style={{ flexBasis: '50%' }}>Всего</div>
            <div
              style={{
                flexBasis: '50%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{order?.subtotal}</span>
              <span>0.00</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            <div
              style={{
                flexBasis: '50%',
                fontWeight: 700,
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div>Всего оплачено с НДС</div>
              <div>К оплате</div>
            </div>
            <div
              style={{
                flexBasis: '50%',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'right',
                gap: '10px',
              }}
            >
              <div>{order?.subtotal} SUM</div>
              <div>0.00 SUM</div>
            </div>
          </div>
          <footer
            style={{ marginTop: '40px', textAlign: 'right', fontSize: '12px' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '5px',
                width: '50%',
                marginLeft: 'auto',
              }}
            >
              <div style={{ width: '100%', fontSize: '14px' }}>
                Подпись гостя
              </div>
              <div
                style={{ height: '1px', background: '#000', width: '100%' }}
              ></div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '5px',
                width: '50%',
                marginLeft: 'auto',
                flex: '1 1 0',
                marginTop: '20px',
              }}
            >
              <div style={{ width: 'max-content', fontSize: '14px' }}>
                Кассир: Исмоилов Аброр/18
              </div>
              <div
                style={{
                  height: '1px',
                  background: '#000',
                  width: '100%',
                  flex: '1 1 0',
                }}
              ></div>
            </div>
          </footer>
        </div>
      </Spin>
    </div>
  )
}

export default PDFReport
