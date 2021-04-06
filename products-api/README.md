
# Products API

## Docker

### Image Build
```bash
sudo docker build -t tikiram/products-api .
```

Service at port 3001

```bash
sudo docker run --name products-api-container -p 3001:3000 -d tikiram/products-api
```

## Local

```bash
cd products-api
npm install
npm start
```

## Endpoints

### New Product

```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "producto 01",
  "photo_url": "https://cache.dominos.com/olo/6_31_1/assets/build/market/GT/_es/images/img/products/larges/S_PIZDX.jpg",
  "price": "75.75"
}
```

#### Response Example

```json
{
    "id": 2,
    "name": "producto 01",
    "photo_url": "https://cache.dominos.com/olo/6_31_1/assets/build/market/GT/_es/images/img/products/larges/S_PIZDX.jpg",
    "price": "75.75",
    "createdAt": "2020-08-14T04:10:14.755Z",
    "updatedAt": "2020-08-14T04:10:14.755Z"
}
```

### Get all products

```
GET http://localhost:3000/products
```

#### Response Example:
```json
[
  {
    "id": 2,
    "name": "producto 01",
    "photo_url": "https://cache.dominos.com/olo/6_31_1/assets/build/market/GT/_es/images/img/products/larges/S_PIZDX.jpg",
    "price": "75.75",
    "createdAt": "2020-08-14T04:10:14.755Z",
    "updatedAt": "2020-08-14T04:10:14.755Z"
  },
  {
    "id": 3,
    "name": "Hamburguesa",
    "photo_url": "https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg",
    "price": "50.50",
    "createdAt": "2020-08-14T04:19:44.252Z",
    "updatedAt": "2020-08-14T04:19:44.252Z"
  }
]
```

### Update Product

```
PATCH http://localhost:3000/products/2
Content-Type: application/json

{
  "name": "Pizza"
}
```

Response status code: 204 - No Content

### Delete Product

```
DELETE http://localhost:3000/products/1
Content-Type: application/json
```

Response status code: 204 - No Content
