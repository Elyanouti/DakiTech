// اختبار بسيط للـ API
console.log('🧪 اختبار اتصال API...');

// اختبار إنشاء وكيل
const testData = {
  name: 'وكيل تجريبي',
  type: 'web-support',
  description: 'وكيل للاختبار',
  prompt: 'أنت مساعد ذكي وودود.'
};

fetch('http://localhost:3001/api/agent/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
})
.then(response => response.json())
.then(data => {
  console.log('✅ نتيجة إنشاء الوكيل:', data);
  
  // اختبار إضافة نص
  const agentId = data.agent_id;
  return fetch('http://localhost:3001/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent_id: agentId,
      text: 'هذا نص تجريبي للاختبار. يمكنني مساعدتك في الدعم الفني.',
      description: 'معلومات أساسية'
    })
  });
})
.then(response => response.json())
.then(data => {
  console.log('✅ نتيجة إضافة النص:', data);
})
.catch(error => {
  console.error('❌ خطأ:', error);
});