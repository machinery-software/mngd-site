export interface Env {
  NOTION_TOKEN: string;
  NOTION_DATABASE: string;
  ALLOWED_ORIGIN: string;
}

interface SubmitBody {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  fleet_size?: unknown;
  current_mdm?: unknown;
  use_case?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

function rt(text: string) {
  return { rich_text: [{ text: { content: text.slice(0, 2000) } }] };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN || "*";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/submit") {
      return json({ error: "Not found" }, 404, origin);
    }

    let body: SubmitBody;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400, origin);
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim().slice(0, 200) : "";
    const fleet_size = typeof body.fleet_size === "string" ? body.fleet_size.trim() : "";
    const current_mdm = typeof body.current_mdm === "string" ? body.current_mdm.trim() : "";
    const use_case = typeof body.use_case === "string" ? body.use_case.trim() : "";

    if (!name || !email || !fleet_size) {
      return json({ error: "name, email, and fleet_size are required" }, 400, origin);
    }
    if (!EMAIL_RE.test(email)) {
      return json({ error: "Invalid email" }, 400, origin);
    }

    const properties: Record<string, unknown> = {
      Name: { title: [{ text: { content: name.slice(0, 200) } }] },
      Email: rt(email),
      "Fleet Size": { select: { name: fleet_size } },
      Status: { select: { name: "New" } },
      "Submitted At": rt(new Date().toISOString()),
    };
    if (company) properties["Company"] = rt(company);
    if (current_mdm) properties["Current MDM"] = { select: { name: current_mdm } };
    if (use_case) properties["Use Case"] = rt(use_case);

    const notionRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: env.NOTION_DATABASE },
        properties,
      }),
    });

    if (!notionRes.ok) {
      const detail = await notionRes.text();
      console.error("Notion error", notionRes.status, detail);
      return json({ error: "Failed to record submission" }, 502, origin);
    }

    return json({ ok: true }, 200, origin);
  },
};
