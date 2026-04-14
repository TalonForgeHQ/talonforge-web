'use client';

import { useEffect } from 'react';
import Home from '../page';
import { useLang } from '../_components/LangContext';

export default function HomeArPage() {
  const { setLang } = useLang();
  useEffect(() => {
    setLang('ar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Home />;
}
