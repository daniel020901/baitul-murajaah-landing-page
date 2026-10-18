import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  if (
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return next();
  }

  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  // shortcut: client-set cookie check for dev auth, upgrade to signed session/JWT in production
  const hasSession = context.cookies.get('admin_session')?.value === 'true';

  if (!hasSession && normalizedPath !== '/login') {
    return context.redirect('/login');
  }

  if (hasSession && normalizedPath === '/login') {
    return context.redirect('/');
  }

  return next();
});
