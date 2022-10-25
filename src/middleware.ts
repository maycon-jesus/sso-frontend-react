// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setApiToken } from 'libs/api'


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if(['/minha-conta','/desenvolvedor'].some(path => request.nextUrl.pathname.startsWith(path))){
    const token = request.cookies.get('AUTH_TOKEN')
    if(token){
      setApiToken(request.cookies.get('AUTH_TOKEN'))
    }else{
      return NextResponse.redirect(new URL(`/?redirectPath=${request.nextUrl.pathname}`, request.url))
    }
  }
}