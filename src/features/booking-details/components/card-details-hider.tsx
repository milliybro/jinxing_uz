import { Button } from 'antd'
import { useState } from 'react'

import ViewIcon from '@/components/icons/view'
import ViewOffIcon from '@/components/icons/view-off'

import type { FC } from 'react'

const CardDetailsHider: FC<{ text: string }> = ({ text }) => {
  const [hide, setHide] = useState(true)

  const input = `${text}`

  const unmaskedString = input.match(/.{1,4}/g)?.join(' ')
  const maskedString = `${input?.slice(0, 4)} **** **** ${input?.slice(-4)}`

  return (
    <div className="flex items-center gap-2">
      {hide ? maskedString : unmaskedString}
      <Button
        type="text"
        shape="circle"
        className="text-secondary"
        onClick={() => setHide((prev) => !prev)}
        icon={
          hide ? (
            <ViewOffIcon className="text-[20px]" />
          ) : (
            <ViewIcon className="text-[20px]" />
          )
        }
      />
    </div>
  )
}

export default CardDetailsHider
