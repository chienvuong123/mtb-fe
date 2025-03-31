import { INPUT_TYPE } from '@types';
import { Form, type FormInstance } from 'antd';
import { useRef, useEffect, type FocusEvent, useMemo } from 'react';
import clsx from 'clsx';
import { formItemComponents, updateTooltipContent } from './util';

const NativeTooltipFormItem = ({
  type,
  fieldName,
  inputProps,
  form,
  isViewMode,
  className,
  handleBlur,
}: {
  type: INPUT_TYPE;
  fieldName?: string;
  inputProps: Record<string, unknown>;
  form?: FormInstance;
  isViewMode?: boolean;
  className?: string;
  handleBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}) => {
  const Component = formItemComponents[type];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isViewMode || !fieldName || !form || !containerRef.current) return;

    const container = containerRef.current;
    const tooltipElement = document.createElement('div');

    Object.assign(tooltipElement.style, {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '4px',
      fontSize: '14px',
      zIndex: '1000',
      display: 'none',
      maxWidth: '300px',
      wordBreak: 'break-word',
      pointerEvents: 'none',
    });

    document.body.appendChild(tooltipElement);

    const showTooltip = () => {
      const content = updateTooltipContent(type, fieldName, form, inputProps);
      if (!content) return null;

      tooltipElement.textContent = String(content);
      tooltipElement.style.display = 'block';

      const rect = container.getBoundingClientRect();
      tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 5 + window.scrollY}px`;
      tooltipElement.style.left = `${rect.left + window.scrollX}px`;

      return null;
    };

    const hideTooltip = () => {
      tooltipElement.style.display = 'none';
    };

    const updateTooltipPosition = () => {
      if (tooltipElement.style.display === 'block') {
        const rect = container.getBoundingClientRect();
        tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 5 + window.scrollY}px`;
        tooltipElement.style.left = `${rect.left + window.scrollX}px`;
      }
    };

    container.addEventListener('mouseenter', showTooltip);
    container.addEventListener('mouseleave', hideTooltip);
    window.addEventListener('scroll', updateTooltipPosition);
    window.addEventListener('resize', updateTooltipPosition);

    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener('mouseenter', showTooltip);
      container.removeEventListener('mouseleave', hideTooltip);
      window.removeEventListener('scroll', updateTooltipPosition);
      window.removeEventListener('resize', updateTooltipPosition);
      document.body.removeChild(tooltipElement);
    };
  }, [type, fieldName, form, isViewMode, inputProps]);

  const props = useMemo(
    () => ({
      className: clsx(className, 'cursor-default'),
      onBlur: handleBlur,
      form,
      name: fieldName,
      open: false,
      allowClear: false,
      ...([INPUT_TYPE.TEXT, INPUT_TYPE.TEXT_AREA].includes(type)
        ? {}
        : { suffixIcon: null }),
      ...(type === INPUT_TYPE.DATE_PICKER
        ? { inputReadOnly: true }
        : { readOnly: true }),
      ...inputProps,
      placeholder: '',
      ...(type === INPUT_TYPE.SELECT
        ? {
            showSearch: false,
            filterOption: false,
          }
        : {}),
    }),
    [className, fieldName, form, handleBlur, inputProps, type],
  );

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <Form.Item name={fieldName} noStyle>
        <Component {...props} />
      </Form.Item>
    </div>
  );
};

export default NativeTooltipFormItem;
