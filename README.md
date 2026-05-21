# Catalog Middleware — DGL LATAM Challenge

Microservicio en Node.js + Express que consume el catálogo de DummyJSON, transforma los datos y aplica reglas de negocio (impuesto del 16% y detección de stock bajo).

---

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Lista de productos transformados, ordenados por precio final (mayor a menor) |
| GET | `/health` | Estado del servicio |

### Ejemplo de respuesta `/api/products`

```json
{
  "success": true,
  "total": 20,
  "products": [
    {
      "id": 123,
      "title": "iPhone 13 Pro",
      "brand": "Apple",
      "category": "smartphones",
      "originalPrice": 1099.99,
      "finalPrice": 1275.99,
      "stock": 56,
      "isLowStock": false
    }
  ]
}
```

---

## Variables de entorno

Crea un archivo `.env` basado en `.env.example`:

```env
PORT=3000
EXTERNAL_API_URL=https://dummyjson.com/products/search
SEARCH_QUERY=phone
TAX_RATE=0.16
LOW_STOCK_THRESHOLD=10
```

---

## Ejecución local

### Requisitos
- Node.js 18+
- npm

### Pasos

```bash
# 1. Clona el repositorio
git clone <tu-repo-url>
cd catalog-middleware

# 2. Instala dependencias
npm install

# 3. Configura variables de entorno
cp .env.example .env

# 4. Inicia el servidor
npm start
```

El servidor estará disponible en `http://localhost:3000`

---

## Ejecución con Docker

```bash
# Construir y levantar
docker-compose up --build

# En segundo plano
docker-compose up -d --build

# Detener
docker-compose down
```

---

## Lógica de negocio

- **Precio final**: `precio * (1 + 0.16)` — impuesto del 16%
- **isLowStock**: `true` si el stock es menor a 10 unidades
- **Orden**: productos ordenados por `finalPrice` de mayor a menor
- **Resiliencia**: manejo de errores para API caída (503), respuestas inválidas (502) y campos incompletos (filtrados automáticamente)

---

## Estructura del proyecto

```
src/
├── controllers/
│   └── productController.js   # Manejo de request/response y errores
├── routes/
│   └── productRoutes.js       # Definición de rutas
├── services/
│   └── productService.js      # Consumo de API externa
├── transformers/
│   └── productTransformer.js  # Transformación y lógica de negocio
└── index.js                   # Punto de entrada
```
