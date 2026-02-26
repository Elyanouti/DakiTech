// اختبار إنشاء وكيل وإضافة بيانات له
// قم بتشغيل هذا الملف باستخدام: node test-agent.mjs

import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3001/api';

async function createTestAgent() {
  try {
    console.log('🤖 إنشاء وكيل اختبار...');
    
    // 1. إنشاء وكيل
    const agentResponse = await fetch(`${API_BASE}/agent/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'وكيل الدعم الفني',
        type: 'web-support',
        description: 'وكيل متخصص في الدعم الفني ومساعدة المستخدمين',
        prompt: 'أنت وكيل دعم فني ذكي، تساعد المستخدمين في حل مشاكلهم التقنية بطريقة ودودة ومهنية.'
      })
    });
    
    const agentData = await agentResponse.json();
    console.log('✅ تم إنشاء الوكيل:', agentData);
    
    const agentId = agentData.agent_id;
    
    // 2. إضافة بعض المعرفة للوكيل
    const knowledgeItems = [
      {
        text: 'لإعادة تشغيل الكمبيوتر: اضغط على زر الطاقة لمدة 10 ثوان ثم اتركه، انتظر دقيقة واضغط عليه مرة أخرى لتشغيل الجهاز.',
        description: 'طريقة إعادة تشغيل الكمبيوتر'
      },
      {
        text: 'لحل مشكلة بطء الإنترنت: تحقق من سرعة الاتصال، أعد تشغيل المودم والراوتر، تأكد من عدم وجود برامج تستهلك البيانات في الخلفية.',
        description: 'حل مشكلة بطء الإنترنت'
      },
      {
        text: 'لاستعادة الملفات المحذوفة: تحقق من سلة المحذوفات أولاً، استخدم أدوات استعادة البيانات مثل Recuva، تجنب كتابة ملفات جديدة على نفس القرص.',
        description: 'استعادة الملفات المحذوفة'
      },
      {
        text: 'لحماية الكمبيوتر من الفيروسات: قم بتثبيت برنامج مكافح فيروسات موثوق، فعل تحديثات النظام التلقائية، لا تفتح مرفقات من مصادر غير معروفة.',
        description: 'حماية الكمبيوتر من الفيروسات'
      }
    ];
    
    console.log('📚 إضافة المعرفة للوكيل...');
    
    for (const item of knowledgeItems) {
      const uploadResponse = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: agentId,
          text: item.text,
          description: item.description
        })
      });
      
      const uploadResult = await uploadResponse.json();
      console.log(`✅ تم إضافة: ${item.description}`);
    }
    
    console.log('\n🎉 تم إعداد الوكيل بنجاح!');
    console.log(`🔗 رابط الشات: http://localhost:3000/chat?agent_id=${agentId}`);
    console.log(`📋 معرف الوكيل: ${agentId}`);
    
  } catch (error) {
    console.error('❌ خطأ:', error);
  }
}

// تشغيل الاختبار إذا تم استدعاء الملف مباشرة
if (import.meta.url === `file://${process.argv[1]}`) {
  createTestAgent();
}