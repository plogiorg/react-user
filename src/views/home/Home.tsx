import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { Filters, Header, Navbar, Search, Pagination, ItemCard } from "../../components";
import mapboxgl, { GeoJSONSourceRaw } from "mapbox-gl";
import { useEffect, useRef } from "react";
import Config from "../../config";

interface MovingObject {
  id: number;
  name: string;
  coordinates: number[];
}

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);

  const movingObjects: MovingObject[] = [
  ];


  useEffect(() => {
    mapboxgl.accessToken = Config.MAPBOX_KEY;

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [46.727646726986976, 24.664025291997973],
        zoom: 8,
        maxZoom: 15,
      });
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      // Add your custom markers and lines here
      movingObjects.forEach((object) => {
        // Add object point source and layer
        map.addSource(`object-source-${object.id}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: `object-layer-${object.id}`,
          type: "symbol",
          source: `object-source-${object.id}`,
          layout: {
            "icon-image": "custom-marker",
            "icon-size": 0.09,
            "icon-allow-overlap": true,
          },
        });

        // Add object line source and layer
        map.addSource(`object-line-source-${object.id}`, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: `object-line-layer-${object.id}`,
          type: "line",
          source: `object-line-source-${object.id}`,
          paint: {
            "line-color": "#00ff00", // Change line color to green
            "line-width": 2,
          },
        });

        // Initialize object path
        object.path = [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: object.coordinates,
            },
            properties: {
              name: object.name,
            },
          },
        ];
      });

      setInterval(() => {
        movingObjects.forEach((object) => {
          object.coordinates = [
            object.coordinates[0] + 0.01 * Math.random(),
            object.coordinates[1] + 0.01 * Math.random(),
          ];

          const source = map.getSource(`object-source-${object.id}`);

          if (source && source.type === "geojson") {
            const newFeature = {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: object.coordinates,
              },
              properties: {
                name: object.name,
              },
            };

            source.setData({
              type: "FeatureCollection",
              features: [newFeature],
            });

            const lineSource = map.getSource(`object-line-source-${object.id}`);
            if (lineSource && lineSource.type === "geojson") {
              // Update object path
              object.path.push(newFeature);

              const lineStringFeature = {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: object.path.map((f) => f.geometry.coordinates),
                },
                properties: {},
              };

              lineSource.setData({
                type: "FeatureCollection",
                features: object.path.length > 1 ? [lineStringFeature] : [],
              });
            }
          }
        });
      }, 20000); // Update every 20 seconds

      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{
          height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', md: '60% 40%' },
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        <Stack
          sx={{
            backgroundColor: 'background.surface',
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Header />
          <Search />
        </Stack>
        {<Box
          sx={{
            gridRow: "span 3",
            display: { xs: "none", md: "flex" },
          }}
        >
          <div
            ref={mapContainer}
            style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
          />
        </Box>}
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters />
          <Stack spacing={2} sx={{ overflow: 'auto' }}>
            <ItemCard
              title="A Cool and fastest way to deliver your prodducts"
              category="Entire fleet to deliver in Riyadh"
              rareFind
              image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
            />
            <ItemCard
              title="Warehouse Rentals"
              category="Entire warehoses rental in business district"
              liked
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400"
            />
            <ItemCard
              title="5 minute delivery guranteed"
              category="Entire delivery unit in Carlton"
              image="https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&w=400"
            />
            <ItemCard
              title="Magnificent ways to dispatch you're workflow"
              category="Entire fleet to dispatch at your hand"
              image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400"
            />
            <ItemCard
              title="One click delivery"
              category="Entire fleet to dispatch at your hand"
              image="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400"
            />
            <ItemCard
              title="Endless new cars to rent"
              category="An Amazing Cars To Rent"
              image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400"
            />
            <ItemCard
              title="Single Delivery Hero as an army"
              category="Delivery Hero that can reach your loaction in a bit"
              image="https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=400"
            />
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}
