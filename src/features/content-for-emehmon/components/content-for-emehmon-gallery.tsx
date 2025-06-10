import CameraIcon from '@/components/icons/camera-icon'
import { CloseOutlined, StarFilled } from '@ant-design/icons'
import { Button, Divider, message, Skeleton, Typography, Upload } from 'antd'
import { useTranslation } from 'react-i18next'
import { useImageStore } from '../hooks/useImageStore'

const ContentForEMehmonGallery = ({
  isLoading: isImageLoading,
}: {
  isLoading: boolean
}) => {
  const { Text } = Typography
  const { t } = useTranslation()
  const { addImage, images, removeImage, setMainImage } = useImageStore()

  const handleUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const formData = new FormData()
      addImage({
        file,
        image: URL.createObjectURL(file),
        id: null,
        is_main: false,
      })
      formData.append('file', file)
    } else {
      message.error('Please select a valid image file.')
    }
    return false
  }

  return (
    <div id="gallery" className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="p-6 bg-white dark:bg-[#0F172A] rounded-xl w-full flex flex-col border dark:border-slate-800 gap-6">
          <div className="">
            <Text className="text-2xl font-medium text-[#1E1E1E] dark:text-[#fcfcfc] leading-[30.6px]">
              {t('common.photos')}
            </Text>
            <Divider />
            <div className="flex items-center overflow-auto gap-2">
              {isImageLoading && (
                <>
                  <div className="w-52 h-36 rounded-xl">
                    <Skeleton.Image
                      className="rounded-xl w-full h-full"
                      active
                    />
                  </div>
                  <div className="w-52 h-36 rounded-xl">
                    <Skeleton.Image
                      className="rounded-xl w-full h-full"
                      active
                    />
                  </div>
                  <div className="w-52 h-36 rounded-xl">
                    <Skeleton.Image
                      className="rounded-xl w-full h-full"
                      active
                    />
                  </div>
                </>
              )}
            </div>
            <div className="max-w-full overflow-x-auto">
              <div className="flex items-center gap-2">
                {images.map((image, i) => (
                  <div
                    key={i}
                    className="w-52 h-36 group relative shrink-0 block rounded-xl transition-all overflow-hidden border"
                  >
                    <Button
                      icon={<CloseOutlined />}
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 z-[1] h-10 w-10 rounded-lg"
                    />

                    {image.is_main && (
                      <div className="absolute top-2 left-2 bg-orange-500 p-2 rounded-lg leading-3 select-none">
                        <StarFilled className="text-white text-xs" />
                      </div>
                    )}

                    <img
                      src={image.image}
                      alt={`Hotel image #${i}`}
                      className="w-full h-full block object-cover"
                    />
                    <div
                      className="absolute opacity-0 group-hover:opacity-100 w-full h-full top-0 left-0 bg-black/40 transition cursor-pointer flex items-center justify-center text-white text-sm"
                      onClick={() => setMainImage(i)}
                    >
                      {t('common.set-as-main')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Upload.Dragger beforeUpload={handleUpload} showUploadList={false}>
            <div className="flex flex-col items-center justify-center rounded-2xl py-[40px] h-full w-full hover:cursor-pointer">
              <CameraIcon className="dark:text-dark-bg/80 text-[#E0DEFF]" />
              <Typography.Text className="mt-1 text-[16px] font-[500]">
                {t('common.select-or-drag-one-photo')}
              </Typography.Text>
              <Typography.Text className="mt-1 text-[#878787] font-[400]">
                {t('common.max-size-5-mb')}
              </Typography.Text>
            </div>
          </Upload.Dragger>
        </div>
      </div>
    </div>
  )
}

export default ContentForEMehmonGallery
