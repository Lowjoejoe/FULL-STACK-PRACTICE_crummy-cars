
# Crummy Cars 

Crummy cars is a simple full stack application which pulls from a database of cars by (make,model,color,type,and year)
This data is pulled into the web browser and users are able to view and add new cars to the database


## API Reference

#### Get all items

```http://localhost:5000/api/vehicles
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http://localhost:5000/api/vehicles/:id
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of vehicle to fetch |




## Authors

- [@Lowjoejoe](https://www.github.com/Lowjoejoe)
- [@renem678](https://www.github.com/renem678)

