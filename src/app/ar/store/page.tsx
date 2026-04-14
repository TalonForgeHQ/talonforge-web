'use client';

import { useEffect } from 'react';
import StoreView from '../../store/StoreView';
import { useLang } from '../../_components/LangContext';

export default function StoreArPage() {
  const { setLang } = useLang();
  useEffect(() => {
    setLang('ar');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <StoreView />;
}
