import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ssoAuth, logout } from '@site/src/apis/user';
// 其他接口如需用到可继续import
import { getPublicKey } from '@site/src/apis/constant';
import { sm2 } from 'sm-crypto';
import { useConstantStore } from '@site/src/store/constant';
import { useUserStore } from '@site/src/store/user';
// import { sendCode } from '@site/apis/verify';
import { Form, Input, Button, Tabs } from 'antd';
import LoginSidebar from '@site/src/components/LoginSidebar';
import CountDownButton from '@site/src/components/CountDownButton';

// 登录类型常量
const LOGIN_TYPES = {
  ACCOUNT: 'ACCOUNT',
  SMS: 'SMS',
  EMAIL: 'EMAIL',
};
const LOGIN_TYPE_LIST = {
  LOGIN_PASSWORD: 'PASSWORD',
  LOGIN_VERIFY: 'VERIFY',
};
const VERIFY_TYPES = {
  SMS_VERIFY_CODE: 'SMS_VERIFY_CODE',
  EMAIL_VERIFY_CODE: 'EMAIL_VERIFY_CODE',
};

const ssoTypes = {
  google: 'https://accounts.google.com/o/oauth2/auth', // 示例
  // ...其他SSO
};

export default function Login() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;

  const [activeLoginType, setActiveLoginType] = useState(
    siteBrand === 'bladepipe' ? LOGIN_TYPES.EMAIL : LOGIN_TYPES.ACCOUNT
  );
  const [loginModel, setLoginModel] = useState({
    account: '',
    password: '',
    loginType: LOGIN_TYPE_LIST.LOGIN_PASSWORD,
    verifyCode: '',
    verifyType: '',
  });
  const [checkPolicy, setCheckPolicy] = useState(true);
  const [warnCheckPolicy, setWarnCheckPolicy] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [wechatLoading, setWechatLoading] = useState(false);
  const [dingtalkLoading, setDingtalkLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [publicKey, setPublicKey] = useState<string>('');
  const ssoTypesObj = useConstantStore(state => state.ssoTypes);
  const fetchSsoType = useConstantStore(state => state.ssoType);
  const [form] = Form.useForm();

  // 使用用户store
  const userLogin = useUserStore((state) => state.login);

  // 拉取公钥
  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const res: any = await getPublicKey();
        if (res && (res as any).success) {
          setPublicKey((res as any).data);
        }
      } catch (e) {
        // 可选：提示或埋点
      }
    };
    fetchPublicKey();
  }, []);

  useEffect(() => {
    fetchSsoType();
  }, [fetchSsoType]);

  // antd Form 表单项与 loginModel 双向绑定
  useEffect(() => {
    form.setFieldsValue({
      account: loginModel.account,
      password: loginModel.password,
      verifyCode: loginModel.verifyCode,
    });
  }, [loginModel, form]);

  const handleFormChange = (changedValues: any, allValues: any) => {
    setLoginModel({ ...loginModel, ...changedValues });
  };

  // 密码加密
  const passwordEncrypt = (password: string) => {
    if (publicKey) {
      return sm2.doEncrypt(password, publicKey, 1);
    }
    return password;
  };

  // 切换登录方式
  const handleLoginTypeChange = (type: string) => {
    setActiveLoginType(type);
    if (type === LOGIN_TYPES.ACCOUNT) {
      setLoginModel({ account: '', password: '', loginType: LOGIN_TYPE_LIST.LOGIN_PASSWORD, verifyCode: '', verifyType: '' });
    } else if (type === LOGIN_TYPES.SMS) {
      setLoginModel({ account: '', verifyCode: '', loginType: LOGIN_TYPE_LIST.LOGIN_VERIFY, verifyType: VERIFY_TYPES.SMS_VERIFY_CODE, password: '' });
    } else if (type === LOGIN_TYPES.EMAIL) {
      setLoginModel({ account: '', verifyCode: '', loginType: LOGIN_TYPE_LIST.LOGIN_VERIFY, verifyType: VERIFY_TYPES.EMAIL_VERIFY_CODE, password: '' });
    }
  };

  // 表单校验
  const validate = () => {
    if (!loginModel.account) return { field: 'account', message: translate({ id: 'login.form.account.required', message: 'Account is required' }) };
    if (activeLoginType === LOGIN_TYPES.ACCOUNT && !loginModel.password) return { field: 'password', message: translate({ id: 'login.form.password.required', message: 'Password is required' }) };
    if ((activeLoginType === LOGIN_TYPES.SMS || activeLoginType === LOGIN_TYPES.EMAIL) && !loginModel.verifyCode) return { field: 'verifyCode', message: translate({ id: 'login.form.verifyCode.required', message: 'Verification code is required' }) };
    return null;
  };

  // 登录处理
  const handleLogin = async () => {
    setLoginError('');
    const validationResult = validate();
    if (validationResult) {
      form.setFields([
        {
          name: validationResult.field,
          errors: [validationResult.message]
        }
      ]);
      return;
    }
    if (!checkPolicy) {
      setWarnCheckPolicy(true);
      return;
    }
    setLoginLoading(true);
    try {
      // 根据登录类型处理参数
      const params = {
        ...loginModel,
        accountType: 'PRIMARY_ACCOUNT',
        noModal: true,
      };

      // 如果是密码登录，需要加密密码
      if (activeLoginType === LOGIN_TYPES.ACCOUNT) {
        params.password = passwordEncrypt(loginModel.password);
      }
      const res: any = await userLogin(params);
      setLoginLoading(false);
      if (res && res.success) {
        console.log('Login successful');
        // 跳转逻辑已在userLogin中处理，这里不需要额外处理
      } else if (!res) {
        const errorField = activeLoginType === LOGIN_TYPES.ACCOUNT ? 'password' : 'verifyCode';
        form.setFields([
          {
            name: errorField,
            errors: [translate({ id: 'login.error.system', message: 'System error' })]
          }
        ]);
      } else {
        const errorField = activeLoginType === LOGIN_TYPES.ACCOUNT ? 'password' : 'verifyCode';
        form.setFields([
          {
            name: errorField,
            errors: [res.msg || translate({ id: 'login.error.failed', message: 'Login failed' })]
          }
        ]);
      }
    } catch (e) {
      setLoginLoading(false);
      const errorField = activeLoginType === LOGIN_TYPES.ACCOUNT ? 'password' : 'verifyCode';
      form.setFields([
        {
          name: errorField,
          errors: [translate({ id: 'login.error.failed', message: 'Login failed' })]
        }
      ]);
    }
  };


  // 协议勾选
  const handleCheckPolicy = () => {
    setCheckPolicy(true);
    setWarnCheckPolicy(false);
  };

  return (
    <div className="w-full min-h-screen flex overflow-hidden">
      <LoginSidebar
        title={<Translate id="login.sidebar.title">Your Free 90-day Trial Includes</Translate>}
        description={siteBrand === 'clouddm' ? (
          <Translate id="login.sidebar.description.clouddm">专注于多数据源安全访问与管控，提高协作效率，让您更放心地使用数据。</Translate>
        ) : (
          <Translate id="login.sidebar.description">A data replication tool focused on real-time incremental updates, giving you deeper insights into your data.</Translate>
        )}
        features={[
          <Translate id="login.sidebar.feature1" key="feature1">$300 credits</Translate>,
          <Translate id="login.sidebar.feature2" key="feature2">Cloud and On-Premise are optional</Translate>,
          <Translate id="login.sidebar.feature3" key="key3">All connectors are available</Translate>,
          <Translate id="login.sidebar.feature4" key="key4">SOC 2, GDPR and ISO 27001 Certified</Translate>
        ]}
      />

      {/* 右侧登录表单部分 - 响应式布局 */}
      <div className="flex-1 h-screen overflow-y-auto flex justify-center items-start py-8 md:py-24">
        <div className="w-[416px] flex flex-col gap-[32px] justify-start items-start px-4 sm:px-0 py-8 sm:py-0">
          {/* 标题和徽章 - 响应式设计 */}
          <div className="w-full h-auto flex flex-col gap-[32px] justify-start items-start">
            <h2 className="text-[24px] font-bold leading-[32px] text-black text-center w-full">
              <span className="mr-2">
                <Translate id="login.title">
                  Log in to
                </Translate>
              </span>
              {siteBrand === 'clouddm' ? 'CloudDM' : siteBrand === 'clougence' ? 'ClouGence' : 'BladePipe'}
            </h2>

            {/* 徽章区域 - 响应式布局 */}
            {siteBrand !== 'clouddm' && (
              <div className="w-[416px] h-auto flex flex-col sm:flex-row gap-4 sm:gap-[40px] justify-center items-start">
                <div className="flex gap-[10px] justify-start items-center">
                  <div className="w-[20px] h-[20px] bg-[#4BCC6A] rounded-full flex justify-center items-center flex-shrink-0">
                    <svg className="w-[9.5px] h-[7px]" viewBox="0 0 10 7" fill="none">
                      <path d="M1.33 3.81L4.25 6.5L8.83 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-medium leading-[20px] text-black whitespace-nowrap">
                    <Translate id="login.badge.noCreditCard">No credit card required</Translate>
                  </span>
                </div>

                <div className="flex gap-[10px] justify-start items-center">
                  <div className="w-[20px] h-[20px] bg-[#4BCC6A] rounded-full flex justify-center items-center flex-shrink-0">
                    <svg className="w-[9.5px] h-[7px]" viewBox="0 0 10 7" fill="none">
                      <path d="M1.33 3.81L4.25 6.5L8.83 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-medium leading-[20px] text-black whitespace-nowrap">
                    <Translate id="login.badge.freeTrial">Free Trial Now</Translate>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 表单区域 - 响应式设计 */}
          <div className="w-full h-auto flex flex-col gap-[28px] justify-start items-start">
            {/* Google登录和分割线 */}
            <div className="w-full h-auto flex flex-col gap-[24px] justify-start items-start">
              {/* Google登录按钮 */}
              {ssoTypesObj.google && (
                <Button
                  className="w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#262A2B]"
                  onClick={() => {
                    if (ssoTypesObj.google) {
                      setGoogleLoading(true);
                      window.location.replace(ssoTypesObj.google);
                    }
                  }}
                  loading={googleLoading}
                >
                  <div className="flex gap-[16px] justify-center items-center">
                    <img src="/img/home/icon/google.svg" alt="Google" className="w-[24px] h-[24px] flex-shrink-0" />
                    <span className="text-[14px] font-medium leading-[20px] whitespace-nowrap">
                      <Translate id="login.googleButton">Continue with Google</Translate>
                    </span>
                  </div>
                </Button>
              )}

              {/* Wechat登录按钮 */}
              {ssoTypesObj.wechat && (
                <Button
                  className="w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#262A2B]"
                  onClick={() => {
                    if (ssoTypesObj.wechat) {
                      setWechatLoading(true);
                      window.location.replace(ssoTypesObj.wechat);
                    }
                  }}
                  loading={wechatLoading}
                >
                  <div className="flex gap-[16px] justify-center items-center">
                    <img src="/img/home/icon/wechat.svg" alt="Wechat" className="w-[24px] h-[24px] flex-shrink-0" />
                    <span className="text-[14px] font-medium leading-[20px] whitespace-nowrap">
                      <Translate id="login.wechatButton">微信登录</Translate>
                    </span>
                  </div>
                </Button>
              )}

              {/* dingtalk登录按钮 */}
              {ssoTypesObj.dingtalk && (
                <Button
                  className="w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#262A2B]"
                  onClick={() => {
                    if (ssoTypesObj.dingtalk) {
                      setDingtalkLoading(true);
                      window.location.replace(ssoTypesObj.dingtalk);
                    }
                  }}
                  loading={dingtalkLoading}
                >
                  <div className="flex gap-[16px] justify-center items-center">
                    <img src="/img/home/icon/dingtalk.svg" alt="Dingtalk" className="w-[24px] h-[24px] flex-shrink-0" />
                    <span className="text-[14px] font-medium leading-[20px] whitespace-nowrap">
                      <Translate id="login.dingtalkButton">钉钉登录</Translate>
                    </span>
                  </div>
                </Button>
              )}

              {/* 分割线 */}
              <div className="w-full h-[20px] flex justify-between items-center">
                <div className="flex-1 h-[1px] bg-[#11101a] bg-opacity-10"></div>
                <div className="px-[20px] flex justify-center items-center">
                  <span className="text-[12px] leading-[20px] text-[#3F3F46] whitespace-nowrap">
                    <Translate id="login.divider.or">Or</Translate>
                  </span>
                </div>
                <div className="flex-1 h-[1px] bg-[#11101a] bg-opacity-10"></div>
              </div>
            </div>


            {/* 登录方式切换 */}
            {siteBrand !== 'bladepipe' && (
              <div className="w-full h-auto flex flex-col gap-[16px] justify-start items-center">
                <Tabs
                  activeKey={activeLoginType}
                  onChange={handleLoginTypeChange}
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
            )}

            {/* 表单输入区域 - 响应式设计 */}
            <div className="w-full h-auto flex flex-col gap-[32px] justify-start items-center">
              <Form
                form={form}
                layout="vertical"
                className="w-full flex flex-col gap-[32px]"
                onFinish={handleLogin}
                onValuesChange={handleFormChange}
              >
                {/* 账号/邮箱输入框 */}
                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                  <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                    <label className="text-[16px] font-bold leading-[24px] text-black">
                      <span className="text-red-500">*</span>
                      {siteBrand === 'bladepipe' ? (
                        <Translate id="login.form.email.label">Email</Translate>
                      ) : activeLoginType === LOGIN_TYPES.ACCOUNT ? (
                        <Translate id="login.form.account.label">账号</Translate>
                      ) : activeLoginType === LOGIN_TYPES.SMS ? (
                        <Translate id="login.form.phone.label">手机号</Translate>
                      ) : (
                        <Translate id="login.form.email.label">Email</Translate>
                      )}
                    </label>
                  </div>
                  <Form.Item
                    name="account"
                    rules={[{ required: true, message: translate({ id: 'login.form.account.required', message: 'Account is required' }) }]}
                    className="mb-0 w-full"
                  >
                    <Input
                      placeholder={
                        siteBrand === 'bladepipe'
                          ? translate({ id: 'login.form.email.placeholder', message: 'Please enter email address' })
                          : activeLoginType === LOGIN_TYPES.ACCOUNT
                            ? translate({ id: 'login.form.phone.placeholder', message: '请输入手机号' })
                            : activeLoginType === LOGIN_TYPES.SMS
                              ? translate({ id: 'login.form.phone.placeholder', message: '请输入手机号' })
                              : translate({ id: 'login.form.email.placeholder', message: '请输入邮箱地址' })
                      }
                      className="w-full h-[52px] text-[16px] leading-[24px] text-[#262A2B] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                      style={{ background: 'white' }}
                    />
                  </Form.Item>
                </div>

                {/* 密码输入框 - 仅账号密码登录时显示或bladepipe品牌时显示 */}
                {(activeLoginType === LOGIN_TYPES.ACCOUNT || siteBrand === 'bladepipe') && (
                  <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                      <label className="text-[16px] font-bold leading-[24px] text-black">
                        <span className="text-red-500">*</span><Translate id="login.form.password.label">Password</Translate>
                      </label>
                    </div>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: translate({ id: 'login.form.password.required', message: 'Password is required' }) }]}
                      className="mb-0 w-full"
                    >
                      <Input.Password
                        placeholder={translate({ id: 'login.form.password.placeholder', message: 'Please enter password' })}
                        className="w-full h-[52px] text-[16px] leading-[24px] text-[#787070] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                        style={{ background: 'white' }}
                      />
                    </Form.Item>
                  </div>
                )}

                {/* 验证码输入框 - 仅短信/邮箱验证时显示，bladepipe品牌不显示 */}
                {siteBrand !== 'bladepipe' && (activeLoginType === LOGIN_TYPES.SMS || activeLoginType === LOGIN_TYPES.EMAIL) && (
                  <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                      <label className="text-[16px] font-bold leading-[24px] text-black">
                        <span className="text-red-500">*</span>
                        {activeLoginType === LOGIN_TYPES.SMS ? (
                          <Translate id="login.form.smsCode.label">SMS Verification Code</Translate>
                        ) : (
                          <Translate id="login.form.emailCode.label">Email Verification Code</Translate>
                        )}
                      </label>
                    </div>
                    <div className="w-full h-auto flex gap-[16px] justify-start items-end">
                      <div className="flex-1 h-auto flex flex-col gap-[8px] justify-start items-start">
                        <Form.Item
                          name="verifyCode"
                          rules={[{ required: true, message: translate({ id: 'login.form.verifyCode.required', message: 'Verification code is required' }) }]}
                          className="mb-0 w-full"
                        >
                          <Input
                            placeholder={
                              activeLoginType === LOGIN_TYPES.SMS
                                ? translate({ id: 'login.form.smsCode.placeholder', message: 'Please enter SMS verification code' })
                                : translate({ id: 'login.form.emailCode.placeholder', message: 'Please enter email verification code' })
                            }
                            className="w-full h-[52px] text-[16px] leading-[24px] text-[#262A2B] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                            style={{ background: 'white' }}
                          />
                        </Form.Item>
                      </div>

                      {/* 获取验证码按钮 - 仅短信验证时显示，bladepipe品牌不显示 */}
                      {siteBrand !== 'bladepipe' && activeLoginType === LOGIN_TYPES.SMS && (
                        <Form.Item shouldUpdate noStyle>
                          {() => (
                            <div className="w-[104px] h-[52px] bg-[#0087c7] rounded-[8px]">
                              <CountDownButton
                                phoneNumber={form.getFieldValue('account')}
                                verifyCodeType="LOGIN"
                                onError={(error) => {
                                  // 显示错误信息在验证码输入框下方
                                  form.setFields([
                                    {
                                      name: 'verifyCode',
                                      errors: [error]
                                    }
                                  ]);
                                }}
                              />
                            </div>
                          )}
                        </Form.Item>
                      )}
                    </div>
                  </div>
                )}
              </Form>

              {/* 登录按钮和链接 - 响应式设计 */}
              <div className="w-full h-auto flex flex-col gap-[40px] justify-start items-center">
                <div className="w-full h-auto flex flex-col gap-[16px] justify-start items-start">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-[52px] bg-[#0087c7] text-white rounded-full font-bold text-[16px] leading-[24px] hover:bg-[#0070a6] transition disabled:opacity-60"
                    loading={loginLoading}
                    disabled={!checkPolicy || loginLoading || googleLoading || wechatLoading || dingtalkLoading}
                    onClick={() => form.submit()}
                  >
                    <Translate id="login.button.login">Log in</Translate>
                  </Button>

                  <div className="w-full h-auto flex flex-col sm:flex-row sm:justify-between items-start gap-2 sm:gap-0">
                    <p className="text-[14px] leading-[20px] text-black">
                      <Translate id="login.link.noAccount">Don't have an account?</Translate>{' '}
                      <Link to="/register" className="text-[#0087c7] font-bold hover:underline">
                        <Translate id="login.link.signUp">Sign Up</Translate>
                      </Link>
                    </p>
                    <Link to="/resetPwd" className="text-[14px] leading-[20px] text-black hover:underline">
                      <Translate id="login.link.forgotPassword">Forgot your password?</Translate>
                    </Link>
                  </div>
                </div>

                <div className="w-full h-auto flex gap-[16px] justify-start items-start">
                  <div className="w-[16px] h-[20px] flex justify-start items-center py-[2px] flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={checkPolicy}
                      onChange={e => {
                        setCheckPolicy(e.target.checked);
                        setWarnCheckPolicy(false);
                      }}
                      className="w-[16px] h-[16px] border-2 border-solid border-[#0087c7] border-opacity-20 rounded-[2px] accent-[#0087c7]"
                    />
                  </div>
                  <p className="flex-1 text-[14px] font-medium leading-[20px] text-black">
                    <Translate id="login.policy.agreement">By signing up and continuing, you agree to our</Translate>{' '}
                    <Link to="/docs/protocol/terms_of_use" className="text-[#0087c7] hover:underline">
                      <Translate id="login.policy.termsOfService">Terms of Service</Translate>
                    </Link>{' '}
                    <Translate id="login.policy.and">and</Translate>{' '}
                    <Link to="/docs/protocol/privacy_policy " className="text-[#0087c7] hover:underline">
                      <Translate id="login.policy.privacyPolicy">Privacy Policy</Translate>
                    </Link>
                    <Translate id="login.policy.period">.</Translate>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}