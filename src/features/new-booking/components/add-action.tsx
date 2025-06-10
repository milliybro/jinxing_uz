import { FC, useState } from 'react'
import { Button, Input } from 'antd'

import AddCircleIcon from '../../../components/icons/add-circle'
import PlusSignCircleIcon from '../../../components/icons/plus-sign-circle'
import MinusSignCircleIcon from '../../../components/icons/minus-sign-cirlce'

const AddAction: FC<{
  addSelectedRooms: () => void
  removeSelectedRooms: () => void
}> = ({ addSelectedRooms, removeSelectedRooms }) => {
  const [value, setValue] = useState(0)

  return !value ? (
    <Button
      icon={<AddCircleIcon />}
      type="link"
      className="flex items-center text-base mx-auto font-medium"
      onClick={() => {
        setValue(1)
        addSelectedRooms()
      }}
    >
      Добавить
    </Button>
  ) : (
    <div className="relative max-w-[150px] mx-auto">
      <Input
        value={value}
        readOnly
        size="large"
        className="text-center hover:border-border"
      />
      <Button
        className="absolute flex items-center justify-center left-4 top-[calc(50%-14.25px)]"
        size="small"
        shape="circle"
        type="text"
        icon={<MinusSignCircleIcon className="text-base text-secondary" />}
        onClick={() => {
          setValue((prev) => (prev ? prev - 1 : prev))
          removeSelectedRooms()
        }}
      />
      <Button
        className="absolute flex items-center justify-center right-4 top-[calc(50%-14.25px)]"
        size="small"
        shape="circle"
        type="text"
        icon={<PlusSignCircleIcon className="text-base text-secondary" />}
        onClick={() => {
          setValue((prev) => prev + 1)
          addSelectedRooms()
        }}
      />
    </div>
  )
}

export default AddAction
