import React, { useState } from 'react';
import { Form, Input, Button, Tabs } from 'antd';
import Translate, { translate } from '@docusaurus/Translate';
import CountDownButton from '@site/src/components/CountDownButton';
import { useUserStore } from '@site/src/store/user';

const LOGIN_TYPES = {
  ACCOUNT: 'ACCOUNT',
  SMS: 'SMS',
};

const LOGIN_TYPE_LIST = {
  LOGIN_PASSWORD: 'PASSWORD',
  LOGIN_VERIFY: 'VERIFY',
};

const VERIFY_TYPES = {
  SMS_VERIFY_CODE: 'SMS_VERIFY_CODE',
};

interface CloudCanalLoginFormProps {
  checkPolicy: boolean;
  onPolicyWarning: () => void;
  encryptPassword: (password: string) => string;
  externalLoading?: boolean;
}

const CloudCanalLoginForm: React.FC<CloudCanalLoginFormProps> = ({
  checkPolicy,
  onPolicyWarning,
  encryptPassword,
  externalLoading = false,
}) => {
  const [form] = Form.useForm();
  const userLogin = useUserStore((state) => state.login);
  const [activeLoginType, setActiveLoginType] = useState<string>(LOGIN_TYPES.ACCOUNT);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleSubmit = async (values: { account: string; password?: string; verifyCode?: string }) => {
    if (!checkPolicy) {
      onPolicyWarning();
      return;
    }

    setLoginLoading(true);
    try {
      const params: any = {
        account: values.account,
        loginType: activeLoginType === LOGIN_TYPES.ACCOUNT ? LOGIN_TYPE_LIST.LOGIN_PASSWORD : LOGIN_TYPE_LIST.LOGIN_VERIFY,
        accountType: 'PRIMARY_ACCOUNT',
        noModal: true,
      };

      if (activeLoginType === LOGIN_TYPES.ACCOUNT) {
        params.password = encryptPassword(values.password || '');
        params.verifyCode = '';
        params.verifyType = '';
      } else {
        params.verifyCode = values.verifyCode;
        params.verifyType = VERIFY_TYPES.SMS_VERIFY_CODE;
        params.password = '';
      }

      const res: any = await userLogin(params);
      setLoginLoading(false);

      if (res && !res.success) {
        const errorField = activeLoginType === LOGIN_TYPES.ACCOUNT ? 'password' : 'verifyCode';
        form.setFields([
          {
            name: errorField,
            errors: [res.msg || translate({ id: 'login.error.failed', message: 'Login failed' })],
          },
        ]);
      }
    } catch (error) {
      setLoginLoading(false);
      const errorField = activeLoginType === LOGIN_TYPES.ACCOUNT ? 'password' : 'verifyCode';
      form.setFields([
        {
          name: errorField,
          errors: [translate({ id: 'login.error.failed', message: 'Login failed' })],
        },
      ]);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-[16px] justify-start items-center">
        <Tabs
          activeKey={activeLoginType}
          onChange={setActiveLoginType}
          items={[
            {
              key: LOGIN_TYPES.ACCOUNT,
              label: <Translate id="login.tab.account">账号密码</Translate>,
            },
            {
              key: LOGIN_TYPES.SMS,
              label: <Translate id="login.tab.sms">短信验证</Translate>,
            },
          ]}
          className="login-tabs-custom"
        />
      </div>

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
              {activeLoginType === LOGIN_TYPES.ACCOUNT ? (
                <Translate id="login.form.account.label">账号</Translate>
              ) : (
                <Translate id="login.form.phone.label">手机号</Translate>
              )}
            </label>
          </div>
          <Form.Item
            name="account"
            rules={[{ required: true, message: translate({ id: 'login.form.account.required', message: 'Account is required' }) }]}
            className="mb-0"
          >
            <Input
              placeholder={
                activeLoginType === LOGIN_TYPES.ACCOUNT
                  ? translate({ id: 'login.form.phone.placeholder', message: '请输入手机号' })
                  : translate({ id: 'login.form.phone.placeholder', message: '请输入手机号' })
              }
              className="w-full h-[52px] text-[16px] leading-[24px] text-[#262A2B] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
              style={{ background: 'white' }}
              onChange={() => {
                // 当手机号改变时，清除验证码错误信息
                if (activeLoginType === LOGIN_TYPES.SMS) {
                  form.setFields([
                    {
                      name: 'verifyCode',
                      errors: [],
                    },
                  ]);
                }
              }}
            />
          </Form.Item>
        </div>

        {activeLoginType === LOGIN_TYPES.ACCOUNT && (
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
        )}

        {activeLoginType === LOGIN_TYPES.SMS && (
          <div className="w-full flex flex-col gap-[8px]">
            <div className="h-[24px] flex flex-col gap-[2px]">
              <label className="text-[16px] font-bold leading-[24px] text-black">
                <span className="text-red-500">*</span>
                <Translate id="login.form.smsCode.label">SMS Verification Code</Translate>
              </label>
            </div>
            <div className="w-full flex gap-[16px] items-end">
              <div className="flex-1 flex flex-col gap-[8px]">
                <Form.Item
                  name="verifyCode"
                  rules={[{ required: true, message: translate({ id: 'login.form.verifyCode.required', message: 'Verification code is required' }) }]}
                  className="mb-0"
                >
                  <Input
                    placeholder={translate({ id: 'login.form.smsCode.placeholder', message: 'Please enter SMS verification code' })}
                    className="w-full h-[52px] text-[16px] leading-[24px] text-[#262A2B] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                    style={{ background: 'white' }}
                  />
                </Form.Item>
              </div>

              <Form.Item shouldUpdate noStyle>
                {() => (
                  <div
                    className="w-[104px] h-[52px] bg-[#0087c7] border border-solid border-black border-opacity-20 rounded-[8px] flex justify-center items-center cursor-pointer"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <div className="get-code-wrapper">
                      <CountDownButton
                        phoneNumber={form.getFieldValue('account')}
                        verifyCodeType="LOGIN"
                        onError={(error) => {
                          form.setFields([
                            {
                              name: 'verifyCode',
                              errors: [error],
                            },
                          ]);
                        }}
                        onSuccess={() => {
                          // 验证码发送成功时清除错误信息
                          form.setFields([
                            {
                              name: 'verifyCode',
                              errors: [],
                            },
                          ]);
                        }}
                      />
                    </div>
                  </div>
                )}
              </Form.Item>
            </div>
          </div>
        )}

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
    </>
  );
};

export default CloudCanalLoginForm;
