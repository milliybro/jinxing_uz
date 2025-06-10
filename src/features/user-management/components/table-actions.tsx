import { Button, Tooltip } from 'antd'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import ConfirmationModal from '@/components/confirmation-modal'

import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'

import type { Dispatch, FC, SetStateAction } from 'react'
import { deleteUser } from '../api'
import queryClient from '@/utils/query-client'
import { useTranslation } from 'react-i18next'

const TableActions: FC<{
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  values: any
}> = ({ setOpenDrawer, values }) => {
  const [modalDelete, setModalDelete] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: () => deleteUser(values.id),
    onSuccess: () => {
      setModalDelete(false)
      queryClient.invalidateQueries(['user-management-list'])
    },
  })

  const editHandler = () => {
    setOpenDrawer(true)
    navigate(`/user-management?edit=${values.id}`), { replace: true }
  }

  return (
    <div className="flex items-center gap-2">
      <Tooltip title={t('common.edit')}>
        <Button
          size="small"
          type="link"
          className="flex font-medium items-center"
          onClick={editHandler}
        >
          <EditIcon className="text-[20px]" />
        </Button>
      </Tooltip>
      <Tooltip title={t('common.delete')}>
        <Button
          className="flex items-center font-medium"
          size="small"
          danger
          type="text"
          onClick={() => setModalDelete(true)}
        >
          <DeleteIcon className="text-[20px]" />
        </Button>
      </Tooltip>

      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={modalDelete}
        setOpen={setModalDelete}
        title={t('user-management.delete-title')}
        subTitle={t('user-management.delete-subtitle')}
        primaryBtnText={t('common.delete')}
        action={mutate}
        isLoading={isDeleting}
      />
    </div>
  )
}

export default memo(TableActions)
