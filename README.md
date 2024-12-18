
# Работа с Memaid в Github
## GitGraph
```mermaid
gitGraph
    commit id: "Создание репозитория системы краудсорсинга"
    branch develop
    checkout develop
    commit id: "Разработка интерфейса краудсорсинга"
    commit id: "Добавление функции регистрации пользователей"
    branch feature/task-creation
    checkout feature/task-creation
    commit id: "Реализация интерфейса решения задач"
    commit id: "Оптимизация сохранения решения задачи"
    checkout develop
    merge feature/task-creation tag: "Задачи завершены"
    commit id: "Интеграция задач с шаблонами"
    branch feature/proposal
    checkout feature/proposal
    commit id: "Добавление модуля шаблонизации задач"
    commit id: "Настройка интеграции с модулем шаблонизации"
    checkout develop
    merge feature/proposal tag: "Шаблонизаторы завершены"
    branch feature/statistics
    checkout feature/statistics
    commit id: "Реализация системы сбора статистики"
    commit id: "Добавление статистики в личный кабинет заказчика"
    checkout develop
    merge feature/statistics tag: "Статистика завершена"
    checkout main
    merge develop tag: "Релиз версии 1.0"
    commit id: "Релиз v1.0: функционал задач, шаблонов задач и статистики по задачам"
```
### Пояснения 
Первым на рассмотрении будет GitGraph. С его помощью можно отобразить базовый процесс работы с разными ветками при разработке системы. Такой граф является более наглядным в сравнение с ручным разбором истории коммитов.
Пример графа для системы краудсорсинга представлен выше
## Квадрант-граф
``` mermaid
quadrantChart
    title Приоритеты функционала системы
    x-axis "Низкий приоритет" --> "Высокий приоритет"
    y-axis "Низкая сложность" --> "Высокая сложность"
    quadrant-1 "Срочно реализовать"
    quadrant-2 "Запланировать в ближайшее время"
    quadrant-3 "Возможно, стоит отказаться"
    quadrant-4 "Требует тщательного анализа"
    "Управление задачами": [0.7, 0.8]
    "Шаблонизатооры задач": [0.89, 0.23]
    "Интеграция с шаблонизатором": [0.57, 0.69]
    "Симстема подстчета статистики": [0.7, 0.34]
    "Статистика системы": [0.2, 0.11]
    "Генерация отчетов": [0.2, 0.55]
    "Чат поддержки": [0.3, 0.85]
    "Обратная связь": [0.1, 0.75]
    "Добавление задачи в избранное": [0.33, 0.33]
  
```
### Пояснения 
Следующим на рассмотрении идет Квадрант-граф. Он позволяет классифицировать задачи по разным критериям, например, высокая/низкая сложность и высокий/низкий приоритет. Данный подход удобен, когда в момент разработки возникает несколько задач и команда не сразу понимает за что браться. Данный граф помогает оценить каждую задачу и сфокусировать внимание на самых важных. Пример такого графа представлен выше.
## User Journey Diagram
``` mermaid
journey
    title Путешествие заказчика
    section Создание заказа на разметку
      Выбор шаблона задачи: 5: Клиент
      Загрузка неразмеченных данных: 3: Система
      Определение выборки исполнителей: 4: Клиент
    section Оплата
      Выбор способа оплаты: 4: Клиент
      Проведение платежа: 3: Платежный шлюз
      Подтверждение оплаты: 5: Система
    section Уведомления
      Уведомление о размещении заказа на разметку данных: 5: Клиент
      Уведомление для администратора: 4: Администратор
  
```
### Пояснения
Третьим по очереди, но не по значению можно выделить User Journey Diagram. Данная диаграмма позволяет оценить пользовательский опыт при взаимодействии с каждым элементом нашей системы и выявить слабые места. 
## Mind Map
``` mermaid
mindmap
  root((Система краудсорсинга))
    Клиенты
      Создать заказ на разметку
      Оплатить онлайн
      Получить уведомления
    Администраторы
      Управление заказами
      Управление задачами
      Просмотр отчетов
    Система
      Размещение задач для исполнителей
      Генерация счетов
      Интеграция с платежными шлюзами
      Отправка уведомлений
```
### Пояснения
И наконец последняя диаграмма – Mind Map. Данные диаграммы можно использовать для визуализации ключевых аспектов клиент-серверной системы, которые можно сгруппировать по ролям. 
