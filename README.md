🛍️ Ecommerce API Backend
API RESTful para la gestión de un e-commerce. Permite la creación, actualización y eliminación de usuarios, consulta de productos, categorías, así como la creación y consulta de órdenes de compra por usuario. Implementa autenticación JWT, control de roles (admin y user) y protección de rutas mediante guardias personalizados.

🚀 Tecnologías utilizadas
NestJS
TypeORM
PostgreSQL
JWT (Json Web Tokens)
Swagger (OpenAPI)
Cloudinary (para la gestión de imágenes)
🧱 Estructura del proyecto
📦 ecommerce-tomasbisio98 ┣ 📂 src ┃ ┣ 📂 auth ┃ ┣ 📂 categories ┃ ┣ 📂 config ┃ ┃ ┣ 📄 cloudinary.ts ┃ ┃ ┗ 📄 typeorm.ts ┃ ┣ 📂 decorators ┃ ┣ 📂 file-upload ┃ ┣ 📂 middlewares ┃ ┣ 📂 orders ┃ ┣ 📂 products ┃ ┣ 📂 users ┃ ┣ 📄 app.module.ts ┃ ┣ 📄 main.ts ┃ ┣ 📄 roles.enum.ts ┃ ┗ 📄 data.json ┣ 📂 test ┣ 📄 .env.development ┣ 📄 .gitignore ┣ 📄 package.json ┣ 📄 README.md ┣ 📄 tsconfig.json ┗ 📄 …

📦 Instalación
Clonar el repositorio: git clone cd ecommerce-tomasbisio98

Instalar las dependencias: npm install

Configurar las variables de entorno en un archivo .env.development:

🌿 Variables de entorno El proyecto utiliza las siguientes variables configuradas en .env.development:

DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASSWORD=your_password DB_NAME=your_database JWT_SECRET=your_jwt_secret

Ejectuar el proyecto en modo DESARROLLO:
npm run start:dev

🔐 Autenticación y Seguridad • Autenticación basada en JWT. • Protección de rutas mediante guardias: • AuthGuard verifica la validez del token. • RolesGuard controla el acceso según el rol (admin o user).

📚 Documentación (Swagger UI)

La documentación dinámica está disponible en: ➡️ http://localhost:3000/api

Incluye: • Endpoints REST organizados por recursos (Users, Products, Orders, Categories, etc.) • Validaciones de DTOs y entidades. • Ejemplos interactivos para probar la API.

🌐 Endpoints principales Auth • POST /auth/signin • POST /auth/signup Users • GET /users • GET /users/:id • PUT /users/:id • DELETE /users/:id Products • GET /products/seeder • GET /products • GET /products/:id • POST /products • PUT /products/:id • DELETE /products/:id Orders • POST /orders • GET /orders/:id Categories • GET /categories/seeder • GET /categories FileUpload • POST /files/uploadImage/:productId

Additional comments: Gracias al tutor Gama por su guía y apoyo durante las 3 semanas de desarrollo.
