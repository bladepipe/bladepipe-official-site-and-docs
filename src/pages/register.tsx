import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Form, Input, Button, message } from 'antd';
import { signIn } from '@site/src/apis/user';
import { getPublicKey } from '@site/src/apis/constant';
import { sm2 } from 'sm-crypto';
import { useConstantStore } from '@site/src/store/constant';
import CountDownButton from '@site/src/components/CountDownButton';
import LoginSidebar from '@site/src/components/LoginSidebar';
import PasswordTooltip from '@site/src/components/PasswordTooltip';

export default function Register() {
    const { siteConfig } = useDocusaurusContext();
    const siteBrand = siteConfig.customFields?.siteBrand;

    const [form] = Form.useForm();
    const [registerLoading, setRegisterLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [wechatLoading, setWechatLoading] = useState(false);
    const [dingtalkLoading, setDingtalkLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [checkPolicy, setCheckPolicy] = useState(true);
    const [warnCheckPolicy, setWarnCheckPolicy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassError, setShowPassError] = useState(false);
    const [passValid, setPassValid] = useState({ len: true, letter: true, special: true });
    const isAsia = useConstantStore(state => state.isAsia());
    const verifyType = useConstantStore(state => state.verifyType());
    const ssoTypesObj = useConstantStore(state => state.ssoTypes);
    const fetchSsoType = useConstantStore(state => state.ssoType);

    useEffect(() => {
        // 拉取公钥
        const fetchPublicKey = async () => {
            try {
                const res: any = await getPublicKey();
                if (res && res.success) {
                    setPublicKey(res.data);
                }
            } catch {
            }
        };
        fetchPublicKey();
        fetchSsoType();
    }, [fetchSsoType]);

    // 密码强度校验
    const validatePass = async (_: any, value: string) => {
        if (!value) return Promise.resolve();
        const len = !(value.length >= 8 && value.length <= 32);
        const letter = !/(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);
        const special = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
        setPassValid({ len, letter, special });
        if (len || letter || special) {
            return Promise.reject(translate({
                id: 'register.form.password.error',
                message: 'Password format is incorrect'
            }));
        }
        return Promise.resolve();
    };

    // 密码加密
    const passwordEncrypt = (password: string) => {
        if (publicKey) {
            console.log(1111, password, publicKey);
            return sm2.doEncrypt(password, publicKey, 1);
        }
        console.log(2222);
        return password;
    };

    // 注册提交
    const handleRegister = async (values: any) => {
        if (!checkPolicy) {
            setWarnCheckPolicy(true);
            return;
        }
        setRegisterLoading(true);
        try {
            // 根据 sitebrand 动态处理表单数据
            const params = {
                ...values,
                password: passwordEncrypt(values.password),
                verifyType: siteBrand === 'bladepipe' ? verifyType : 'SMS_VERIFY_CODE',
                contactMe: true,
                noModal: true,
                src: window.sessionStorage.getItem('source_for_cc'),
                keyword: window.sessionStorage.getItem('kw_for_cc'),
                country: siteBrand === 'bladepipe' ? 'USA' : 'china', // 根据siteBrand动态设置国家
            };
            const res: any = await signIn(params);
            setRegisterLoading(false);
            if (res && res.success) {
                message.success(translate({ id: 'register.message.success', message: 'Registration successful' }));
                window.location.href = '/login';
            } else {
                form.setFields([
                    {
                        name: 'password',
                        errors: [res?.msg || translate({ id: 'register.message.failed', message: 'Registration failed' })]
                    }
                ]);
            }
        } catch (e) {
            console.log('error', e);
            setRegisterLoading(false);
            form.setFields([
                {
                    name: 'password',
                    errors: [translate({ id: 'register.message.failed', message: 'Registration failed' })]
                }
            ]);
        }
    };

    return (
        <div className="w-full min-h-screen flex overflow-hidden">
            <LoginSidebar
                title={siteBrand === 'clougence' ? (
                    <Translate id="register.sidebar.title.clougence">Commercial Edition 90-day Free Trial</Translate>
                ) : (
                    <Translate id="register.sidebar.title">Your Free 90-day Trial Includes</Translate>
                )}
                description={siteBrand === 'clouddm' ? (
                    <Translate id="register.sidebar.description.clouddm">专注于多数据源安全访问与管控，提高协作效率，让您更放心地使用数据。</Translate>
                ) : (
                    <Translate id="register.sidebar.description">A data replication tool focused on real-time incremental updates, giving you deeper insights into your data.</Translate>
                )}
                features={[
                    <Translate id="register.sidebar.feature1" key="feature1">$300 credits</Translate>,
                    <Translate id="register.sidebar.feature2" key="feature2">Cloud and On-Premise are optional</Translate>,
                    <Translate id="register.sidebar.feature3" key="feature3">All connectors are available</Translate>,
                    <Translate id="register.sidebar.feature4" key="feature4">SOC 2 Type ||, GDPR and ISO 27001 Certified</Translate>
                ]}
            />

            {/* 右侧注册表单部分 - 响应式布局 */}
            <div className="flex-1 h-screen overflow-y-auto flex justify-center items-start py-8 md:py-24">
                <div className="w-[416px] flex flex-col gap-[32px] justify-start items-start px-4 sm:px-0 py-8 sm:py-0">
                    {/* 标题和徽章 - 响应式设计 */}
                    <div className="w-full h-auto flex flex-col gap-[32px] justify-start items-start">
                        <h2 className="text-[24px] font-bold leading-[32px] text-black text-center w-full">
                            {siteBrand === 'bladepipe' && (
                                <Translate id="register.title">
                                    Create your BladePipe account
                                </Translate>
                            )}
                            {siteBrand === 'clouddm' && (
                                <Translate id="register.dm.title">
                                    Create your CloudDM account
                                </Translate>
                            )}
                            {siteBrand === 'clougence' && (
                                <Translate id="register.cc.title">
                                    Create your ClouGence account
                                </Translate>
                            )}
                        </h2>

                        {siteBrand !== 'clouddm' && (
                            <div className="w-full w-[416px] h-auto flex flex-col sm:flex-row gap-4 sm:gap-[40px] justify-center items-start">
                                <div className="flex gap-[10px] justify-start items-center">
                                    <div className="w-[20px] h-[20px] bg-[#4BCC6A] rounded-full flex justify-center items-center flex-shrink-0">
                                        <svg className="w-[9.5px] h-[7px]" viewBox="0 0 10 7" fill="none">
                                            <path d="M1.33 3.81L4.25 6.5L8.83 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="text-[14px] font-medium leading-[20px] text-black whitespace-nowrap">
                                        <Translate id="register.badge.noCreditCard">No credit card required</Translate>
                                    </span>
                                </div>

                                <div className="flex gap-[10px] justify-start items-center">
                                    <div className="w-[20px] h-[20px] bg-[#4BCC6A] rounded-full flex justify-center items-center flex-shrink-0">
                                        <svg className="w-[9.5px] h-[7px]" viewBox="0 0 10 7" fill="none">
                                            <path d="M1.33 3.81L4.25 6.5L8.83 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="text-[14px] font-medium leading-[20px] text-black whitespace-nowrap">
                                        <Translate id="register.badge.freeTrial">Free Trial Now</Translate>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 表单区域 - 响应式设计 */}
                    <div className="w-full h-auto flex flex-col gap-[32px] justify-start items-start">
                        {/* Google登录和分割线 */}
                        <div className="w-full h-auto flex flex-col gap-[24px] justify-start items-start">
                            {/* Google登录按钮 */}
                            {ssoTypesObj.google && (
                                <Button
                                    className="!w-[416px] h-[52px] bg-white border border-solid border-black border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#292929]"
                                    onClick={() => {
                                        if (ssoTypesObj.google) {
                                            setGoogleLoading(true);
                                            window.location.replace(ssoTypesObj.google);
                                        }
                                    }}
                                    style={{ display: 'flex' }}
                                    loading={googleLoading}
                                >
                                    <div className="flex gap-[16px] justify-center items-center">
                                        <img src="/img/home/icon/google.svg" alt="Google" className="w-[24px] h-[24px] flex-shrink-0" />
                                        <span className="text-[14px] font-medium leading-[20px] whitespace-nowrap">
                                            <Translate id="register.googleButton">Sign with Google</Translate>
                                        </span>
                                    </div>
                                </Button>
                            )}
                            {ssoTypesObj.wechat && (
                                <Button
                                    className="!w-[416px] h-[52px] bg-white border border-solid border-black border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#292929]"
                                    onClick={() => {
                                        if (ssoTypesObj.wechat) {
                                            setWechatLoading(true);
                                            window.location.replace(ssoTypesObj.wechat);
                                        }
                                    }}
                                    style={{ display: 'flex' }}
                                    loading={wechatLoading}
                                >
                                    <div className="flex gap-[16px] justify-center items-center">
                                        <img src="/img/home/icon/wechat.svg" alt="Wechat" className="w-[24px] h-[24px] flex-shrink-0" />
                                        <span className="text-[14px] font-medium leading-[20px] whitespace-nowrap">
                                            <Translate id="register.wechatButton">Sign with Wechat</Translate>
                                        </span>
                                    </div>
                                </Button>
                            )}
                            {ssoTypesObj.dingtalk && (
                                <Button
                                    className="!w-[416px] h-[52px] bg-white border border-solid border-black border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#292929]"
                                    onClick={() => {
                                        if (ssoTypesObj.dingtalk) {
                                            setDingtalkLoading(true);
                                            window.location.replace(ssoTypesObj.dingtalk);
                                        }
                                    }}
                                    style={{ display: 'flex' }}
                                    loading={dingtalkLoading}
                                >
                                    <div className="flex gap-[16px] justify-center items-center">
                                        <img src="/img/home/icon/dingtalk.svg" alt="Dingtalk" className="w-[24px] h-[24px] flex-shrink-0" />
                                        <span className="text-[14px] font-medium leading-[20px] whitespace-nowrap">
                                            <Translate id="register.dingtalkButton">Sign with Dingtalk</Translate>
                                        </span>
                                    </div>
                                </Button>
                            )}

                            {/* 分割线 */}
                            <div className="w-full h-[20px] flex justify-between items-center">
                                <div className="flex-1 h-[1px] bg-black bg-opacity-10"></div>
                                <div className="px-[20px] flex justify-center items-center">
                                    <span className="text-[12px] leading-[18px] text-[#424242] whitespace-nowrap">
                                        <Translate id="register.divider.or">Or</Translate>
                                    </span>
                                </div>
                                <div className="flex-1 h-[1px] bg-black bg-opacity-10"></div>
                            </div>
                        </div>

                        {/* 表单输入区域 - 响应式设计 */}
                        <div className="w-full h-auto flex flex-col gap-[28px] justify-start items-center">
                            <Form
                                form={form}
                                layout="vertical"
                                className="w-full flex flex-col gap-[28px]"
                                onFinish={() => { }}
                            >
                                {/* Username输入框 */}
                                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                        <label className="text-[16px] font-bold leading-[24px] text-black">
                                            <span className="text-red-500">*</span><Translate id="register.form.username.label">Username</Translate>
                                        </label>
                                    </div>
                                    <Form.Item 
                                        name="userName" 
                                        rules={[{ required: true, message: translate({ id: 'register.form.username.required', message: 'Username is required' }) }]} 
                                        className="mb-0 w-full"
                                    >
                                        <Input
                                            placeholder={translate({ id: 'register.form.username.placeholder', message: 'Enter your username' })}
                                            className="w-full h-[52px] text-[16px] leading-[24px] text-[#292929] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                                            style={{ background: 'white' }}
                                        />
                                    </Form.Item>
                                </div>

                                {/* Company输入框 */}
                                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                        <label className="text-[16px] font-bold leading-[24px] text-black">
                                            {siteBrand !== 'bladepipe' && <span className="text-red-500">*</span>}
                                            <Translate id="register.form.company.label">Company</Translate>
                                        </label>
                                    </div>
                                    <Form.Item
                                        name="company"
                                        rules={[
                                            {
                                                required: siteBrand !== 'bladepipe',
                                                message: translate({ id: 'register.form.company.required', message: 'Company is required' })
                                            }
                                        ]}
                                        className="mb-0 w-full"
                                    >
                                        <Input
                                            placeholder={translate({ id: 'register.form.company.placeholder', message: 'Company' })}
                                            className="w-full h-[52px] text-[16px] leading-[24px] text-[#737373] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                                            style={{ background: 'white' }}
                                        />
                                    </Form.Item>
                                </div>

                                {/* Email输入框 */}
                                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                        <label className="text-[16px] font-bold leading-[24px] text-black">
                                            <span className="text-red-500">*</span><Translate id="register.form.email.label">Email</Translate>
                                        </label>
                                    </div>
                                    <Form.Item 
                                        name="email" 
                                        rules={[{ required: true, message: translate({ id: 'register.form.email.required', message: 'Email is required' }) }]} 
                                        className="mb-0 w-full"
                                    >
                                        <Input
                                            placeholder={translate({ id: 'register.form.email.placeholder', message: 'Email' })}
                                            className="w-full h-[52px] text-[16px] leading-[24px] text-[#737373] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                                            style={{ background: 'white' }}
                                            onChange={() => {
                                                // 当邮箱改变时，清除验证码错误信息
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

                                {/* 手机号输入框 - 当siteBrand不为bladepipe时显示 */}
                                {siteBrand !== 'bladepipe' && (
                                    <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                        <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                            <label className="text-[16px] font-bold leading-[24px] text-black">
                                                <span className="text-red-500">*</span><Translate id="register.form.phone.label">Phone Number</Translate>
                                            </label>
                                        </div>
                                        <Form.Item 
                                            name="phone" 
                                            rules={[{ required: true, message: translate({ id: 'register.form.phone.required', message: 'Phone number is required' }) }]} 
                                            className="mb-0 w-full"
                                        >
                                            <Input
                                                placeholder={translate({ id: 'register.form.phone.placeholder', message: 'Please enter your phone number' })}
                                                className="w-full h-[52px] text-[16px] leading-[24px] text-[#737373] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                                                style={{ background: 'white' }}
                                                onChange={() => {
                                                    // 当手机号改变时，清除验证码错误信息
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
                                )}



                                {/* 验证码输入框 */}
                                <div className="w-full h-auto flex gap-[16px] justify-start items-end">
                                    <div className="flex-1 h-auto flex flex-col gap-[8px] justify-start items-start">
                                        <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                            <label className="text-[16px] font-bold leading-[24px] text-black">
                                                <span className="text-red-500">*</span>
                                                {siteBrand === 'bladepipe' ? (
                                                    <Translate id="register.form.emailCode.label">Email Verification Code</Translate>
                                                ) : (
                                                    <Translate id="register.form.smsCode.label">SMS Verification Code</Translate>
                                                )}
                                            </label>
                                        </div>
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
                                                                id: siteBrand === 'bladepipe' ? 'register.form.emailCode.required' : 'register.form.smsCode.required',
                                                                message: siteBrand === 'bladepipe' ? 'Please enter email verification code' : 'Please enter SMS verification code'
                                                            }));
                                                        }
                                                        return Promise.resolve();
                                                    }
                                                }
                                            ]}
                                            className="mb-0 w-full"
                                        >
                                            <Input
                                                placeholder={siteBrand === 'bladepipe' ? translate({ id: 'register.form.emailCode.placeholder', message: 'Email verification code' }) : translate({ id: 'register.form.smsCode.placeholder', message: 'SMS verification code' })}
                                                className="w-full h-[52px] text-[16px] leading-[24px] text-[#787070] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                                                style={{ background: 'white' }}
                                            />
                                        </Form.Item>
                                        <Form.Item name="verifyCodeError" hidden>
                                            <Input />
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
                                                        email={form.getFieldValue('email')}
                                                        phoneNumber={siteBrand !== 'bladepipe' ? form.getFieldValue('phone') : undefined}
                                                        phoneAreaCode={siteBrand !== 'bladepipe' ? 'CHINA' : 'USA'}
                                                        verifyCodeType="REGISTER"
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
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Form.Item>


                                </div>

                                {/* Password输入框 */}
                                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                        <label className="text-[16px] font-bold leading-[24px] text-black">
                                            <span className="text-red-500">*</span><Translate id="register.form.password.label">Password</Translate>
                                        </label>
                                    </div>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            { required: true, message: translate({ id: 'register.form.password.required', message: 'Password is required' }) },
                                            { validator: validatePass, validateTrigger: ['onBlur', 'onChange'] }
                                        ]}
                                        className="mb-0 w-full"
                                    >
                                        <PasswordTooltip
                                            showPassError={showPassError}
                                            passValid={passValid}
                                        >
                                            <Input.Password
                                                placeholder={translate({ id: 'register.form.password.placeholder', message: 'Password' })}
                                                className="w-full h-[52px] text-[16px] leading-[24px] text-[#787070] border border-solid border-[#11101a] border-opacity-20 rounded-[8px] px-[14px] focus:border-[#d6bbfb] focus:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300"
                                                style={{ background: 'white' }}
                                                visibilityToggle={true}
                                                autoComplete="new-password"
                                                onFocus={() => setShowPassError(true)}
                                                onBlur={() => setShowPassError(false)}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    const len = !(value.length >= 8 && value.length <= 32);
                                                    const letter = !/(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);
                                                    const special = !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
                                                    setPassValid({ len, letter, special });
                                                    
                                                    // 确保表单字段值被正确设置
                                                    form.setFieldsValue({ password: value });
                                                }}
                                            />
                                        </PasswordTooltip>
                                    </Form.Item>
                                </div>
                            </Form>

                            {/* 注册按钮和协议 - 响应式设计 */}
                            <div className="w-full h-auto flex flex-col gap-[16px] justify-start items-center">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full h-[52px] bg-[#0087c7] text-white rounded-full font-bold text-[16px] leading-[24px] hover:bg-[#0070a6] transition disabled:opacity-60 !important"
                                    loading={registerLoading}
                                    disabled={!checkPolicy || registerLoading || googleLoading || wechatLoading || dingtalkLoading}
                                    onClick={async () => {
                                        try {
                                            // 先进行表单验证
                                            const values = await form.validateFields();
                                            // 验证通过后调用 handleRegister，传入表单值
                                            handleRegister(values);
                                        } catch (e) {
                                            // 表单验证失败
                                            console.log('Form validation failed:', e);
                                        }
                                    }}
                                >
                                    <Translate id="register.button.signUp">Sign Up</Translate>
                                </Button>

                                <div className="w-full h-auto flex justify-center items-start">
                                    <p className="text-[14px] leading-[20px] text-black text-center">
                                        <Translate id="register.link.alreadyHaveAccount">Already have an account?</Translate>{' '}
                                        <Link to="/login" className="text-[#0087c7] font-bold hover:underline">
                                            <Translate id="register.link.logIn">Log in</Translate>
                                        </Link>
                                    </p>
                                </div>

                                <div className="w-full h-auto flex gap-[16px] justify-start items-start">
                                    <div className="w-[16px] h-[20px] flex justify-start items-center py-[2px] flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={checkPolicy}
                                            onChange={e => setCheckPolicy(e.target.checked)}
                                            className="w-[16px] h-[16px] border-2 border-solid border-[#0087c7] border-opacity-20 rounded-[2px] accent-[#0087c7]"
                                        />
                                    </div>
                                    <p className="flex-1 text-[14px] font-medium leading-[20px] text-black">
                                        <Translate id="register.policy.agreement">By signing up and continuing, you agree to our</Translate>{' '}
                                        <Link to="/docs/protocol/terms_of_use" className="text-[#0087c7] hover:underline">
                                            <Translate id="register.policy.termsOfService">Terms of Service</Translate>
                                        </Link>{' '}
                                        <Translate id="register.policy.and">and</Translate>{' '}
                                        <Link to="/docs/protocol/privacy_policy" className="text-[#0087c7] hover:underline">
                                            <Translate id="register.policy.privacyPolicy">Privacy Policy</Translate>
                                        </Link>
                                        <Translate id="register.policy.period">.</Translate>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    );
} 