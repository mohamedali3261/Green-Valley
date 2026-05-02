# 🚀 دليل رفع المشروع على Vercel

## 📋 المتطلبات

1. حساب على [Vercel](https://vercel.com) (مجاني)
2. Git مثبت على جهازك
3. حساب GitHub (اختياري لكن موصى به)

---

## 🎯 طريقة الرفع (3 طرق)

### الطريقة الأولى: عبر Vercel CLI (الأسرع) ⚡

#### 1. تثبيت Vercel CLI
```bash
npm install -g vercel
```

#### 2. تسجيل الدخول
```bash
vercel login
```

#### 3. رفع المشروع
```bash
# في مجلد المشروع
vercel

# للنشر على Production
vercel --prod
```

#### 4. اتبع التعليمات
- اختر اسم المشروع
- اختر الإعدادات الافتراضية
- انتظر حتى يكتمل الرفع

✅ **تم! موقعك الآن على الإنترنت**

---

### الطريقة الثانية: عبر GitHub + Vercel (موصى بها) 🌟

#### 1. إنشاء Repository على GitHub

```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit - Green Valley Website"
```

#### 2. رفع على GitHub
```bash
# أنشئ repository جديد على GitHub أولاً
git remote add origin https://github.com/YOUR_USERNAME/green-valley.git
git branch -M main
git push -u origin main
```

#### 3. ربط Vercel بـ GitHub
1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "New Project"
3. اختر "Import Git Repository"
4. اختر repository الخاص بك
5. اضغط "Deploy"

✅ **ميزة:** أي تحديث على GitHub سيتم نشره تلقائياً!

---

### الطريقة الثالثة: عبر Vercel Dashboard (الأسهل) 🖱️

#### 1. اذهب إلى Vercel Dashboard
- افتح [vercel.com/new](https://vercel.com/new)

#### 2. اسحب وأفلت المجلد
- اسحب مجلد المشروع بالكامل
- أو اضغط "Browse" واختر المجلد

#### 3. انتظر الرفع
- Vercel سيرفع الملفات تلقائياً
- سيعطيك رابط الموقع

✅ **تم! موقعك جاهز**

---

## ⚙️ الإعدادات المهمة

### 1. تحديث الروابط

بعد الرفع، حدّث الروابط في:

#### `sitemap.xml`
```xml
<!-- غيّر من -->
<loc>https://yourwebsite.com/html/home.html</loc>

<!-- إلى -->
<loc>https://your-project.vercel.app/html/home.html</loc>
```

#### `manifest.json`
```json
{
  "start_url": "/html/home.html"
}
```

#### `robots.txt`
```
Sitemap: https://your-project.vercel.app/sitemap.xml
```

### 2. إعدادات Domain مخصص (اختياري)

إذا كان لديك دومين خاص:

1. اذهب إلى Project Settings
2. اضغط "Domains"
3. أضف الدومين الخاص بك
4. اتبع التعليمات لتحديث DNS

---

## 🔧 الأوامر المفيدة

```bash
# معاينة محلية
vercel dev

# رفع على Preview
vercel

# رفع على Production
vercel --prod

# عرض معلومات المشروع
vercel inspect

# عرض اللوجات
vercel logs

# إزالة المشروع
vercel remove
```

---

## 📊 بعد الرفع

### 1. اختبر الموقع
- افتح الرابط الذي أعطاك Vercel
- تأكد من عمل جميع الصفحات
- اختبر على الموبايل

### 2. تحقق من الأداء
```
https://pagespeed.web.dev/
```
أدخل رابط موقعك واختبر الأداء

### 3. أضف إلى Google Search Console
1. اذهب إلى [search.google.com/search-console](https://search.google.com/search-console)
2. أضف موقعك
3. أرسل sitemap.xml

---

## 🐛 حل المشاكل الشائعة

### المشكلة: الصفحة لا تظهر
**الحل:**
```bash
# تأكد من وجود index.html في الجذر
# أو تحقق من vercel.json
```

### المشكلة: الصور لا تظهر
**الحل:**
- تأكد من المسارات النسبية صحيحة
- تأكد من رفع مجلد images

### المشكلة: CSS لا يعمل
**الحل:**
- تحقق من المسارات في HTML
- تأكد من رفع مجلد css

### المشكلة: 404 Error
**الحل:**
- تحقق من vercel.json
- تأكد من routes صحيحة

---

## 📱 الخطوات السريعة (TL;DR)

```bash
# 1. ثبت Vercel CLI
npm install -g vercel

# 2. سجل دخول
vercel login

# 3. ارفع المشروع
vercel --prod

# 4. انتهى! 🎉
```

---

## 🔗 روابط مفيدة

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

## 💡 نصائح إضافية

### 1. استخدم Environment Variables
للمعلومات الحساسة (API Keys):
```bash
vercel env add API_KEY
```

### 2. فعّل Analytics
- اذهب إلى Project Settings
- فعّل Vercel Analytics
- راقب أداء موقعك

### 3. استخدم Preview Deployments
- كل push على GitHub يعمل preview
- اختبر التغييرات قبل Production

### 4. فعّل HTTPS
- Vercel يوفر HTTPS مجاناً
- تلقائي لجميع المشاريع

---

## ✅ Checklist قبل الرفع

- [ ] تحديث الروابط في sitemap.xml
- [ ] تحديث الروابط في manifest.json
- [ ] تحديث robots.txt
- [ ] اختبار جميع الصفحات محلياً
- [ ] ضغط الصور
- [ ] مراجعة vercel.json
- [ ] إزالة ملفات التوثيق من .vercelignore

---

## 🎉 مبروك!

موقعك الآن على الإنترنت! 🌐

**الرابط:** `https://your-project.vercel.app`

شارك الرابط مع العالم! 🚀

---

**آخر تحديث:** 2026
**الإصدار:** 1.0.0
