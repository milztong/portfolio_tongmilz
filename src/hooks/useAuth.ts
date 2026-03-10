'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

interface AuthUser {
  username: string;
  email: string;
  userId: string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.me()
      .then((me) => {
        setUser(me);
      })
      .catch(() => {
        router.push('/stock-predictor/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  return { user, loading };
}
