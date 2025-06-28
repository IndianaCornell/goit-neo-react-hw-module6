# Завдання. Книга контактів з Redux Toolkit

## 🗃️ Мета

Виконай **рефакторинг** застосунку «Книга контактів» із домашнього завдання третього модуля. Замість локального стану React реалізуй **глобальний стан через Redux Toolkit**. Збереження контактів має відбуватись у **локальному сховищі через Redux Persist**.

---

## 📁 Структура Redux

У папці `src/redux` створюємо такі файли:

- `store.js` — створення Redux store
- `contactsSlice.js` — слайс контактів
- `filtersSlice.js` — слайс фільтрації

---

## 🧱 Початковий стан Redux

```js
{
  contacts: {
    items: []
  },
  filters: {
    name: ""
  }
}
```

---

## 📦 Слайс контактів (`contactsSlice.js`)

1. Створи слайс через `createSlice()`
2. Екшени:
   - `addContact` — додає контакт до `items`
   - `deleteContact` — видаляє контакт з `items` за `id`
3. Експортуй:
   - Редюсер
   - Екшени

---

## 🧹 Слайс фільтра (`filtersSlice.js`)

1. Створи слайс через `createSlice()`
2. Екшен:
   - `changeFilter` — змінює значення фільтра `name`
3. Експортуй:
   - Редюсер
   - Екшени

---

## 🧠 Підключення Redux

1. Підключи Redux до React через `<Provider store={store}>`
2. Для доступу до даних:
   - `useSelector` + селектори
3. Для оновлення стану:
   - `useDispatch` + відповідні екшени

---

## ⚙ Компоненти

| Компонент | Дії | Взаємодія |
|-----------|-----|-----------|
| `ContactForm` | додає контакт | викликає `dispatch(addContact(...))` |
| `SearchBox` | змінює фільтр | викликає `dispatch(changeFilter(...))` |
| `Contact` | видаляє контакт | викликає `dispatch(deleteContact(id))` |

Інші компоненти (наприклад, `App`, `ContactList`) використовують `useSelector` для отримання потрібних даних зі стору.

> ❗ Усі компоненти, крім `Contact`, не приймають пропсів. Дані беруть із Redux через `useSelector`.

---

## 💾 Збереження через Redux Persist

### Налаштування у `store.js`:

1. Встанови конфіг для `persistReducer` — збереження лише `contacts.items`:

```js
const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};
```

2. Обгорни редюсер контактів:

```js
const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);
```

3. Створи store:

```js
const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
```

4. Створи `persistor`:

```js
const persistor = persistStore(store);
```

5. У `main.jsx` обгорни `<App />` у `PersistGate`:

```jsx
<PersistGate loading={null} persistor={persistor}>
  <App />
</PersistGate>
```

---

## ✅ Результат

- Управління станом здійснюється **через Redux Toolkit**
- **Контакти зберігаються** у локальному сховищі
- **Пропси не передаються** між компонентами, використовується `useSelector` і `useDispatch`
- Структура Redux відповідає найкращим практикам
