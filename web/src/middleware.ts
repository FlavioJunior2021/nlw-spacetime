import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`,
      {
        headers: {
          'Set-Cookie': `redirectTo=${req.url}; Path=/; HttpOnly;max-age=20`,
        },
      },
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
