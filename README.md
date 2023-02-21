 ## **Coding Test for Viatick**
 
Frontend - https://github.com/phonemyatkhine/viatick-test/tree/master/map-app

Backend - https://github.com/phonemyatkhine/viatick-test/tree/master/server-app


> Node - v16.13.0, 

**Dijkstra algorithm** is mainly focused. 

Backend App is without Auth and is complete with minimal CRUDs. API exposed and functioning.

Frontend app can render Map and can serve Mapbox api.

> **Test scripts are not included.**



 - Route Simulation is done, based on the adjacency matrix. 
 - Pins must be within around 3KM of each other and must be on the streets. Open
   street maps only allow route connection from street. 
- Traffic Simulation is used based on the map box matching api. 
- Further visual cue for pin index numbers, which pin to visit after, is yet to be added. API Response is the only way to know which pin to visit after another as of now. 
