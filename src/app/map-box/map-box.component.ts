import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as mapboxgl from 'mapbox-gl' ;

type PosistionCoord = [number,number] ;

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapBoxComponent implements OnInit {

  apiKey:string = 'pk.eyJ1Ijoic3VuaWxzaHJlc3RoYSIsImEiOiJja2g3aHN1dTkwNGoxMnNuczMzb2V6YmR4In0.P6Lczg6Nea2oV49dJ1yvsw';
  map: any  ;
  searchString: string = '' ;
  currentPosition: PosistionCoord = [41.3879,2.16992] ;
  mapActiveMarkers: mapboxgl.Marker[] = [] ;
  mapActiveMarkersParkingName : string[] = [] ;
  searchMatchesData: string[] = [] ;
  isParkingsLoadings: boolean = false ;
  isSearchBoxInit: boolean = false ;

  constructor() {
  }

  ngOnInit(): void {

    //tracking user location _______________________________________
    let _res = this.getUserPosition() ;
    _res
    .then((response) => console.log(response))
    .catch((error) => console.log(error)) ;

    // MAP BOX Initialization / Configuration ________________________________

    this.map = new mapboxgl.Map({
         accessToken: this.apiKey,
         container: 'parkings_map',
         style: 'mapbox://styles/mapbox/streets-v11',
         center: this.currentPosition,
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
    this.isParkingsLoadings = true;
    this.mapActiveMarkers = []
    this.mapActiveMarkersParkingName = [] ;
    try{
      const  parkingLists = await this.get_parkings() ;
      let parent = this ;
      parkingLists.forEach(function(itemObj: any){
         let dataObj = {
                       "longitude": itemObj.location.longitude,
                       "latitude": itemObj.location.latitude,
                       "popupMsg": itemObj.title
                       } ;
         if(searchString != ""){
           searchString =  searchString.toLowerCase().trim() ;
           if(itemObj.title.toLowerCase().trim().indexOf(searchString) >= 0){
             parent.addMarkerToMap(dataObj, true) ;
               parent.currentPosition = [itemObj.location.longitude,itemObj.location.latitude] ;
           }
         }else{
           parent.addMarkerToMap(dataObj, true) ;
             parent.currentPosition = [itemObj.location.longitude,itemObj.location.latitude] ;
         }
     })

      if(this.mapActiveMarkersParkingName.length > 0){
        // go to
        this.map.flyTo({center: this.currentPosition});
      }
      this.isParkingsLoadings = false;
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

 async searchParking(text: string){
    let _str: string = text || "" ;
   // remove all active markers in mapbox
    this.mapActiveMarkers.forEach((item) => {
      item.remove() ;
    });

   await  this.load_parking(_str) ;
   if(this.mapActiveMarkersParkingName.length > 0){
     this.searchMatchesData = this.mapActiveMarkersParkingName ;
     this.isSearchBoxInit = true ;
   }


    //this.

 }
 searchDataInputField(str: string): void{
     let parent = this ;
     let queryMathches: string[] = [] ;
     str = this.ac_sanitize(str).toLowerCase().trim() ;
     this.mapActiveMarkersParkingName.forEach((item: string, i: number) => {
         var pos = parent.ac_sanitize(item).toLowerCase().trim().indexOf(str) ;
         if( pos > -1){
           item = item.replace(item.substr(pos,str.length),'<strong class="matchedStr">'+item.substr(pos,str.length)+'</strong>');
           queryMathches.push(item) ;
         }
     }) ;

     this.searchMatchesData = queryMathches ;


 }
 ac_sanitize(str: string): string{
     let map: any = {
         'a' : 'á|à|ã|â|À|Á|Ã|Â',
         'e' : 'é|è|ê|É|È|Ê',
         'i' : 'í|ì|î|Í|Ì|Î',
         'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
         'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
         'c' : 'ç|Ç',
         'n' : 'ñ|Ñ'
     };

     for (let pattern in map) {
         str = str.replace(new RegExp(map[pattern], 'g'), pattern);
     };

     return str;
 }

 updateSearchString(event: any){
   this.searchString = (<HTMLInputElement>event.target).innerText ;
 }

 // SEARCHABLE INPUT



}
