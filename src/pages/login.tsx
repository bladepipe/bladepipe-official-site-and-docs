import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Button } from 'antd';
import { getPageMeta } from '@site/src/utils/meta';
import LoginSidebar from '@site/src/components/LoginSidebar';
import { getPublicKey } from '@site/src/apis/constant';
import { sm2 } from 'sm-crypto';
import { useConstantStore } from '@site/src/store/constant';
import CloudCanalLoginForm from '@site/src/components/LoginForms/CloudCanalLoginForm';
import BladepipeLoginForm from '@site/src/components/LoginForms/BladepipeLoginForm';
import CloudDmLoginForm from '@site/src/components/LoginForms/CloudDmLoginForm';

interface SsoLoginButtonsProps {
  ssoTypes: Record<string, string>;
  googleLoading: boolean;
  wechatLoading: boolean;
  dingtalkLoading: boolean;
  setGoogleLoading: (value: boolean) => void;
  setWechatLoading: (value: boolean) => void;
  setDingtalkLoading: (value: boolean) => void;
}

const SsoLoginButtons: React.FC<SsoLoginButtonsProps> = ({
  ssoTypes,
  googleLoading,
  wechatLoading,
  dingtalkLoading,
  setGoogleLoading,
  setWechatLoading,
  setDingtalkLoading,
}) => (
  <div className="w-full h-auto flex flex-col gap-[24px] justify-start items-start">
    {ssoTypes.google && (
      <Button
        className="w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#262A2B]"
        style={{ display: 'flex' }}
        onClick={() => {
          if (ssoTypes.google) {
            setGoogleLoading(true);
            window.location.replace(ssoTypes.google);
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

    {ssoTypes.wechat && (
      <Button
        className="w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#262A2B]"
        style={{ display: 'flex' }}
        onClick={() => {
          if (ssoTypes.wechat) {
            setWechatLoading(true);
            window.location.replace(ssoTypes.wechat);
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

    {ssoTypes.dingtalk && (
      <Button
        className="w-full h-[52px] bg-white border border-solid border-[#11101a] border-opacity-10 rounded-full flex justify-center items-center hover:bg-gray-50 transition !text-[#262A2B]"
        style={{ display: 'flex' }}
        onClick={() => {
          if (ssoTypes.dingtalk) {
            setDingtalkLoading(true);
            window.location.replace(ssoTypes.dingtalk);
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

    <div className="w-full h-[20px] flex justify-between items-center">
      <div className="flex-1 h-[1px] bg-[#11101a] bg-opacity-10" />
      <div className="px-[20px] flex justify-center items-center">
        <span className="text-[12px] leading-[20px] text-[#3F3F46] whitespace-nowrap">
          <Translate id="login.divider.or">Or</Translate>
        </span>
      </div>
      <div className="flex-1 h-[1px] bg-[#11101a] bg-opacity-10" />
    </div>
  </div>
);

export default function Login() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;

  const [checkPolicy, setCheckPolicy] = useState(true);
  const [warnCheckPolicy, setWarnCheckPolicy] = useState(false);

  const [publicKey, setPublicKey] = useState<string>('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [wechatLoading, setWechatLoading] = useState(false);
  const [dingtalkLoading, setDingtalkLoading] = useState(false);

  const ssoTypesObj = useConstantStore((state) => state.ssoTypes);
  const fetchSsoType = useConstantStore((state) => state.ssoType);

  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const res: any = await getPublicKey();
        if (res && res.success) {
          setPublicKey(res.data);
        }
      } catch (error) {
        // ignore
      }
    };

    fetchPublicKey();
  }, []);

  useEffect(() => {
    fetchSsoType();
  }, [fetchSsoType]);

  const encryptPassword = useCallback(
    (password: string) => {
      if (!password) return '';
      if (!publicKey) return password;
      return sm2.doEncrypt(password, publicKey, 1);
    },
    [publicKey]
  );

  const externalLoading = googleLoading || wechatLoading || dingtalkLoading;

  const SelectedLoginForm = useMemo(() => {
    if (siteBrand === 'bladepipe') return BladepipeLoginForm;
    if (siteBrand === 'clouddm') return CloudDmLoginForm;
    return CloudCanalLoginForm;
  }, [siteBrand]);

  const loginMeta = getPageMeta('login');

  return (
    <>
    <Head>
      <title>{loginMeta.title}</title>
      <meta name="description" content={loginMeta.description} />
    </Head>
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
          <Translate id="login.sidebar.feature4" key="key4">SOC 2, GDPR and ISO 27001 Certified</Translate>,
        ]}
      />

      <div className="flex-1 h-screen overflow-y-auto flex justify-center items-start py-8 md:py-24">
        <div className="w-[416px] flex flex-col gap-[32px] justify-start items-start px-4 sm:px-0 py-8 sm:py-0">
          <div className="w-full h-auto flex flex-col gap-[32px] justify-start items-start">
            <h2 className="text-[24px] font-bold leading-[32px] text-black text-center w-full">
              <span className="mr-2">
                <Translate id="login.title">Log in to</Translate>
              </span>
              {siteBrand === 'clouddm' ? 'CloudDM' : siteBrand === 'clougence' ? 'ClouGence' : 'BladePipe'}
            </h2>

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

          <div className="w-full h-auto flex flex-col gap-[28px] justify-start items-start">
            <SsoLoginButtons
              ssoTypes={ssoTypesObj || {}}
              googleLoading={googleLoading}
              wechatLoading={wechatLoading}
              dingtalkLoading={dingtalkLoading}
              setGoogleLoading={setGoogleLoading}
              setWechatLoading={setWechatLoading}
              setDingtalkLoading={setDingtalkLoading}
            />

            <div className="w-full h-auto flex flex-col gap-[32px] justify-start items-center">
              <SelectedLoginForm
                checkPolicy={checkPolicy}
                onPolicyWarning={() => setWarnCheckPolicy(true)}
                encryptPassword={encryptPassword}
                externalLoading={externalLoading}
              />

              <div className="w-full h-auto flex flex-col gap-[16px] justify-start items-start">
                <div className="w-full h-auto flex flex-col sm:flex-row sm:justify-between items-start gap-2 sm:gap-0">
                  <p className="text-[14px] leading-[20px] text-black">
                    <Translate id="login.link.noAccount">Don't have an account?</Translate>{' '}
                    <Link to={siteBrand === 'bladepipe' ? '/register/' : '/register'} className="text-[#0087c7] font-bold hover:underline">
                      <Translate id="login.link.signUp">Sign Up</Translate>
                    </Link>
                  </p>
                  <Link to={siteBrand === 'bladepipe' ? '/resetPwd/' : '/resetPwd'} className="text-[14px] leading-[20px] text-black hover:underline">
                    <Translate id="login.link.forgotPassword">Forgot your password?</Translate>
                  </Link>
                </div>

                <div className="w-full h-auto flex gap-[16px] justify-start items-start">
                  <div className="w-[16px] h-[20px] flex justify-start items-center py-[2px] flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={checkPolicy}
                      onChange={(e) => {
                        setCheckPolicy(e.target.checked);
                        if (e.target.checked) {
                          setWarnCheckPolicy(false);
                        }
                      }}
                      className="w-[16px] h-[16px] border-2 border-solid border-[#0087c7] border-opacity-20 rounded-[2px] accent-[#0087c7]"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-medium leading-[20px] text-black">
                      <Translate id="login.policy.agreement">By signing up and continuing, you agree to our</Translate>{' '}
                      <Link to="/docs/protocol/terms_of_use" className="text-[#0087c7] hover:underline">
                        <Translate id="login.policy.termsOfService">Terms of Service</Translate>
                      </Link>{' '}
                      <Translate id="login.policy.and">and</Translate>{' '}
                      <Link to="/docs/protocol/privacy_policy" className="text-[#0087c7] hover:underline">
                        <Translate id="login.policy.privacyPolicy">Privacy Policy</Translate>
                      </Link>
                      <Translate id="login.policy.period">.</Translate>
                    </p>
                    {warnCheckPolicy && (
                      <p className="text-[12px] text-[#FF6E0D] mt-2">
                        <Translate id="login.policy.warning">Please agree to the Terms of Service and Privacy Policy before continuing.</Translate>
                      </p>
                    )}
                  </div>
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