import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import Translate, { translate } from '@docusaurus/Translate';
import { useUserStore } from '@site/src/store/user';

interface BladepipeLoginFormProps {
  checkPolicy: boolean;
  onPolicyWarning: () => void;
  encryptPassword: (password: string) => string;
  externalLoading?: boolean;
}

const LOGIN_TYPE_PASSWORD = 'PASSWORD';

const BladepipeLoginForm: React.FC<BladepipeLoginFormProps> = ({
  checkPolicy,
  onPolicyWarning,
  encryptPassword,
  externalLoading = false,
}) => {
  const [form] = Form.useForm();
  const userLogin = useUserStore((state) => state.login);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleSubmit = async (values: { account: string; password: string }) => {
    if (!checkPolicy) {
      onPolicyWarning();
      return;
    }

    setLoginLoading(true);
    try {
      const res: any = await userLogin({
        account: values.account,
        password: encryptPassword(values.password),
        loginType: LOGIN_TYPE_PASSWORD,
        accountType: 'PRIMARY_ACCOUNT',
        verifyCode: '',
        verifyType: '',
        noModal: true,
      });

      setLoginLoading(false);

      if (res && !res.success) {
        form.setFields([
          {
            name: 'password',
            errors: [res.msg || translate({ id: 'login.error.failed', message: 'Login failed' })],
          },
        ]);
      }
    } catch (error) {
      setLoginLoading(false);
      form.setFields([
        {
          name: 'password',
          errors: [translate({ id: 'login.error.failed', message: 'Login failed' })],
        },
      ]);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="w-full flex flex-col gap-[32px]"
      onFinish={handleSubmit}
    >
      <div className="w-full flex flex-col gap-[8px]">
        <div className="h-[24px] flex flex-col gap-[2px]">
          <label className="text-[16px] font-bold leading-[24px] text-black">
            <span className="text-red-500">*</span>
            <Translate id="login.form.email.label">Email</Translate>
          </label>
        </div>
        <Form.Item
          name="account"
          rules={[{ required: true, message: translate({ id: 'login.form.email.required', message: 'Email is required' }) }]}
          className="mb-0"
        >
          <Input
            placeholder={translate({ id: 'login.form.email.placeholder', message: 'Please enter email address' })}
            className="w-full h-[52px] text-[16px] leading-[24px] text-[#262A2B] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
            style={{ background: 'white' }}
          />
        </Form.Item>
      </div>

      <div className="w-full flex flex-col gap-[8px]">
        <div className="h-[24px] flex flex-col gap-[2px]">
          <label className="text-[16px] font-bold leading-[24px] text-black">
            <span className="text-red-500">*</span>
            <Translate id="login.form.password.label">Password</Translate>
          </label>
        </div>
        <Form.Item
          name="password"
          rules={[{ required: true, message: translate({ id: 'login.form.password.required', message: 'Password is required' }) }]}
          className="mb-0"
        >
          <Input.Password
            placeholder={translate({ id: 'login.form.password.placeholder', message: 'Please enter password' })}
            className="w-full h-[52px] text-[16px] leading-[24px] text-[#787070] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
            style={{ background: 'white' }}
          />
        </Form.Item>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="w-full h-[52px] bg-[#0087c7] text-white rounded-full font-bold text-[16px] leading-[24px] hover:bg-[#0070a6] transition disabled:opacity-60"
        loading={loginLoading}
        disabled={loginLoading || externalLoading || !checkPolicy}
        onClick={() => form.submit()}
      >
        <Translate id="login.button.login">Log in</Translate>
      </Button>
    </Form>
  );
};

export default BladepipeLoginForm;
