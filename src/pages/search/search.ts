import { Component, NgZone } from '@angular/core';
import { NavController, NavParams,ToastController, ModalController, LoadingController } from 'ionic-angular';
import {GeolocationService} from '../../services/geolocation.service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { GoOrderPage } from '../go-order/go-order';

declare var google:any;

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage {
 map: any;
 geocoder = new google.maps.Geocoder;
 search_executed: boolean = false;
 markers_orders = [];
 markers_current = [];
 lat_used = [];
 lng_used = [];

 markers = [];
 marker:any;

 pointHERE: any;
 marker_source:any;
 marker_destination:any;

	orders: any[] = [];
	title: string = 'Realiza un Delivery!';
	loading:any;
	GoogleAutocomplete = new google.maps.places.AutocompleteService();
	autocomplete = { input: '', input2: '' };
	autocompleteItems = [];
	autocompleteItems2 = [];
	markerHERE: any;
	SAME_POINT:Boolean = false;
	MARKER_SAME_POSITION:number = 0;

  	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public zone: NgZone,
		public geolocator: GeolocationService,
		public orderService: OrderServiceProvider,
		public toast:ToastController,
		public modalCtrl: ModalController,
		public loadingCtrl: LoadingController
	) {
  		if(this.navParams.get('orders') !== null && this.navParams.get('orders') !== ""){
  			this.orders = this.navParams.get('orders');
  		}
  	}
	  ionViewWillEnter() {
	  	this.initMap();
	  }

	  	private initMap() {
	  		  var lat = localStorage.getItem("lat");
	      	  var lng = localStorage.getItem("lng");

		      this.pointHERE = {lat: +lat, lng: +lng};
		      let divMap = (<HTMLInputElement>document.getElementById('map-search'));
		      this.map = new google.maps.Map(divMap, {
		      center: this.pointHERE,
		      zoom: 11,
		      disableDefaultUI: true,
		      draggable: true,
		      zoomControl: true,
		      mapTypeId: 'roadmap'
		      });

		       var icon = {
		           url: "assets/imgs/marker_moderno.png", // url
		           scaledSize: new google.maps.Size(35, 35), // scaled size
		           origin: new google.maps.Point(0,0), // origin
		           anchor: new google.maps.Point(0, 0) // anchor
		      };

		      	this.markerHERE = new google.maps.Marker({
		          position: this.pointHERE,
		          map: this.map,
		          label: 'ESTAS AQUÍ',
		          icon: icon
		        });

		        this.map.setCenter(this.pointHERE);

		        google.maps.event.addListener(this.markerHERE, 'click', function () {
			        var current_address = localStorage.getItem('current_address');
			        //localStorage.setItem('set_current_address', 'true');

			    });


		       this.getAddressCurrentLocation(lat, lng);


	  	}

	  	updateSearchResults(){
		    if (this.autocomplete.input == '') {
		      this.autocompleteItems = [];
		      return;
		    }


         // set autocomplete options
        var options      = {
            input: this.autocomplete.input,
            types: ['address'], //retrict result only address searches
            componentRestrictions: {country: 'ar'}, // restrict results to argentina
        };

		    this.GoogleAutocomplete.getPlacePredictions(options,
		    (predictions, status) => {
		      if(predictions){
		        this.autocompleteItems = [];
		        this.zone.run(() => {
		          predictions.forEach((prediction) => {
		              this.autocompleteItems.push(prediction);
		          });
		        });
		      }
		    });
		}

		updateSearchResults2(){
		    if (this.autocomplete.input2 == '') {
		      this.autocompleteItems2 = [];
		      return;
		    }

        // set autocomplete options
       var options = {
           input: this.autocomplete.input2,
           types: ['address'], //retrict result only address searches
           componentRestrictions: {country: 'ar'}, // restrict results to argentina
       };


		    this.GoogleAutocomplete.getPlacePredictions(options,
		    (predictions, status) => {
		      if(predictions){
		        this.autocompleteItems2 = [];
		        this.zone.run(() => {
		          predictions.forEach((prediction) => {
		              this.autocompleteItems2.push(prediction);
		          });
		        });
		      }
		    });
		}

		selectSearchResult(item){
	    	var icon = {
	           url: "assets/imgs/marker_moderno.png", // url
	           scaledSize: new google.maps.Size(35, 35), // scaled size
	           origin: new google.maps.Point(0,0), // origin
	           anchor: new google.maps.Point(0, 0) // anchor
		    };
		    this.autocompleteItems = [];
		    this.autocomplete.input = item.description;

			//Limpio el marker origen
			if(this.marker_source)
			this.marker_source.setMap(null);


		    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
		      if(status === 'OK' && results[0]){
		        let position = {
		            lat: results[0].geometry.location.lat,
		            lng: results[0].geometry.location.lng
		        };


		        this.marker_source = new google.maps.Marker({
		          position: results[0].geometry.location,
		          map: this.map,
		          icon: icon
		        });
		        this.markers_orders.push(this.marker_source);
		        this.map.setCenter(results[0].geometry.location);
		        localStorage.setItem("search_latlng_selected_source", results[0].geometry.location);
		      }
		    })


		    this.geocoder.geocode({'address': item.description}, (results, status) => {
		      if(status == google.maps.GeocoderStatus.OK){
		       // localStorage.setItem("source_lat", results[0].geometry.location.lat());
		       //localStorage.setItem("source_lng", results[0].geometry.location.lng());
		      }
		    })


	  	}

	  	selectSearchResult2(item){
	    	var icon = {
	           url: "assets/imgs/marker_moderno.png", // url
	           scaledSize: new google.maps.Size(35, 35), // scaled size
	           origin: new google.maps.Point(0,0), // origin
	           anchor: new google.maps.Point(0, 0) // anchor
		    };

		    this.autocompleteItems2 = [];
		    this.autocomplete.input2 = item.description;

		    if(this.marker_destination)
		    this.marker_destination.setMap(null);

		    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
		      if(status === 'OK' && results[0]){
		        let position = {
		            lat: results[0].geometry.location.lat,
		            lng: results[0].geometry.location.lng
		        };

		       // localStorage.setItem("source_address", item.description);
		        this.marker_destination = new google.maps.Marker({
		          position: results[0].geometry.location,
		          map: this.map,
		          icon: icon
		        });
		        this.markers_orders.push(this.marker_destination);
		        this.map.setCenter(results[0].geometry.location);
		        localStorage.setItem("search_latlng_selected_destination", results[0].geometry.location);
		      }
		    })


		    this.geocoder.geocode({'address': item.description}, (results, status) => {
		      if(status == google.maps.GeocoderStatus.OK){
		        //localStorage.setItem("source_lat", results[0].geometry.location.lat());
		        //localStorage.setItem("source_lng", results[0].geometry.location.lng());
		      }
		    })

	    	var directionsService = new google.maps.DirectionsService();
	      	var directionsDisplay = new google.maps.DirectionsRenderer();

	      	localStorage.setItem("search_source",this.autocomplete.input);
 			localStorage.setItem("search_destination",this.autocomplete.input2);

 			 document.getElementById('button-search-orders').style.display = "";
	        // document.getElementById('button-search-current-orders').style.display = "none";

	      	//this.calculateAndDisplayRoute(directionsService, directionsDisplay);
	  	}


 		calculateAndDisplayRoute(directionsService, directionsDisplay) {


  		directionsService.route({
	        origin: this.autocomplete.input,
	        destination: this.autocomplete.input2,
	        travelMode: 'DRIVING'
	      }, function(response, status) {
	      	if (status === 'OK') {
	          directionsDisplay.setDirections(response);
	          let divMap = (<HTMLInputElement>document.getElementById('map-search'));
	          this.map = new google.maps.Map(divMap);
	          directionsDisplay.setMap(this.map);
	         document.getElementById('button-search-orders').style.display = "";
	         document.getElementById('button-search-orders-current-location').style.display = "none";
	        } else {
	        	alert("No se pudo trazar la ruta");
	        }

	      });

  		}

  		//===========LOADING CONTROLLER==============
  		presentLoadingDefault() {
		  this.loading = this.loadingCtrl.create({
		    content: 'Buscando Deliveries...'
		  });

		  this.loading.present();

		}
		//==========LOADING CONTROLLER=============


	  	getOrdersBySearch(){


	  		let source 		= localStorage.getItem('search_source');
	  		let destination = localStorage.getItem('search_destination');

	  		let arr_source = source.split(",");
	  		let len_arr_source = arr_source.length;
	  		let city_source = arr_source[len_arr_source - 2];

	  		let arr_destination = destination.split(",");
	  		let len_arr_destination = arr_destination.length;
	  		let city_destination = arr_destination[len_arr_destination - 2];

	  		let latlng_source = localStorage.getItem("search_latlng_selected_source");
	  		let latlng_destination = localStorage.getItem("search_latlng_selected_destination");
	  		let user_id = localStorage.getItem("user_id");

	  			var icon = 'assets/imgs/logo_marker.png';

	  			this.presentLoadingDefault();

	  			this.orderService.searchOrders(city_source, latlng_source, latlng_destination, user_id, true)
				  
				  /*.subscribe(
		          data=>{
		          	console.log(data['results']);
		          	this.orders = data['results'];

			      	for(let m=0; m<this.markers.length; m++){
			      		this.markers[m].setMap(null);
			      	}
			      	this.markers.length = 0;

		          	for(let i = 0 ; i<this.orders.length; i++){

				      	let coordinates =  this.orders[i].coordinates;

				      	let idorder = this.orders[i].id;
				      	let name = this.orders[i].PackageName;
				      	let source = this.orders[i].source;
				      	let destination = this.orders[i].destination;
				      	let cost = this.orders[i].cost;
				      	let charge = this.orders[i].charge;
				      	let maxDeliveryDate = this.orders[i].maxDeliveryDate;
				      	let mommentPickup = this.orders[i].mommentPickup;
				      	let fname = this.orders[i].fname;
				      	let id_user_order = this.orders[i].user_id
				      	let status = this.orders[i].status;
				      	let username = this.orders[i].username;
				      	let size = this.orders[i].size;
				      	let weight = this.orders[i].weight;
				      	let vehicle = this.orders[i].vehicle;
						let statusbusiness = this.orders[i].statusbusiness;

				      	let arr_coordinates = coordinates.split(";");
				      	let coordinates_source = arr_coordinates[0];
				      	let arr_coordinates_source = coordinates_source.split(",");

				      	let lat = arr_coordinates_source[0];

				      	if(lat)
				      		lat = lat.replace("(","");

				      	let lng = arr_coordinates_source[1];

				      	if(lng)
				      		lng = lng.replace(")","");




				      	var point = {lat: +lat, lng: +lng};
				        var marker = new google.maps.Marker({
				          position: point,
				          map: this.map,
				          icon: icon,
				          zoom: 11
				        });

				        this.markers.push(marker);
				        this.map.setCenter(point);


				        var object = new SearchPage(this.navCtrl,this.navParams, this.zone, this.geolocator, this.orderService, this.toast,this.modalCtrl, this.loadingCtrl);
						    marker.addListener('click', function () {
							           object.navCtrl.push(GoOrderPage, {id_order: idorder, name: name, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, fname: fname, id_user: id_user_order, status: status, username: username, mommentPickup: mommentPickup, size: size, weight: weight, vehicle: vehicle, tracking: [], offerts: [], business_users: [], business_delivery: [], business_declined: "", statusbusiness: statusbusiness});
						    });



				      }

				      		var toast = this.toast.create({
							    message: 'Haz clic en el Delivery que desees realizar!',
							    duration: 3000,
							    position: 'middle'
						  	});

						  	var toast_zero = this.toast.create({
							    message: 'No hay Deliveries para realizar, busca Deliveries Cercanos!',
							    duration: 4000,
							    position: 'middle'
						  	});

							if(this.orders.length > 0){
								toast.present();
								this.loading.dismiss();
							}else{
								toast_zero.present();
								this.loading.dismiss();
							}
		          },
		          err=>console.log(err)
				  );*/



	  	}

	  	getAddressCurrentLocation(lat,lng){
	  		let geocoder  = new google.maps.Geocoder();
			let location  = new google.maps.LatLng(+lat, +lng);
			var current_city = "";

			this.geocoder.geocode({'latLng': location}, function (results, status) {
				if(status == google.maps.GeocoderStatus.OK) {
					var current_city = results[0].address_components[2].long_name;
					localStorage.setItem("current_city", current_city);
				}
			});

			if(localStorage.getItem('set_current_address') == 'true'){
				let current_address = localStorage.getItem('current_address');
				this.autocomplete.input = current_address;
			}
			if(this.orders){
				if(this.orders.length > 0){
					this.showOrdersByHome();
				}
			}


		}

		public getOrdersByCurrentLocation(){

			var current_city = localStorage.getItem("current_city");
			var lat = localStorage.getItem("lat");
	      	var lng = localStorage.getItem("lng");

	      	let location  = new google.maps.LatLng(+lat, +lng);

	      	var icon = 'assets/imgs/logo_marker.png';

	        let user_id = localStorage.getItem("user_id");

	        this.presentLoadingDefault();

			this.orderService.searchOrders(current_city, location, location, user_id, true)
		      	/*.subscribe(
		          data=>{
		          	console.log(data['results']);
		          	this.orders = data['results'];

		          	//Limpio pedidos del mapa para la nueva busqueda
			      	for(let m=0; m<this.markers.length; m++){
			      		this.markers[m].setMap(null);
			      	}
			      	this.markers.length = 0;

			      	if(this.marker_source)
			      		this.marker_source.setMap(null);

			      	if(this.marker_destination)
			      		this.marker_destination.setMap(null);

		          	for(let i = 0 ; i<this.orders.length; i++){

		          	let coordinates =  this.orders[i].coordinates;

			      	let idorder = this.orders[i].id;
			      	let name = this.orders[i].PackageName;
			      	let source = this.orders[i].source;
			      	let destination = this.orders[i].destination;
			      	let cost = this.orders[i].cost;
			      	let charge = this.orders[i].charge;
			      	let maxDeliveryDate = this.orders[i].maxDeliveryDate;
			      	let mommentPickup = this.orders[i].mommentPickup;
			      	let fname = this.orders[i].fname;
			      	let id_user_order = this.orders[i].user_id
			      	let status = this.orders[i].status;
			      	let username = this.orders[i].username;
			      	let size = this.orders[i].size;
			      	let weight = this.orders[i].weight;
					let vehicle = this.orders[i].vehicle;
					let statusbusiness = this.orders[i].statusbusiness;

			      		//se guardan en LS para cuando el usuario se registra antes de enviar una oferta de delivery
			      		localStorage.setItem("source_pre_offert", source);
			      		localStorage.setItem("destination_pre_offert", destination);
			      		localStorage.setItem("name_pre_offert", name);
			      		localStorage.setItem("cost_pre_offert", cost);
			      		localStorage.setItem("charge_pre_offert", charge);
			      		localStorage.setItem("maxDeliveryDate_pre_offert", maxDeliveryDate);
			      		localStorage.setItem("fname_pre_offert", fname);
			      		localStorage.setItem("idUserOrder_pre_offert", id_user_order);


					var point;
			      	let arr_coordinates = coordinates.split(";");
			      	let coordinates_source = arr_coordinates[0];
			      	let arr_coordinates_source = coordinates_source.split(",");

			      	let lat = arr_coordinates_source[0];
			      	lat = lat.replace("(","");

			      	let lng = arr_coordinates_source[1];

			      	if(lng){
			      		lng = lng.replace(")","");
			      	}

			      	for(let m= 0 ; m<this.lat_used.length; m++){
			      		if(this.lat_used[m] == lat || this.lng_used[m] == lng)
			      		{

			      			this.SAME_POINT = true;

			      			//Sumar la 4ta cifra de la longiotud.
			      			let lat_arr = lat.split(".");
			      			var left_part = lat_arr[0];
			      			var right_part = lat_arr[1];
			      			let number = right_part[3];
			      			number = parseFloat(number);
			      			var number_updated = number + 1;
			      			number_updated = ''+number_updated;
			      			let length = right_part.length;
			      			let right_part_analytics = right_part;
			      			right_part = '';
			      			for(let c = 0; c<length; c++){
			      				if(c == 3){
			      					right_part += number_updated;
			      				}else{
			      					right_part += right_part_analytics[c];
			      				}
			      			}
			      			lat = left_part+"."+right_part;

			      			point = {lat: +lat, lng: +lng};

			      		}


			      	}
			      	if(!this.SAME_POINT){
			      		point = {lat: +lat, lng: +lng};
			      	    this.lat_used.push(lat);
			      	    this.lng_used.push(lng);
					}else{
						this.SAME_POINT = false;
					}


			        var marker = new google.maps.Marker({
			          position: point,
			          map: this.map,
			          icon: icon,
			          zoom: 11
			        });

			        this.markers.push(marker);
			        this.map.setCenter(point);
			        var object = new SearchPage(this.navCtrl, this.navParams, this.zone, this.geolocator, this.orderService, this.toast,this.modalCtrl, this.loadingCtrl);
					marker.addListener('click', function () {

					  object.navCtrl.push(GoOrderPage, {id_order: idorder, name: name, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, fname: fname, id_user: id_user_order, status: status, username: username, mommentPickup: mommentPickup, size: size, weight: weight, vehicle: vehicle, tracking: [], offerts: [], business_users: [], business_delivery: [], statusbusiness: statusbusiness});
					});
				}
					var toast = this.toast.create({
					    message: 'Haz clic en el Delivery que desees realizar!',
					    duration: 3000,
					    position: 'middle'
				  	});

				  	var toast_zero = this.toast.create({
					    message: 'No tienes ningun Delivery cercano, busca en otra zona!',
					    duration: 4000,
					    position: 'middle'
				  	});

					if(this.orders.length > 0){
						toast.present();
						this.loading.dismiss();
					}else{
						toast_zero.present();
						this.loading.dismiss();
					}
		          },
		          err=>console.log(err)
				  );*/
		}

		public showOrdersByHome(){
			var icon = 'assets/imgs/logo_marker.png';

			//Limpio pedidos del mapa para la nueva busqueda
	      	for(let m=0; m<this.markers.length; m++){
	      		this.markers[m].setMap(null);
	      	}
	      	this.markers.length = 0;

	      	if(this.marker_source)
	      		this.marker_source.setMap(null);

	      	if(this.marker_destination)
	      		this.marker_destination.setMap(null);

          	for(let i = 0 ; i<this.orders.length; i++){

		          	let coordinates =  this.orders[i].coordinates;

			      	let idorder = this.orders[i].id;
			      	let name = this.orders[i].PackageName;
			      	let source = this.orders[i].source;
			      	let destination = this.orders[i].destination;
			      	let cost = this.orders[i].cost;
			      	let charge = this.orders[i].charge;
			      	let maxDeliveryDate = this.orders[i].maxDeliveryDate;
			      	let mommentPickup = this.orders[i].mommentPickup;
			      	let fname = this.orders[i].fname;
			      	let id_user_order = this.orders[i].user_id
			      	let status = this.orders[i].status;
			      	let username = this.orders[i].username;
			      	let size = this.orders[i].size;
			      	let weight = this.orders[i].weight;
					let vehicle = this.orders[i].vehicle;
					let statusbusiness = this.orders[i].statusbusiness;

			      		//se guardan en LS para cuando el usuario se registra antes de enviar una oferta de delivery
			      		localStorage.setItem("source_pre_offert", source);
			      		localStorage.setItem("destination_pre_offert", destination);
			      		localStorage.setItem("name_pre_offert", name);
			      		localStorage.setItem("cost_pre_offert", cost);
			      		localStorage.setItem("charge_pre_offert", charge);
			      		localStorage.setItem("maxDeliveryDate_pre_offert", maxDeliveryDate);
			      		localStorage.setItem("fname_pre_offert", fname);
			      		localStorage.setItem("idUserOrder_pre_offert", id_user_order);



			      	let arr_coordinates = coordinates.split(";");
			      	let coordinates_source = arr_coordinates[0];
			      	let arr_coordinates_source = coordinates_source.split(",");

			      	let lat = arr_coordinates_source[0];

			      	//if(lat)
			      	lat = lat.replace("(","");

			      	let lng = arr_coordinates_source[1];

			      	if(lng){
			      		lng = lng.replace(")","");
			      	}

			      	for(let m= 0 ; m<this.lat_used.length; m++){
			      		if(this.lat_used[m] == lat || this.lng_used[m] == lng)
			      		{

			      			this.SAME_POINT = true;
			      			//Sumar la 4ta cifra de la longiotud.
			      			let lat_arr = lat.split(".");
			      			var left_part = lat_arr[0];
			      			var right_part = lat_arr[1];
			      			let number = right_part[3];
			      			number = parseFloat(number);
			      			var number_updated = number + 1;
			      			number_updated = ''+number_updated;
			      			let length = right_part.length;
			      			let right_part_analytics = right_part;
			      			right_part = '';
			      			for(let c = 0; c<length; c++){
			      				if(c == 3){
			      					right_part += number_updated;
			      				}else{
			      					right_part += right_part_analytics[c];
			      				}
			      			}
			      			lat = left_part+"."+right_part;

			      			var point = {lat: +lat, lng: +lng};

			      		}


			      	}
			      	if(!this.SAME_POINT){
			      		point = {lat: +lat, lng: +lng};
			      	    this.lat_used.push(lat);
			      	    this.lng_used.push(lng);
					}else{
						this.SAME_POINT = false;
					}


			        var marker = new google.maps.Marker({
			          position: point,
			          map: this.map,
			          icon: icon,
			         // label: {text: ''+this.MARKER_SAME_POSITION, color: "green", size: 18},
			          zoom: 11
			        });

			        this.markers.push(marker);
			        this.map.setCenter(point);




			        var object = new SearchPage(this.navCtrl, this.navParams, this.zone, this.geolocator, this.orderService, this.toast,this.modalCtrl, this.loadingCtrl);
					marker.addListener('click', function () {

					  object.navCtrl.push(GoOrderPage, {id_order: idorder, name: name, source: source, destination: destination, cost: cost, charge: charge, maxDeliveryDate: maxDeliveryDate, fname: fname, id_user: id_user_order, status: status, username: username, mommentPickup: mommentPickup, size: size, weight: weight, vehicle: vehicle, tracking: [], offerts: [], business_users: [], business_delivery: [], statusbusiness: statusbusiness});
					});
				}

			var toast = this.toast.create({
			    message: 'Haz clic en el Delivery que desees realizar!',
			    duration: 3000,
			    position: 'middle'
		  	});

		  	var toast_zero = this.toast.create({
			    message: 'No tienes ningun Delivery cercano, busca en otra zona!',
			    duration: 4000,
			    position: 'middle'
		  	});

		}

}
