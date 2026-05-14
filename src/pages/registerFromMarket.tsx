import React, {useState, useEffect, useRef} from 'react';
import {Form, Input, Button, Checkbox, Alert, Tooltip, message} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {sm2} from 'sm-crypto';
import {useConstantStore} from '@site/src/store/constant';
import {useHistory} from '@docusaurus/router';
import {registerFromMarket} from '@site/src/apis/user';
import CountDownButton from '@site/src/components/CountDownButton';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import LoginSidebar from '@site/src/components/LoginSidebar';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { getPageMeta } from '@site/src/utils/meta';

function getAgentId(callback: (hash: string) => void) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const userAgent = navigator.userAgent;
        const language = navigator.language;
        const languages = navigator.languages.join(',');
        const plugins = Array.from(navigator.plugins).map(plugin => plugin.name).join(',');
        const appVersion = navigator.appVersion;
        const platform = navigator.platform;
        ctx.textBaseline = 'top';
        ctx.font = '14px "Arial"';
        ctx.fillText(userAgent + language + plugins + languages + appVersion + platform, 2, 2);
        const dataURL = canvas.toDataURL();
        if (window.crypto?.subtle) {
            crypto.subtle.digest('SHA-256', new TextEncoder().encode(dataURL))
                .then(hashBuffer => {
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    callback(hashHex);
                });
        } else {
            callback('');
        }
    } catch {
        callback('');
    }
}

