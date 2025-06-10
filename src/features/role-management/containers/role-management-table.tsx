import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, Table, TableProps, Tooltip } from 'antd'

import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'

import { useMutation, useQuery } from '@tanstack/react-query'
import { deleteRole, getUserRoles } from '../api'
import StatusTag from '@/components/status-tag'
import queryClient from '@/utils/query-client'
import ConfirmationModal from '@/components/confirmation-modal'
import { useTranslation } from 'react-i18next'
import queryString from 'query-string'

interface DataType {
  key: string
  name: string
  status: boolean
  id: string
}

const RoleManagementTable = () => {
  const navigate = useNavigate()
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null) // State to hold the ID of the role to delete
  const { t } = useTranslation()
  const { search, pathname } = useLocation()

  const queries = queryString.parse(search)

  const { data: list } = useQuery({
    queryKey: ['user-role', queries?.page],
    queryFn: async () => {
      const res = await getUserRoles({
        page: queries?.page || 1,
      })
      return res
    },
  })

  const { mutate: deleteRoleMutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      setDeleteModal(false)
      queryClient.invalidateQueries(['user-role'])
    },
  })

  const editHandler = (record: DataType) => {
    navigate(`/role-management/edit-role?id=${record.id}`, { replace: true })
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('role-management.role-name'),
      dataIndex: 'name',
      key: 'name',
      className: 'whitespace-nowrap font-medium',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      title: t('common.status'),
      dataIndex: 'status',
      key: 'status',
      className: 'font-medium',
      render: (value) => <StatusTag value={value} />,
    },

    {
      title: t('common.action'),
      width: 110,
      dataIndex: 'action',
      key: 'action',
      className: 'font-medium',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Tooltip title={t('common.edit')}>
            <Button
              size="small"
              type="link"
              className="flex font-medium items-center"
              onClick={() => editHandler(record)}
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
              onClick={() => {
                setSelectedRoleId(record.id) // Set the selected role ID
                setDeleteModal(true) // Open the delete confirmation modal
              }}
            >
              <DeleteIcon className="text-[20px]" />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ]

  const handleTableChange = (pagination: any) => {
    const newPage = pagination.current

    const updatedQuery = queryString.stringify({
      ...queries,
      page: newPage,
    })

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <Card className="mb-[50px] overflow-hidden flex-1">
      <Table
        bordered
        columns={columns}
        dataSource={list?.results?.map((item) => ({ ...item, key: item.id }))}
        onChange={handleTableChange}
        pagination={{
          total: 10,
          showSizeChanger: false,
          showLessItems: false,
          hideOnSinglePage: true,
          current: queries.page ? Number(queries.page) : 1,
          position: ['bottomCenter'], // Ensure pagination is at the bottom center
          nextIcon: (
            <span className="table-pagination-btn">{t('common.next')}</span>
          ),
          prevIcon: (
            <span className="table-pagination-btn">{t('common.prev')}</span>
          ),
        }}
        className="custom-table "
      />
      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('role-management.delete-role')}
        subTitle={t('role-management.delete-role-desc')}
        primaryBtnText={t('common.delete')}
        isLoading={isDeleting}
        action={() => {
          if (selectedRoleId) {
            deleteRoleMutate(selectedRoleId) // Pass the selected role ID to deleteRoleMutate
          }
        }}
      />
    </Card>
  )
}

export default RoleManagementTable
