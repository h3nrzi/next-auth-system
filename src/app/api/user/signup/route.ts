import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  return axios
    .post('http://localhost:3001/api/user/signupOtp/verify', body)
    .then((res) => NextResponse.json(res.data))
    .catch((err) => NextResponse.json(err.response?.data, { status: 400 }));
}
