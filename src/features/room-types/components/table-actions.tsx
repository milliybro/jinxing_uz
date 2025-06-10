import { Button, Tooltip } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { deleteRoom, deleteRoomType } from '../api'
import queryClient from '@/utils/query-client'

import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'
import ConfirmationModal from '@/components/confirmation-modal'

import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { useBranchIdStore } from '@/store/branch-id-store'

const TableActions: FC<{
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  values: any
}> = ({ setOpenDrawer, values }) => {
  const { t } = useTranslation()
  const [deleteModal, setDeleteModal] = useState(false)
  const navigate = useNavigate()
  const { branch } = useBranchIdStore()

  const { mutate: deleteRoomMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteRoomType,
    onSuccess: () => {
      setDeleteModal(false)
      queryClient.invalidateQueries(['all-room-type'])
    },
  })

  const editHandler = () => {
    setOpenDrawer(true)
    navigate(`/room-types?edit=${values.id}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Tooltip title={t('common.edit-btn')}>
        <Button
          size="small"
          type="link"
          className="flex font-medium items-center"
          onClick={editHandler}
        >
          <EditIcon className="text-[20px]" />
        </Button>
      </Tooltip>
      <Tooltip title={t('common.delete-btn')}>
        <Button
          className="flex items-center font-medium"
          size="small"
          danger
          type="text"
          onClick={() => setDeleteModal(true)}
        >
          <DeleteIcon className="text-[20px]" />
        </Button>
      </Tooltip>

      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('payment-types.delete-payment-type-title')}
        subTitle={t('payment-types.delete-payment-type-subtitle')}
        primaryBtnText={t('common.delete-btn')}
        isLoading={isDeleting}
        action={() => deleteRoomMutate({ branch, id: values.id })}
      />
    </div>
  )
}

export default TableActions
