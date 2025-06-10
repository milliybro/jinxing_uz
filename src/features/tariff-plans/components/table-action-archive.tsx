import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'

import { deleteTariffPlan } from '../api'
import queryClient from '@/utils/query-client'

import DeleteIcon from '@/components/icons/delete'
import ConfirmationModal from '@/components/confirmation-modal'

import type { Dispatch, FC, SetStateAction } from 'react'
import CheckMarkIcon from '@/components/icons/check-mark'
import { useBranchIdStore } from '@/store/branch-id-store'

const TableActionArchive: FC<{
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  values: any
  fetched: any
  refetch: any
}> = ({ setOpenDrawer, values, fetched, refetch }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const { mutate: deleteTariff, isLoading: isDeleting } = useMutation({
    mutationFn: deleteTariffPlan,
    onSuccess: () => {
      setDeleteModal(false)
      queryClient.invalidateQueries(['tariff-plans-r-tariff'])
      fetched()
      refetch()
    },
  })

  const editHandler = () => {
    setOpenDrawer(true)
    navigate(`/tariff-plans?edit=${values.id}`, { replace: true })
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="small"
        type="link"
        className="flex font-medium items-center"
        onClick={editHandler}
      >
        <CheckMarkIcon className="text-[20px]" /> {t('common.actived')}
      </Button>
      {/* <Button
        className="flex items-center text-warn font-medium"
        size="small"
        type="text"
        onClick={() => setDeleteModal(true)}
      >
        <DeleteIcon className="text-[20px]" />
        {t('common.archive')}
      </Button> */}

      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('tariff-plans-page.delete-modal.title')}
        subTitle={t('tariff-plans-page.delete-modal.description')}
        primaryBtnText={t('common.delete')}
        isLoading={isDeleting}
        action={() => deleteTariff({ id: values.id, branch })}
      />
    </div>
  )
}

export default TableActionArchive
