'use client';

import { useEffect } from 'react';
import AboutPage from '../../about/page';
import { useLang } from '../../_components/LangContext';

export default function AboutArPage() {
  const { setLang } = useLang();
  useEffect(() => {
    setLang('ar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <AboutPage />;
}
