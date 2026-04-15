'use client';

import { useEffect, useState } from 'react';

export type RevenueState = {
  total_usd: number;
  count: number;
  status: 'loading' | 'ok' | 'no_sales' | 'error';
  error?: string;
  last_updated?: string;
};

// Shared hook for fetching live revenue. Polls /api/revenue every `intervalMs`
// (default 30s). Never silently returns fake zeros — if the fetch or API
// fails, status flips to 'error' so the UI can show a real signal instead of
// pretending we have no sales.

export function useRevenue(intervalMs = 30_000): RevenueState {
  const [state, setState] = useState<RevenueState>({ total_usd: 0, count: 0, status: 'loading' });

  useEffect(() => {
    let alive = true;

    const tick = async () => {
      try {
        const res = await fetch('/api/revenue', { cache: 'no-store' });
        if (!res.ok) {
          if (alive) setState((prev) => ({ ...prev, status: 'error', error: `HTTP ${res.status}` }));
          return;
        }
        const data = (await res.json()) as {
          total_usd?: number;
          count?: number;
          status?: string;
          last_updated?: string;
          note?: string;
        };
        if (!alive) return;

        // Trust server's explicit status field. If it reports error, propagate.
        if (data.status === 'error') {
          setState({
            total_usd: data.total_usd ?? 0,
            count: data.count ?? 0,
            status: 'error',
            error: data.note,
            last_updated: data.last_updated,
          });
          return;
        }

        setState({
          total_usd: data.total_usd ?? 0,
          count: data.count ?? 0,
          status: (data.status as RevenueState['status']) || 'ok',
          last_updated: data.last_updated,
        });
      } catch (e) {
        if (alive) {
          setState((prev) => ({
            ...prev,
            status: 'error',
            error: e instanceof Error ? e.message : 'network',
          }));
        }
      }
    };

    void tick();
    const id = setInterval(tick, intervalMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  return state;
}
