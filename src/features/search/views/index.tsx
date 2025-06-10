import { Button, Form, Input } from 'antd'
import { SearchProps } from 'antd/es/input'

const { Search } = Input
export default function SearchPage(): React.ReactElement {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value)

  return (
    <div className="container h-full py-6">
      <div className="h-screen">
        <h1 className="text-2xl font-bold pt-4">Qidirish</h1>
        <p className="text-gray-700">So‘rovingizni kiriting</p>
        <Form className="mt-2">
          <Form.Item name="search">
            <Search
              placeholder="Mahsulot nomini yozing"
              onSearch={onSearch}
              enterButton={
                <Button
                  style={{
                    backgroundColor: '#FDBB31',
                    color: '#fff',
                    borderColor: '#FDBB31',
                  }}
                >
                  Qidirish
                </Button>
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
