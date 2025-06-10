import { useTranslation } from 'react-i18next';
import type { FC } from 'react';

interface IProps {
  status: string;
}

const StatusTag: FC<IProps> = ({ status }) => {
  const { t } = useTranslation();

  const statusStyles: Record<string, { text: string; styles: string }> = {
    true: {
      text: t('status.clean'),
      styles: 'text-[#115E59] bg-[#CCFBF1]',
    },
    false: {
      text: t('status.dirty'),
      styles: 'text-danger-dark bg-danger-light/80',
    }
  };

  const currentStatus = statusStyles[status] || {
    text: t('status.unknown'),
    styles: 'text-gray-500 bg-gray-200',
  };

  return (
    <span
      className={`
        ${currentStatus.styles} ms-6
        shrink-0 text-[12px] font-medium px-[10px] py-[6px] rounded-[6px] 
    whitespace-nowrap flex-shrink-0
      `}
    >
      {currentStatus.text}
    </span>
  );
};

export default StatusTag;
