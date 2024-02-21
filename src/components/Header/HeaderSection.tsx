import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function HeaderSection() {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
        <Typography level="h2">Pi Logistics Services</Typography>
      </Stack>
      <Typography level="body-md" color="neutral">
        Explore the different variety of services and pay using Pi Coin.
      </Typography>
    </Stack>
  );
}
