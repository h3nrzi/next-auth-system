import FormDialog from '@/components/FormDialog';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

const HomePage = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <FormDialog />
    </Box>
  );
};

export default HomePage;
