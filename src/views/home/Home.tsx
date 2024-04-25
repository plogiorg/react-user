import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { Header, Navbar, TwoSidedLayout, ItemCard, SelectCard } from "../../components";
import "mapbox-gl/dist/mapbox-gl.css";
import  { useEffect, useState } from "react";
import { GetServiceParams, Service, ServiceType, useGetService, useServicesList, useServiceTypes } from "../../api";
import { Alert, CircularProgress, Grid, Modal, ModalDialog, ToggleButtonGroup } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { ArrowForward, Info, Money } from "@mui/icons-material";
import Star from "@mui/icons-material/Star";
import Phone from "@mui/icons-material/Phone";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import ModalClose from "@mui/joy/ModalClose";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Card from "@mui/joy/Card";
import Link from "@mui/joy/Link";

export default function Home() {
  const [params, setParams] = useState<GetServiceParams>({});
  const {isLoading, isFetching, data:services, refetch} = useServicesList(params)
  const [selectedType, setSelectedType] = useState<ServiceType | undefined>()
  const {isLoading: isTypesLoading, data:serviceTypes} = useServiceTypes()
  const {isLoading: isDetailLoading, data:serviceDetail, mutateAsync:getService} = useGetService()
  const [signupType, setSignupType] = useState<string | null>("user")
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()


 const handleTypeSelect = (type:ServiceType) => {
    setSelectedType(type)
   if(selectedType?.id == type.id){
     setSelectedType(undefined)
     return setParams(prevState => {
       const { typeId, ...rest } = prevState;
       return rest;
     });
   }
   return setParams(prevState => ({
     ...prevState,
     typeId: type.id
   }));

  }

  const handleServiceSelect = async (service: Service) => {
    // setSelectedService(service)
    setModalOpen(true )
    await getService(service.id)
  }

  const handleUserSignupNavigate = ()=>{
    if(signupType == "provider"){
      window.location.href = "https://provider.plogi.app/signup"
    }else {
      navigate("/auth/register/")
      console.log("user signup");
    }

  }
  const renderTypes = () => {
    if(isTypesLoading){
      return <Box justifyContent="center"> <CircularProgress variant="soft" /></Box>
    }

    return <Grid container direction="row" display="flex" spacing={2} sx={{ flexGrow: 1 }}>
      <Grid direction="row" display={"flex"} gap={2} xs={8}>
        {serviceTypes?.types.map((type) =>(
          <SelectCard key={type.id} image={type.image} selected={type.id == selectedType?.id} title={type.title} onClick={() => handleTypeSelect(type)} description={type.description}/>
        ))}
      </Grid>
    </Grid>
  }
  const renderItems = () =>{
    if(isLoading || isFetching)
      return <Box width="100%" display="flex" justifyContent="center"><CircularProgress variant="soft" /></Box>

    if(!services?.services.length){
      return <Box justifyContent="center" width="100%" display="flex">
        <Alert
          color="primary"
          variant="outlined"
          invertedColors
          startDecorator={
            <AspectRatio
              variant="outlined"
              ratio="1"
              sx={{
                minWidth: 40,
                borderRadius: '50%',
              }}
            >
              <div>
                <Info fontSize="large" />
              </div>
            </AspectRatio>
          }
          sx={{ alignItems: 'flex-start', overflow: 'hidden' }}
        >
          <div>
            <Typography level="title-lg">No Data</Typography>
            <Typography level="body-sm">
              No Current Services For The Selected Type.
            </Typography>
          </div>
        </Alert>
      </Box>
    }

    return services?.services.map((service, index) => (
      <Grid xs={2} sm={4} md={4} key={index}>
        <ItemCard
          onClick={() => handleServiceSelect(service)}
          key={service.id}
          price={service.price}
          image={service?.serviceType?.image}
          title={service.description}
          category={service.id}
        />
      </Grid>

    ));

  }

  const renderServiceDetails = ()=> {
    if (isDetailLoading || !serviceDetail) return <CircularProgress />;

    return <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">{serviceDetail?.service.serviceType.title}</Typography>
        <Typography level="body-sm">{new Date(serviceDetail?.service.createdAt).toLocaleDateString()}</Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={serviceDetail?.service.serviceType?.image}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">By:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {`${serviceDetail?.service.userInfo.firstName} ${serviceDetail?.service.userInfo.lastName}`}
          </Typography>
        </div>

        {/*<Button*/}
        {/*  variant="solid"*/}
        {/*  endDecorator={<Phone />}*/}
        {/*  href={`tel:${serviceDetail?.service.userInfo?.attributes?.phone[0] && ""}`}*/}
        {/*  size="md"*/}
        {/*  color="primary"*/}
        {/*  aria-label="Explore Service"*/}
        {/*  sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}*/}
        {/*>*/}
        {/*  Call*/}
        {/*</Button>*/}
      </CardContent>
      <div>
        <Grid direction="column" gap={1} flexDirection="row" display="flex" spacing={3}>
          <Link href={`https://api.whatsapp.com/send?phone=${serviceDetail?.service.userInfo?.attributes?.phone[0] || ""}`}>
            <Button
              variant="outlined"
              endDecorator={<WhatsApp />}
              size="sm"
              color="success"
              aria-label="Explore Service"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              WhatsApp
            </Button>
          </Link>
          <Link href={`tel:${serviceDetail?.service.userInfo?.attributes?.phone[0] && ""}`}>
            <Button
              variant="outlined"
              endDecorator={<Phone />}
              size="sm"
              color="warning"
              aria-label="Explore Service"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              Call
            </Button>
          </Link>
          <Button
            variant="outlined"
            endDecorator={<Money />}
            size="sm"
            href={`tel:${serviceDetail?.service.userInfo?.attributes?.phone[0] && ""}`}
            color="neutral"
            aria-label="Explore Service"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
          >
            Pay
          </Button>
        </Grid>
      </div>
    </Card>

  }

  useEffect(() => {
    if(params.isPromoted){
      delete params.typeId
    }
    refetch();
  }, [params.search, params.city, params.priceTo, params.typeId, params.isPromoted]);


  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{}}
      >
        <Stack
          sx={{
            backgroundColor: "background.surface",
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Header />
          {/*<Search onSearch={handleSearch} />*/}

          <div>
            <TwoSidedLayout>
              <Typography color="primary" fontSize="lg" fontWeight="lg">
                The power to do more
              </Typography>
              <Typography
                level="h1"
                fontWeight="xl"
                fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
              >
                PI Network: Your Key to Premium Services
              </Typography>
              <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                Our website serves the worldwide PI Network currency community with top-notch car rentals, goods
                transportation, delivery, and logistics services. Valuable services for a valuable
                currency. </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  my: 2,
                  flexWrap: 'wrap',
                  '& > *': { flex: 'auto' },
                }}
              >
                <ToggleButtonGroup
                  value={signupType}
                  onChange={(_, newValue) => {
                    setSignupType(newValue);
                  }}
                  sx={{ justifyContent: "center"}}
                >
                  <Button value="user">I'm User</Button>
                  <Button value="provider">I Have Service</Button>
                </ToggleButtonGroup>
                <Input size="lg" placeholder="Sign in with email" />
                <Button size="lg" onClick={handleUserSignupNavigate} endDecorator={<ArrowForward fontSize="large" />}>
                  Get Started
                </Button>
              </Box>
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  textAlign: 'center',
                  alignSelf: 'stretch',
                  columnGap: 4.5,
                  '& > *': {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    flex: 1,
                  },
                  [theme.breakpoints.up(834)]: {
                    textAlign: 'left',
                    '& > *': {
                      flexDirection: 'row',
                      gap: 1.5,
                      justifyContent: 'initial',
                      flexWrap: 'nowrap',
                      flex: 'none',
                    },
                  },
                })}
              >
                <div>
                  <Typography
                    fontSize="xl4"
                    fontWeight="lg"
                    endDecorator={<Star fontSize="large" sx={{ color: 'warning.300' }} />}
                  >
                    4.9
                  </Typography>
                  <Typography textColor="text.secondary">
                    Over <b>5k</b> positive <br /> customer reviews.
                  </Typography>
                </div>
                <div>
                  <Typography fontSize="xl4" fontWeight="lg">
                    2M
                  </Typography>
                  <Typography textColor="text.secondary">
                    Global <br /> Transactions.
                  </Typography>
                </div>
              </Box>
            </TwoSidedLayout>
          </div>


          <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
            {/*<Filters onCountryChange={handleCityChange} onRangeChange={handleRangeChange} />*/}
            <Typography
              level="h3"
              fontWeight="xl"
              fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
              Our Services
            </Typography>
            <Stack direction="row" overflow="scroll" spacing={1} justifyContent="center">
              {renderTypes()}
            </Stack>

            <Typography
              alignSelf={"self-end"}
              level="h3"
              fontWeight="xl"
              fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
            >
              Our Offers
            </Typography>
            <Grid
              overflow="scroll"
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ flexGrow: 1 }}
            >
              {renderItems()}
            </Grid>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: 'background.surface',
          px: { xs: 2, md: 4 },
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
        }}
      >
        <Typography  textColor="text.secondary">
          &copy; {new Date().getFullYear()} PLogi. All rights reserved.
        </Typography>
        <Typography  textColor="primary">
          <a href="/tos">Terms and Conditions</a>
        </Typography>
      </Box>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog sx={{p:1}}>
          <ModalClose />
          {renderServiceDetails()}
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  );
}
