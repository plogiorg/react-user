import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import { Header, Navbar, TwoSidedLayout, ItemCard, SelectCard } from "../../components";
import "mapbox-gl/dist/mapbox-gl.css";
import  { useEffect, useState } from "react";
import { GetServiceParams, Service, ServiceType, useGetService, useServicesList, useServiceTypes } from "../../api";
import { CircularProgress, Grid, Modal, ModalDialog, ToggleButtonGroup } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { ArrowForward } from "@mui/icons-material";
import Star from "@mui/icons-material/Star";
import Phone from "@mui/icons-material/Phone";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import ModalClose from "@mui/joy/ModalClose";
import Link from "@mui/joy/Link";

export default function Home() {
  const [params, setParams] = useState<GetServiceParams>({});
  const {isLoading, data:services, refetch} = useServicesList(params)
  const [selectedType, setSelectedType] = useState<ServiceType | undefined>()
  const {isLoading: isTypesLoading, data:serviceTypes} = useServiceTypes()
  const {isLoading: isDetailLoading, data:serviceDetail, mutateAsync:getService} = useGetService()
  const [signupType, setSignupType] = useState<string | null>("user")
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()


 const handleTypeSelect = (type:ServiceType) => {
    setSelectedType(type)
   if(selectedType?.id == type.id){
     return setParams(prevState => ({
       ...prevState,
       typeId: undefined
     }));
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
      return <CircularProgress variant="soft" />
    }

    return <Grid container direction="row" display="flex" spacing={2} sx={{ flexGrow: 1 }}>
      <Grid direction="row" display={"flex"} gap={2} xs={8}>
        {serviceTypes?.types.map((type) =>(
          <SelectCard selected={type.id == selectedType?.id} title={type.title} onClick={() => handleTypeSelect(type)} description={type.description}/>
        ))}
      </Grid>
    </Grid>
  }
  const renderItems = () =>{
    if(isLoading)
      return <CircularProgress variant="soft" />

    return services?.services.map((service, index) => (
      <Grid xs={2} sm={4} md={4} key={index}>
        <ItemCard
          onClick={() => handleServiceSelect(service)}
          key={service.id}
          price={service.price}
          title={service.description}
          category={service.id}
          image={"https://react-user-pi.s3.us-west-1.amazonaws.com/WhatsApp+Image+2024-03-02+at+17.49.29.jpeg"} // Use service.image instead of hard-coded value
        />
      </Grid>

    ));

  }

  const renderServiceDetails = ()=> {
    if (isDetailLoading || !serviceDetail) return <CircularProgress />;
    return <Stack direction={"column"} spacing={1}>
      <Typography level={"h3"}>Service By: {`${serviceDetail?.service.userInfo.firstName} ${serviceDetail?.service.userInfo.lastName}`}</Typography>
      <Typography>{serviceDetail?.service ? serviceDetail.service.description : ""}</Typography>
      <Typography>{serviceDetail?.service ? serviceDetail.service.address : ""}</Typography>
      <Link endDecorator={<Phone />}
            href={`tel:${serviceDetail?.service.userInfo?.attributes?.phone[0] && ""}`}>{serviceDetail?.service.userInfo?.attributes?.phone[0]}</Link>
      <Link endDecorator={<WhatsApp />}
            href={`https://api.whatsapp.com/send?phone=${serviceDetail?.service.userInfo?.attributes?.phone[0] || ""}`}>WhatsApp</Link>
    </Stack>;
  }

  useEffect(() => {
    refetch();
  }, [params.search, params.city, params.priceTo, params.typeId]);


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
                A large headlinerer about our product features & services
              </Typography>
              <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                A descriptive secondary text placeholder. Use it to explain your business
                offer better.
              </Typography>
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
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Typography  textColor="primary">
          <a href="/tos">Terms and Conditions</a>
        </Typography>
      </Box>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog>
          <ModalClose />
          {renderServiceDetails()}
        </ModalDialog>
      </Modal>
    </CssVarsProvider>
  );
}
