import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert, message, Tooltip } from 'antd';
import { useConstantStore } from '@site/src/store/constant';
import { getPublicKey } from '@site/src/apis/constant';
import { resetPwdUnLogin } from '@site/src/apis/user';
import { sm2 } from 'sm-crypto';
import CountDownButton from '@site/src/components/CountDownButton';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import LoginSidebar from '@site/src/components/LoginSidebar';
import PasswordTooltip from '@site/src/components/PasswordTooltip';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { getPageMeta } from '@site/src/utils/meta';

export default function ResetPwd() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;

  const resetPwdMeta = getPageMeta('resetPwd', undefined, undefined, i18n.currentLocale);

  const [form] = Form.useForm();
  const [publicKey, setPublicKey] = useState('');
  const [resetPwdLoading, setResetPwdLoading] = useState(false);
  const [resetPwdError, setResetPwdError] = useState('');
  const [showPassError, setShowPassError] = useState(false);
  const [passValid, setPassValid] = useState({ len: true, letter: true, special: true });

  useEffect(() => {
    const fetchPublicKey = async () => {
      const res: any = await getPublicKey();
      if (res && res.success) setPublicKey(res.data);
    };
    fetchPublicKey();
  }, []);

  // 密码强度校验
  const validatePass = async (_: any, value: string) => {
    if (!value) return Promise.resolve();
    const len = !(value.length >= 8 && value.length <= 32);
    const letter = !/(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);
    const special = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    setPassValid({ len, letter, special });
    if (len || letter || special) {
      return Promise.reject(translate({
        id: 'resetPwd.form.password.error',
        message: 'Password format is incorrect'
      }));
    }
    return Promise.resolve();
  };

  // 确认密码校验
  const validateRePass = async (_: any, value: string) => {
    if (!value) return Promise.resolve();
    // 使用更可靠的方式获取密码值
    const password = form.getFieldValue('password') || '';
    if (!password.trim()) {
      return Promise.reject(translate({
        id: 'resetPwd.form.confirmPassword.error',
        message: 'Please enter password first'
      }));
    }
    if (value !== password) {
      return Promise.reject(translate({
        id: 'resetPwd.form.confirmPassword.error',
        message: 'Please enter the same password'
      }));
    }
    return Promise.resolve();
  };

  // 密码加密
  const passwordEncrypt = (password: string) => {
    if (publicKey) {
      return sm2.doEncrypt(password, publicKey, 1);
    }
    return password;
  };

  // 提交重置密码
  const handleResetPwd = async () => {
    setResetPwdError('');
    try {
      // 先获取表单值，确保能正确获取
      const values = await form.validateFields();
      
      // 检查密码字段
      if (!values.password || !values.password.trim()) {
        setResetPwdError(translate({
          id: 'resetPwd.form.password.required',
          message: 'Password is required'
        }));
        return;
      }
      
      if (!values.rePassword || !values.rePassword.trim()) {
        setResetPwdError(translate({
          id: 'resetPwd.form.confirmPassword.required',
          message: 'Confirm Password is required'
        }));
        return;
      }
      
      if (values.password !== values.rePassword) {
        setResetPwdError(translate({
          id: 'resetPwd.form.confirmPassword.error',
          message: 'Please enter the same password'
        }));
        return;
      }
      
      setResetPwdLoading(true);
      const res: any = await resetPwdUnLogin({
        [siteBrand === 'bladepipe' ? 'email' : 'phone']: siteBrand === 'bladepipe' ? values.email : values.phoneNumber,
        verifyCode: values.verifyCode,
        password: passwordEncrypt(values.password),
        rePassword: passwordEncrypt(values.rePassword),
        accountType: 'PRIMARY_ACCOUNT',
        verifyType: siteBrand === 'bladepipe' ? 'EMAIL_VERIFY_CODE' : 'SMS_VERIFY_CODE',
      });
      setResetPwdLoading(false);
      if (res && res.success) {
        message.success(translate({
          id: 'resetPwd.form.success',
          message: 'Password reset successfully'
        }));
        window.location.href = siteBrand === 'bladepipe' ? '/login/' : '/login';
      } else {
        setResetPwdError(res?.showMsg || translate({
          id: 'resetPwd.form.error',
          message: 'Reset failed'
        }));
      }
    } catch (e: any) {
      setResetPwdLoading(false);
      if (e?.errorFields) {
        return;
      }
      setResetPwdError(translate({
        id: 'resetPwd.form.error',
        message: 'Reset failed'
      }));
    }
  };

  return (
    <>
    <Head>
      <title>{resetPwdMeta.title}</title>
      <meta name="description" content={resetPwdMeta.description} />
    </Head>
    <div className="w-full min-h-screen flex overflow-hidden">
      <LoginSidebar 
        title={siteBrand === 'clougence' ? (
          <Translate id="resetPwd.sidebar.title.clougence">Commercial Edition 90-day Free Trial</Translate>
        ) : (
          <Translate id="resetPwd.sidebar.title">Your Free 90-day Trial Includes</Translate>
        )}
        description={siteBrand === 'clouddm' ? (
          <Translate id="resetPwd.sidebar.description.clouddm">专注于多数据源安全访问与管控，提高协作效率，让您更放心地使用数据。</Translate>
        ) : (
          <Translate id="resetPwd.sidebar.description">A data replication tool focused on real-time incremental updates, giving you deeper insights into your data.</Translate>
        )}
        features={[
          <Translate id="resetPwd.sidebar.feature1" key="feature1">$300 credits</Translate>,
          <Translate id="resetPwd.sidebar.feature2" key="feature2">Cloud and On-Premise are optional</Translate>,
          <Translate id="resetPwd.sidebar.feature3" key="feature3">All connectors are available</Translate>,
          <Translate id="resetPwd.sidebar.feature4" key="feature4">SOC 2, GDPR and ISO 27001 Certified</Translate>
        ]}
      />

      {/* 右侧重置密码表单部分 - 响应式布局 */}
      <div className="flex-1 h-screen overflow-y-auto flex justify-center items-center">
        <div className="w-[416px] flex flex-col gap-[32px] justify-center items-center px-4 sm:px-0 py-8 sm:py-0">
          {/* 标题 - 响应式设计 */}
          <h2 className="text-[24px] font-bold leading-[32px] text-black text-center">
            <Translate id="resetPwd.title">Reset Your Password</Translate>
          </h2>

          {/* 表单区域 - 响应式设计 */}
          <div className="w-full h-auto flex flex-col gap-[28px] justify-start items-center">
            <Form
              form={form}
              layout="vertical"
              className="w-full flex flex-col gap-[28px]"
            >
              {/* 邮箱/手机号输入框 - 响应式设计 */}
              <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                  <label className="text-[16px] font-bold leading-[24px] text-black">
                    <span className="text-red-500">*</span>
                    {siteBrand === 'bladepipe' ? (
                      <Translate id="resetPwd.form.email">Email</Translate>
                    ) : (
                      <Translate id="resetPwd.form.phone">Phone Number</Translate>
                    )}
                  </label>
                </div>
                <Form.Item 
                  name={siteBrand === 'bladepipe' ? 'email' : 'phoneNumber'} 
                  rules={[{ required: true, message: translate({
                    id: siteBrand === 'bladepipe' ? 'resetPwd.form.email.required' : 'resetPwd.form.phone.required',
                    message: siteBrand === 'bladepipe' ? 'Email is required' : 'Phone number is required'
                  }) }]} 
                  className="mb-0 w-full"
                >
                  <Input 
                    placeholder={translate({
                      id: siteBrand === 'bladepipe' ? 'resetPwd.form.email.placeholder' : 'resetPwd.form.phone.placeholder',
                      message: siteBrand === 'bladepipe' ? 'Please enter email' : 'Please enter phone number'
                    })}
                    className="w-full h-[52px] text-[16px] leading-[24px] text-[#737373] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                    style={{background: 'white'}}
                    onChange={() => {
                      // 当邮箱/手机号改变时，清除验证码错误信息
                      form.setFields([
                        {
                          name: 'verifyCodeError',
                          value: undefined
                        },
                        {
                          name: 'verifyCode',
                          errors: []
                        }
                      ]);
                    }}
                  />
                </Form.Item>
              </div>

              {/* 验证码输入框 - 响应式设计 */}
              <div className="w-full h-auto flex gap-[16px] justify-start items-end">
                <div className="flex-1 h-auto flex flex-col gap-[8px] justify-start items-start">
                  <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                    <label className="text-[16px] font-bold leading-[24px] text-black">
                                                                  <span className="text-red-500">*</span><Translate id="resetPwd.form.verifyCode">Verification Code</Translate>
                                        </label>
                  </div>
                  <div className="w-full bg-white relative">
                    <div className="relative">
                      <Form.Item 
                        name="verifyCode" 
                        rules={[
                          { 
                            validator: (_, value) => {
                              const error = form.getFieldValue('verifyCodeError');
                              if (error) {
                                return Promise.reject(error);
                              }
                              if (!value && form.isFieldTouched('verifyCode')) {
                                return Promise.reject(translate({
                                  id: 'resetPwd.form.verifyCode.required',
                                  message: 'Please enter verification code'
                                }));
                              }
                              return Promise.resolve();
                            }
                          }
                        ]}
                        className="mb-0"
                      >
                        <Input 
                                                          placeholder={translate({
                                  id: 'resetPwd.form.verifyCode.placeholder',
                                  message: 'VerifyCode'
                                })}
                          className="flex-1 h-[52px] text-[16px] leading-[24px] text-[#787070] border border-solid border-black/20 shadow-none focus:outline-none rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                          style={{background: 'transparent'}}
                          onChange={() => {
                            form.setFields([
                              {
                                name: 'verifyCodeError',
                                value: ''
                              }
                            ]);
                          }}
                        />
                      </Form.Item>
                      <Form.Item name="verifyCodeError" hidden>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                
                <Form.Item shouldUpdate noStyle>
                  {() => (
                    <div className="w-[104px] h-[52px] bg-[#0087c7] rounded-[8px]">
                      <CountDownButton
                        email={siteBrand === 'bladepipe' ? form.getFieldValue('email') : undefined}
                        phoneNumber={siteBrand !== 'bladepipe' ? form.getFieldValue('phoneNumber') : undefined}
                        verifyCodeType="RESET_PASSWORD"
                        onError={(error) => {
                          form.setFields([
                            {
                              name: 'verifyCodeError',
                              value: error
                            },
                            {
                              name: 'verifyCode',
                              errors: [error]
                            }
                          ]);
                        }}
                        onSuccess={() => {
                          // 验证码发送成功时清除错误信息
                          form.setFields([
                            {
                              name: 'verifyCodeError',
                              value: undefined
                            },
                            {
                              name: 'verifyCode',
                              errors: []
                            }
                          ]);
                        }}
                      />
                    </div>
                  )}
                </Form.Item>
                
                {/* 自定义按钮样式 */}
                <style>{`
                  .ant-btn {
                    box-shadow: none !important;
                  }
                `}</style>
              </div>

              {/* Password输入框 - 响应式设计 */}
              <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                  <label className="text-[16px] font-bold leading-[24px] text-black">
                                                                <span className="text-red-500">*</span><Translate id="resetPwd.form.password">Password</Translate>
                                        </label>
                </div>
                <Form.Item 
                    name="password" 
                    rules={[
                      { required: true, message: translate({
                        id: 'resetPwd.form.password.required',
                        message: 'Password is required'
                      }), validateTrigger: 'onSubmit' },
                      { validator: validatePass, validateTrigger: ['onBlur', 'onChange'] }
                    ]} 
                    className="mb-0 w-full"
                  >
                    <PasswordTooltip
                        showPassError={showPassError}
                        passValid={passValid}
                        placement="right"
                        overlayStyle={{ width: 300 }}
                      >
                        <Input.Password 
                                                          placeholder={translate({
                                  id: 'resetPwd.form.password.placeholder',
                                  message: 'Password'
                                })}
                          className="w-full h-[52px] text-[16px] leading-[24px] text-[#787070] rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                          style={{background: 'transparent'}}
                          visibilityToggle={true}
                          autoComplete="new-password"
                          onFocus={() => setShowPassError(true)}
                          onBlur={async (e) => {
                            setShowPassError(false);
                            const value = e.target.value;
                            if (value) {
                              try {
                                await validatePass(null, value);
                              } catch (error) {
                                form.setFields([
                                  {
                                    name: 'password',
                                    errors: [translate({
                                      id: 'resetPwd.form.password.error',
                                      message: 'Password format is incorrect'
                                    })]
                                  }
                                ]);
                              }
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            const len = !(value.length >= 8 && value.length <= 32);
                            const letter = !/(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);
                            const special = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
                            setPassValid({ len, letter, special });
                            
                            // 确保表单字段值被正确设置
                            form.setFieldsValue({ password: value });
                            
                            // 当密码字段有值且确认密码字段也有值时，才验证确认密码
                            const rePassword = form.getFieldValue('rePassword');
                            if (value && rePassword) {
                              form.validateFields(['rePassword']);
                            }
                          }}
                        />
                      </PasswordTooltip>
                  </Form.Item>
              </div>

              {/* Confirm Password输入框 - 响应式设计 */}
              <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                  <label className="text-[16px] font-bold leading-[24px] text-black">
                                                                <span className="text-red-500">*</span><Translate id="resetPwd.form.confirmPassword">Confirm Password</Translate>
                                        </label>
                </div>
                <Form.Item 
                    name="rePassword" 
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: translate({
                        id: 'resetPwd.form.confirmPassword.required',
                        message: 'Confirm Password is required'
                      }), validateTrigger: 'onSubmit' },
                      { validator: validateRePass, validateTrigger: ['onBlur', 'onChange'] }
                    ]} 
                    className="mb-0 w-full"
                  >
                                            <Input.Password 
                                                          placeholder={translate({
                                  id: 'resetPwd.form.confirmPassword.placeholder',
                                  message: 'Confirm Password'
                                })}
                          className="w-full h-[52px] text-[16px] leading-[24px] text-[#787070] rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                          style={{background: 'transparent'}}
                          visibilityToggle={true}
                          autoComplete="new-password"
                          onChange={(e) => {
                            const value = e.target.value;
                            
                            // 确保表单字段值被正确设置
                            form.setFieldsValue({ rePassword: value });
                            
                            const password = form.getFieldValue('password');
                            // 当确认密码字段有值且密码字段也有值时，实时验证
                            if (value && password) {
                              form.validateFields(['rePassword']);
                            }
                          }}
                          onBlur={async () => {
                            const value = form.getFieldValue('rePassword');
                            if (value) {
                              try {
                                await validateRePass(null, value);
                              } catch (error) {
                                form.setFields([
                                  {
                                    name: 'rePassword',
                                    errors: [translate({
                                      id: 'resetPwd.form.confirmPassword.error',
                                      message: 'Please enter the same password'
                                    })]
                                  }
                                ]);
                              }
                            }
                          }}
                        />
                  </Form.Item>
              </div>
            </Form>

            {/* 底部按钮和链接 - 响应式设计 */}
            <div className="w-full h-auto flex flex-col gap-[16px] justify-start items-center">
              <div className="w-full h-auto flex justify-center items-start">
                <Link to={siteBrand === 'bladepipe' ? '/login/' : '/login'} className="text-[14px] leading-[20px] text-black text-center hover:underline">
                  <Translate id="resetPwd.form.backTo">Back to</Translate> <span className="font-bold"><Translate id="resetPwd.form.backToLogin">Log in</Translate></span>
                </Link>
              </div>
              
              <Button
                htmlType="submit"
                className="w-full h-[52px] !bg-[#0087c7] !text-white rounded-full font-bold text-[16px] leading-[24px] hover:!bg-[#0070a6] hover:!text-white !border-none transition disabled:opacity-60"
                loading={resetPwdLoading}
                disabled={resetPwdLoading}
                onClick={handleResetPwd}
              >
                <Translate id="resetPwd.form.submit">Reset Your Password</Translate>
              </Button>
            </div>
            
            {/* 协议链接 - 响应式设计 */}
            {/* <div className="w-full h-auto flex justify-start items-start">
              <p className="w-full text-[14px] font-medium leading-[20px] text-black text-center">
                <Translate id="resetPwd.form.agreement.prefix">By continuing, you agree to our</Translate>{' '}
                <Link to="/docs/protocol/terms_of_use" className="text-[#0087c7] hover:underline">
                  <Translate id="resetPwd.form.terms">Terms of Service</Translate>
                </Link>{' '}
                <Translate id="resetPwd.form.agreement.and">and</Translate>{' '}
                <Link to="/docs/protocol/privacy_policy" className="text-[#0087c7] hover:underline">
                  <Translate id="resetPwd.form.privacy">Privacy Policy</Translate>
                </Link>.
              </p>
            </div> */}
          </div>
          </div>
      </div>
      
      {resetPwdError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 text-red-500 text-sm bg-white p-3 rounded-lg shadow-lg border border-red-200 max-w-[90%] text-center">
          {resetPwdError}
        </div>
      )}
    </div>
    </>
  );
}
