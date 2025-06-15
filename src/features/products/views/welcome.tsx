import CloseIcon from '@/components/icons/close'
import { useQuery } from '@tanstack/react-query'
import { Drawer, Image, Typography } from 'antd'
import { useState } from 'react'
import { getProducts } from '../api'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { formatPrice } from '@/features/welcome/helpers/formatPrice'
import CheckIcon from '@/components/icons/check'
import { useCartStore } from '@/store/cart-store'

export default function Welcome(): React.ReactElement {
  // const [count, setCount] = useState(0)
  // const [placement, setPlacement] = useState<DrawerProps['placement']>('bottom')
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const cart = useCartStore((state) => state.cart)
  const addToCart = useCartStore((state) => state.addToCart)
  const increment = useCartStore((state) => state.increment)
  const decrement = useCartStore((state) => state.decrement)

  const itemInCart = selectedProduct
    ? cart.find((item) => item.id === selectedProduct.id)
    : null

  const count = itemInCart?.count || 0

  const location = useLocation()

  const query = queryString.parse(location.search)
  const name = query.name
  const categoryId = query.category

  const onClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  // const increment = () => {
  //   if (count < selectedProduct?.count) {
  //     setCount((prev) => prev + 1)
  //   }
  // }

  // const decrement = () => {
  //   if (count > 1) {
  //     setCount((prev) => prev - 1)
  //   } else {
  //     setCount(0)
  //   }
  // }

  const { data } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => getProducts({ category: categoryId }),
  })

  const onProductClick = (product: any) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  return (
    <div className="container h-full py-6">
      <div className="h-screen">
        <Typography.Text className="text-[28px] font-semibold">
          {name} ({data?.count})
        </Typography.Text>
        <div className="grid grid-cols-2 gap-5 mt-3">
          {data?.results.map((product: any, index: number) => (
            <div
              onClick={() => onProductClick(product)}
              key={index}
              className="bg-zinc-300/70 text-gray-900 rounded-xl shadow-lg h-full overflow-hidden"
            >
              <Image
                preview={false}
                src={product.image}
                height={150}
                alt="Category 1"
                className="m-0 p-0 rounded-t-xl"
              />
              <div className="px-4 h-12">
                <p className="text-start font-semibold text-[16px]">
                  {formatPrice(product?.price)}
                </p>
                <p className="text-start font-medium">{product?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Drawer
        placement="bottom"
        closable={false}
        open={open}
        height="100vh"
        className="p-0 mt-4 rounded-t-3xl bg-[#fcfcfc]"
        bodyStyle={{ padding: 0, backgroundColor: '#fafafa' }}
        zIndex={100}
      >
        <div className="overflow-y-visible pb-[200px]">
          <button
            onClick={onClose}
            className="absolute top-8 right-3 z-50 bg-white rounded-full px-2 py-1 text-xl shadow"
          >
            <CloseIcon />
          </button>

          {selectedProduct && (
            <>
              <Image
                src={selectedProduct.image}
                height={400}
                alt={selectedProduct.name}
              />
              <div className="px-4 py-2">
                <h4 className="text-[#FDBB31]">
                  {selectedProduct?.category?.name}
                </h4>
                <h3 className="text-lg font-semibold mb-2">
                  {selectedProduct.name}
                </h3>
                <h2 className="font-bold text-[28px]">
                  {formatPrice(selectedProduct?.price)}{' '}
                </h2>
                <p className="text-[14px]">
                  <span className="font-semibold">Mahsulot ta'rifi: </span>
                  {selectedProduct.description}
                </p>
                <h2 className="text-[16px]">
                  <span className="font-semibold">SKU:</span>{' '}
                  {selectedProduct?.sku}{' '}
                </h2>
                <p className="text-green-500 ">
                  <CheckIcon /> {selectedProduct?.count} dona xarid qilish
                  mumkin
                </p>
                <div className="mt-6">
                  {count === 0 ? (
                    <button
                      onClick={() =>
                        addToCart(
                          {
                            id: selectedProduct.id,
                            name: selectedProduct.name,
                            price: selectedProduct.price,
                            image: selectedProduct.image,
                            maxCount: selectedProduct.count,
                          },
                          1,
                        )
                      }
                      className="w-full bg-white border-black border rounded-[12px] px-4 py-[14px] text-[16px] font-medium"
                    >
                      Qo‘shish
                    </button>
                  ) : (
                    <div className="w-full flex justify-between items-center rounded-[12px] mt-2 bg-white px-4 py-2 border border-black">
                      <button
                        onClick={() => decrement(selectedProduct.id)}
                        className="text-[24px] font-bold text-black"
                      >
                        –
                      </button>
                      <span className="text-[16px] font-medium">{count}</span>
                      <button
                        onClick={() => increment(selectedProduct.id)}
                        className="text-[24px] font-bold text-black"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </div>
  )
}
