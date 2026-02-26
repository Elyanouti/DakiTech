// إضافة المزيد من المعرفة للوكيل الذي تم إنشاؤه
const agentId = 'ed44b8da-ef16-4941-bec6-67aeddf43dd3';

const knowledgeItems = [
  'أهلاً وسهلاً! أنا وكيل الدعم الفني، يمكنني مساعدتك في حل المشاكل التقنية.',
  'لحل مشكلة تعليق الكمبيوتر: اضغط Ctrl+Alt+Del، أو أعد تشغيل الجهاز إذا لم يستجب.',
  'لتسريع الكمبيوتر: امسح الملفات المؤقتة، ألغ تثبيت البرامج غير المستخدمة، وقم بفحص الفيروسات.',
  'إذا لم تعمل لوحة المفاتيح: تحقق من الاتصال، جرب منفذ USB آخر، أو أعد تشغيل الكمبيوتر.',
  'لمشكلة الصوت: تحقق من إعدادات الصوت، تأكد من أن الكبلات موصولة بشكل صحيح.'
];

console.log('📚 إضافة معرفة للوكيل...');

const promises = knowledgeItems.map((text, index) => {
  return fetch('http://localhost:3001/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent_id: agentId,
      text: text,
      description: `معلومة رقم ${index + 1}`
    })
  });
});

Promise.all(promises)
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(results => {
    console.log('✅ تم إضافة جميع المعلومات بنجاح!');
    console.log(`🔗 اختبر الوكيل على: http://localhost:3000/chat?agent_id=${agentId}`);
  })
  .catch(error => {
    console.error('❌ خطأ:', error);
  });