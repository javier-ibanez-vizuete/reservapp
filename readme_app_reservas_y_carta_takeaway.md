# README — App reservas / carta (Takeaway)

**Stack:** Vite + React (React Router) + Tailwind CSS + JavaScript (ES6)
**Enfoque:** Mobile-first — aplicación para reservar mesas y pedir para takeaway con cupones y gestión básica de usuario.

---

## Índice

1. Resumen del producto
2. Rutas principales
3. Reglas de autenticación y acceso
4. Funcionalidades por página
   - Home
   - Carta
   - Pedir
   - Carrito
   - Reservar
   - Perfil
   - Login / Register / Logout
5. Cupones — reglas concretas
6. Estados clave y persistencia
7. Esquemas de datos (ejemplos JSON)
8. Componentes UI principales
9. Flujos clave (paso a paso)
10. Casos borde y consideraciones UX
11. LocalStorage — claves sugeridas
12. Checklist diseño (prioridad)
13. Checklist desarrollo (prioridad)
14. Testing / Acceptance Criteria
15. Sugerencias de microinteracciones y accesibilidad
16. Recursos y assets necesarios
17. Notas para deploy

---

## 1. Resumen del producto

Aplicación móvil para un restaurante que permite:

- Ver información del local (Home).
- Reservar mesas (Reservar).
- Consultar la carta informativa (Carta).
- Hacer pedidos para takeaway (Pedir) con carrito y checkout simulado.
- Usar cupones (solo para **Pedir**).
- Autenticación (Login/Register) y perfil con historial y pedido en proceso.

**Principios:** mobile-first, persistencia mínima en `localStorage`, manejo de estado con Context/Reducers.

---

## 2. Rutas principales

- `/` — Home
- `/login` — Login (si no hay user)
- `/register` — Register (si no hay user)
- `/carta` — Carta (informativa: no precios)
- `/pedir` — Pedir (funcional: precios, añadir)
- `/carrito` — Carrito / Checkout
- `/reservar` — Reservar
- `/perfil` — Perfil (protegida)
- `/pedido/:id` — Detalle pedido (opcional)
- `/logout` — Acción de cierre de sesión (o botón en UI)

---

## 3. Reglas de autenticación y acceso

- Si **no autenticado**:
  - Perfil y Pedidos no accesibles → redirigir a `/login` o `/register`.
  - En **Pedir**, al pulsar **Agregar** en un producto → redirigir a `/login` o `/register`.
  - Intento de canjear cupón en Home → redirigir a `/login`/`/register`; tras login aplicar cupón y redirigir a `/pedir`.
- Si **autenticado**:
  - Acceso total a Pedir, Perfil, historial.
  - Al hacer **Logout**, el carrito se **limpia** (borrar estado y `localStorage`).

---

## 4. Funcionalidades por página

### Home

- Header (hamburguesa) con menú: Home, Carta, Reservar, Pedir, Perfil, Cerrar sesión.
- Nombre + resumen breve del restaurante.
- Minimapa (iframe Google Maps) con ubicación.
- **Cupones**: mostrar **2 cupones aleatorios** cada día. Cada cupón muestra: título, descripción corta, qué items añade y el descuento.
- Al pulsar cupón:
  - Si **autenticado**: añade items al carrito con descuento aplicado → redirige a `/pedir`.
  - Si **no autenticado**: redirige a `/login`/`/register`. Tras autenticar, aplicar cupón y redirigir a `/pedir`.
- CTA rápido: Reservar / Ver Carta / Pedir.

### Carta

- Listado por categorías (Bebidas, Entrantes, Principales, Postres).
- Cada producto muestra: imagen, título, descripción. **NO** mostrar precio ni controles de cantidad.
- CTA: “Ir a Pedir” si el usuario quiere comprar.

### Pedir

- Barra secundaria con categorías.
- Tarjeta de producto (por item): imagen, título, **precio**, contador/cantidad mostrada, botones **Agregar** / **Quitar**.
- **Comportamiento si no autenticado**: al pulsar **Agregar** → redirección a `/login` o `/register`.
- Carrito flotante (burbuja inferior-izquierda) visible si hay items > 0.
- Si un cupón fue aplicado desde Home, mostrar items añadidos y descuento aplicado en el carrito.

