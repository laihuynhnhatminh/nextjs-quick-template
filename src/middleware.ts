import { type NextRequest, NextResponse, userAgent } from 'next/server';

export default function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  request.headers.set('x-user-device', viewport);
  const requestHeaders = new Headers(request.headers);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
