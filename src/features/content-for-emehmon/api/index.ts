import { IDistrict, IRegion, ListResponse } from '@/types'
import request from '@/utils/axios'
import { IFacility, IHotelContent } from '../types'
import axios from 'axios'

export async function getHotelContent(): Promise<
  ListResponse<IHotelContent[]>
> {
  const res: ListResponse<IHotelContent[]> = await request({
    url: '/placements/branches/',
    method: 'get',
  })
  return res
}

export async function updateHotelContent(
  data: Partial<IHotelContent>,
  id: number,
): Promise<IHotelContent> {
  const res: IHotelContent = await request({
    url: `/placements/branches/${id}/`,
    method: 'patch',
    data,
  })

  return res
}

export async function createHotelContent(
  data: Partial<IHotelContent>,
): Promise<IHotelContent> {
  const res: IHotelContent = await request({
    url: '/placements/branches/',
    method: 'post',
    data,
  })

  return res
}

export async function createHotelImages(branch: number, data: any) {
  const res = await request({
    url: `/placements/branches/${branch}/placement_image/`,
    method: 'post',
    data,
  })
  return res
}

export async function getFacilities(
  branch?: number,
): Promise<ListResponse<IFacility[]>> {
  const res: ListResponse<IFacility[]> = await request({
    url: `/placement_references/branches/${branch}/facility/`,
    method: 'get',
  })

  return res
}

export async function getDistricts(
  params: any,
): Promise<ListResponse<IDistrict[]>> {
  const res: ListResponse<IDistrict[]> = await request({
    url: 'regions/districts',
    method: 'get',
    params,
  })

  return res
}

export async function getRegions(
  params: any,
): Promise<ListResponse<IRegion[]>> {
  const res: ListResponse<IRegion[]> = await request({
    url: '/regions/regions',
    method: 'get',
    params,
  })
  return res
}

export const getNominalByCoords = async (
  latitude: number,
  longitude: number,
  lang: string,
): Promise<string | null> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`

  try {
    const response = await axios.get(url, {
      headers: {
        'Accept-Language': lang,
      },
    })
    const { data: dataField } = response

    if (dataField.display_name) {
      return dataField.display_name
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

// export async function createHotelImages()
