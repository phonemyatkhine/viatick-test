 ## **Coding Test for Viatick**
 
Frontend - https://github.com/phonemyatkhine/viatick-test/tree/master/map-app

Backend - https://github.com/phonemyatkhine/viatick-test/tree/master/server-app


> Node - v16.13.0, 

**Dijkstra algorithm** is mainly focused. 

Backend App is without Auth and is complete with minimal CRUDs. API exposed and functioning.

Frontend app can render Map, serve Mapbox API and showing visual cue for pin index numbers and which pin to visit after.

Subliminal Test Scripts are included.


- Route Simulation is done, based on the adjacency matrix. 
- Pins must be within around 3KM of each other and must be on the streets. Open
   street maps only allow route connection from street. 
- Traffic Simulation is used based on the map box matching api. 
