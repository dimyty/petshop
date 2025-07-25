/*
  # Добавяне на администраторски потребител

  1. Промени
    - Добавя администраторски потребител в таблицата admin_users
    - Използва конкретен user_id за първоначален администратор

  Забележка: Заменете 'your-user-id-here' с действителния ID на вашия потребител
*/

-- Добавяне на администраторски потребител
-- ВАЖНО: Заменете 'your-user-id-here' с действителния ID на вашия потребител
-- Можете да намерите вашия user_id в Supabase Dashboard -> Authentication -> Users

-- Пример за добавяне на администратор (заменете с вашия user_id):
-- INSERT INTO admin_users (user_id) VALUES ('09dff4c9-6415-4efe-9481-f41d8a258b31');

-- Или можете да използвате този SQL за да добавите текущо логнатия потребител като администратор:
-- INSERT INTO admin_users (user_id) VALUES (auth.uid());