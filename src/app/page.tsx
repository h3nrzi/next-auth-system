'use client';

import OTPInput from '@/components/OTPInput';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface Data {
  otp: string;
  number?: string;
}

const HomePage = () => {
  const handleComplete = (data: Data) => {
    axios
      .post('/api/user/signup', data)
      .then((res) => toast.success(res.data.message))
      .catch((err) => toast.error(err.response.data));
  };

  return (
    <div className="w-80 m-auto">
      <Toaster />
      <OTPInput onSubmit={(otpValue) => handleComplete(otpValue)} />
    </div>
  );
};

export default HomePage;
