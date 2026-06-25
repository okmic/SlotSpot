# SlotSpot
Сервис бронирования временных слотов.

## Запуск

```bash
docker compose up -d
```

## Стек
**Backend:** Node.js, TypeScript, Fastify, Drizzle ORM, PostgreSQL 15
**Frontend:** React, Vite, TypeScript, Tailwind CSS

## API

| Метод | URL | Описание |
|-------|-----|----------|
| `GET` | `/api/slots?date=YYYY-MM-DD` | Слоты за день |
| `POST` | `/api/slots` | Создать слот |
| `DELETE` | `/api/slots/:id` | Удалить слот |

## Порты

| Сервис | Порт |
|--------|------|
| Фронтенд | `5173` |
| Бэкенд | `9999` |
| База | `5432` |