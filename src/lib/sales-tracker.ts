// Self-contained revenue tracker — logs confirmed sales from payment callbacks
// instead of relying on NowPayments JWT-authenticated list API.

import { promises as fs } from "fs";
import path from "path";

const SALES_LOG = path.join(process.cwd(), "data", "sales.json");

export type Sale = {
  order_id: string;
  payment_id: string;
  product_id: string;
  product_name: string;
  amount_usd: number;
  pay_currency: string;
  status: string;
  timestamp: string;
};

async function readSales(): Promise<Sale[]> {
  try {
    const raw = await fs.readFile(SALES_LOG, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeSales(sales: Sale[]) {
  const dir = path.dirname(SALES_LOG);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(SALES_LOG, JSON.stringify(sales, null, 2));
}

export async function recordSale(sale: Sale): Promise<void> {
  const sales = await readSales();
  // Deduplicate by payment_id
  if (sales.some((s) => s.payment_id === sale.payment_id)) return;
  sales.push(sale);
  await writeSales(sales);
}

export async function getRevenue(): Promise<{
  total_usd: number;
  count: number;
  sales: Sale[];
}> {
  const sales = await readSales();
  const total = sales.reduce((sum, s) => sum + s.amount_usd, 0);
  return { total_usd: Math.round(total * 100) / 100, count: sales.length, sales };
}