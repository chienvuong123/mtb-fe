import React from 'react';
import { LogoDisplay } from '@assets/icons';
import { AAlert, AButton } from '@components/atoms';
import { Flex, Form, type FormProps, Typography } from 'antd';

import './FormContent.scss';

const { Title } = Typography;

interface IFormContent extends FormProps {
  title: string;
  subTitle: string | React.ReactNode;
  textButton: string;
  isLoading?: boolean;
  textLink: string | React.ReactNode;
  alertText?: string;
  typeAlert?: 'success' | 'error' | 'warning';
  subLink?: string | React.ReactNode;
  formContent: JSX.Element | null;
}

const FormContent: React.FC<IFormContent> = ({
  title,
  subTitle,
  textButton,
  isLoading,
  textLink,
  alertText,
  subLink,
  typeAlert = 'error',
  formContent,
  ...props
}) => {
  return (
    <Flex align="center" justify="space-between" className="mt-29 form-authen">
      <Flex vertical>
        <Form className="form-container" layout="vertical" {...props}>
          <div>
            <Title level={2} className="mb-10">
              {title}
            </Title>
            <p className="fs-16 fw-400 lh-150">{subTitle}</p>
          </div>

          {alertText && (
            <AAlert
              type={typeAlert ?? 'error'}
              className="mt-16"
              message={alertText}
            />
          )}

          <div className="my-24 form-content">{formContent}</div>

          <AButton
            className="w-full"
            color="purple"
            variant="solid"
            size="large"
            htmlType="submit"
            loading={isLoading}
          >
            {textButton}
          </AButton>

          <p className={`mt-24 fs-14 fw-500 ${isLoading ? 'disable' : ''}`}>
            {subLink}
          </p>
        </Form>

        <span className="fs-14 py-12 mt-10 text-link">{textLink}</span>
      </Flex>

      <LogoDisplay className="my-4 pb-75" />
    </Flex>
  );
};

export default FormContent;
