import { NextRequest, NextResponse } from 'next/server';
import { supabaseAuthMiddleware } from './middleware/SupabaseMiddleware'

export async function middleware(req: NextRequest): Promise<NextResponse>
{
  return await supabaseAuthMiddleware(req);
}

export const config = {
  matcher: [
    /*
      * Match all request paths except for the ones starting with:
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico (favicon file)
      * Feel free to modify this pattern to include more paths.
      */
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}