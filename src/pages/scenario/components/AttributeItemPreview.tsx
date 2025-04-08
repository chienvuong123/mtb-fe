/* eslint-disable react/destructuring-assignment */
import AttributeItem from '@components/organisms/o-scenario-script-container/components/AttributeItem';
import type { ApproachScriptAttributeDTO } from '@dtos';
import { useControlSearchQuery } from '@hooks/queries';
import { useMemo } from 'react';

const AttributeItemPreview = ({
  previewData,
}: {
  previewData: ApproachScriptAttributeDTO;
}) => {
  const { data: controlTypeOptionsData } = useControlSearchQuery({
    page: {
      pageNum: 1,
      pageSize: 1000,
    },
  });

  const controlType = useMemo(() => {
    return controlTypeOptionsData?.data.content.find(
      (item) => item.id === previewData.controlCode,
    )?.type;
  }, [controlTypeOptionsData, previewData.controlCode]);

  return (
    <AttributeItem
      data={{
        ...previewData,
        controlType: controlType || '',
        content: previewData.content ? JSON.stringify(previewData.content) : '',
      }}
      approachId="preview"
    />
  );
};

export default AttributeItemPreview;
