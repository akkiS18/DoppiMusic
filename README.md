Doppi Music 🎵
Doppi Music — bu musiqa tinglash platformasi. Ilova React Native Expo yordamida qurilgan va foydalanuvchilarga audio fayllarni tinglash imkonini beradi.

Bu ilovada ishlatilgan asosiy kutubxonalar:

1. expo-av - audio ni boshqarish uchun ushbu kutubxonadan foydalandim.
2. axios - API lar bilan ishlash uchun axios dan foydalandim. Sababi axios bilan ishlash ish jarayonini yengillashtiradi. API dan olingan ma'lumotlarni qayta JSON.parse() qilish shart emas. Shuningdek post qilinayotgan ma'lumotlarni ham. 
3. expo-document-picker va expo-file-system - foydalanuvchi qurilmasidagi audiolardan foydalana olishi uchun ushbu kutubxonalardan foydalandim.
4. jotai - State Management sifatida jotai dan foydalandim. Sababi oldin ishlagan loyihamda ham ushbu kutubxonadan foydalanganmiz va shuningdek foydalanish uchun judayam qulay. 

## ✨ Xususiyatlari

- Mahalliy (local) musiqalarni yuklash va tinglash
- Oddiy va intuitiv interfeys
- Pleylist yaratish va saqlash
- Media pleer boshqaruvi: play, pause, skip, seek
- Dark/light rejimlar
- Foydalanuvchi uchun shaxsiy tajriba

---

## 🛠 Foydalanilgan texnologiyalar

| Texnologiya       | Maqsadi                                      |
|-------------------|-----------------------------------------------|
| React Native      | Mobil ilova interfeysini qurish               |
| Expo              | Qurilma testlari va ishga tushirish muhitini soddalashtirish |
| React Navigation  | Ilova sahifalari orasida navigatsiya          |
| Jotai             | Yengil va samarali state management           |
| Expo AV           | Audio fayllarni tinglash va boshqarish        |
| AsyncStorage      | Mahalliy ma'lumotlarni saqlash (pleylistlar)  |
| TypeScript (ixtiyoriy) | Statik tiplash bilan kod ishonchliligini oshirish |

---

## 📦 Ishga tushirish (Local)

```bash
git clone https://github.com/username/doppi-music.git
cd doppi-music
npm install
npx expo start
