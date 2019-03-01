(($) => {
    $(document).ready(() => {
        const $citiesWrapper = $('.cities');
        const $mapContainer = $('.map__wrapper');
        const gMap = new google.maps.Map($mapContainer[0], {
            center: {
                lat: 40,
                lng: 10
            },
            zoom: 2
        });
        const infoWindow = new google.maps.InfoWindow;
        const $xhr = $.ajax('assets/ajax/locations.json')
            .done((response) => {
                if (response.success) {
                    response.data.forEach(item => {
                        const $city =
                            $(`
                            <li class="city">
                            <span class="city__name">${item.city}</span>
                            <span class="city__temp">${item.temperature}</span>
                            <i class="wi wi-${item.weather}"></i>
                            </li>
                            `)
                            .appendTo($citiesWrapper);
                        
                        const center = {
                            lat: item.lat,
                            lng: item.lng
                        };
                        const markerImage = {
                            url: `assets/img/${item.weather}.svg`,
                            scaledSize: new google.maps.Size(50, 50),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(25, 25)
                        };
                        const marker = new google.maps.Marker({
                            position: center,
                            map: gMap,
                            icon: markerImage
                        });
                        marker.addListener('click', function () {
                            infoWindow.setContent(`${item.city}: ${item.temperature}&deg;C`);
                            infoWindow.open(gMap, marker);
                        });
                    });
                } else {
                    console.log('Error');
                }
            })
    });
})(jQuery)