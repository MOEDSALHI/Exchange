import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        padding: '12px',
        borderTop: '1px solid #ddd',
        mt: 4,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Convertisseur de Devises
      </Typography>
    </Box>
  );
};

export default Footer;
