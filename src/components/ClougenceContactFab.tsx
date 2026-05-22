import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { message, Popover } from 'antd';
import { Modal } from '@site/src/hooks/useModal';
import apis from '@site/src/apis';

const MAX_CONTACT_NAME_LENGTH = 128;
const MAX_CONTACT_PHONE_LENGTH = 11;
const MAX_COMPANY_LENGTH = 256;
const MAX_REQUIREMENT_LENGTH = 2048;
const CONTACT_PHONE_REGEX = /^\d{11}$/;

export default function ClougenceContactFab() {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand as string;

  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    company: '',
    inquiry: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  if (siteBrand !== 'clougence') {
    return null;
  }

  const setField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    const name = form.name.trim();
    const phone = form.phone.trim();
    const inquiry = form.inquiry.trim();

    if (!name) {
      next.name = translate({
        id: 'clougence.contact.error.name',
        message: 'Please enter your name.',
      });
    } else if (name.length > MAX_CONTACT_NAME_LENGTH) {
      next.name = translate({
        id: 'clougence.contact.error.nameLength',
        message: 'Name should be within 128 characters.',
      });
    }
    if (!phone) {
      next.phone = translate({
        id: 'clougence.contact.error.phone',
        message: 'Please enter your phone number.',
      });
    } else {
      if (!CONTACT_PHONE_REGEX.test(phone)) {
        next.phone = translate({
          id: 'clougence.contact.error.phoneFormat',
          message: 'Please enter an 11-digit phone number.',
        });
      }
    }
    if (!inquiry) {
      next.inquiry = translate({
        id: 'clougence.contact.error.inquiry',
        message: 'Please tell us what you would like to know.',
      });
    } else if (inquiry.length > MAX_REQUIREMENT_LENGTH) {
      next.inquiry = translate({
        id: 'clougence.contact.error.inquiryLength',
        message: 'Requirement should be within 2048 characters.',
      });
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || submitting) return;

    const toOptionalValue = (value: string) => {
      const trimmed = value.trim();
      return trimmed ? trimmed : undefined;
    };
    const uid =
      typeof window !== 'undefined'
        ? toOptionalValue(localStorage.getItem('uid') || '')?.slice(0, 64)
        : undefined;

    setSubmitting(true);
    try {
      const res = await apis.feedbackApi.contactUs({
        uid,
        contactName: form.name.trim(),
        contactPhone: toOptionalValue(form.phone),
        company: toOptionalValue(form.company),
        requirement: form.inquiry.trim(),
      });
      if (!res?.success) {
        message.error(
          res?.msg ||
            translate({
              id: 'clougence.contact.submit.error',
              message: 'Submission failed. Please try again later.',
            }),
        );
        return;
      }
      setForm({ name: '', phone: '', company: '', inquiry: '' });
      setErrors({});
      setVisible(false);
      setSuccessVisible(true);
    } catch (error) {
      console.error('contactUs failed', error);
      message.error(
        translate({
          id: 'clougence.contact.submit.error',
          message: 'Submission failed. Please try again later.',
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setErrors({});
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="fixed bottom-6 right-6 z-[1000] h-[52px] px-5 rounded-full bg-[#0087c7] text-white text-[16px] font-bold shadow-[0_8px_24px_rgba(0,135,199,0.35)] hover:bg-[#0070a6] transition-colors cursor-pointer border-none outline-none focus:outline-none"
        style={{ border: 'none' }}
      >
        <Translate id="clougence.contact.fab.label">商业合作</Translate>
      </button>

      <Modal visible={visible} onClose={handleClose} width={790} hideCloseButton>
        <div className="w-full bg-white rounded-[16px] p-[20px] sm:p-[28px] shadow-xl relative">
          <button
            type="button"
            className="absolute top-[18px] right-[18px] w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer border border-transparent"
            onClick={handleClose}
            aria-label={translate({ id: 'clougence.contact.close', message: 'Close' })}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <h2 className="text-[22px] font-bold text-black mb-6 pr-10">
            <Translate id="clougence.contact.modal.title">商业合作</Translate>
          </h2>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[14px] font-bold text-black">
                  <span className="text-[#e34032] mr-1">*</span>
                  <Translate id="clougence.contact.field.name">姓名</Translate>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  maxLength={MAX_CONTACT_NAME_LENGTH}
                  placeholder={translate({
                    id: 'clougence.contact.field.name.placeholder',
                    message: '请输入姓名',
                  })}
                  aria-invalid={!!errors.name}
                  className={`mt-2 w-full h-[44px] rounded-[10px] border px-4 text-[14px] outline-none ${
                    errors.name
                      ? 'border-[#e34032] focus:border-[#e34032]'
                      : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
                  }`}
                />
              </div>
              <div>
                <label className="text-[14px] font-bold text-black">
                  <span className="text-[#e34032] mr-1">*</span>
                  <Translate id="clougence.contact.field.phone">手机号</Translate>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  maxLength={MAX_CONTACT_PHONE_LENGTH}
                  placeholder={translate({
                    id: 'clougence.contact.field.phone.placeholder',
                    message: '请输入手机号',
                  })}
                  aria-invalid={!!errors.phone}
                  className={`mt-2 w-full h-[44px] rounded-[10px] border px-4 text-[14px] outline-none ${
                    errors.phone
                      ? 'border-[#e34032] focus:border-[#e34032]'
                      : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
                  }`}
                />
              </div>
              <div>
                <label className="text-[14px] font-bold text-black">
                  <Translate id="clougence.contact.field.company">公司名称</Translate>
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setField('company', e.target.value)}
                  maxLength={MAX_COMPANY_LENGTH}
                  placeholder={translate({
                    id: 'clougence.contact.field.company.placeholder',
                    message: '请输入公司名称',
                  })}
                  aria-invalid={!!errors.company}
                  className={`mt-2 w-full h-[44px] rounded-[10px] border px-4 text-[14px] outline-none ${
                    errors.company
                      ? 'border-[#e34032] focus:border-[#e34032]'
                      : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-[14px] font-bold text-black">
                <span className="text-[#e34032] mr-1">*</span>
                <Translate id="clougence.contact.field.inquiry">想要了解什么</Translate>
              </label>
              <textarea
                value={form.inquiry}
                onChange={(e) => setField('inquiry', e.target.value)}
                maxLength={MAX_REQUIREMENT_LENGTH}
                placeholder={translate({
                  id: 'clougence.contact.field.inquiry.placeholder',
                  message: '请简要描述您的需求或问题',
                })}
                aria-invalid={!!errors.inquiry}
                className={`mt-2 w-full min-h-[100px] rounded-[10px] border px-4 py-3 text-[14px] outline-none resize-y ${
                  errors.inquiry
                    ? 'border-[#e34032] focus:border-[#e34032]'
                    : 'border-[rgba(0,0,0,0.2)] focus:border-[#0087c7]'
                }`}
              />
            </div>

            <p className="text-[13px] leading-[20px] text-black/65">
              <Translate id="clougence.contact.followup.note">
                提交后可获取商务合作方案与专业咨询，CloudCanal 专业顾问将结合您的业务场景尽快与您联系，提供针对性建议与实施支持。
              </Translate>
            </p>

            <div className="rounded-[10px] border border-[rgba(0,0,0,0.08)] bg-[#f8fafc] p-4 flex flex-col gap-3">
              <p className="text-[13px] font-bold text-black m-0">
                <Translate id="clougence.contact.directTitle">商务合作联系方式</Translate>
              </p>
              <div className="flex flex-row flex-wrap items-start gap-x-8 gap-y-2 text-[13px]">
                <div className="flex gap-2 items-start min-w-0">
                  <span className="text-black/60 shrink-0 w-10">
                    <Translate id="clougence.contact.direct.phoneLabel">电话</Translate>
                  </span>
                  <span className="text-black font-medium break-all min-w-0">
                    <Translate id="about.contact.clougence.business.phone">0571-88603096</Translate>
                  </span>
                </div>
                <div className="flex gap-2 items-start min-w-0">
                  <span className="text-black/60 shrink-0 w-10">
                    <Translate id="about.contact.clougence.wechat.title">官微</Translate>
                  </span>
                  <div className="min-w-0">
                    <Popover
                      content={
                        <div className="text-center py-1">
                          <div className="mb-2">
                            <span className="text-[12px] text-gray-600">
                              <Translate id="about.contact.clougence.wechat.scan">扫码关注 ClouGence 官微</Translate>
                            </span>
                          </div>
                          <img
                            src="/img/contact/wechat.png"
                            alt=""
                            className="w-[140px] h-[140px] rounded-[4px] mx-auto"
                          />
                        </div>
                      }
                      title={null}
                      trigger="click"
                      placement="top"
                      overlayClassName="wechat-qr-popover"
                    >
                      <button
                        type="button"
                        className="text-[#0087c7] font-semibold hover:underline cursor-pointer bg-transparent border-none p-0 text-left"
                      >
                        <Translate id="about.contact.clougence.wechat.view">查看二维码</Translate>
                      </button>
                    </Popover>
                  </div>
                </div>
                <div className="flex gap-3 items-start text-[13px] min-w-0 flex-1">
                  <span className="text-black/60 shrink-0 w-10 pt-0.5">
                    <Translate id="about.contact.clougence.email.title">邮箱</Translate>
                  </span>
                  <div className="flex flex-col gap-1 text-black font-medium leading-snug min-w-0">
                    <span className="break-all">
                      <Translate id="about.contact.clougence.email.sales">【商务合作】sales@clougence.com</Translate>
                    </span>
                    <span className="break-all">
                      <Translate id="about.contact.clougence.email.support">【技术支持】cloudcanal_support@clougence.com</Translate>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="h-[42px] px-5 rounded-full border border-[rgba(0,0,0,0.2)] bg-white text-[14px] font-bold text-black hover:bg-gray-50 cursor-pointer"
            >
              <Translate id="clougence.contact.action.cancel">取消</Translate>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="h-[42px] px-6 rounded-full bg-[#0087c7] text-white text-[14px] font-bold hover:bg-[#0070a6] transition-colors cursor-pointer border-none outline-none"
              style={{ border: 'none' }}
            >
              <Translate id="clougence.contact.action.submit">提交</Translate>
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
            <Translate id="clougence.contact.submit.success">
              Submitted successfully. Our consultant will contact you soon.
            </Translate>
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setSuccessVisible(false)}
              className="h-[42px] px-6 rounded-full bg-[#0087c7] text-white text-[14px] font-bold hover:bg-[#0070a6] transition-colors border-none cursor-pointer"
              style={{ border: 'none' }}
            >
              <Translate id="clougence.contact.submit.success.confirm">Got it</Translate>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
