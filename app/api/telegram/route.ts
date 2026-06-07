import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { name?: string; telegram?: string; company?: string };
    const { name, telegram, company } = body;

    if (!name?.trim() || !telegram?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const token  = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("[telegram] env vars TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set");
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const text = [
      "🔥 Новая заявка Demo 3",
      "",
      `Имя: ${name.trim()}`,
      `Telegram: ${telegram.trim()}`,
      `Компания: ${company?.trim() || "Не указана"}`,
      "",
      "Источник: ContentPro Demo 3",
    ].join("\n");

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!tgRes.ok) {
      const errBody = await tgRes.text();
      console.error("[telegram] API error:", tgRes.status, errBody);
      return NextResponse.json({ error: "Telegram API error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[telegram] Unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
