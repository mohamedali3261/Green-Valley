# 🚀 دليل الرفع السريع - Green Valley

## ⚡ الطريقة الأسرع (3 دقائق)

### للويندوز:
```bash
# افتح PowerShell أو CMD في مجلد المشروع واكتب:
.\deploy.bat
```

### للماك/لينكس:
```bash
# افتح Terminal في مجلد المشروع واكتب:
chmod +x deploy.sh
./deploy.sh
```

---

## 📝 الخطوات اليدوية

### 1️⃣ رفع على GitHub

```bash
# 1. إنشاء Git Repository
git init
git add .
git commit -m "Initial commit - Green Valley Website"

# 2. أنشئ repository جديد على GitHub
# اذهب إلى: https://github.com/new
# اسم Repository: green-valley

# 3. ارفع الكود
git remote add origin https://github.com/YOUR_USERNAME/green-valley.git
git branch -M main
git push -u origin main
```

### 2️⃣ رفع على Vercel

**الطريقة الأولى: عبر CLI**
```bash
# ثبت Vercel CLI
npm install -g vercel

# سجل دخول
vercel login

# ارفع المشروع
vercel --prod
```

**الطريقة الثانية: عبر Dashboard**
1. اذهب إلى [vercel.com/new](https://vercel.com/new)
2. اختر "Import Git Repository"
3. اختر repository الخاص بك من GitHub
4. اضغط "Deploy"

---

## ✅ بعد الرفع

### حدّث الروابط:

**1. في `sitemap.xml`:**
```xml
<!-- غيّر yourwebsite.com إلى رابط Vercel الخاص بك -->
<loc>https://your-project.vercel.app/html/home.html</loc>
```

**2. في `robots.txt`:**
```
Sitemap: https://your-project.vercel.app/sitemap.xml
```

**3. في `manifest.json`:**
تأكد من صحة `start_url`

---

## 🔧 أوامر مفيدة

```bash
# معاينة محلية
vercel dev

# رفع تحديث جديد
git add .
git commit -m "Update: description"
git push

# إعادة النشر على Vercel
vercel --prod

# عرض لوجات Vercel
vercel logs
```

---

## 🐛 حل المشاكل

### المشكلة: Git push failed
**الحل:**
```bash
# تأكد من تسجيل الدخول
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# أو استخدم GitHub Desktop
```

### المشكلة: Vercel deployment failed
**الحل:**
```bash
# تأكد من تسجيل الدخول
vercel login

# حاول مرة أخرى
vercel --prod
```

### المشكلة: الصفحة لا تظهر
**الحل:**
- تحقق من vercel.json
- تأكد من وجود index.html
- راجع Vercel logs

---

## 📞 تحتاج مساعدة؟

1. راجع `VERCEL_DEPLOYMENT_GUIDE.md` للتفاصيل الكاملة
2. راجع [Vercel Docs](https://vercel.com/docs)
3. راجع [GitHub Docs](https://docs.github.com)

---

## 🎉 مبروك!

موقعك الآن على الإنترنت! 🌐

**شارك الرابط مع الجميع!** 🚀
