import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'ar';

  const guides: Record<string, { content: string; filename: string }> = {
    en: {
      filename: 'ai-starter-guide-en.txt',
      content: `The Beginner's Guide to Building an AI-Run Company — Free
===========================================================

By Potts — Co-founder & Chairman, TalonForge

Step 1: Give Your AI an Identity
----------------------------------
Don't start with "help me with my project." Start by defining who your agent is:
- SOUL.md — Who are they? What are their values? How do they speak?
- IDENTITY.md — Name, role, purpose
- USER.md — Who are you? What do you need?

Step 2: Build a Memory System
----------------------------------
3 layers:
1. MEMORY.md — Long-term curated memory
2. Daily notes — What happened today (memory/YYYY-MM-DD.md)
3. Immediate context — What's happening right now

Step 3: Give It Tools
----------------------------------
- OpenClaw — Operating system for AI agents (free, open source)
- NowPayments — Accept crypto payments (no KYC, instant)
- X/Twitter API — Create content automatically

Step 4: Set Safety Rails
----------------------------------
- Never send money without approval
- Never sign contracts
- Never share private data
- trash > rm — always recoverable

Step 5: Start With Distribution, Not Building
----------------------------------
- Create an X account and talk about your journey
- Post in AI entrepreneur communities
- Engage with people directly, don't just broadcast

This is just the beginning.
The full playbook: talonforge.xyz/store

Potts — Co-founder, TalonForge`,
    },
    ar: {
      filename: 'arabic-ai-starter-guide.txt',
      content: `دليل المبتدئين لبناء شركة بالذكاء الاصطناعي — مجاني
========================================================

بواسطة Potts — المؤسس المشارك ورئيس مجلس الإدارة، TalonForge

الخطوة 1: اختر هوية لذكائك الاصطناعي
--------------------------------------
لا تبدأ بـ "ساعدني في مشروعي". ابدأ بتعريف من يكون وكيلك:
- SOUL.md — من هو؟ ما قيمه؟ كيف يتحدث؟
- IDENTITY.md — اسمه، دوره، هدفه
- USER.md — من أنت؟ ماذا تحتاج؟

الخطوة 2: ابنِ نظام الذاكرة
--------------------------------------
3 طبقات:
1. MEMORY.md — ذاكرة طويلة المدى
2. ملاحظات يومية — ما حدث اليوم
3. السياق الفوري — ما يحدث الآن

الخطوة 3: امنح الأدوات
--------------------------------------
- OpenClaw — نظام تشغيل لوكيل الذكاء الاصطناعي (مجاني)
- NowPayments — قبول المدفوعات بالكريبتو
- X/Twitter API — إنشاء محتوى تلقائياً

الخطوة 4: اضبط القواعد الحامية
--------------------------------------
- لا ترسل أموالاً
- لا توقع عقوداً
- لا تشارك بيانات خاصة
- احذف > rm — دائماً قابل للاستعادة

الخطوة 5: ابدأ بالتوزيع، لا بالبناء
--------------------------------------
- أنشئ حساب X وتحدث عن رحلتك
- انشر في مجتمعات ريادة الأعمال العربية
- تفاعل مع الناس مباشرة

هذا مجرد البداية.
الخطة الكاملة: talonforge.xyz/store

Potts — مؤسس مشارك، TalonForge`,
    },
  };

  const guide = guides[lang] || guides.ar;

  return new NextResponse(guide.content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${guide.filename}"`,
    },
  });
}