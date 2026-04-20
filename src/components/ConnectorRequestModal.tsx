import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { message } from 'antd';
import { Modal } from '@site/src/hooks/useModal';
import apis from '@site/src/apis';

type Urgency = 'urgent' | 'not_urgent';

interface ConnectorRequestModalProps {
  visible: boolean;
  onClose: () => void;
}

interface FormState {
  requestedLink: string;
  reason: string;
  urgency: Urgency;
  urgentTimeline: string;
  needContact: boolean;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
}

const initialState: FormState = {
  requestedLink: '',
  reason: '',
  urgency: 'not_urgent',
  urgentTimeline: '',
  needContact: true,
  contactName: '',
  companyName: '',
  email: '',
  phone: '',
};

const MAX_LINK_REQUEST_LENGTH = 1024;
const MAX_REASON_LENGTH = 2048;
const MAX_CONTACT_NAME_LENGTH = 128;
const MAX_PHONE_LENGTH = 11;
const MAX_EMAIL_LENGTH = 256;
const MAX_COMPANY_LENGTH = 256;
/** 与后端 ApplyDataSource expectedTime @Size(max = 32) 一致 */
const MAX_EXPECTED_TIME_LENGTH = 32;

const phoneRegex = /^\d{11}$/;
const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;

export default function ConnectorRequestModal({ visible, onClose }: ConnectorRequestModalProps) {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;
  const isBladepipe = siteBrand === 'bladepipe';
  const isClougence = siteBrand === 'clougence';
  const isCloudDM = siteBrand === 'clouddm';

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successVisible, setSuccessVisible] = useState(false);
  const [successNeedContact, setSuccessNeedContact] = useState(false);

  const brandName = isClougence ? 'CloudCanal' : isCloudDM ? 'CloudDM' : 'BladePipe';

  const handleClose = () => {
    setForm(initialState);
    setErrors({});
    onClose();
  };

  const setField = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const requestedLink = form.requestedLink.trim();
    const reason = form.reason.trim();
    const contactName = form.contactName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const company = form.companyName.trim();

    if (!requestedLink) {
      nextErrors.requestedLink = translate({
        id: 'connector.request.error.requestedLink',
        message: 'Please describe the requested data sources and links.',
      });
    } else if (requestedLink.length > MAX_LINK_REQUEST_LENGTH) {
      nextErrors.requestedLink = translate({
        id: 'connector.request.error.requestedLinkTooLong',
        message: 'Requested data sources and links should be within 1024 characters.',
      });
    }
    if (!reason) {
      nextErrors.reason = translate({
        id: 'connector.request.error.reason',
        message: 'Please explain why this link is needed.',
      });
    } else if (reason.length > MAX_REASON_LENGTH) {
      nextErrors.reason = translate({
        id: 'connector.request.error.reasonTooLong',
        message: 'Reason should be within 2048 characters.',
      });
    }
    if (form.needContact) {
      if (isBladepipe) {
        if (!email) {
          nextErrors.email = translate({
            id: 'connector.request.error.emailRequired',
            message: 'Please provide your email when contact is requested.',
          });
        } else if (email.length > MAX_EMAIL_LENGTH) {
          nextErrors.email = translate({
            id: 'connector.request.error.emailTooLong',
            message: 'Email should be within 256 characters.',
          });
        } else if (!emailRegex.test(email)) {
          nextErrors.email = translate({
            id: 'connector.request.error.emailFormat',
            message: 'Please enter a valid email address.',
          });
        }
      } else if (!phone) {
        nextErrors.phone = translate({
          id: 'connector.request.error.phoneRequired',
          message: 'Please provide your phone number when contact is requested.',
        });
      } else if (!phoneRegex.test(phone)) {
        nextErrors.phone = translate({
          id: 'connector.request.error.phoneFormat',
          message: 'Please enter an 11-digit phone number.',
        });
      }
    }

    if (contactName.length > MAX_CONTACT_NAME_LENGTH) {
      nextErrors.contactName = translate({
        id: 'connector.request.error.nameTooLong',
        message: 'Name should be within 128 characters.',
      });
    }
    if (phone) {
      if (!phoneRegex.test(phone)) {
        nextErrors.phone = translate({
          id: 'connector.request.error.phoneFormat',
          message: 'Please enter an 11-digit phone number.',
        });
      }
    }
    if (email) {
      if (email.length > MAX_EMAIL_LENGTH) {
        nextErrors.email = translate({
          id: 'connector.request.error.emailTooLong',
          message: 'Email should be within 256 characters.',
        });
      } else if (!emailRegex.test(email)) {
        nextErrors.email = translate({
          id: 'connector.request.error.emailFormat',
          message: 'Please enter a valid email address.',
        });
      }
    }
    if (company.length > MAX_COMPANY_LENGTH) {
      nextErrors.companyName = translate({
        id: 'connector.request.error.companyTooLong',
        message: 'Company should be within 256 characters.',
      });
    }

    if (form.urgency === 'urgent') {
      const timeline = form.urgentTimeline.trim();
      if (!timeline) {
        nextErrors.urgentTimeline = translate({
          id: 'connector.request.error.expectedTimeRequired',
          message: 'Please enter your expected timeline when urgency is urgent.',
        });
      } else if (timeline.length > MAX_EXPECTED_TIME_LENGTH) {
        nextErrors.urgentTimeline = translate({
          id: 'connector.request.error.expectedTimeTooLong',
          message: 'Expected timeline should be within 32 characters.',
        });
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const toNullable = (value: string) => {
      const trimmed = value.trim();
      return trimmed ? trimmed : null;
    };
    const requirementReason = form.reason.trim();
    const expectedTime = form.urgency === 'urgent' ? form.urgentTimeline.trim() : null;

    try {
      const res = await apis.feedbackApi.applyDataSource({
        linkRequest: form.requestedLink.trim(),
        requirementReason,
        urgent: form.urgency === 'urgent',
        expectedTime,
        contactMe: form.needContact,
        contactName: toNullable(form.contactName),
        contactPhone: toNullable(form.phone),
        contactEmail: toNullable(form.email),
        company: toNullable(form.companyName),
      });
      if (!res?.success) {
        message.error(res?.msg || translate({
          id: 'connector.request.submit.error',
          message: 'Submission failed. Please try again later.',
        }));
        return;
      }
      setSuccessNeedContact(form.needContact);
      handleClose();
      setSuccessVisible(true);
    } catch (error) {
      console.error('applyDataSource failed', error);
      message.error(
        translate({
          id: 'connector.request.submit.error',
          message: 'Submission failed. Please try again later.',
        }),
      );
    }
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose} width={800} hideCloseButton={true}>
        <div className="w-full bg-white rounded-[16px] p-[24px] sm:p-[30px] shadow-[0_8px_-4px_rgba(16,24,40,0.03),0_20px_-4px_rgba(21,53,126,0.2)] relative">
        <button
          type="button"
          className="absolute top-[20px] right-[20px] w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={handleClose}
          style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'transparent' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="text-[26px] font-bold text-black mb-7 pr-10">
          <Translate id="connector.request.modal.title">Request New Data Source / Link</Translate>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[15px] font-bold text-black">
              <span className="text-[#e34032] mr-1">*</span>
              <Translate id="connector.request.field.requestedLink">Requested data sources and links</Translate>
            </label>
            <textarea
              value={form.requestedLink}
              onChange={(e) => setField('requestedLink', e.target.value)}
              maxLength={MAX_LINK_REQUEST_LENGTH}
              placeholder={translate({
                id: 'connector.request.field.requestedLink.placeholder',
                message:
                  'e.g. Oracle (v12.x) -> StarRocks (v3.4.x) (full load + incremental + verification + correction)',
              })}
              aria-invalid={!!errors.requestedLink}
              className={`mt-2 w-full h-[68px] rounded-[10px] border px-4 py-3 text-[14px] outline-none ${
                errors.requestedLink
                  ? 'border-[#e34032] focus:border-[#e34032]'
                  : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
              }`}
            />
          </div>

          <div>
            <label className="text-[15px] font-bold text-black">
              <span className="text-[#e34032] mr-1">*</span>
              <Translate id="connector.request.field.reason">Why do you need these links?</Translate>
            </label>
            <textarea
              value={form.reason}
              onChange={(e) => setField('reason', e.target.value)}
              maxLength={MAX_REASON_LENGTH}
              placeholder={translate({
                id: 'connector.request.field.reason.placeholder',
                message: 'Please describe your business scenario, data volume, and target timeline.',
              })}
              aria-invalid={!!errors.reason}
              className={`mt-2 w-full h-[86px] rounded-[10px] border px-4 py-3 text-[14px] outline-none ${
                errors.reason
                  ? 'border-[#e34032] focus:border-[#e34032]'
                  : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
              }`}
            />
          </div>

          <div>
            <label className="text-[15px] font-bold text-black">
              <span className="text-[#e34032] mr-1">*</span>
              <Translate id="connector.request.field.urgency">Urgency</Translate>
            </label>
            <div className="mt-2 flex items-center gap-2">
              {(['not_urgent', 'urgent'] as Urgency[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setField('urgency', item);
                    if (item === 'not_urgent') {
                      setField('urgentTimeline', '');
                    }
                  }}
                  className={`h-[38px] px-4 rounded-[999px] border text-[14px] font-medium transition-colors cursor-pointer ${
                    form.urgency === item
                      ? 'border-[#0087c7] bg-[#eaf7ff] text-[#0087c7]'
                      : 'border-[rgba(0,0,0,0.25)] bg-white text-black/80 hover:bg-gray-50'
                  }`}
                >
                  {item === 'urgent' && <Translate id="connector.request.urgency.urgent">Urgent</Translate>}
                  {item === 'not_urgent' && <Translate id="connector.request.urgency.notUrgent">Not urgent</Translate>}
                </button>
              ))}

              {form.urgency === 'urgent' && (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <label className="text-[14px] font-bold text-black whitespace-nowrap shrink-0">
                    <span className="text-[#e34032] mr-0.5">*</span>
                    <Translate id="connector.request.field.urgentTimeline">Estimated timeline</Translate>
                  </label>
                  <input
                    type="text"
                    value={form.urgentTimeline}
                    onChange={(e) => setField('urgentTimeline', e.target.value)}
                    maxLength={MAX_EXPECTED_TIME_LENGTH}
                    placeholder={translate({
                      id: 'connector.request.field.urgentTimeline.placeholder',
                      message: 'For example: before 2026-05-30',
                    })}
                    aria-invalid={!!errors.urgentTimeline}
                    className={`w-full min-w-0 h-[38px] rounded-[10px] border px-3 text-[14px] outline-none focus:border-[#0087c7] ${
                      errors.urgentTimeline
                        ? 'border-[#e34032] focus:border-[#e34032]'
                        : 'border-[rgba(0,0,0,0.2)]'
                    }`}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <input
              id="request-contact"
              type="checkbox"
              checked={form.needContact}
              onChange={(e) => setField('needContact', e.target.checked)}
              className="w-4 h-4 accent-[#0087c7] shrink-0 cursor-pointer"
            />
            <label htmlFor="request-contact" className="text-[14px] text-black shrink-0 cursor-pointer">
              <Translate id="connector.request.field.needContact">Contact me</Translate>
            </label>
            {isBladepipe ? (
              <a
                href="https://discord.gg/HMnThuQMup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] leading-[18px] text-black/60 hover:text-[#0087c7] cursor-pointer"
              >
                <Translate id="connector.request.progress.tip.bladepipe">
                  For progress updates, we recommend joining the Discord community.
                </Translate>
              </a>
            ) : (
              <span className="text-[12px] leading-[18px] text-black/60">
                <Translate id="connector.request.progress.tip.clougence">
                  For progress updates, we recommend joining the community group.
                </Translate>
              </span>
            )}
          </div>

          {form.needContact && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {isBladepipe ? (
                <div>
                  <label className="text-[15px] font-bold text-black">
                    <span className="text-[#e34032] mr-1">*</span>
                    <Translate id="connector.request.field.email">Email</Translate>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    maxLength={MAX_EMAIL_LENGTH}
                    placeholder={translate({
                      id: 'connector.request.field.email.placeholder',
                      message: 'you@example.com',
                    })}
                    aria-invalid={!!errors.email}
                    className={`mt-2 w-full h-[46px] rounded-[10px] border px-4 text-[14px] outline-none ${
                      errors.email
                        ? 'border-[#e34032] focus:border-[#e34032]'
                        : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
                    }`}
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[15px] font-bold text-black">
                    <span className="text-[#e34032] mr-1">*</span>
                    <Translate id="connector.request.field.phone">Phone</Translate>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    maxLength={MAX_PHONE_LENGTH}
                    placeholder={translate({
                      id: 'connector.request.field.phone.placeholder',
                      message: 'Please enter your phone number',
                    })}
                    aria-invalid={!!errors.phone}
                    className={`mt-2 w-full h-[46px] rounded-[10px] border px-4 text-[14px] outline-none ${
                      errors.phone
                        ? 'border-[#e34032] focus:border-[#e34032]'
                        : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
                    }`}
                  />
                </div>
              )}

              <div>
                <label className="text-[15px] font-bold text-black">
                  <Translate id="connector.request.field.name">Name</Translate>
                </label>
                <input
                  type="text"
                  value={form.contactName}
                  onChange={(e) => setField('contactName', e.target.value)}
                  maxLength={MAX_CONTACT_NAME_LENGTH}
                  placeholder={translate({
                    id: 'connector.request.field.name.placeholder',
                    message: 'Please enter your name',
                  })}
                  aria-invalid={!!errors.contactName}
                  className={`mt-2 w-full h-[46px] rounded-[10px] border px-4 text-[14px] outline-none ${
                    errors.contactName
                      ? 'border-[#e34032] focus:border-[#e34032]'
                      : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
                  }`}
                />
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <label className="text-[15px] font-bold text-black">
                  <Translate id="connector.request.field.company">Company</Translate>
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => setField('companyName', e.target.value)}
                  maxLength={MAX_COMPANY_LENGTH}
                  placeholder={translate({
                    id: 'connector.request.field.company.placeholder',
                    message: 'Company name',
                  })}
                  className="mt-2 w-full h-[46px] rounded-[10px] border border-[rgba(0,0,0,0.2)] px-4 text-[14px] outline-none focus:border-[#0087c7]"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="h-[44px] px-5 rounded-[999px] border border-[rgba(0,0,0,0.2)] bg-white text-[14px] font-bold text-black hover:bg-white cursor-pointer"
            style={{ backgroundColor: '#fff' }}
          >
            <Translate id="connector.request.action.cancel">Cancel</Translate>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[44px] px-6 rounded-[999px] bg-[#0087c7] text-white text-[14px] font-bold hover:bg-[#0077b0] transition-colors border-none outline-none focus:outline-none focus:ring-0 cursor-pointer"
            style={{ border: 'none' }}
          >
            <Translate id="connector.request.action.submit">Submit Request</Translate>
          </button>
        </div>
        </div>
      </Modal>

      <Modal
        visible={successVisible}
        onClose={() => setSuccessVisible(false)}
        width={520}
        hideCloseButton={true}
      >
        <div className="w-full bg-white rounded-[16px] p-[24px] sm:p-[28px] shadow-xl relative text-center">
          <button
            type="button"
            className="absolute top-[16px] right-[16px] w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setSuccessVisible(false)}
            style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'transparent' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="w-[44px] h-[44px] rounded-full bg-[#eaf7ff] flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L10 17L4 11" stroke="#0087c7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="text-[20px] leading-[32px] text-black m-0 font-semibold">
            {successNeedContact ? (
              <Translate id="connector.request.submit.success.withContact">
                Submitted successfully. We will contact you as soon as possible.
              </Translate>
            ) : (
              <Translate id="connector.request.submit.success.withoutContact">
                Submitted successfully. Please stay tuned for future product releases.
              </Translate>
            )}
          </p>

          {isBladepipe ? (
            <div className="mt-6 rounded-[10px] border border-[rgba(0,0,0,0.08)] bg-[#f8fafc] p-4">
              <p className="text-[13px] leading-[20px] text-black/65 mb-3">
                <Translate id="connector.request.submit.success.discordTip">
                  Join our Discord community to get the latest product updates.
                </Translate>
              </p>
              <a
                href="https://discord.gg/HMnThuQMup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-black/20 bg-white flex items-center justify-center transition-all duration-200 hover:bg-gray-100 hover:border-black/30 mx-auto"
                title="Discord"
                aria-label="Discord"
              >
                <img
                  src="/img/about/contact/discord.svg"
                  alt="Discord"
                  className="w-10 h-10"
                />
              </a>
            </div>
          ) : (
            <div className="mt-6 rounded-[10px] border border-[rgba(0,0,0,0.08)] bg-[#f8fafc] p-4">
              <p className="text-[13px] leading-[20px] text-black/65 mb-0">
                <Translate id="connector.request.submit.success.qrTip">
                  如想了解进度，可扫描页面右侧二维码加入交流群。
                </Translate>
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setSuccessVisible(false)}
              className="h-[42px] px-6 rounded-full bg-[#0087c7] text-white text-[14px] font-bold hover:bg-[#0070a6] transition-colors border-none cursor-pointer"
              style={{ border: 'none' }}
            >
              <Translate id="connector.request.submit.success.confirm">Got it</Translate>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
