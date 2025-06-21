import request from '@/utils/axios'

export async function getStatistics(params?: any): Promise<any> {
  const res: any = await request({
    url: '/statistics/',
    method: 'get',
    params,
  })

  return res
}
