import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { Button, Tooltip } from 'antd'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IUnit } from '../types'
import ConfirmationModal from '@/components/confirmation-modal'
import { useMutation } from '@tanstack/react-query'
import { deleteUnit } from '../api'
import { useBranchIdStore } from '@/store/branch-id-store'
import queryClient from '@/utils/query-client'

interface IProps {
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  values: IUnit
}

const TableActions: FC<IProps> = ({ setOpenDrawer, values }) => {
  const navigate = useNavigate()
  const { branch } = useBranchIdStore()
  const [deleteModal, setDeleteModal] = useState(false)

  const editHandler = () => {
    setOpenDrawer(true)
    navigate(`/units?edit=${values.id}`, { replace: true })
  }

  const { mutate: deleteUnitMutate, isLoading } = useMutation({
    mutationKey: ['delete-unit'],
    mutationFn: () => deleteUnit({ branch, id: values.id }),
    onSuccess: () => {
      setDeleteModal(false)
      setOpenDrawer(false)
      queryClient.invalidateQueries(['units', branch])
    },
  })

  const { t } = useTranslation()
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
        title={t('units-page.delete-unit')}
        subTitle={t('units-page.delete-unit-text')}
        primaryBtnText={t('common.delete-btn')}
        isLoading={isLoading}
        action={deleteUnitMutate}
      />
    </div>
  )
}

export default TableActions
