import React from 'react';
import {
  Container, Typography, Box, AppBar, Toolbar, Button, Link as MuiLink,
  CssBaseline, IconButton, Paper, List, ListItem, ListItemText, ListItemIcon,
  Divider, Grid, Avatar // Added Grid, Avatar for header
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description'; // For forms list
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // For list item action

// --- Forms Data (Defined directly in this file) ---
const formsData = [
  {
    id: 'form-6',
    name: 'Form 6',
    title: 'Application for New Voter Registration',
    description: 'For inclusion of name in Electoral Roll for the first time or on shifting from one constituency to another.',
    path: '/forms/form-6', // Path to the detail page for Form 6
  },
  {
    id: 'form-6a',
    name: 'Form 6A',
    title: 'Application for Overseas (NRI) Elector Registration',
    description: 'For inclusion of name in Electoral Roll by an Overseas (NRI) Elector.',
    path: '/forms/form-6a',
  },
  {
    id: 'form-6b',
    name: 'Form 6B',
    title: 'Letter of Information of Aadhaar Number',
    description: 'For the purpose of electoral roll authentication by existing electors.',
    path: '/forms/form-6b',
  },
  {
    id: 'form-7',
    name: 'Form 7',
    title: 'Objection or Request for Deletion of Name',
    description: 'For objecting to a proposed inclusion or for deletion of a name in the Electoral Roll.',
    path: '/forms/form-7',
  },
  {
    id: 'form-8',
    name: 'Form 8',
    title: 'Application for Shifting, Correction, Replacement EPIC & PwD Marking',
    description: 'For shifting of residence, correction of entries, issue of replacement EPIC, or marking as a Person with Disability (PwD).',
    path: '/forms/form-8',
  },
  // Add more forms as needed
  // {
  //   id: 'form-...',
  //   name: 'Form ...',
  //   title: 'Title of Another Form',
  //   description: 'Brief description of what this form is for.',
  //   path: '/forms/form-...',
  // },
];


// --- Optional Basic Navbar for Self-Contained Page ---
function FormsPageNavbar() {
  return (
    <AppBar position="static" color="primary" elevation={1} sx={{ mb: 0 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton component={RouterLink} to="/" color="inherit" edge="start" sx={{ mr: 1 }}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Voter Forms
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// --- Optional Basic Footer for Self-Contained Page ---
function FormsPageFooter() {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800], borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '} <MuiLink component={RouterLink} color="inherit" to="/">Voter Service Portal</MuiLink>{' '}{new Date().getFullYear()}{'.'}
        </Typography>
      </Container>
    </Box>
  );
}


export default function FormsPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* OPTION: Internal Navbar. Comment out if using global Navbar from userRoutes.js */}
      {/* <FormsPageNavbar /> */}

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'background.default', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: { xs: 3, md: 4 }, backgroundColor: 'transparent' }}>
            <Grid container alignItems="center" spacing={2} justifyContent="center" textAlign="center">
              <Grid item>
                <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, color: 'white' }}>
                  <DescriptionIcon sx={{ fontSize: '2.5rem' }} />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h2" component="h1" sx={{ fontWeight: 600, color: 'primary.dark', mb:1 }}>
                  Electoral Forms
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 0, maxWidth: '700px', mx:'auto' }}>
                  Access and learn about the various forms required for voter registration, updates, and other electoral services.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' /* To ensure rounded corners with List */ }}>
            <List sx={{ p: 0 /* Remove padding from List itself */ }}>
              {formsData.map((form, index) => (
                <React.Fragment key={form.id}>
                  <ListItem
                    button // Makes the entire item clickable
                    onClick={() => navigate(form.path)}
                    sx={{
                      py: 2.5, // Increased padding
                      px: 3,
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="go to form" onClick={() => navigate(form.path)}>
                        <ArrowForwardIosIcon color="primary" />
                      </IconButton>
                    }
                  >
                    <ListItemIcon sx={{minWidth: 40, color: 'primary.main'}}>
                      {/* Could use a generic form icon or specific icons per form type if available */}
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" component="span" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                          {form.name}: {form.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
                          {form.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < formsData.length - 1 && <Divider component="li" variant="inset" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

           <Box sx={{ mt: {xs: 4, md: 6}, p: {xs:2, md:3}, textAlign: 'center'}}>
            <Typography variant="body1" color="text.secondary" sx={{mb:2}}>
              Please ensure you select the correct form for your requirement. For detailed instructions, click on the respective form.
            </Typography>
            <Button component={RouterLink} to="/faqs#forms" variant="outlined" color="primary" size="large">
              View Form-related FAQs
            </Button>
          </Box>

        </Container>
      </Box>

      {/* OPTION: Internal Footer. Comment out if using global Footer from userRoutes.js */}
      {/* <FormsPageFooter /> */}
    </Box>
  );
}