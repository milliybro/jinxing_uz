import { Form, Modal } from 'antd'
import GuestBookingsHeader from './guest-modal-header'
import GuestBookingsList from './guest-modal-list'
import { FC } from 'react'

interface IProps {
  addGuestModal: boolean
  setAddGuestModal: (value: boolean) => void
  data: any
}

const AddGuestModal: FC<IProps> = ({
  addGuestModal,
  setAddGuestModal,
  data,
}) => {
  const [form] = Form.useForm()

  return (
    <>
      <Modal
        open={addGuestModal}
        centered
        width={1200}
        onOk={() => {
          setAddGuestModal(false)
          form.resetFields()
        }}
        onCancel={() => {
          setAddGuestModal(false)
          form.resetFields()
        }}
        onClose={() => {
          setAddGuestModal(false)
          form.resetFields()
        }}
        classNames={{
          content: 'p-[40px] [&>.ant-modal-close]:text-primary-dark',
        }}
        footer={null}
      >
        <div className="flex items-center flex-col">
          <GuestBookingsHeader />
          <GuestBookingsList
            data={data}
            setAddGuestModal={setAddGuestModal}
            form={form}
          />
        </div>
      </Modal>
    </>
  )
}

export default AddGuestModal