### Carrito

- Lista de items: nombre, cantidad, precio unitario, subtotal item.
- Subtotal general, descuentos (si hay cupón), total.
- Controles por item: agregar, quitar, eliminar.
- Botones globales: Borrar carrito / Comprar.
- Comprar → modal de reconfirmación → animación “procesando pago” → tras 3s “Pago realizado”.
- Guardar pedido en historial si usuario autenticado.

### Reservar

- Selector compacto fecha + hora.
- Plano interactivo del salón (mesas: verde = libre, rojo = ocupada, seleccionado = resaltado).
- Al seleccionar mesa:
  - **Autenticado:** mostrar formulario reducido (nº comensales, trona).
  - **Invitado:** formulario completo (nombre, email, teléfono, nº comensales, trona).
- Confirmación y guardado de reserva (mock/localStorage). Historial en Perfil si auth.

### Perfil (solo si auth)

- Datos del usuario (nombre, email, teléfono, dirección).
- **Pedido en proceso** (pedido activo con estado simple).
- **Historial de pedidos y reservas**.
- Editar datos (incluida dirección).
- LogOut (limpia carrito).

### Login / Register

**Login**: email + contraseña. Mantener intención (p.ej. canjear cupón) para aplicarla tras login.

**Register**: nombre, email, contraseña, teléfono (opcional), **dirección** (obligatoria). Tras registro iniciar sesión y aplicar la intención previa.

---

## 5. Cupones — reglas concretas

- Dos cupones aleatorios generados/seleccionados cada día.
- **Solo canjeables en `Pedir`** (Takeaway).
- Al canjear:
  - Se añaden automáticamente al carrito los items del cupón con descuento aplicado.
  - Redirigir a `/pedir`.
- Requiere autenticación: si no auth → redirigir a `/login` o `/register`, guardar intención para aplicar tras auth.
- Prevenir aplicación múltiple del mismo cupón en la misma sesión/por día.

---

## 6. Estados clave y persistencia

- **AuthState**: `{ userId, name, email, address, loggedAt }` (guardar en `localStorage` clave `auth_v1`).
- **CartState**: `{ items: [{ productId, qty, price, name }], subtotal, total, couponId?, discount }` (guardar `cart_v1`).
- **CouponState**: `{ id, title, items, discountType, discountValue, validFrom, validTo }` (guardar cupón aplicado `coupon_v1`).
- **ReservationState**: lista de reservas mock `reservations_v1`.

---

## 7. Esquemas de datos (ejemplos JSON)

**Producto**

```json
{
  "id": "p001",
  "title": "Hamburguesa Clásica",
  "description": "Carne 200g, queso, lechuga, tomate",
  "price": 8.5,
  "imageUrl": "/images/hamburguesa.jpg",
  "category": "Principales"
}
```

**Cupón**

```json
{
  "id": "c2025-09-02-01",
  "title": "Combo Ahorro",
  "items": [{"productId":"p001","qty":1},{"productId":"p010","qty":1}],
  "discountType": "percentage",
  "discountValue": 20,
  "validFrom":"2025-09-02",
  "validTo":"2025-09-02"
}
```

**Reserva**

```json
{
  "id": "r123",
  "mesaId": "m5",
  "fecha": "2025-09-10",
  "hora": "20:00",
  "comensales": 3,
  "trona": false,
  "userId": "u12"
}
```

---

## 8. Componentes UI principales

- `Navbar` (hamburguesa + drawer)
- `BottomNav` (opcional)
- `HomeHero`
- `MiniMap` (iframe)
- `CouponsCarousel`
- `ProductCardInformative` (Carta)
- `ProductCardActionable` (Pedir)
- `CartBubble`
- `CartPage` + `CheckoutModal`
- `ReservationSelector`
- `TableMap`
- `ReservationFormGuest` / `ReservationFormAuth`
- `LoginForm` / `RegisterForm`
- `ProfilePage`
- `Toast` / `Alerts`

---

## 9. Flujos clave (resumen)

