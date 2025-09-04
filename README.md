# Guía de instalación y configuración

Después de clonar este repositorio desde GitHub, sigue los siguientes pasos para configurar el entorno de desarrollo:

---

## 1. Instalar dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install -D @eslint/js @types/react @types/react-dom @vitejs/plugin-react autoprefixer eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-unused-imports globals json-server vite
```

📌 Este comando instalará todas las dependencias de desarrollo indicadas en el `package.json`.

---

## 2. Ejecutar el servidor de desarrollo

Para iniciar el servidor de desarrollo con Vite, utiliza:

```bash
npm run dev
```

---

## 3. Ejecutar JSON Server (opcional)

Si necesitas mockear una API con `json-server`, puedes arrancarlo con:

```bash
npx json-server --watch db.json --port 3000
```

_(Asegúrate de que exista un archivo `db.json` en la raíz del proyecto o cámbialo por el nombre de tu archivo)._
