import { useState } from 'react'
import { Button, Divider, Flex, Input, Modal, Space, Typography } from 'antd'

import CloseIcon from '@/components/icons/close'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

interface IChildren {
  id: number
  age: number
}

const SelectChildrenInput = () => {
  const { t } = useTranslation()
  const [value, setValue] = useState(0)
  const [children, setChildren] = useState<IChildren[] | null>(null)
  const [modalDelete, setModalDelete] = useState(false)

  const onChangeHandler = (val: any) => {
    const value = val.target.value

    if (!isNaN(Number(value)) || typeof value !== 'string') {
      setValue(Number(value))
    } else {
      setValue(0)
    }
  }

  return (
    <>
      <Button
        className="text-start shadow-sm"
        // disabled
        size="large"
        onClick={() => setModalDelete(true)}
      >
        {children?.length || 0} детей
      </Button>
      <Modal
        open={modalDelete}
        centered
        width={515}
        onOk={() => setModalDelete(false)}
        onCancel={() => setModalDelete(false)}
        classNames={{
          content: 'p-0 [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
        title={
          <div className="flex px-[40px] pt-[20px] flex-col">
            <Text className="text-[24px] font-bold text-primary-dark leading-[30.6px] mb-[8px]">
              {t('new-booking-page.add-children')}
            </Text>
            <Text className="text-secondary leading-[25.6px] font-normal text-base ">
              {t('new-booking-page.add-children-info')}
            </Text>
          </div>
        }
      >
        <Divider />
        <Flex vertical align="center" className="text-center p-[40px] pt-0">
          {children?.map((val, i) => (
            <div
              key={'children-age-' + i}
              className="grid grid-cols-2 items-center py-2"
            >
              <Text className="font-medium text-start">
                {t('common.indicate-your-age')}
              </Text>
              <Input
                placeholder="0"
                suffix={t('common.year')}
                size="large"
                readOnly
                defaultValue={val.age}
              />
            </div>
          ))}
          <div className="grid grid-cols-2 items-center py-2">
            <Text className="font-medium text-start">
              {t('common.indicate-your-age')}
            </Text>
            <div className="flex flex-col gap-[5px]">
              <div className="flex items-center gap-1">
                <Input
                  size="large"
                  suffix={t('common.year')}
                  placeholder="0"
                  onChange={onChangeHandler}
                />
                {children?.length ? (
                  <div>
                    <Button
                      size="large"
                      type="text"
                      className="flex items-center justify-center"
                      icon={
                        <CloseIcon className="text-base text-danger-dark" />
                      }
                      onClick={() =>
                        setChildren((prev) => {
                          const filteredData = (prev || [])?.filter(
                            (val) => val.id !== children.length,
                          )
                          return filteredData
                        })
                      }
                    />
                  </div>
                ) : null}
              </div>
              <Button
                type="link"
                size="small"
                className="w-fit px-0 text-sm"
                disabled={!value}
                onClick={() =>
                  setChildren((prev) => [
                    ...(prev || []),
                    {
                      age: value,
                      id: (children?.length || 0) + 1,
                    },
                  ])
                }
              >
                {t('common.add-a-child')}
              </Button>
            </div>
          </div>
          <Space>
            <Button
              className="text-primary-dark dark:text-white font-semibold"
              onClick={() => {
                setModalDelete(false)
                // setChildren(null)
              }}
            >
              {t('common.cancel')}
            </Button>
            <Button
              className="bg-primary-dark text-white font-semibold"
              onClick={() => setModalDelete(false)}
            >
              {t('common.save')}
            </Button>
          </Space>
        </Flex>
      </Modal>
    </>
  )
}

export default SelectChildrenInput
