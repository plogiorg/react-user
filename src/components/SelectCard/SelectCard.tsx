import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';


type InteractiveCardProps = {
  image?: string;
  liked?: boolean;
  rareFind?: boolean;
  title: React.ReactNode;
  description:string
  selected?:boolean
  onClick?: () => void
};


function InteractiveCard(props: InteractiveCardProps) {
  return (
   <div onClick={props.onClick}>
     <Card
       variant="outlined"
       orientation="horizontal"
       sx={{
         width: 320,
         '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder'},
         borderColor: props.selected ? "indigo" : "neutral.outlinedHoverBorder"
       }}
     >
       <AspectRatio ratio="1" sx={{ width: 90 }}>
         <img
           src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
           srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
           loading="lazy"
           alt=""
         />
       </AspectRatio>
       <CardContent sx={{justifyContent: "center"}}>
         <Typography level="body-lg" justifyContent="center" aria-describedby="card-description" mb={1}>
           <Link
             overlay
             underline="none"
             href="#interactive-card"
             sx={{ color: 'text.tertiary' }}
           >
             {props.title}
           </Link>
         </Typography>

         <Typography level="body-lg" justifyContent="center" aria-describedby="card-description" mb={1}>
             {props.description}
         </Typography>
       </CardContent>
     </Card>
   </div>
  );
}

export default InteractiveCard