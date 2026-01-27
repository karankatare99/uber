import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  if (!sessionToken) {
    redirect('/login');
  }

  const res = await fetch('http://localhost:3000/api/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    redirect('/login');
  }

  const { user } = await res.json();
  return user;
}
