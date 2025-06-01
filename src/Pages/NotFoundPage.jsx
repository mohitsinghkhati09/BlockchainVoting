import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // For a "Go to Home" button
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'; // Icon for error
import HomeIcon from '@mui/icons-material/Home';

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 128px)', // Assuming Navbar + Footer height is around 128px. Adjust if needed.
                                         // If used without Nav/Footer, this ensures it takes full viewport height.
        textAlign: 'center',
        py: { xs: 4, md: 8 },
        backgroundColor: 'background.default', // Use theme background
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ReportProblemOutlinedIcon
            sx={{
              fontSize: { xs: '4rem', sm: '6rem' },
              color: 'warning.main', // Using warning color for error indication
              mb: 2,
            }}
          />
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '3rem', sm: '4.5rem' },
              color: 'text.primary',
              mb: 1,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color="text.secondary"
            sx={{
              fontWeight: 'medium',
              mb: 3,
            }}
          >
            Oops! Page Not Found
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Please check the URL for any mistakes
            or navigate back to safety.
          </Typography>
          <Button
            component={RouterLink}
            to="/" // Navigates to the homepage
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              borderRadius: '20px',
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
            }}
          >
            Go to Homepage
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}