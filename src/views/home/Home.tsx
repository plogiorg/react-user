import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { Filters, Header, Navbar, Search, Pagination, ItemCard } from "../../components";
import mapboxgl from "mapbox-gl";
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Config from "../../config";
import { GetServiceParams, Service, useServicesList } from "../../api";
import { CircularProgress } from "@mui/joy";
import { CountryType } from "../../components/CountrySelector/CountrySelector.tsx";

export default function Home() {
  const [params, setParams] = useState<GetServiceParams>({});
  const {isLoading, data:services, refetch} = useServicesList(params)
  const mapRef = useRef(null);
  const geoControlRef = useCallback((ref:mapboxgl.GeolocateControl) => {
    if (ref) {
      (async () => {
        while (!mapRef.current) await ((() => new Promise((resolve) => setTimeout(resolve, 200)))())
        ref.trigger();
      })()
    }
  }, []);


  const renderItems = () =>{
    if(isLoading)
      return <CircularProgress variant="soft" />


    return services?.services.map((service) => (
      <ItemCard
        key={service.id}
        price={service.price}
        title={service.description}
        category={service.id}
        image={"https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&w=400"} // Use service.image instead of hard-coded value
      />
    ));

  }

  useEffect(() => {
    refetch()
  }, [params.search, params.city, params.priceTo])

  const handleSearch = (searchTerm: string) => {
    setParams(prevState => ({
      ...prevState,
      search: searchTerm
    }));
  }

  const handleCityChange = (city:CountryType) => {
    if(city){
      return setParams(prevState => ({
        ...prevState,
        city: city.label
      }));
    }

    setParams(prevState => ({
      ...prevState,
      city: ""
    }));
  }

  const handleRangeChange = (value:number[]) => {
    setParams(prevState => ({
      ...prevState,
      priceFrom: value[0],
      priceTo: value[1],
    }));
  }

   const popup = ((service:Service) => {
    return new mapboxgl.Popup().setText(service.description);
  })


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
          <Search onSearch={handleSearch} />
        </Stack>
        {<Box
          sx={{
            gridRow: "span 3",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Map
            mapboxAccessToken={Config.MAPBOX_KEY}
            ref={mapRef}
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 3.5,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showUserLocation={true}
              ref={geoControlRef}
            />

            {services && services.services.map((service) => (
              <Marker
                key={service.id}
                longitude={service.lan}
                latitude={service.lat}
                popup={popup(service)}
              >
              </Marker>
            ))}
          </Map>
        </Box>}
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters onCountryChange={handleCityChange} onRangeChange={handleRangeChange} />
          <Stack spacing={2} sx={{ overflow: 'auto' }}>
            {renderItems()}
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}