- **Canjear cupón (Auth):** Home → pulsar cupón → añadir items + descuento → `/pedir` → carrito → checkout.
- **Canjear cupón (Guest):** Home → pulsar cupón → redirect `/login` → tras auth aplicar cupón → `/pedir`.
- **Agregar producto en Pedir (Guest):** pulsar Agregar → redirect `/login` → tras auth volver a `/pedir` (carrito vacío por especificación).
- **Reservar (Auth/Guest):** elegir fecha/hora → seleccionar mesa → formulario según estado auth → confirmar → guardar reserva.

---

## 10. Casos borde y consideraciones UX

- Controlar que un cupón no pueda aplicarse repetidamente (usar `couponAppliedIds`).
- Si un cupón añade items ya en carrito → sumar cantidades (recomendado).
- Al logear por intento de canje, conservar la intención para aplicar tras auth.
- Al hacer Logout, borrar `cart_v1`.
- Validar caducidad de cupones y disponibilidad de mesas.
- Mostrar toasts claros al usuario: cupón aplicado, redirigido a login, pago realizado, etc.

---

## 11. LocalStorage — claves sugeridas

- `auth_v1`
- `cart_v1`
- `coupon_v1`
- `reservations_v1`
- `coupon_daily_seed`

---

## 12. Checklist diseño (prioridad)

1. Paleta y tipografía (mobile-first).
2. Wireframes: Home, Reservar (selector + plano), Reserva form (guest/auth), Carta, Pedir, Carrito+Modal.
3. Mockups de interacciones críticas: canjear cupón, añadir producto si no auth, checkout.
4. Mapas de flujo Guest vs Auth.
5. Assets: fotos productos, plano salón, logo, iconos.
6. Breakpoints y spacing (Tailwind config).

---

## 13. Checklist desarrollo (prioridad)

1. Inicializar Vite + React + Tailwind.
2. Estructura: `components/`, `pages/`, `contexts/`, `hooks/`, `services/`, `data/`.
3. Implementar `AuthContext`.
4. Implementar `CartContext` (add/remove/clear + persistencia). Logout debe limpiar carrito.
5. Coupon logic + seed diario.
6. TableMap + Reservation logic (mock).
7. Rutas protegidas para `/perfil`.
8. Modal checkout + animación 3s.
9. Tests básicos de flows principales.

---

## 14. Testing / Acceptance Criteria (mínimos)

- [ ] Guest que pulsa **Agregar** en `/pedir` es redirigido a `/login`.
- [ ] Home muestra 2 cupones y al pulsar uno (si auth) los items se añaden al carrito y redirige a `/pedir`.
- [ ] Al hacer **Logout** el carrito queda vacío.
- [ ] Reservas muestran estado correcto en el plano por fecha/hora.
- [ ] Checkout muestra animación y confirma pago tras 3s.
- [ ] Perfil muestra “Pedido en proceso” y “Historial de pedidos y reservas”.
- [ ] Carta no muestra precios ni botones de añadir.

---

## 15. Microinteracciones y accesibilidad

- Toasts para acciones (cupón aplicado, redirigido a login, pago realizado).
- Mensajes claros en redirecciones (p.ej. "Necesitas iniciar sesión para añadir productos").
- Tamaños táctiles adecuados (>44px), buen contraste y labels accesibles.
- Animaciones suaves en cambio de estado (añadir a carrito, aplicar cupón).

---

## 16. Recursos y assets necesarios

- Fotos de productos (placeholders o reales).
- Plano/diagrama del salón (para mock del TableMap).
- Logo y paleta de colores.
- Iconos: hamburger, carrito, check, cancel, trona, mapa.

---

## 17. Notas para deploy

- Deploy recomendado: Vercel o Netlify.
- Configurar variables públicas si se usa una API externa (p.ej. Google Maps API key) en el entorno de deploy.
- Producción: optimizar imágenes, generar build con Vite (`npm run build`) y testear rutas protegidas.

---

### ¿Qué quieres que haga ahora?
- Puedo generar **mock JSON** con productos, mesas y cupones para que empieces a maquetar.
- O bien puedo crear wireframes textuales para las 6 pantallas prioritarias.

Dime qué prefieres y lo preparo ya.

