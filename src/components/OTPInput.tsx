'use client';

import { useState, useRef } from 'react';

interface Data {
  otp: string;
  number?: string;
}

interface Props {
  onSubmit: (data: Data) => void;
}

const defaultValue = ['', '', '', '', '', ''];

const OTPInput = ({ onSubmit }: Props) => {
  const [otp, setOTP] = useState<string[]>(defaultValue);
  const otpInputRefs = useRef<HTMLInputElement[]>([]);
  const numberInputRef = useRef<HTMLInputElement>(null);

  const handleChangeOtpInput = (index: number, value: string) => {
    if (!isNaN(parseInt(value)) && value !== '') {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move to the next input if available
      if (index < 5 && value !== '') {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 8 && index > 0 && otp[index] === '') {
      const newOTP = [...otp];
      newOTP[index - 1] = '';
      setOTP(newOTP);
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData?.getData('text')?.trim()?.slice(0, 6);
    if (pasteData && pasteData.length === 6) {
      setOTP(pasteData.split(''));
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      const data = { number: numberInputRef.current?.value, otp: otpValue };
      onSubmit(data);
    } else {
      console.log('طول گذرواژه یکبار مصرف نامعتبر است');
    }
  };

  return (
    <div className="flex flex-col max-w-7xl m-auto gap-6 mt-60">
      <div className="flex flex-col">
        <label className="text-sm">شماره تلفن</label>
        <input
          className="my-2 border rounded text-center focus:outline-none focus:border-blue-500"
          type="text"
          maxLength={11}
          name="number"
          ref={numberInputRef}
        />
      </div>

      <div dir="flex flex-col">
        <label className="text-sm">رمز یکبار مصرف</label>
        <div dir="ltr" className="mt-2">
          {otp.map((digit, index) => (
            <input
              className="w-10 h-10 mx-1 border rounded text-center focus:outline-none focus:border-blue-500"
              type="text"
              maxLength={1}
              key={index}
              value={digit}
              onChange={(e) => handleChangeOtpInput(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              onPaste={(e) => handlePaste(e)}
              ref={(ref) => (otpInputRefs.current[index] = ref as HTMLInputElement)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-outline btn-sm btn-primary" onClick={handleSubmit}>
          ارسال
        </button>
        <button className="btn btn-neutral btn-sm btn-ghost" onClick={() => setOTP(defaultValue)}>
          تنظیم مجدد
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
