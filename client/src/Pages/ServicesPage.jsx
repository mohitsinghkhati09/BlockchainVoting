import React from 'react';
import {
  Container, Typography, Box, Grid, AppBar, Toolbar, Button, Link as MuiLink,
  CssBaseline, IconButton, Paper, Avatar, Card, CardContent, CardActions
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Icons (Import all necessary icons directly here)
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import GavelIcon from "@mui/icons-material/Gavel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

// --- Service Data (Defined directly in this file) ---
const registrationServices = [
  { id: "form-6", icon: <AssignmentIndIcon fontSize="large" color="primary" />, title: "New Voter Registration", description: "Enroll for the first time (Form 6).", actionText: "Register Now", path: "/forms/form-6" },
  { id: "form-6a", icon: <AssignmentIndIcon fontSize="large" color="primary" />, title: "Overseas Voter Registration", description: "For NRI electors (Form 6A).", actionText: "Register (NRI)", path: "/forms/form-6a" },
];

const correctionServices = [
  { id: "form-8", icon: <EditIcon fontSize="large" color="primary" />, title: "Correction / Shifting", description: "Update details, shift residence, replace EPIC, mark PwD (Form 8).", actionText: "Apply Form 8", path: "/forms/form-8" },
  { id: "form-7", icon: <DeleteForeverIcon fontSize="large" color="error" />, title: "Deletion / Objection", description: "Request deletion or raise objection (Form 7).", actionText: "Submit Form 7", path: "/forms/form-7" },
  { id: "form-6b", icon: <FingerprintIcon fontSize="large" color="primary" />, title: "Aadhaar Collection", description: "Link your Aadhaar with Voter ID (Form 6B).", actionText: "Link Aadhaar", path: "/forms/form-6b" },
];

const informationServices = [
  { id: "search-roll", icon: <SearchIcon fontSize="large" color="secondary" />, title: "Search in Electoral Roll", description: "Check your name and details in the voter list.", actionText: "Search Name", path: "/services/search-electoral-roll" },
  { id: "download-epic", icon: <CloudDownloadIcon fontSize="large" color="secondary" />, title: "Download e-EPIC", description: "Get your digital Voter ID Card.", actionText: "Download Card", path: "/services/download-epic" },
  { id: "track-status", icon: <TrackChangesIcon fontSize="large" color="secondary" />, title: "Track Application Status", description: "Check the status of your submitted forms.", actionText: "Track Status", path: "/track-application" },
  { id: "polling-station", icon: <LocationOnIcon fontSize="large" color="secondary" />, title: "Know Polling Station", description: "Locate your assigned polling station.", actionText: "Find Booth", path: "/know-your-details/polling-station" },
  { id: "officers", icon: <PersonSearchIcon fontSize="large" color="secondary" />, title: "Know Your BLO/ERO", description: "Find your Booth Level Officer & Electoral Officers.", actionText: "Find Officers", path: "/know-your-details/officers" },
  { id: "candidate-affidavits", icon: <HowToVoteIcon fontSize="large" color="secondary" />, title: "Candidate Affidavits", description: "View affidavits submitted by candidates.", actionText: "View Affidavits", path: "/know-your-details/candidate-affidavits" },
];

const grievanceServices = [
    { id: "file-complaint", icon: <GavelIcon fontSize="large" color="primary" />, title: "File / Track Complaint", description: "Register a grievance or track existing one.", actionText: "Lodge Grievance", path: "/services/grievance" },
];


// --- GenericServiceCard Component (Defined directly in this file) ---
function GenericServiceCard({ icon, title, description, actionText, path, cardColor = "background.paper" }) {
  const navigate = useNavigate(); // Make sure useNavigate is imported from react-router-dom
  const handleClick = () => {
    if (path) {
      navigate(path);
    } else {
      alert(`Action for "${title}" path not configured.`);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: cardColor, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.12)', transform: 'translateY(-4px)'}, transition: 'all 0.25s ease-in-out' }}>
        <CardContent sx={{ flexGrow: 1, textAlign: "center", p: {xs: 2, md:3} }}>
          <Avatar sx={{ bgcolor: 'primary.light', width: 64, height: 64, margin: '0 auto 20px auto', color:'white', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            {React.cloneElement(icon, { sx: { fontSize: '2rem' } })}
          </Avatar>
          <Typography gutterBottom variant="h6" component="h3" sx={{color: 'primary.dark', fontWeight: '600', minHeight: {xs: 'auto', md:'2.5em'} }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{minHeight: {xs: 'auto', md:'3em'}, lineHeight: 1.6}}>
            {description}
          </Typography>
        </CardContent>
        {actionText && (
          <CardActions sx={{ justifyContent: "center", pb: 2, pt:0, px:2 }}>
            <Button size="medium" variant="contained" color="primary" onClick={handleClick} fullWidth sx={{borderRadius: 2, fontWeight: 'bold'}}>
              {actionText}
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}


// --- Optional Basic Navbar for Self-Contained Page ---
function ServicesPageNavbar() {
  return (
    <AppBar position="static" color="primary" elevation={1} sx={{mb:0}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton component={RouterLink} to="/" color="inherit" edge="start" sx={{mr:1}}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Voter Services
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// --- Optional Basic Footer for Self-Contained Page ---
function ServicesPageFooter() {
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

// --- Helper Component for Sections ---
const Section = ({ title, services, bgColor }) => (
  <Box sx={{ py: {xs:4, md:6}, backgroundColor: bgColor }}>
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: {xs:3, md:5}, fontWeight: 'bold', color: bgColor ? 'inherit' : 'primary.dark' }}>
        {title}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {services.map((service) => (
          <GenericServiceCard // Now uses the locally defined GenericServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
            actionText={service.actionText}
            path={service.path}
            cardColor={bgColor ? 'background.paper' : undefined }
          />
        ))}
      </Grid>
    </Container>
  </Box>
);


export default function ServicesPage() {
  const navigate = useNavigate(); // Keep for any potential navigation within this page itself

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* OPTION: Internal Navbar. Comment out if using global Navbar from userRoutes.js */}
      {/* <ServicesPageNavbar /> */}

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl" sx={{pt: {xs:3, md:5}, pb:2}}>
            <Paper elevation={0} sx={{p: {xs:2, md:3}, mb: {xs:3, md:4}, backgroundColor: 'transparent'}}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <Avatar sx={{bgcolor: 'primary.main', width: 56, height: 56}}>
                            <HowToVoteIcon fontSize="large"/>
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                            Our Services
                        </Typography>
                        <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 0 }}>
                            Explore a comprehensive suite of online tools and information to manage your electoral participation.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>

        <Section
          title="New Voter Registrations"
          services={registrationServices} // Uses locally defined data
        />

        <Section
          title="Corrections, Updates & Deletions"
          services={correctionServices} // Uses locally defined data
          bgColor="alternate.main" // Example: use theme.palette.grey[100] or a custom theme color
        />

        <Section
          title="Information, Downloads & Tracking"
          services={informationServices} // Uses locally defined data
        />

        <Section
          title="Grievance Redressal"
          services={grievanceServices} // Uses locally defined data
          bgColor="alternate.main"
        />

        <Box sx={{ py: {xs:4, md:6}, textAlign:'center', backgroundColor: 'background.paper' }}>
            <Container maxWidth="sm">
                <Typography variant="h5" gutterBottom sx={{fontWeight: 'medium'}}>
                    Need Further Assistance?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{mb:3}}>
                    If you can't find the service you're looking for, or require additional help, please visit our support sections.
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button component={RouterLink} to="/faqs" variant="contained" color="primary" size="large">
                            View FAQs
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button component={RouterLink} to="/contact-us" variant="outlined" color="primary" size="large">
                            Contact Support
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
      </Box>

      {/* OPTION: Internal Footer. Comment out if using global Footer from userRoutes.js */}
      {/* <ServicesPageFooter /> */}
    </Box>
  );
}