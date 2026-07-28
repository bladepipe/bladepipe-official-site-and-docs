import React, { useCallback, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { Spin, message, Form, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { loginMfaValid, ssoAuth } from '@site/src/apis/user';
import { useLocation, useHistory } from '@docusaurus/router';
import { getCloudUrl } from '@site/src/utils/api';
import { useUserStore } from '@site/src/store/user';
import CountDownButton from '@site/src/components/CountDownButton';
import MfaLoginStep from '@site/src/components/LoginForms/MfaLoginStep';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// 验证码类型常量
const VERIFY_CODE_TYPE = {
  SSO_REGISTER_BIND: 'SSO_REGISTER_BIND'
};

// Base64 解码函数
const decodeBase64 = (str: string) => {
  try {
    return JSON.parse(atob(str));
  } catch (e) {
    console.error('Base64 decode error:', e);
    return null;
  }
};

export default function Loading() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;
  const location = useLocation();
  const history = useHistory();
  const queryLoginUser = useUserStore((state) => state.queryLoginUser);

  // 注册信息补充相关状态
  const [showAddPhone, setShowAddPhone] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [stateForCC, setStateForCC] = useState<string | null>(null);
  const [registerForm] = Form.useForm();
  const [verifyCodeError, setVerifyCodeError] = useState('');
  const [showMfa, setShowMfa] = useState(false);
  const [mfaPreActionToken, setMfaPreActionToken] = useState('');
  const [mfaLoading, setMfaLoading] = useState(false);
  const [mfaError, setMfaError] = useState('');
  const [checkPolicy, setCheckPolicy] = useState(false);
  const [warnCheckPolicy, setWarnCheckPolicy] = useState(false);

  // 自定义 loading 图标，使用主题色 #0087c7
  const antIcon = <LoadingOutlined style={{ fontSize: 40, color: '#0087c7' }} spin />;

  const redirectToLogin = useCallback(() => {
    if (siteBrand === 'bladepipe') {
      history.push('/login/');
    } else {
      history.push('/login');
    }
  }, [history, siteBrand]);

  const finishLogin = useCallback(
    async (state: string | null | undefined) => {
      await queryLoginUser();

      const stateData = state ? decodeBase64(state) : null;
      const target = stateData?.target;
      localStorage.removeItem('loginSource');

      if (target === 'try_cloud_free') {
        window.location.href = getCloudUrl();
      } else if (target === 'download' || target === 'download_community') {
        localStorage.setItem('openCommunityDownloadModal', 'true');
        history.push('/');
      } else if (target === 'buy_a_license') {
        window.location.href = getCloudUrl() + '/#/system/license';
      } else {
        history.push('/');
      }
    },
    [history, queryLoginUser]
  );

  const enterMfaStep = useCallback(
    (challengeToken: string | null | undefined) => {
      if (!challengeToken) {
        message.error(translate({ id: 'login.error.failed', message: 'Login failed' }));
        redirectToLogin();
        return false;
      }

      setShowAddPhone(false);
      setMfaPreActionToken(challengeToken);
      setMfaError('');
      setShowMfa(true);
      return true;
    },
    [redirectToLogin]
  );

  const handleMfaBack = useCallback(() => {
    setShowMfa(false);
    setMfaPreActionToken('');
    setMfaError('');
    redirectToLogin();
  }, [redirectToLogin]);

  const handleMfaSubmit = useCallback(
    async (mfaCode: string) => {
      if (!mfaPreActionToken) {
        setMfaError(translate({ id: 'login.error.failed', message: 'Login failed' }));
        return;
      }

      setMfaLoading(true);
      setMfaError('');
      try {
        const res: any = await loginMfaValid({
          mfaCode: Number(mfaCode),
          mfaPreActionToken
        });
        if (res?.success && res.data?.token) {
          await finishLogin(stateForCC);
          return;
        }
        setMfaError(res?.msg || translate({ id: 'login.error.failed', message: 'Login failed' }));
      } catch (error: any) {
        setMfaError(error?.response?.data?.msg || translate({ id: 'login.error.failed', message: 'Login failed' }));
      } finally {
        setMfaLoading(false);
      }
    },
    [finishLogin, mfaPreActionToken, stateForCC]
  );

  useEffect(() => {
    const handleAuth = async () => {
      try {
        let authParams: any = {};

        if (siteBrand === 'clougence' || siteBrand === 'clouddm') {
          // 对于 clougence 品牌，从 URL query 参数获取所有参数
          const queryParams = new URLSearchParams(location.search);
          queryParams.forEach((value, key) => {
            authParams[key] = value;
          });
        } else {
          // 对于其他品牌，从 URL hash 获取参数
          const hashParams = new URLSearchParams(location.hash.substring(1));
          const stateBase64 = hashParams.get('state');
          const accessToken = hashParams.get('access_token');

          if (!stateBase64 || !accessToken) {
            message.error('Invalid authentication parameters');
            redirectToLogin();
            return;
          }

          authParams = { state: stateBase64, accessToken };
        }

        if (authParams.state) {
          setStateForCC(authParams.state);
        }

        // 调用 auth 接口
        const res: any = await ssoAuth(authParams);

        if (res && res.success) {
          if (res.data?.needMfa) {
            enterMfaStep(res.data?.mfaPreActionToken);
            return;
          }
          if (!res.data?.token) {
            message.error(translate({ id: 'login.error.failed', message: 'Login failed' }));
            redirectToLogin();
            return;
          }
          await finishLogin(authParams.state);
        } else {
          // 检查是否有 requestId，如果有则需要补充注册信息
          if (res?.requestId) {
            setRequestId(res.requestId);
            setShowAddPhone(true);
          } else {
            message.error(res?.msg || 'Authentication failed');
            redirectToLogin();
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        message.error('Authentication failed');
        redirectToLogin();
      }
    };

    handleAuth();
  }, [enterMfaStep, finishLogin, location.hash, location.search, redirectToLogin, siteBrand]);

  // 处理注册信息补充
  const handleSignin = async () => {
    if (!checkPolicy) {
      setWarnCheckPolicy(true);
      return;
    }

    try {
      const values = await registerForm.validateFields();

      if (!stateForCC) {
        message.error(translate({ id: 'loading.form.state.missing', message: '认证状态缺失，请重新完成登录流程' }));
        return;
      }

      const res: any = await ssoAuth({
        state: stateForCC,
        requestId: requestId,
        phone: values.phone,
        company: values.company,
        verifyCode: values.verifyCode
      });

      if (res && res.success) {
        if (res.data?.needMfa) {
          enterMfaStep(res.data?.mfaPreActionToken);
          return;
        }
        if (!res.data?.token) {
          message.error(translate({ id: 'login.error.failed', message: 'Login failed' }));
          return;
        }
        setShowAddPhone(false);
        await finishLogin(stateForCC);
      } else {
        message.error(res?.msg || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // 表单验证规则
  const registerFormRule = {
    phone: [{ required: true, message: translate({ id: 'loading.form.phone.required', message: '手机号不能为空' }), trigger: 'blur' }],
    company: [],
    verifyCode: [{ required: true, message: translate({ id: 'loading.form.verifyCode.required', message: '验证码不能为空' }), trigger: 'blur' }]
  };

  // 判断是否应该显示错误信息，过滤掉后端直接报错
  const shouldShowError = (errorMessage: string) => {
    if (!errorMessage) return false;

    try {
      const errorObj = JSON.parse(errorMessage);
      return !errorObj.error;
    } catch {
      const technicalErrorKeywords = ['error', 'Error', 'exception', 'Exception', 'stack', 'trace'];
      return !technicalErrorKeywords.some((keyword) => errorMessage.includes(keyword));
    }
  };

  return (
    <div className='w-full min-h-screen flex justify-center items-center bg-white'>
        {showMfa ? (
          <div className='w-[416px] flex flex-col justify-center items-center px-4 sm:px-0 py-8 sm:py-0'>
            <MfaLoginStep
              loading={mfaLoading}
              errorMessage={mfaError}
              onSubmit={handleMfaSubmit}
              onBack={handleMfaBack}
            />
          </div>
        ) : !showAddPhone ? (
          /* Loading 效果 */
          <div className='flex flex-col items-center gap-6'>
            <Spin indicator={antIcon} />
            <div className='text-[16px] text-[#262A2B] font-medium'>
              <Translate id='loading.authenticating'>Authenticating...</Translate>
            </div>
          </div>
        ) : (
          /* 注册信息补充表单 - 借鉴 login 页面样式 */
        <div className='w-[416px] flex flex-col gap-[40px] justify-center items-center px-4 sm:px-0 py-8 sm:py-0'>
            {/* 标题 */}
            <h2 className='h-[32px] text-[24px] font-bold leading-[32px] text-[#131316]'>
              <Translate id='loading.form.title'>注册信息补充</Translate>
            </h2>

            {/* 表单区域 */}
            <div className='w-full h-auto flex flex-col gap-[28px] justify-start items-start'>
              <Form form={registerForm} layout='vertical' className='w-full flex flex-col gap-[32px]' onFinish={handleSignin}>
                {/* 手机号输入框 */}
                <div className='w-full h-auto flex flex-col gap-[8px] justify-start items-start'>
                  <div className='h-[24px] flex flex-col gap-[2px] justify-start items-start'>
                    <label className='text-[16px] font-bold leading-[24px] text-black'>
                      <span className='text-red-500'>*</span>
                      <Translate id='loading.form.phone.label'>手机号码</Translate>
                    </label>
                  </div>
                  <div className='w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-20 rounded-[8px] flex justify-start items-center px-[14px] focus-within:border-[#d6bbfb] focus-within:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300'>
                    <Form.Item name='phone' rules={registerFormRule.phone} noStyle>
                      <Input
                        placeholder={translate({ id: 'loading.form.phone.placeholder', message: '请输入手机号码' })}
                        className='flex-1 h-[24px] text-[16px] leading-[24px] text-[#262A2B] border-none shadow-none focus:placeholder-[#787070] focus:outline-none'
                        style={{ background: 'transparent' }}
                        onChange={() => {
                          if (verifyCodeError) {
                            setVerifyCodeError('');
                          }
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* 公司名称输入框 */}
                <div className='w-full h-auto flex flex-col gap-[8px] justify-start items-start'>
                  <div className='h-[24px] flex flex-col gap-[2px] justify-start items-start'>
                    <label className='text-[16px] font-bold leading-[24px] text-black'>
                      <Translate id='loading.form.companyName.label'>公司名称</Translate>
                    </label>
                  </div>
                  <div className='w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-20 rounded-[8px] flex justify-start items-center px-[14px] focus-within:border-[#d6bbfb] focus-within:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300'>
                    <Form.Item name='company' rules={registerFormRule.company} noStyle>
                      <Input
                        placeholder={translate({ id: 'loading.form.companyName.placeholder', message: '请输入公司名称' })}
                        className='flex-1 h-[24px] text-[16px] leading-[24px] text-[#262A2B] border-none shadow-none focus:placeholder-[#787070] focus:outline-none'
                        style={{ background: 'transparent' }}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* 验证码输入框 */}
                <div className='w-full h-auto flex flex-col gap-[8px] justify-start items-start'>
                  <div className='h-[24px] flex flex-col gap-[2px] justify-start items-start'>
                    <label className='text-[16px] font-bold leading-[24px] text-black'>
                      <span className='text-red-500'>*</span>
                      <Translate id='loading.form.verifyCode.label'>短信验证码</Translate>
                    </label>
                  </div>
                  <div className='w-full h-auto flex gap-[16px] justify-start items-start'>
                    <div className='flex-1 h-auto flex flex-col gap-[8px] justify-start items-start'>
                      <Form.Item name='verifyCode' rules={registerFormRule.verifyCode} className='mb-0 w-full'>
                        <div className='w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-20 rounded-[8px] flex justify-start items-center px-[14px] focus-within:border-[#d6bbfb] focus-within:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300'>
                          <Input
                            placeholder={translate({ id: 'loading.form.verifyCode.placeholder', message: '请输入验证码' })}
                            className='flex-1 h-[24px] text-[16px] leading-[24px] text-[#262A2B] border-none shadow-none focus:placeholder-[#787070] focus:outline-none'
                            style={{ background: 'transparent' }}
                          />
                        </div>
                      </Form.Item>
                      {shouldShowError(verifyCodeError) && <div className='text-[#FF6E0D] text-[12px] mt-[15px]'>{verifyCodeError}</div>}
                    </div>

                    {/* 获取验证码按钮 */}
                    <Form.Item shouldUpdate noStyle>
                      {() => (
                        <div className='w-[104px] h-[52px] bg-[#0087c7] rounded-[8px] mt-0'>
                          <CountDownButton
                            phoneNumber={registerForm.getFieldValue('phone')}
                            phoneAreaCode='CHINA'
                            verifyCodeType={VERIFY_CODE_TYPE.SSO_REGISTER_BIND}
                            onError={(error) => {
                              setVerifyCodeError(error);
                            }}
                            onSuccess={() => {
                              // 验证码发送成功时清除错误信息
                              setVerifyCodeError('');
                            }}
                          />
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </div>

                {/* 服务与隐私条款 */}
                <div className='w-full h-auto flex gap-[16px] justify-start items-start'>
                  <div className='w-[16px] h-[20px] flex justify-start items-center py-[2px] flex-shrink-0'>
                    <input
                      type='checkbox'
                      checked={checkPolicy}
                      onChange={(e) => {
                        setCheckPolicy(e.target.checked);
                        if (e.target.checked) {
                          setWarnCheckPolicy(false);
                        }
                      }}
                      className='w-[16px] h-[16px] border-2 border-solid border-[#0087c7] border-opacity-20 rounded-[2px] accent-[#0087c7]'
                    />
                  </div>
                  <div className='flex-1'>
                    <p className='text-[14px] font-medium leading-[20px] text-black'>
                      <Translate id='login.policy.agreement'>By signing up and continuing, you agree to our</Translate>{' '}
                      <Link to='/docs/protocol/terms_of_use' className='text-[#0087c7] hover:underline'>
                        <Translate id='login.policy.termsOfService'>Terms of Service</Translate>
                      </Link>{' '}
                      <Translate id='login.policy.and'>and</Translate>{' '}
                      <Link to='/docs/protocol/privacy_policy' className='text-[#0087c7] hover:underline'>
                        <Translate id='login.policy.privacyPolicy'>Privacy Policy</Translate>
                      </Link>
                      <Translate id='login.policy.period'>.</Translate>
                    </p>
                    {warnCheckPolicy && (
                      <p className='text-[12px] text-[#FF6E0D] mt-2'>
                        <Translate id='login.policy.warning'>Please agree to the Terms of Service and Privacy Policy before continuing.</Translate>
                      </p>
                    )}
                  </div>
                </div>

                {/* 提交按钮 */}
                <Form.Item className='mb-0 w-full'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={!checkPolicy}
                    className='w-full h-[52px] bg-[#0087c7] border-none rounded-[8px] text-[16px] font-medium leading-[24px] text-white hover:bg-[#0070a6] transition-colors disabled:opacity-60'>
                    <Translate id='loading.form.submit'>继续注册</Translate>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        )}
      </div>
  );
}
