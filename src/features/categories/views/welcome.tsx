import { useQuery } from '@tanstack/react-query'
import { Button, Image, Tabs, TabsProps, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getCategories } from '../api'

export default function Welcome(): React.ReactElement {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  return (
    <div className="container h-full py-6 pb-[80px]">
      <div className="">
        <div className="flex justify-between items-center">
          <Typography.Text className="text-[28px] font-semibold">
            Katalog
          </Typography.Text>
        </div>
        {data ? (
          <div className="grid grid-cols-2 gap-5 mt-3">
            {data?.results.map((category, index: number) => (
              <Link
                to={`/products?category=${category?.id}&name=${category?.name}`}
                key={index}
                className="bg-zinc-300/70 text-gray-900 rounded-xl shadow-lg h-full overflow-hidden p-1"
              >
                <Image
                  preview={false}
                  src={category.image}
                  height={150}
                  alt="Category 1"
                  className="m-0 p-0 rounded-t-xl"
                />
                <div className="px-4 h-10 flex items-center justify-center">
                  <p className="text-center font-semibold">{category?.name}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full -mt-20 text-[20px]">
            Kataloglar mavjud emas
          </div>
        )}
      </div>
    </div>
  )
}
