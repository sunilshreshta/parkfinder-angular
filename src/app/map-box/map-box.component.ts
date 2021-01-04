import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl' ;

type PosistionCoord = [number,number] ;

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit {

  apiKey:string = 'pk.eyJ1Ijoic3VuaWxzaHJlc3RoYSIsImEiOiJja2g3aHN1dTkwNGoxMnNuczMzb2V6YmR4In0.P6Lczg6Nea2oV49dJ1yvsw';
  map: any  ;
  currentPosition: PosistionCoord = [41.3879,2.16992] ;
  mapActiveMarkers: mapboxgl.Marker[] = [] ;
  mapActiveMarkersParkingName : string[] = [] ;
  constructor() {
  }

  ngOnInit(): void {

    //tracking user location _______________________________________
    let _res = this.getUserPosition() ;
    _res
    .then((response) => console.log(response))
    .catch((error) => console.log(error)) ;

    // MAP BOX Initialization / Configuration ________________________________
    let latitude = 41.3879;
    let longitude = 2.16992;
    this.map = new mapboxgl.Map({
         accessToken: this.apiKey,
         container: 'parkings_map',
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [longitude, latitude],
         zoom: 15
     });
     // Add zoom and rotation controls to the map.
     this.map.addControl(new mapboxgl.NavigationControl());
     this.map.addControl(new mapboxgl.FullscreenControl());
  }

  getUserPosition() {
    let parent: MapBoxComponent = this ;
    return new Promise((resolve,reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((data) => {
          parent.setMyPostionToMap(data,parent) ;
        });
        resolve("Tracking user position") ;
      }else{
        reject("Don't track user position") ;
      }
    });
  }

  async get_parkings (){
    console.log("Getting parkings details...") ;
    let response = await fetch("https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json") ;
    let parkingLists = await response.json() ;
    return parkingLists["@graph"] ;

  }
   async load_parking(searchString: string  = "")  {
    this.mapActiveMarkers = []
    this.mapActiveMarkersParkingName = [] ;
    try{
      const  parkingLists = await this.get_parkings() ;

    // go to
    this.map.flyTo({center: this.currentPosition});

   }catch(error){
     console.log(error) ;
   }
  }
  setMyPostionToMap(coordsObj: any, parent: MapBoxComponent): void{
    let longitude = coordsObj.coords.longitude ;
    let latitude = coordsObj.coords.latitude ;
    parent.addMarkerToMap({"longitude": longitude, "latitude": latitude,"popupMsg": "My current Location"}, true, false) ;
    this.map.jumpTo({
       center: [longitude,latitude]
     });

  }

 addMarkerToMap(dataObj: any , hasPopUp = false, appendToArray = true){
    let longitude: number = dataObj["longitude"] ;
    let latitude:number  = dataObj["latitude"] ;
    let marker: mapboxgl.Marker ;
    let popupMsg: string   = '' ;
    if(hasPopUp === true){
       popupMsg= dataObj["popupMsg"] ;
      let popup = new mapboxgl.Popup({ offset: 25 }).setText(popupMsg);
       marker = new mapboxgl.Marker({"color": "#007bff"})
                      .setLngLat([longitude, latitude])
                      .setPopup(popup)
                      .addTo(this.map);
    }else{
       marker = new mapboxgl.Marker()
                      .setLngLat([longitude, latitude])
                      .addTo(this.map);
    }
    if(appendToArray){
      this.mapActiveMarkersParkingName.push(popupMsg) ;
    }
    this.mapActiveMarkers.push(marker) ;
 }

}
