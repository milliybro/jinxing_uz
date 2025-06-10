import { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'

import CSelect from '@/components/cselect'

import FileIcon from '@/components/icons/file'
import DeleteIcon from '@/components/icons/delete'
import CoinsDollarIcon from '@/components/icons/coins-dollar'
import PlusSignCircleIcon from '@/components/icons/plus-sign-circle'

const AccordionPrice = () => {
  const [data, setData] = useState(1)
  return (
    <div>
      <Form layout="vertical" className="grid grid-cols-2 gap-4 mb-4">
        {[...Array(data)].map((_, i) => (
          <>
            <Form.Item label="Тариф">
              <CSelect
                size="large"
                placeholder="Выберите тариф"
                prefixIcon={<FileIcon className="text-secondary text-base" />}
                notFoundContent={null}
                defaultActiveFirstOption={false}
                popupClassName="w-fit"
                options={[
                  {
                    value: 'Гарантированное бронирование',
                    label: 'Гарантированное бронирование',
                  },
                  {
                    value: 'Негарантированное бронирование',
                    label: 'Негарантированное бронирование',
                  },
                ]}
              />
            </Form.Item>
            {[...Array(data)].length === i + 1 && i !== 0 ? (
              <div className="flex items-end gap-3">
                <Form.Item label="Цена">
                  <Input size="large" suffix="UZS" placeholder="0" />
                </Form.Item>
                <Button
                  danger
                  type="text"
                  shape="circle"
                  icon={<DeleteIcon className="text-[22px]" />}
                  className="mb-[5px] flex items-center justify-center"
                  onClick={() => setData((prev) => prev - 1)}
                />
              </div>
            ) : (
              <Form.Item label="Цена">
                <Input size="large" suffix="UZS" placeholder="0" />
              </Form.Item>
            )}
            <div className="flex flex-col col-span-2 gap-4">
              <Typography.Text>Конвертация</Typography.Text>
              <div className="grid grid-cols-2">
                <div className="flex items-center gap-3 text-base text-secondary">
                  <CoinsDollarIcon className="text-[20px]" />{' '}
                  <span>0$ (USD)</span>
                </div>
                <div className="flex items-center gap-3 text-base text-secondary">
                  <CoinsDollarIcon className="text-[20px]" />{' '}
                  <span>0€ (EUR)</span>
                </div>
              </div>
            </div>
          </>
        ))}
      </Form>

      <Button
        type="link"
        className="flex items-center text-base px-0 font-medium"
        onClick={() => setData((prev) => prev + 1)}
      >
        <PlusSignCircleIcon className="text-[20px]" />
        Добавить новый тариф
      </Button>
    </div>
  )
}

export default AccordionPrice
