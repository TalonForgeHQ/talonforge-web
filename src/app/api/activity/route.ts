import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const memoryDir = '/root/.openclaw/workspace/memory';
    const today = new Date().toISOString().split('T')[0];

    const todayFile = path.join(memoryDir, `${today}.md`);
    const todayNotes = fs.existsSync(todayFile)
      ? fs.readFileSync(todayFile, 'utf-8').split('\n').slice(-80).join('\n')
      : 'No activity yet today';

    const workQueue = fs.existsSync(path.join(memoryDir, 'work-queue.md'))
      ? fs.readFileSync(path.join(memoryDir, 'work-queue.md'), 'utf-8')
      : 'No active tasks';

    const xLog = fs.existsSync(path.join(memoryDir, 'x-automation-logs.md'))
      ? fs.readFileSync(path.join(memoryDir, 'x-automation-logs.md'), 'utf-8').split('\n').slice(-30).join('\n')
      : '';

    const xCronLog = fs.existsSync(path.join(memoryDir, 'x-cron.log'))
      ? fs.readFileSync(path.join(memoryDir, 'x-cron.log'), 'utf-8').split('\n').slice(-15).join('\n')
      : '';

    const xLeads = fs.existsSync(path.join(memoryDir, 'x-leads-auto.md'))
      ? fs.readFileSync(path.join(memoryDir, 'x-leads-auto.md'), 'utf-8').split('\n').slice(-20).join('\n')
      : '';

    const runtime = {
      time: new Date().toISOString(),
      model: 'ollama-cloud/glm-5.1',
      provider: 'Ollama Cloud (Z.AI quota exhausted, resets Apr 15)',
      store: 'https://www.talonforge.xyz/store',
    };

    return NextResponse.json({
      runtime,
      today: todayNotes,
      workQueue: workQueue.slice(0, 3000),
      xActivity: xLog.slice(0, 1500),
      xCron: xCronLog.slice(0, 800),
      xLeads: xLeads.slice(0, 1000),
      timestamp: Date.now()
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}