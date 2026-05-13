import React, { useEffect, useState } from 'react';
import { Spin, message, Form, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ssoAuth } from '@site/src/apis/user';
import { useCookies } from 'react-cookie';
import { useLocation, useHistory } from '@docusaurus/router';
import { getCloudUrl } from '@site/src/utils/api';
import { useUserStore } from '@site/src/store/user';
import CountDownButton from '@site/src/components/CountDownButton';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// 从环境变量或配置中获取
const DOMAIN = {
  COOKIE_DOMAIN: process.env.NODE_ENV === 'development' ? 'localhost' : '.bladepipe.com'
};

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
  const [, setCookie] = useCookies(['jwt_token']);
  const location = useLocation();
  const history = useHistory();
  const queryLoginUser = useUserStore((state) => state.queryLoginUser);

  // 注册信息补充相关状态
  const [showAddPhone, setShowAddPhone] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [stateForCC, setStateForCC] = useState<string | null>(null);
  const [registerForm] = Form.useForm();
  const [verifyCodeError, setVerifyCodeError] = useState('');

  // 自定义 loading 图标，使用主题色 #0087c7
  const antIcon = <LoadingOutlined style={{ fontSize: 40, color: '#0087c7' }} spin />;

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
            // 如果sitebrand为bladepipe，则路由末尾加/
            if (siteBrand === 'bladepipe') {
              history.push('/login/');
            } else {
              history.push('/login');
            }
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
          // 设置 cookie
          setCookie('jwt_token', res.data.token, {
            maxAge: 60 * 60 * 24,
            path: '/',
            domain: DOMAIN.COOKIE_DOMAIN
          });

          // 更新用户信息
          await queryLoginUser();

          // 对于其他品牌，根据 target 进行不同的跳转
          const stateData = decodeBase64(authParams.state);
          const target = stateData.target;
          localStorage.removeItem('loginSource');
          if (target === 'try_cloud_free') {
            window.location.href = getCloudUrl();
          } else if (target === 'download') {
            localStorage.setItem('openCommunityDownloadModal', 'true');
            history.push('/');
          } else if (target === 'download_community') {
            localStorage.setItem('openCommunityDownloadModal', 'true');
            history.push('/');
          } else if (target === 'buy_a_license') {
            window.location.href = getCloudUrl() + '/#/system/license';
          } else {
            // 默认跳转到首页
            history.push('/');
          }
        } else {
          // 检查是否有 requestId，如果有则需要补充注册信息
          if (res?.requestId) {
            setRequestId(res.requestId);
            setIsReady(true);
            setShowAddPhone(true);
          } else {
            message.error(res?.msg || 'Authentication failed');
            if (siteBrand === 'bladepipe') {
              history.push('/login/');
            } else {
              history.push('/login');
            }
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        message.error('Authentication failed');
        if (siteBrand === 'bladepipe') {
          history.push('/login/');
        } else {
          history.push('/login');
        }
      }
    };

    handleAuth();
  }, [location, history, setCookie, queryLoginUser]);

  // 处理注册信息补充
  const handleSignin = async () => {
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
        // 设置 cookie
        setCookie('jwt_token', res.data.token, {
          maxAge: 60 * 60 * 24,
          path: '/',
          domain: DOMAIN.COOKIE_DOMAIN
        });

        // 关闭弹窗
        setShowAddPhone(false);

        // 延迟跳转
        setTimeout(() => {
          window.location.href = window.location.origin + '/';
        }, 500);
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
        {!showAddPhone ? (
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

                {/* 提交按钮 */}
                <Form.Item className='mb-0 w-full'>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='w-full h-[52px] bg-[#0087c7] border-none rounded-[8px] text-[16px] font-medium leading-[24px] text-white hover:bg-[#0070a6] transition-colors'>
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