const PasswordTips = ({value}: { value: string }) => {
    const len = !(value.length >= 8 && value.length <= 32);
    const letter = !/(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);
    return (
        <div style={{width: 300}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {len ? <CloseCircleOutlined style={{color: 'red'}}/> : <CheckCircleOutlined style={{color: 'green'}}/>}
                <span style={{marginLeft: 5}}><Translate id="register.form.password.length">Length should be 8-32 characters</Translate></span>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {letter ? <CloseCircleOutlined style={{color: 'red'}}/> :
                    <CheckCircleOutlined style={{color: 'green'}}/>}
                <span style={{marginLeft: 5}}><Translate id="register.form.password.format">Must contain both letters and numbers</Translate></span>
            </div>
        </div>
    );
};

export default function RegisterFromMarket() {
    const { siteConfig } = useDocusaurusContext();
    const siteBrand = siteConfig.customFields?.siteBrand as string;
    const [form] = Form.useForm();
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [showPassError, setShowPassError] = useState(false);
    const [passValid, setPassValid] = useState({ len: true, letter: true });
    const [checkPolicy, setCheckPolicy] = useState(true);
    const [warnCheckPolicy, setWarnCheckPolicy] = useState(false);
    const [publicKey, setPublicKey] = useState('');
    const [clientId, setClientId] = useState('');
    const history = useHistory();
    const verifyType = useConstantStore(state => state.verifyType());

    useEffect(() => {
        import('@site/src/apis/constant').then(m => m.getPublicKey()).then((res: any) => {
            if (res && res.success) setPublicKey(res.data);
        });
        getAgentId(setClientId);
    }, []);

    const passwordEncrypt = (password: string) => {
        if (publicKey) {
            return sm2.doEncrypt(password, publicKey, 1);
        }
        return password;
    };

    const handleRegister = async (values: any) => {
        setRegisterError('');
        if (!checkPolicy) {
            setWarnCheckPolicy(true);
            return;
        }
        setRegisterLoading(true);
        try {
            const searchParams = new URLSearchParams(window.location.search);
            const marketplaceType = searchParams.get('marketplaceType');
            const registerToken = searchParams.get('token');
            const params = {
                ...values,
                password: passwordEncrypt(values.password),
                verifyType,
                marketplaceType,
                registerToken,
                clientId,
                country: 'USA',
                contactMe: true,
                noModal: true,
                src: window.localStorage.getItem('source_for_cc'),
                keyword: window.localStorage.getItem('kw_for_cc'),
            };
            const res: any = await registerFromMarket(params);
            let success = false;
            let msg = '';
            if (res && typeof res === 'object') {
                if ('success' in res) {
                    success = (res as any).success;
                    msg = (res as any).msg;
                } else if ('data' in res && typeof res.data === 'object' && 'success' in res.data) {
                    success = (res.data as any).success;
                    msg = (res.data as any).msg;
                }
            }
            if (success) {
                message.success('注册成功');
                history.push(siteBrand === 'bladepipe' ? '/login/' : '/login');
            } else {
                form.setFields([
                    {
                        name: 'password',
                        errors: [msg || '注册失败']
                    }
                ]);
            }
        } catch (e) {
            form.setFields([
                {
                    name: 'password',
                    errors: ['注册失败']
                }
            ]);
        } finally {
            setRegisterLoading(false);
        }
    };

    const validatePassword = (_: any, value: string) => {
        if (!value) return Promise.reject('请输入密码');
        const len = value.length >= 8 && value.length <= 32;
        const letter = /(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);
        if (!len || !letter) {
            setShowPassError(true);
            return Promise.reject('密码格式有误');
        }
        setShowPassError(false);
        return Promise.resolve();
    };

    const registerFromMarketMeta = getPageMeta('registerFromMarket');

    return (
        <>
        <Head>
            <title>{registerFromMarketMeta.title}</title>
            <meta name="description" content={registerFromMarketMeta.description} />
        </Head>
        <div className="w-full min-h-screen flex overflow-hidden">
            <LoginSidebar 
                title="Your Free 90-day Trial Includes"
                description="A data replication tool focused on real-time incremental updates, giving you deeper insights into your data."
                features={[
                    "$300 credits",
                    "Cloud and On-Premise are optional",
                    "All connectors are available",
                    "SOC 2, GDPR and ISO 27001 Certified"
                ]}
            />

            {/* 右侧注册表单部分 - 响应式布局 */}
            <div className="flex-1 h-screen overflow-y-auto flex justify-center items-center">
                <div className="w-[416px] flex flex-col gap-[32px] justify-center items-center px-4 sm:px-0 py-8 sm:py-0">
                    {/* 顶部品牌区 - 响应式设计 */}
                    <div className="w-full max-w-[226px] h-auto flex justify-between items-center">
                        <div className="w-[46px] h-[27px] flex items-center flex-shrink-0">
                            <img className="w-[46px] h-[27px]" src="/img/login/aws.svg" alt="AWS"/>
                        </div>
                        <div className="flex items-center flex-shrink-0">
                            <img className="w-[46px] h-[27px]" src="/img/login/arrow.svg" alt="arrow"/>
                            <img src="/img/home/BladePipe.png" alt="BladePipe" className="h-[27px] ml-2" />
                        </div>
                    </div>
                    
                    {/* 徽章区域 - 响应式设计 */}
                    <div className="w-full max-w-[347px] h-auto flex flex-col sm:flex-row gap-4 sm:gap-[40px] justify-start items-start">
                        <div className="flex gap-[10px] justify-start items-center">
                            <div className="w-[20px] h-[20px] bg-[#4BCC6A] rounded-full flex justify-center items-center flex-shrink-0">
                                <svg className="w-[9.5px] h-[7px]" viewBox="0 0 10 7" fill="none">
                                    <path d="M1.33 3.81L4.25 6.5L8.83 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className="text-[14px] font-medium leading-[20px] text-black whitespace-nowrap">
                                <Translate id="register.badge.noCard">No credit card required</Translate>
                            </span>
                        </div>
                        
                        <div className="flex gap-[10px] justify-start items-center">
                            <div className="w-[20px] h-[20px] bg-[#4BCC6A] rounded-full flex justify-center items-center flex-shrink-0">
                                <svg className="w-[9.5px] h-[7px]" viewBox="0 0 10 7" fill="none">
                                    <path d="M1.33 3.81L4.25 6.5L8.83 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <span className="text-[14px] font-medium leading-[20px] text-black whitespace-nowrap">
                                <Translate id="register.badge.freeTrial">Free Trial Now</Translate>
                            </span>
                        </div>
                    </div>

                    {/* 表单区域 - 响应式设计 */}
                    <div className="w-full h-auto flex flex-col gap-[32px] justify-start items-start">
                        {/* 表单输入区域 - 响应式设计 */}
                        <div className="w-full h-auto flex flex-col gap-[28px] justify-start items-center">
                            <Form
                                form={form}
                                layout="vertical"
                                className="w-full flex flex-col gap-[28px]"
                                onFinish={handleRegister}
                            >
                                {/* Username输入框 */}
                                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                        <label className="text-[16px] font-bold leading-[24px] text-black">
                                            <span className="text-red-500">*</span><Translate id="register.form.username">Username</Translate>
                                        </label>
                                    </div>
                                    <div className="w-full h-[52px] bg-white border border-solid border-[#d6bbfb] rounded-[8px] shadow-[0_0_0_4px_rgba(214,187,251,0.24)] flex justify-start items-center px-[14px] focus-within:border-[#d6bbfb] focus-within:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300">
                                        <Form.Item name="userName" rules={[{required: true, message: translate({
                                            id: 'register.form.username.required',
                                            message: 'Please enter username'
                                        })}]} noStyle>
                                            <Input 
                                                placeholder={translate({
                                                    id: 'register.form.username.placeholder',
                                                    message: 'Enter your email address'
                                                })}
                                                className="flex-1 h-[24px] text-[16px] leading-[24px] text-[#292929] border-none shadow-none focus:outline-none"
                                                style={{background: 'transparent'}}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                {/* Company输入框 */}
                                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                        <label className="text-[16px] font-bold leading-[24px] text-black">
                                            <Translate id="register.form.company">Company</Translate>
                                        </label>
                                    </div>
                                    <div className="w-full h-[52px] bg-white border border-solid border-black border-opacity-20 rounded-[8px] flex justify-start items-center px-[14px] focus-within:border-[#d6bbfb] focus-within:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300">
                                        <Form.Item name="company" noStyle>
                                            <Input 
                                                placeholder={translate({
                                                    id: 'register.form.company.placeholder',
                                                    message: 'Company'
                                                })}
                                                className="flex-1 h-[24px] text-[16px] leading-[24px] text-[#737373] border-none shadow-none focus:outline-none"
                                                style={{background: 'transparent'}}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>

                                {/* Email输入框 */}
                                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                        <label className="text-[16px] font-bold leading-[24px] text-black">
                                            <span className="text-red-500">*</span><Translate id="register.form.email">Email</Translate>
                                        </label>
                                    </div>
                                    <div className="w-full h-[52px] bg-white border border-solid border-black border-opacity-20 rounded-[8px] flex justify-start items-center px-[14px] focus-within:border-[#d6bbfb] focus-within:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300">
                                        <Form.Item name="email" rules={[{required: true, message: translate({
                                            id: 'register.form.email.required',
                                            message: 'Please enter email'
                                        })}]} noStyle>
                                            <Input 
                                                placeholder={translate({
                                                    id: 'register.form.email.placeholder',
                                                    message: 'Email'
                                                })}
                                                className="flex-1 h-[24px] text-[16px] leading-[24px] text-[#737373] border-none shadow-none focus:outline-none"
                                                style={{background: 'transparent'}}
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
                                </div>

                                {/* 验证码输入框 */}
                                <div className="w-full h-auto flex gap-[16px] justify-start items-end">
                                    <div className="flex-1 h-auto flex flex-col gap-[8px] justify-start items-start">
                                        <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                            <label className="text-[16px] font-bold leading-[24px] text-black">
                                                <span className="text-red-500">*</span><Translate id="register.form.verifyCode">Verification Code</Translate>
                                            </label>
                                        </div>
                                        <div className="w-full">
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
                                                    id: 'register.form.verifyCode.required',
                                                    message: 'Please enter verification code'
                                                }));
                                                            }
                                                            return Promise.resolve();
                                                        }
                                                    }
                                                ]}
                                                className="mb-0"
                                            >
                                                <div className="w-full h-[52px] bg-white border border-solid border-black border-opacity-20 rounded-[8px] flex justify-start items-center px-[14px] focus-within:border-[#d6bbfb] focus-within:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300">
                                                    <Input 
                                                        placeholder={translate({
                                                    id: 'register.form.verifyCode.placeholder',
                                                    message: 'VerifyCode'
                                                })}
                                                        className="w-full h-[24px] text-[16px] leading-[24px] text-[#787070] border-none shadow-none focus:outline-none"
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
                                                </div>
                                            </Form.Item>
                                            <Form.Item name="verifyCodeError" hidden>
                                                <Input />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    
                                    <Form.Item shouldUpdate noStyle>
                                        {() => (
                                            <div className="w-[104px] h-[52px] bg-[#0087c7] rounded-[8px]">
                                                <CountDownButton
                                                    email={form.getFieldValue('email')}
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
                                        .get-code-wrapper .ant-btn {
                                            background: transparent !important;
                                            border: none !important;
                                            color: white !important;
                                            font-size: 16px !important;
                                            line-height: 24px !important;
                                            box-shadow: none !important;
                                            padding: 0 !important;
                                            margin: 0 !important;
                                            min-width: 76px !important;
                                            height: 24px !important;
                                        }
                                        .get-code-wrapper .ant-btn:hover {
                                            background: transparent !important;
                                            color: white !important;
                                        }
                                        .get-code-wrapper .ant-btn:focus {
                                            background: transparent !important;
                                            color: white !important;
                                        }
                                    `}</style>
                                </div>

                                {/* Password输入框 */}
                                <div className="w-full h-auto flex flex-col gap-[8px] justify-start items-start">
                                    <div className="h-[24px] flex flex-col gap-[2px] justify-start items-start">
                                        <label className="text-[16px] font-bold leading-[24px] text-black">
                                            <span className="text-red-500">*</span><Translate id="register.form.password">Password</Translate>
                                        </label>
                                    </div>
                                    <Form.Item 
                                        name="password" 
                                        rules={[
                                            {required: true, message: translate({
                                                id: 'register.form.password.required',
                                                message: 'Please enter password'
                                            }), validateTrigger: 'onBlur'},
                                            {validator: validatePassword, validateTrigger: 'onBlur'}
                                        ]} 
                                        className="mb-0 w-full"
                                    >
                                        <div className="w-full h-[52px] bg-white border border-solid border-black border-opacity-20 rounded-[8px] flex justify-between items-center px-[14px] focus-within:border-[#d6bbfb] focus-within:shadow-[0_0_0_4px_rgba(214,187,251,0.24)] transition-all duration-300">
                                            <Tooltip
                                                placement="rightTop"
                                                open={showPassError}
                                                title={<PasswordTips value={form.getFieldValue('password') || ''}/>}
                                                overlayStyle={{width: 300}}
                                                getPopupContainer={(triggerNode) => triggerNode as HTMLElement}
                                            >
                                                <Input.Password 
                                                    placeholder={translate({
                                                    id: 'register.form.password.placeholder',
                                                    message: 'Password'
                                                })}
                                                    className="flex-1 h-[24px] text-[16px] leading-[24px] text-[#787070] border-none shadow-none focus:outline-none"
                                                    style={{background: 'transparent'}}
                                                    visibilityToggle={true}
                                                    autoComplete="new-password"
                                                    onFocus={() => setShowPassError(true)}
                                                    onBlur={(e) => {
                                                        setShowPassError(false);
                                                        const value = e.target.value;
                                                        if (value) {
                                                            const len = value.length >= 8 && value.length <= 32;
                                                            const letter = /(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);
                                                            if (!len || !letter) {
                                                                form.setFields([
                                                                    {
                                                                        name: 'password',
                                                                        errors: [translate({
                                                                            id: 'register.form.password.format',
                                                                            message: 'Password format is incorrect'
                                                                        })]
                                                                    }
                                                                ]);
                                                            }
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const len = value.length >= 8 && value.length <= 32;
                                                        const letter = /(?=.*[0-9])(?=.*[a-zA-Z])/.test(value);
                                                        setPassValid({ len: !len, letter: !letter });
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                    </Form.Item>
                                </div>
                            </Form>

                            {/* 注册按钮和协议 - 响应式设计 */}
                            <div className="w-full h-auto flex flex-col gap-[16px] justify-start items-center">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full h-[52px] bg-[#0087c7] text-white rounded-full font-bold text-[16px] leading-[24px] hover:bg-[#0070a6] transition disabled:opacity-60"
                                    loading={registerLoading}
                                    disabled={!checkPolicy || registerLoading}
                                    onClick={async () => {
                                        try {
                                          // 先进行表单验证
                                          const values = await form.validateFields();
                                          // 验证通过后调用 handleRegister，传入表单值
                                          handleRegister(values);
                                        } catch (e) {
                                          // 表单验证失败
                                        }
                                      }}
                                >
                                                                                        <Translate id="register.form.submit">Link Account</Translate>
                                </Button>
                                
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
                                        By signing up and continuing, you agree to our{' '}
                                        <Link to="/docs/protocol/terms_of_use" className="text-[#0087c7] hover:underline">
                                            <Translate id="register.form.terms">Terms of Service</Translate>
                                        </Link>{' '}
                                        and{' '}
                                        <Link to="/docs/protocol/privacy_policy " className="text-[#0087c7] hover:underline">
                                            <Translate id="register.form.privacy">Privacy Policy</Translate>
                                        </Link>.
                                    </p>
                                </div>
                                
                                <div className="w-full h-auto flex justify-center items-start">
                                    <p className="text-[14px] leading-[20px] text-black text-center">
                                        <Translate id="register.form.haveAccount">Already have an account?</Translate>{' '}
                                        <Link to={siteBrand === 'bladepipe' ? '/login/' : '/login'} className="text-[#0087c7] font-semibold hover:underline">
                                            <Translate id="register.form.signIn">Log in</Translate>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
        </>
    );
} 
