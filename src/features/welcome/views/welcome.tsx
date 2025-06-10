import { useQuery } from '@tanstack/react-query'
import { Carousel, Drawer, Image, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getProducts } from '@/features/products/api'
import { getCategories } from '../api'
import { formatPrice } from '../helpers/formatPrice'
import CartIcon from '@/components/icons/cart-icon'
import { useState } from 'react'
import { useCartStore } from '@/store/cart-store'
import CloseIcon from '@/components/icons/close'
import CheckIcon from '@/components/icons/check'

export default function Welcome(): React.ReactElement {
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
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }
  const onClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }
  const onProductClick = (product: any) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  return (
    <div className="container h-full py-6">
      <Typography.Text className="text-[28px] font-semibold">
        Jinxing Uz
      </Typography.Text>
      <div className="my-3">
        <Carousel autoplay dots={false}>
          {products?.results.map((product: any, index: number) => (
            <div
              onClick={() => onProductClick(product)}
              key={index}
              style={contentStyle}
              className="h-[160px] bg-[#fdbb31] rounded-xl"
            >
              <div>
                <div className="relative h-[160px] flex w-full">
                  <div className="absolute left-0 top-4 z-10 w-[150px]">
                    <h4 className="text-[22px] font-semibold text-white px-2 py-1 rounded-[16px]">
                      {product.name}
                    </h4>
                    <h2 className="text-[22px] font-semibold text-white px-2 py-1 rounded-[16px]">
                      {formatPrice(product?.price)}
                    </h2>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-[65%] z-0">
                    <Image
                      preview={false}
                      src={product.image}
                      alt="Category"
                      className="w-full h-full object-contain clip-diagonal"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-3 mb-4 ">
        {categories?.results.map((category: any, index) => {
          return (
            <Link
              to={`/products?category=${category?.id}&name=${category?.name}`}
            >
              <div className="h-20 flex flex-col items-center">
                <Image
                  key={index}
                  preview={false}
                  src={category?.image}
                  height={45}
                  width={45}
                  alt="Category"
                  className="m-0 p-0 rounded-xl object-cover"
                />
                <h4 className="text-[14px] font-semibold text-center leading-4">
                  {category?.name}
                </h4>
              </div>
            </Link>
          )
        })}
      </div>
      <Typography.Text className="text-[22px] font-semibold mt-2">
        Oxirgi mahsulotlar
      </Typography.Text>
      <div className="grid grid-cols-2 gap-5 mt-2">
        {products?.results.map((product: any, index: number) => (
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
            <div className="px-2 py-2">
              <p className="text-start text-[16px] font-semibold leading-4">
                {product?.name}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-start font-semibold text-[14px]">
                  {formatPrice(product?.price)}
                </p>
                <span className="h-6 w-6 border rounded-full border-black flex justify-center">
                  <CartIcon />
                </span>
              </div>
            </div>
          </div>
        ))}
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
                <CheckIcon /> {selectedProduct?.count} dona xarid qilish mumkin
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
      </Drawer>
    </div>
  )
}
