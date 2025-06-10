import { create } from 'zustand'

interface ImageItem {
  file?: File | null
  image?: string
  id?: number | null
  is_main?: boolean
}

interface ImageStoreState {
  images: ImageItem[]
}

interface ImageStoreAction {
  addImage: (image: ImageItem) => void
  removeImage: (index: number) => void
  setMainImage: (index: number | null) => void
  setImages: (images: ImageItem[], urls?: string[]) => void
}

export const useImageStore = create<ImageStoreAction & ImageStoreState>(
  (set) => ({
    images: [],
    addImage: (image) =>
      set((state) => ({
        images: [...state.images, image],
      })),
    removeImage: (index) =>
      set((state) => ({
        images: state.images.filter((_, i) => i !== index),
      })),
    setImages: (images, localUrls) => set(() => ({ images, localUrls })),
    setMainImage: (index) =>
      set((state) => ({
        images: state.images.map((image, i) => ({
          ...image,
          is_main: i === index,
        })),
      })),
  }),
)
