import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';
import { useState } from "react";

type SearchProps = {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log({searchTerm});
    onSearch(searchTerm);
  };
  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <Input
            placeholder="Search"
            value={searchTerm}
            startDecorator={<SearchRoundedIcon />}
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FormControl>
        <Button variant="solid" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Stack>
      <Typography level="body-sm">232 Services in Riyadh, Saudi Arabia</Typography>
    </div>
  );
}
export default Search