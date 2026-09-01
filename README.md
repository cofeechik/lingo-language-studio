# LINGO — Language Studio

Концепт-лендинг вымышленной языковой студии. Портфолио-проект.
Визуальное направление — **Confident Editorial EdTech**.

> LINGO — вымышленный бренд. На странице нет реальных данных о школе:
> никакой статистики, рейтингов, наград, географии или отзывов.
> Все подписи носят описательный, а не фактологический характер.

## Стек

- Vite + React 19 + TypeScript
- Чистый CSS с дизайн-токенами (без UI-фреймворков)
- Шрифты: Fraunces (serif) + Inter (sans) через Google Fonts
- Фотографии: Unsplash CDN

## Запуск

```bash
npm install
npm run dev
```

## Структура

```
src/
  styles/
    tokens.css        дизайн-система: цвета, шрифты, spacing, motion, брейкпоинты
    base.css          reset, типографические примитивы, .shell, .reveal, grain
  components/
    ui/Button.tsx     Button (primary / outline / ghost) + LinkAction
    Header/           фиксированный хедер + мобильный drawer
    Hero/             главный экран + marquee языков
    Languages/        секция «Языки» (асимметричная сетка карточек)
  hooks/useReveal.ts  появление секций при скролле (IntersectionObserver)
  data/languages.ts   демо-контент
```

## Дизайн-система

| Токен | Значение | Роль |
| --- | --- | --- |
| `--c-cream` | `#F7F3EC` | основной фон |
| `--c-ink` | `#1B1812` | текст |
| `--c-terracotta` | `#C1552C` | главный акцент, CTA |
| `--c-sage` | `#5C6B4F` | вторичный акцент |
| `--c-forest` | `#1E2A1F` | тёмные поверхности |
| `--c-ochre` | `#E3A73C` | точечный акцент, подчёркивания |

Типографика: `--fs-display` … `--fs-label`, все размеры — fluid `clamp()`.
Spacing: 4px-шкала `--sp-1` … `--sp-12` + `--section-y` для ритма секций.

Брейкпоинты: `480 / 620 / 768 / 1024 / 1280`.

## Анимации

Только сдержанные: появление секций (fade-up), hover-lift карточек,
лёгкий parallax hero-фото, отрисовка подчёркивания в заголовке,
бесконечный marquee языков. Всё отключается при `prefers-reduced-motion`.

## Статус

Этап 1 — готовы Header, Hero, Languages.
Следующие секции (обучение, преподаватели, тарифы, CTA) — впереди.
