import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Star from '@mui/icons-material/Star';

type ItemCardProps = {
  category: React.ReactNode;
  image:string;
  liked?: boolean;
  rareFind?: boolean;
  title: React.ReactNode;
  price:number
  onClick?:() => void
};

export default function ItemCard(props: ItemCardProps) {
  const { category, title, rareFind = false, liked = false , image} = props;
  const [isLiked, setIsLiked] = React.useState(liked);
  return (
   <div onClick={props.onClick}>
     <Card
       variant="outlined"
       orientation="horizontal"
       sx={{
         bgcolor: 'neutral.softBg',
         display: 'flex',
         flexDirection: { xs: 'column', sm: 'row' },
         '&:hover': {
           boxShadow: 'lg',
           borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
         },
       }}
     >
       <CardOverflow
         sx={{
           mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
           mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
           '--AspectRatio-radius': {
             xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
             sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
           },
         }}
       >
         <AspectRatio
           ratio="1.8"
           flex
         >
           <img style={{padding:"3%"}} alt="" src={image} />
           <Stack
             alignItems="center"
             direction="row"
             sx={{ position: 'absolute', top: 0, width: '100%', p: 1 }}
           >
             {rareFind && (
               <Chip
                 variant="soft"
                 color="success"
                 startDecorator={<WorkspacePremiumRoundedIcon />}
                 size="md"
               >
                 Rare find
               </Chip>
             )}
             <IconButton
               variant="plain"
               size="sm"
               color={isLiked ? 'danger' : 'neutral'}
               onClick={() => setIsLiked((prev) => !prev)}
               sx={{
                 display: { xs: 'flex', sm: 'none' },
                 ml: 'auto',
                 borderRadius: '50%',
                 zIndex: '20',
               }}
             >
               <FavoriteRoundedIcon />
             </IconButton>
           </Stack>
         </AspectRatio>
       </CardOverflow>
       <CardContent>
         <Stack
           spacing={1}
           direction="row"
           justifyContent="space-between"
           alignItems="flex-start"
         >
           <div>
             <Typography level="body-sm">{category}</Typography>
             <Typography level="title-md">
               <Link
                 overlay
                 underline="none"
                 sx={{ color: 'text.primary' }}
               >
                 {title}
               </Link>
             </Typography>
           </div>
           <IconButton
             variant="plain"
             size="sm"
             color={isLiked ? 'danger' : 'neutral'}
             onClick={() => setIsLiked((prev) => !prev)}
             sx={{
               display: { xs: 'none', sm: 'flex' },
               borderRadius: '50%',
             }}
           >
             <FavoriteRoundedIcon />
           </IconButton>
         </Stack>
         <Stack
           spacing="0.25rem 1rem"
           direction="row"
           useFlexGap
           flexWrap="wrap"
           sx={{ my: 0.25 }}
         >
           {/*<Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>*/}
           {/*  Riyadh Test*/}
           {/*</Typography>*/}
           {/*<Typography level="body-xs" startDecorator={<KingBedRoundedIcon />}>*/}
           {/*  1 bed*/}
           {/*</Typography>*/}
           {/*<Typography level="body-xs" startDecorator={<WifiRoundedIcon />}>*/}
           {/*  Wi-Fi*/}
           {/*</Typography>*/}
         </Stack>
         <Stack direction="column" sx={{ mt: 'auto' }}>
           <Typography
             level="title-sm"
             startDecorator={
               <React.Fragment>
                 <Star sx={{ color: 'warning.400' }} />
                 <Star sx={{ color: 'warning.400' }} />
                 <Star sx={{ color: 'warning.400' }} />
                 <Star sx={{ color: 'warning.400' }} />
                 <Star sx={{ color: 'warning.200' }} />
               </React.Fragment>
             }
             sx={{ display: 'flex', gap: 1 }}
           >
           </Typography>
           <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: 'right' }}>
             <strong>{props.price.toLocaleString() + "Pi"}</strong>
           </Typography>
         </Stack>
       </CardContent>
     </Card>
   </div>
  );
}
