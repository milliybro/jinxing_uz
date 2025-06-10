import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

interface IProps {
  status: string;
}

const StatusRoomTag: FC<IProps> = ({ status }) => {
  const { t } = useTranslation();

  const statusStyles: Record<string, { text: string; styles: string }> = {
    Подтвержден: {
      text: t('status.confirmed'),
      styles: 'text-[#115E59] bg-[#CCFBF1]',
    },
    'В ожидании': {
      text: t('status.pending'),
      styles: 'text-[#854D0E] bg-[#FEF9C3]',
    },
    Отменен: {
      text: t('status.canceled'),
      styles: 'text-danger-dark bg-danger-light/80',
    },
    Свободный: {
      text: t('status.free'),
      styles: 'text-primary bg-primary-light',
    },
  };

  const currentStatus = statusStyles[status] || {
    text: t('status.unknown'),
    styles: 'text-gray-500 bg-gray-200',
  };

  return (
    <span
      className={`
        ${currentStatus.styles}
        shrink-0 text-[12px] font-medium px-[10px] py-[6px] rounded-[6px]
      `}
    >
      {currentStatus.text}
    </span>
  );
};

export default StatusRoomTag;
