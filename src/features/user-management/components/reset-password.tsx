import { FC, useState } from 'react'
import { Button, Tooltip, Typography } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { resetPassword } from '../api'
import ConfirmationModal from '@/components/confirmation-modal'

import CopyIcon from '@/components/icons/copy'
import ReloadIcon from '@/components/icons/reload'
import SquarePassword from '@/components/icons/square-password'
import generatePassword from '@/helpers/generate-password'
import { useTranslation } from 'react-i18next'

const ResetPassword: FC<{ id: string | number }> = ({ id }) => {
  const [resetModal, setResetModal] = useState(false)
  const [returnedPassword, setReturnedPassword] = useState('')
  const newPassword = generatePassword()
  const [password, setPassword] = useState(newPassword)
  const { t } = useTranslation()

  const { mutate: reset, isLoading: isResetting } = useMutation({
    mutationFn: () => {
      return resetPassword({ new_password: password }, id)
    },
    onSuccess: () => {
      setReturnedPassword(password)
      setResetModal(false)
      //   queryClient.invalidateQueries(['tariff-plans-r-tariff'])
    },
  })

  return (
    <>
      {returnedPassword ? (
        <Typography.Paragraph
          className="flex items-center gap-2"
          copyable={{
            icon: [
              <span className="flex items-center whitespace-nowrap gap-2 text-sm">
                <CopyIcon className="text-[20px]" /> {t('common.copy-password')}
              </span>,
              // <SmileFilled key="copied-icon" />,
            ],
            tooltips: [null, null],
          }}
        >
          {returnedPassword}
        </Typography.Paragraph>
      ) : (
        <Tooltip title={t('common.reset-password')}>
          <Button
            type="link"
            size="small"
            className="p-0 flex items-center font-medium"
            onClick={() => setResetModal(true)}
          >
            <ReloadIcon className="text-[20px]" />
          </Button>
        </Tooltip>
      )}
      {/* <div className="flex items-center gap-2">
        123
        <Button
          type="link"
          size="small"
          className="p-0 flex items-center font-medium"
        >
          <CopyIcon className="text-[20px]" /> Скопировать
        </Button>
      </div> */}

      <ConfirmationModal
        icon={SquarePassword}
        open={resetModal}
        setOpen={setResetModal}
        title={t('common.reset-password')}
        subTitle={t('common.reset-password-desc')}
        primaryBtnText={t('common.reset')}
        isLoading={isResetting}
        action={reset}
      />
    </>
  )
}

export default ResetPassword
