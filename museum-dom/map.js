mapboxgl.accessToken = 'pk.eyJ1IjoibXNlcnlraCIsImEiOiJja3VtbGpmY2wxc29mMnBuNmRqNGJmYWlwIn0.5Zl9ZsKOfr1NUrPitvLuFw';
const map = new mapboxgl.Map({
        container: 'map', //container ID
        style: 'mapbox://styles/mapbox/light-v10',
        center:  [2.33635, 48.86115],
        zoom: 15.7,
    });

map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker({ color: 'black'})
.setLngLat([2.3364, 48.86091])
.addTo(map);
 
const marker2 = new mapboxgl.Marker({ color: 'grey'})
.setLngLat( [2.3333, 48.8602])
.addTo(map);

const marker3 = new mapboxgl.Marker({ color: 'grey'})
.setLngLat( [2.3397, 48.8607])
.addTo(map);

const marker4 = new mapboxgl.Marker({ color: 'grey'})
.setLngLat( [2.3330, 48.8619])
.addTo(map);

const marker5 = new mapboxgl.Marker({ color: 'grey'})
.setLngLat( [2.3365, 48.8625])
.addTo(map);

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3364, 48.86091]
      },
      properties: {
        title: 'Louvre Museum'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3333, 48.8602]
      },
      properties: {
        title: 'Pavillon de la trémoille'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3330, 48.8619]
      },
      properties: {
        title: 'Arc de Triomphe du Carrousel'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3365, 48.8625]
      },
      properties: {
        title: 'Palais-Royal - Louvre Museum'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3397, 48.8607]
      },
      properties: {
        title: 'Department of Near Eastern Antiquities - Louvre Museum'
      }
    },
  ]
};
