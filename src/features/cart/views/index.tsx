import { Button, Image } from 'antd'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/features/welcome/helpers/formatPrice'

export default function CartPage(): React.ReactElement {
  const { cart, increment, decrement } = useCartStore()

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  )

  return (
    <div className="container h-full py-6 relative pb-[80px]">
      <div className="h-full flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold pt-4">Savatingiz</h1>
          <p className="text-gray-700 text-[18px]">
            Jami: {formatPrice(totalPrice)}
          </p>

          {cart.length === 0 ? (
            <p className="mt-4 text-gray-500">Savat bo‘sh</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex bg-zinc-300/70 text-gray-900 rounded-xl shadow-lg p-1 mt-4"
              >
                <Image
                  src={item.image}
                  height={100}
                  width={100}
                  alt={item.name}
                  className="m-0 p-0 rounded-xl"
                />
                <div className="flex flex-col justify-between px-4 py-1">
                  <div>
                    <p className="text-start font-semibold text-[16px] mb-1">
                      {item.name}
                    </p>
                    <p className="text-start font-[400]">
                      {formatPrice(item.price * item.count)}
                    </p>
                  </div>
                  <div className="inline-flex w-max rounded-[12px] items-center gap-2 mt-2 bg-white px-2 py-1">
                    <button
                      onClick={() => decrement(item?.id)}
                      className="px-2 py-1 text-black rounded"
                    >
                      –
                    </button>
                    <span className="text-[16px]">{item.count}</span>
                    <button
                      onClick={() => increment(item?.id)}
                      className="px-2 py-1 text-black rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mb-4">
          <Button
            block
            size="large"
            className="bg-[#FDBB31] border-[#FDBB31] text-white cursor-pointer"
          >
            Rasmiylashtirish · {formatPrice(totalPrice)}
          </Button>
        </div>
      </div>
    </div>
  )
}
