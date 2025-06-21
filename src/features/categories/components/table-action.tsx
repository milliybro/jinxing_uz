import { Button, Tooltip } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'
import ConfirmationModal from '@/components/confirmation-modal'

import type { Dispatch, FC, SetStateAction } from 'react'

const TableActions: FC<{
  setOpenModal: Dispatch<SetStateAction<boolean>>
  values: any
}> = ({ setOpenModal }) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const { t } = useTranslation()

  const editHandler = () => {
    setOpenModal(true)
  }

  return (
    <div className="flex items-center gap-2 w-min">
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
      <Tooltip title={t('common.notify-deletion')}>
        <Button
          className="flex items-center font-medium"
          size="small"
          danger
          type="text"
          // onClick={() => setDeleteModal(true)}
        >
          <DeleteIcon className="text-[20px]" />
        </Button>
      </Tooltip>

      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('all-maids-page.delete-modal.title')}
        subTitle={t('all-maids-page.delete-modal.subtitle')}
        primaryBtnText={t('common.delete')}
      />
    </div>
  )
}

export default TableActions
