// اختبار سريع للـ API
const testData = {
  agent_id: "ed44b8da-ef16-4941-bec6-67aeddf43dd3",
  message: "مرحبا، كيف حالك؟",
  session_id: "test_session_123"
};

console.log('🧪 اختبار API...');

fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('📡 حالة الاستجابة:', response.status);
  return response.json();
})
.then(data => {
  console.log('✅ الرد من الوكيل:', data);
})
.catch(error => {
  console.error('❌ خطأ:', error);
});