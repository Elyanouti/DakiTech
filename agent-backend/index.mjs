import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { randomUUID } from "crypto";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ============ Init Clients ============
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ============ Helper: Cosine Similarity ============
function cosineSimilarity(a, b) {
  // تأكد من أن البيانات arrays
  const arrayA = Array.isArray(a) ? a : JSON.parse(a);
  const arrayB = Array.isArray(b) ? b : JSON.parse(b);
  
  if (!arrayA || !arrayB || arrayA.length !== arrayB.length) {
    return 0;
  }
  
  const dot = arrayA.reduce((sum, ai, i) => sum + ai * arrayB[i], 0);
  const normA = Math.sqrt(arrayA.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(arrayB.reduce((sum, bi) => sum + bi * bi, 0));
  return dot / (normA * normB);
}

// ============ Route: Create Agent ============
app.post("/api/agent/create", async (req, res) => {
  try {
    const { name, type, description, prompt } = req.body;
    if (!name || !type)
      return res.status(400).json({ error: "Missing name or type" });

    const agent_id = randomUUID();

    const defaultPrompt = generateDefaultPrompt(type);

    const { error } = await supabase.from("agents").insert([
      {
        id: agent_id,
        name,
        type,
        description: description || "",
        prompt: prompt || defaultPrompt,
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) throw error;

    res.json({
      success: true,
      agent_id,
      chat_url: `https://my-saas.com/chat?agent_id=${agent_id}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

function generateDefaultPrompt(type) {
  switch (type) {
    case "e-commerce":
      return "أنت Mercia، مساعد ذكاء اصطناعي متخصص في التجارة الإلكترونية. ساعد العملاء في العثور على المنتجات والإجابة بلطف.";
    case "consulting":
      return "أنت AdviZen، وكيل استشاري ذكي يقدم تحليلات واستشارات مهيكلة ومهنية.";
    case "web-support":
      return "أنت Websy، وكيل دعم مواقع يساعد الزوار في التصفح والإجابة على الأسئلة بوضوح.";
    default:
      return "أنت مساعد ذكاء اصطناعي ودود يقدم إجابات مفيدة وسهلة الفهم.";
  }
}

// ============ Route: Upload Text or Image ============
app.post("/api/upload", async (req, res) => {
  try {
    const { agent_id, text, image_url, description } = req.body;
    if (!agent_id)
      return res.status(400).json({ error: "Missing agent_id" });

    // التحضير للنص الذي سيتم تحويله إلى embedding
    const contentToEmbed = text || description || "";
    if (!contentToEmbed)
      return res.status(400).json({ error: "Missing text or description" });

    // إنشاء embedding
    const embeddingResp = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: contentToEmbed,
    });
    const embedding = embeddingResp.data[0].embedding;

    // تخزين في Supabase
    const { error } = await supabase.from("agent_vectors").insert([
      {
        agent_id,
        type: image_url ? "image" : "text",
        content: contentToEmbed,
        image_url: image_url || null,
        embedding,
      },
    ]);
    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ Route: Chat ============
app.post("/api/chat", async (req, res) => {
  try {
    const { agent_id, session_id, message } = req.body;
    if (!agent_id || !message)
      return res.status(400).json({ error: "Missing agent_id or message" });

    // 🧩 1. جلب البرومبت الخاص بالوكيل
    const { data: agentData, error: agentError } = await supabase
      .from("agents")
      .select("prompt")
      .eq("id", agent_id)
      .single();
    if (agentError) throw agentError;
    const systemPrompt =
      agentData?.prompt || "أنت مساعد ذكاء اصطناعي مفيد وواضح.";

    // 🧠 2. جلب السياق (النصوص والصور) الخاصة بهذا الوكيل
    const { data: vectors, error: vectorError } = await supabase
      .from("agent_vectors")
      .select("content, embedding, type, image_url")
      .eq("agent_id", agent_id);
    if (vectorError) throw vectorError;

    if (!vectors || vectors.length === 0)
      return res.status(404).json({ error: "No context found for this agent" });

    // 📈 3. إنشاء embedding للرسالة
    const userEmbeddingResp = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });
    const userEmbedding = userEmbeddingResp.data[0].embedding;

    // 🔍 4. حساب التشابه
    const ranked = vectors
      .map((v) => ({
        content: v.content,
        type: v.type,
        image_url: v.image_url,
        sim: cosineSimilarity(userEmbedding, v.embedding),
      }))
      .sort((a, b) => b.sim - a.sim)
      .slice(0, 5);

    // 🧩 5. تجهيز السياق للنموذج
    let contextText = "";
    for (const r of ranked) {
      if (r.type === "image" && r.image_url) {
        contextText += `[IMAGE_URL: ${r.image_url}]\nوصف الصورة: ${r.content}\n\n`;
      } else {
        contextText += `${r.content}\n---\n`;
      }
    }

    // 💬 6. توليد الرد من GPT
    const chatResp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${systemPrompt}\nاستعمل الصور فقط إن كانت مرتبطة بالسؤال.\n\nالسياق:\n${contextText}`,
        },
        { role: "user", content: message },
      ],
      max_tokens: 512,
    });

    const reply = chatResp.choices[0].message.content;

    // 🗂️ 7. تخزين المحادثة (اختياري)
    if (session_id) {
      await supabase.from("agent_sessions").insert([
        {
          agent_id,
          session_id,
          user_message: message,
          bot_reply: reply,
          created_at: new Date().toISOString(),
        },
      ]);
    }

    res.json({ reply, agent_id, session_id: session_id || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ Start Server ============
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Agent backend running on port ${PORT}`);
});

// التعامل مع الأخطاء
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});
