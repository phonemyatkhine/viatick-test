## **Server App**

Please input the sql file and check DB configuration in the .env file.

    npm i
    npm run dev

 - User, Pins CRUD.
 - Haversine Distance calculation between two coordinates. (Lat1, Long1) (Lat2, Long2)
 - Graph based on Adjacency matrix using coordinates and distance between them.
 - Dijkstra algorithm to traverse to the furtherest point from starting coordinate.

Minimal Thunder Client requests collection is included.

Dijjkstra algorithm is exposed at 
>    http://localhost:8000/api/users/:id/pins/:pinId/simulate-route

