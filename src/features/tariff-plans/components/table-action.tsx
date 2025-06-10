import { Button, Tooltip } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'

import { deleteTariffPlan, updateTariffPlan } from '../api'
import queryClient from '@/utils/query-client'

import EditIcon from '@/components/icons/edit'
import ConfirmationModal from '@/components/confirmation-modal'

import type { Dispatch, FC, SetStateAction } from 'react'
import { IAddTariffProps } from '../types'
import dayjs from 'dayjs'
import ArchiveIcon from '@/components/icons/archive-icon'
import { useBranchIdStore } from '@/store/branch-id-store'

const TableActions: FC<{
  setOpenDrawer: Dispatch<SetStateAction<boolean>>
  values: any
  refetch: any
  fetched: any
}> = ({ setOpenDrawer, values, refetch, fetched }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { branch } = useBranchIdStore()

  const { mutate: deleteTariff, isLoading: isDeleting } = useMutation({
    mutationFn: deleteTariffPlan,
    onSuccess: () => {
      setDeleteModal(false)
      queryClient.invalidateQueries(['tariff-plans-r-tariff'])
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: {
      data: IAddTariffProps & { branch: number }
      id: string | number
    }) => {
      return updateTariffPlan(values.data, values.id)
    },
    onSuccess: () => {
      console.log('Update successful!')
      setDeleteModal(false)
      refetch()
      fetched()
    },
  })

  const payload = (id: string | number) => {
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    const data = { end_date: yesterday, branch }
    mutate({ data, id } as any)
  }

  const editHandler = () => {
    setOpenDrawer(true)
    navigate(`/tariff-plans?edit=${values.id}`, { replace: true })
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
      <Tooltip title={t('common.archive')}>
        <Button
          className="flex items-center text-warn font-medium"
          size="small"
          type="text"
          onClick={() => setDeleteModal(true)}
        >
          <ArchiveIcon className="text-[20px] text-warn" />
        </Button>
      </Tooltip>

      <ConfirmationModal
        danger
        icon={ArchiveIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('tariff-plans-page.delete-modal.title')}
        subTitle={t('tariff-plans-page.delete-modal.description')}
        primaryBtnText={t('common.archive')}
        isLoading={isDeleting}
        action={() => payload(values.id)}
      />
    </div>
  )
}

export default TableActions
