'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';

const Countdown = ({ duration, timeoutCallback }) => {
  const [timer, setTimer] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          timeoutCallback();
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, timeoutCallback]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <span className="inline-block bg-gray-200 rounded p-2">{`${
      minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`}</span>
  );
};

/////////////////////

const defaultValue = { number: 0, otp: '' };

const VerifyOptForm = () => {
  const [status, setStatus] = useState('countdown started');
  const [verifyCodeOtp, setVerifyCodeOtp] = useState('');
  const [form, setForm] = useState(defaultValue);

  const onSubmitForm = (form) => {
    console.log(form);
  };

  const handleChangeForForm = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const handleTimeout = () => {
    setStatus('timeout occurred');
    // Additional logic on timeout if needed
  };

  const handleChangeForInput = (e, index: number) => {
    const { value } = e.target;
    setVerifyCodeOtp((prev) => {
      const updatedOtp = prev.split('');
      updatedOtp[index] = value;
      return updatedOtp.join('');
    });

    const nextInput = e.target.nextElementSibling;
    if (value.length === 1 && nextInput) {
      nextInput.focus();
    } else if (value.length === 0 && index > 0) {
      const prevInput = e.target.previousElementSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <form className="flex flex-col max-w-7xl m-auto items-center gap-3">
      <div className="mb-4">Status: {status}</div>

      <div className="mb-4">
        <Countdown duration={300} timeoutCallback={handleTimeout} />
      </div>

      <input
        className="my-2 border rounded text-center focus:outline-none focus:border-blue-500"
        type="text"
        maxLength={11}
        name="number"
        onChange={(e) => handleChangeForForm(e)}
      />

      <div className="input-code">
        {[...Array(6)].map((_, i) => (
          <input
            dir="ltr"
            className="w-10 h-10 mx-1 border rounded text-center focus:outline-none focus:border-blue-500"
            key={i}
            type="text"
            maxLength={1}
            value={verifyCodeOtp[i] || ''}
            name="otp"
            onChange={(e) => {
              handleChangeForInput(e, i);
              handleChangeForForm(e);
            }}
          />
        ))}
      </div>

      <button className="btn btn-sm btn-primary" type="button" onClick={() => onSubmitForm(form)}>
        ارسال
      </button>
    </form>
  );
};

export default VerifyOptForm;
