import request from '@/utils/axios'
import { IRoomItemStatistics } from '@/features/calendar/types'

export async function getRoomItemStatistics(
  params?: any,
): Promise<IRoomItemStatistics> {
  const { branch, ...rest } = params
  const res: IRoomItemStatistics = await request({
    url: `/placements/branches/${branch}/room_item/room_item_statistics/`,
    method: 'get',
    params: rest,
  })

  return res
}
