// مثال بسيط لاستخدام langchain مع OpenAI
import { OpenAI } from "openai";
import { LLMChain, PromptTemplate } from "langchain/chains";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const prompt = new PromptTemplate({
  template: "اكتب ملخصاً للنص التالي: {text}",
  inputVariables: ["text"],
});

const chain = new LLMChain({
  llm: openai,
  prompt,
});

async function runExample() {
  const result = await chain.call({ text: "الذكاء الاصطناعي هو مجال من مجالات علوم الحاسوب..." });
  console.log(result);
}

runExample();
