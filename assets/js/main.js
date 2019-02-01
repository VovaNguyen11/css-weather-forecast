(($) => {
    $(document).ready(() => {
        const $mapContainer = $('.map__wrapper');
        const gMap = new google.maps.Map($mapContainer[0], {
            center: {
                lat: 40,
                lng: 10
            },
            zoom: 2
        });
        const icons = [
            'assets/img/wi-cloudy.svg',
            'assets/img/wi-day-lightning.svg',
            'assets/img/wi-day-sunny.svg',
            'assets/img/wi-hot.svg',
            'assets/img/wi-showers.svg'
        ];
        const infoWindow = new google.maps.InfoWindow;
        const $xhr = $.ajax('assets/ajax/locations.json')
            .done((response) => {
                if (response.success) {
                    response.data.forEach(item => {
                        const center = {
                            lat: item.lat,
                            lng: item.lng
                        }
                        const markerImage = {
                            url: icons[Math.floor(Math.random() * icons.length)],
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