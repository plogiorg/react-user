import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { useSignup } from "../../api";
import { LOCALSTORAGE_KEYS } from "../../constants";
import { useNavigate } from "react-router-dom";
import { CountrySelector } from "../../components";
import { useState } from "react";
// import GoogleIcon from '../../assets/react.svg';

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  email: HTMLInputElement;
  phone: HTMLInputElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement
}
interface SignupFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...other}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Signup() {
  const { mutateAsync: signup, isLoading } = useSignup();
  const [country, setCountry] = useState({ code: '', label: '', phone: '' });
  const navigate = useNavigate()
  const onSignupError = (error: NonNullable<unknown>) => {
    console.log(error);
  };

  const onSignupSuccess = (data: any) => {
    localStorage.setItem(LOCALSTORAGE_KEYS.TOKEN, data?.access_token);
    // dispatchLogin(data)
    navigate("/")
    console.log("signed up..");
  };
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Company logo</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h3">Signup</Typography>
                <Typography level="body-sm">
                  Already Have an Account?{" "}
                  <Link href="#replace-with-a-link" level="title-sm">
                    Sign In!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                disabled={true}
                color="neutral"
                fullWidth
                // startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                  "--Divider-lineColor": {
                    xs: "#FFF",
                    md: "var(--joy-palette-divider)",
                  },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form
                onSubmit={async (event: React.FormEvent<SignupFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    username: formElements.username.value,
                    password: formElements.password.value,
                    firstName: formElements.firstName.value,
                    lastName: formElements.lastName.value,
                    email: formElements.email.value,
                    phone: formElements.phone.value,
                    country: "",
                  };
                  console.log({data});
                  console.log(formElements.confirmPassword.value, "confirm");

                  if (formElements.confirmPassword.value !== data.password) return
                  // if (!country.code) return

                  data.phone = `+${country.phone}${data.phone}`
                  data.country = country.code
                  try {
                    await signup(data, {
                      onSuccess: onSignupSuccess,
                      // @ts-expect-error error is unknown at the moment
                      onError: onSignupError,
                    });
                  } catch (e) {
                    console.log({ e });
                  }
                }}
              >
                <FormControl required>
                  <FormLabel>First Name</FormLabel>
                  <Input type="firstName" name="firstName" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="lastName" name="lastName" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Username</FormLabel>
                  <Input type="username" name="username" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>

                <FormControl required>
                  <FormLabel>Password Confirmation</FormLabel>
                  <Input type="password" name="confirmPassword" />
                </FormControl>

                <div>
                  <CountrySelector key="country" onCountrySelect={(country:any) => {
                   setCountry(country.value)
                  }}  />
                </div>

                <FormControl required>
                  <FormLabel>Phone</FormLabel>
                  <Input type="phone" placeholder="1xxxxxxxx" name="phone" />
                </FormControl>

                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                  </Box>
                  <Button type="submit" fullWidth loading={isLoading}>
                    Signup
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
