import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card,
  CardContent, CardActions, Paper, Link as MuiLink, // Removed TextField as search is gone from hero
  CssBaseline, IconButton, Dialog, DialogTitle, DialogContent,
  Avatar, Divider, Stack // Added Stack for layout
} from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Icons (ensure these are relevant to your services and sections)
import HowToVoteIcon from "@mui/icons-material/HowToVote"; // General voting/portal icon
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"; // New Voter Registration
import EditIcon from '@mui/icons-material/Edit'; // Correction in Voter ID
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"; // Download e-EPIC
import SearchIcon from "@mui/icons-material/Search"; // For "Search in Roll" service
import PollIcon from '@mui/icons-material/Poll'; // Elections / Results
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'; // FAQs
import DescriptionIcon from '@mui/icons-material/Description'; // Forms
import HomeIcon from '@mui/icons-material/Home'; // Home
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // Login/Register
import PersonSearchIcon from '@mui/icons-material/PersonSearch'; // Could be for "Find your details" or Login Dialog
import MenuIcon from '@mui/icons-material/Menu'; // Mobile Menu
import CloseIcon from '@mui/icons-material/Close'; // Dialog Close
import CampaignIcon from '@mui/icons-material/Campaign'; // Announcements
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // For "About Us" or Info
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For highlighting features

// Social Media Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';


// --- Data for Highlighted Services (Keep this concise for the homepage) ---
const highlightedServices = [
  { id: "register-voter", icon: <AssignmentIndIcon sx={{ fontSize: 40 }} color="primary" />, title: "New Voter Registration", description: "Join the electoral roll for the first time. Quick and easy online process.", actionText: "Register Now", path: "/forms/form-6" },
  { id: "update-details", icon: <EditIcon sx={{ fontSize: 40 }} color="primary" />, title: "Update Your Details", description: "Correct or update your information on the Voter ID card.", actionText: "Update Now", path: "/forms/form-8" },
  { id: "find-name", icon: <SearchIcon sx={{ fontSize: 40 }} color="primary" />, title: "Search Your Name", description: "Verify your enrollment status in the electoral roll.", actionText: "Check Electoral Roll", path: "/services/search-electoral-roll" },
  { id: "download-id", icon: <CloudDownloadIcon sx={{ fontSize: 40 }} color="primary" />, title: "Download e-EPIC", description: "Access your digital Voter ID card anytime, anywhere.", actionText: "Get e-EPIC", path: "/services/download-epic" },
];

// --- Component: Login/Register Dialog --- (Same as before)
function LoginRegisterDialog({ open, onClose }) {
  const navigate = useNavigate();
  const handleLoginRedirect = () => { onClose(); navigate('/user-login'); };
  const handleRegisterRedirect = () => { onClose(); navigate('/register'); };
  const handleForgotPasswordRedirect = () => { onClose(); navigate('/forgot-password'); };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Access Your Account<IconButton onClick={onClose}><CloseIcon /></IconButton></DialogTitle>
      <DialogContent dividers sx={{ textAlign: 'center', p: {xs: 2, sm: 3} }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'medium' }}>Welcome Voter!</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Please choose an option below to proceed.</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button fullWidth variant="contained" color="primary" sx={{ py: 1.5, fontSize: '1rem' }} onClick={handleLoginRedirect} startIcon={<VpnKeyIcon />}>Login to Existing Account</Button>
          <Button fullWidth variant="outlined" color="secondary" sx={{ py: 1.5, fontSize: '1rem' }} onClick={handleRegisterRedirect} startIcon={<PersonSearchIcon />}>Create New Account (Register)</Button>
          <Divider sx={{my: 1}} />
          <MuiLink component="button" variant="body2" onClick={handleForgotPasswordRedirect} sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'underline', '&:hover': {textDecoration: 'none'} }}>Forgot Password?</MuiLink>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// --- Component: Navbar (Professional & Clean) ---
function AppNavbar({ onLoginRegisterClick }) {
  const handleNavButtonClick = () => { if (onLoginRegisterClick) { onLoginRegisterClick(); }};
  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Forms', path: '/forms', icon: <DescriptionIcon /> },
    { label: 'Services', path: '/services', icon: <HowToVoteIcon /> },
    { label: 'Elections', path: '/election', icon: <PollIcon /> },
    { label: 'Results', path: '/result', icon: <PollIcon sx={{transform: 'scaleX(-1)'}} /> }, // Mirrored PollIcon
    { label: 'FAQs', path: '/faqs', icon: <QuestionAnswerIcon /> },
  ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "primary.dark", boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 5px 0px rgba(0,0,0,0.06), 0px 1px 10px 0px rgba(0,0,0,0.08)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HowToVoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: '2.5rem', color: 'secondary.main' }} />
          <Typography variant="h5" noWrap component={RouterLink} to="/" sx={{ mr: 3, display: { xs: "none", md: "flex" }, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: 600, color: "white", textDecoration: "none",}}>VOTER PORTAL</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}><IconButton size="large" color="inherit" aria-label="open navigation menu"><MenuIcon /></IconButton></Box>
          <HowToVoteIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, fontSize: '2rem', color: 'secondary.main' }} />
          <Typography variant="h6" noWrap component={RouterLink} to="/" sx={{mr: 2, display: { xs: "flex", md: "none" }, flexGrow: 1, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: 600, color: "white", textDecoration: "none",}}>VSP</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <Button key={item.label} component={RouterLink} to={item.path} startIcon={React.cloneElement(item.icon, {sx: {mr:0.5, fontSize:'1.1rem'}})} sx={{ color: "white", textTransform: 'none', fontSize: '0.95rem', px:1.5, py:0.8, '&:hover': {backgroundColor: 'primary.main'} }}>{item.label}</Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}><Button startIcon={<VpnKeyIcon />} variant="contained" color="secondary" onClick={handleNavButtonClick} sx={{ my: 1, py: 0.8, whiteSpace: 'nowrap', borderRadius: '20px', px: 2.5, boxShadow: 'none' }}>Login / Register</Button></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// --- Component: Hero Section (No Search Bar, Focus on CTAs) ---
function HeroSection() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: { xs: 'auto', md: 'calc(100vh - 64px)' }, // 64px is approx AppBar height
        py: {xs: 8, md: 6},
        // backgroundColor: 'primary.light', // A light primary color
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', // Gradient example
        color: "white", textAlign: "center", overflow: 'hidden'
    }}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" sx={{ fontWeight: 700, mb: 2, textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
          Your Voice, Your Vote.
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: 'rgba(255,255,255,0.9)', maxWidth: '750px', margin: '0 auto 32px auto', lineHeight: 1.7 }}>
          Welcome to the official Voter Service Portal. Access essential electoral services, stay informed, and participate actively in the democratic process.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button variant="contained" color="secondary" size="large" sx={{ py: 1.5, px: 4, borderRadius: '25px', fontSize: '1.1rem' }} onClick={() => navigate('/forms/form-6')} startIcon={<AssignmentIndIcon />}>
            Register to Vote
          </Button>
          <Button variant="outlined" size="large" sx={{ py: 1.5, px: 4, borderRadius: '25px', fontSize: '1.1rem', color: 'white', borderColor: 'rgba(255,255,255,0.7)', '&:hover': {borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)'} }} onClick={() => navigate('/services/search-electoral-roll')} startIcon={<SearchIcon />}>
            Check Your Name
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

// --- Component: Highlighted Service Card (Professional Look) ---
function HighlightedServiceCard({ icon, title, description, actionText, path }) {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={0} sx={{ p: 3, textAlign: 'center', borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider', transition: 'all 0.3s ease', '&:hover': {borderColor: 'primary.main', boxShadow: '0 8px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'} }}>
        <Box>
          <Avatar sx={{ bgcolor: 'rgba(13,71,161,0.1)', color: 'primary.main', width: 72, height: 72, margin: '0 auto 20px auto' }}>
            {icon}
          </Avatar>
          <Typography variant="h6" component="h3" sx={{ color: 'primary.dark', fontWeight: '600', mb: 1.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2.5 }}>
            {description}
          </Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={() => navigate(path)} fullWidth sx={{ mt: 'auto', borderRadius: '20px', py: 1.2, fontWeight: 'bold' }}>
          {actionText}
        </Button>
      </Paper>
    </Grid>
  );
}

// --- Component: Footer --- (Assumed professional enough)
function SiteFooter() {
  return ( <Box sx={{ bgcolor: "primary.dark", color: "grey.300", p: {xs:3, md:6} }} component="footer"><Container maxWidth="xl"><Grid container spacing={5} justifyContent="space-between"><Grid item xs={12} sm={6} md={4} lg={3}><Typography variant="h6" sx={{color: "white", mb:2}}>Election Commission</Typography><Typography variant="body2" sx={{mb:1}}>Nirvachan Sadan, Ashoka Road,<br/>New Delhi 110001, India.</Typography><Typography variant="body2">Toll Free: 1950</Typography></Grid><Grid item xs={12} sm={6} md={2} lg={2}><Typography variant="h6" sx={{color: "white", mb:2}}>Quick Links</Typography><MuiLink component={RouterLink} to="/about-eci" color="inherit" display="block" sx={{mb:1, '&:hover':{color:'secondary.main', textDecoration:'underline'}}}>About ECI</MuiLink><MuiLink component={RouterLink} to="/contact-us" color="inherit" display="block" sx={{mb:1, '&:hover':{color:'secondary.main', textDecoration:'underline'}}}>Contact Us</MuiLink><MuiLink component={RouterLink} to="/faqs" color="inherit" display="block" sx={{mb:1, '&:hover':{color:'secondary.main', textDecoration:'underline'}}}>FAQs</MuiLink><MuiLink component={RouterLink} to="/disclaimer" color="inherit" display="block" sx={{'&:hover':{color:'secondary.main', textDecoration:'underline'}}}>Disclaimer</MuiLink></Grid><Grid item xs={12} sm={6} md={3} lg={3}><Typography variant="h6" sx={{color: "white", mb:2}}>Related Portals</Typography><MuiLink href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer" color="inherit" display="block" sx={{mb:1, '&:hover':{color:'secondary.main', textDecoration:'underline'}}}>ECI Main Website</MuiLink><MuiLink href="#" color="inherit" display="block" sx={{mb:1, '&:hover':{color:'secondary.main', textDecoration:'underline'}}}>National Grievance Service</MuiLink><MuiLink href="#" color="inherit" display="block" sx={{mb:1, '&:hover':{color:'secondary.main', textDecoration:'underline'}}}>cVIGIL</MuiLink><MuiLink href="#" color="inherit" display="block" sx={{'&:hover':{color:'secondary.main', textDecoration:'underline'}}}>SVEEP Portal</MuiLink></Grid><Grid item xs={12} sm={6} md={3} lg={3}><Typography variant="h6" sx={{color: "white", mb:2}}>Connect With Us</Typography><Box><IconButton href="#" sx={{color: 'grey.300', '&:hover':{color:'secondary.main'}}}><FacebookIcon /></IconButton><IconButton href="#" sx={{color: 'grey.300', '&:hover':{color:'secondary.main'}}}><TwitterIcon /></IconButton><IconButton href="#" sx={{color: 'grey.300', '&:hover':{color:'secondary.main'}}}><YouTubeIcon /></IconButton><IconButton href="#" sx={{color: 'grey.300', '&:hover':{color:'secondary.main'}}}><InstagramIcon /></IconButton></Box><Typography variant="body2" sx={{mt:2}}>For latest updates and information.</Typography></Grid></Grid><Divider sx={{ my: {xs:3, md:4}, borderColor: 'rgba(255,255,255,0.2)' }} /><Typography variant="body2" align="center">{"Content owned & provided by Election Commission of India. © "}<MuiLink color="inherit" href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer" sx={{'&:hover':{color:'secondary.main', textDecoration:'underline'}}}>ECI</MuiLink>{" "}{new Date().getFullYear()}{". All rights reserved."}</Typography></Container></Box> );
}

// --- Main NewHomePage Component ---
export default function NewHomePage() {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const handleLoginRegisterOpen = () => { setLoginDialogOpen(true); };
  const handleLoginRegisterClose = () => { setLoginDialogOpen(false); };

  return (
    <>
      <CssBaseline />
      <AppNavbar onLoginRegisterClick={handleLoginRegisterOpen} />
      <main>
        <HeroSection />

        {/* Highlighted Services Section */}
        <Box sx={{ backgroundColor: 'background.default', py: {xs:6, md:8} }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" align="center" sx={{ mb: 1, color: 'primary.dark', fontWeight: 'bold' }}>
              Key Voter Services
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: {xs:4, md:6}, maxWidth: '600px', marginX: 'auto' }}>
              Access essential services quickly and efficiently.
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {highlightedServices.map((service) => (<HighlightedServiceCard key={service.id} {...service} />))}
            </Grid>
            <Box textAlign="center" mt={5}>
              <Button component={RouterLink} to="/services" variant="outlined" color="primary" size="large" sx={{borderRadius: '20px', px:4}}>
                Explore All Services
              </Button>
            </Box>
          </Container>
        </Box>

        {/* How It Works / Information Section */}
        <Box sx={{ backgroundColor: 'white', py: {xs:6, md:8} }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h2" sx={{ mb: 2, color: 'primary.dark', fontWeight: 'bold' }}>
                  Simple Steps to Participate
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                  Our portal is designed to make your electoral journey seamless. From registration to accessing information, we've streamlined the process for your convenience.
                </Typography>
                {[
                  "Verify your eligibility and register online.",
                  "Keep your voter details up-to-date.",
                  "Locate your polling station and know your candidates.",
                  "Cast your vote and be an active part of democracy."
                ].map((step, index) => (
                  <Stack direction="row" spacing={1.5} alignItems="center" key={index} sx={{mb: 1.5}}>
                    <CheckCircleOutlineIcon color="success" />
                    <Typography variant="body1">{step}</Typography>
                  </Stack>
                ))}
                 <Button component={RouterLink} to="/about-us" variant="contained" color="secondary" size="large" sx={{ mt: 3, borderRadius: '20px', px:3 }} startIcon={<InfoOutlinedIcon />}>
                  Learn More About Us
                </Button>
              </Grid>
              <Grid item xs={12} md={6} sx={{display: {xs: 'none', md: 'block'}}}>
                {/* Placeholder for an illustrative image or graphic */}
                <Box component="img" src="https://media.istockphoto.com/id/1267188359/vector/online-voting-concept-people-give-vote-andputting-ballot-paper-into-the-ballot-box-vector.jpg?s=612x612&w=0&k=20&c=0n5mXDbZ0BGh6oYIXLzl0eySr6jXhBlQLPSQySuxR9U=" alt="Voting Process Illustration" sx={{ width: '100%', borderRadius: 3, boxShadow: 3 }} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* News & Announcements Section (Simplified) */}
        <Box sx={{ backgroundColor: 'background.default', py: {xs:6, md:8} }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" align="center" sx={{ mb: {xs:4, md:6}, color: 'primary.dark', fontWeight: 'bold' }}>
              <CampaignIcon sx={{fontSize: '2.8rem', verticalAlign: 'middle', mr: 1, color: 'secondary.main'}}/>
              Latest Updates
            </Typography>
            <Grid container spacing={3}>
              {[
                {title: "ECI announces schedule for upcoming state elections.", date: "15 Mar 202X", link:"#", category: "Election News"},
                {title: "Final electoral rolls published for XYZ constituency.", date: "10 Mar 202X", link:"#", category: "Roll Updates"},
                {title: "Awareness campaign for young voters launched.", date: "05 Mar 202X", link:"#", category: "SVEEP Activities"}
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.07)', '&:hover': {boxShadow: '0 8px 24px rgba(0,0,0,0.1)'}, transition: 'box-shadow 0.3s ease'}}>
                    <CardContent>
                      <Typography variant="caption" color="secondary.main" display="block" sx={{mb:0.5, fontWeight:'bold'}}>{item.category.toUpperCase()}</Typography>
                      <Typography variant="h6" component="div" sx={{mb:1, fontWeight:'500', color:'primary.text', minHeight:'3.5em'}}>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{mb:2}}>Published on: {item.date}</Typography>
                    </CardContent>
                    <CardActions sx={{px:2, pb:2}}>
                      <Button component={RouterLink} to={item.link} size="small" variant="outlined" color="primary" fullWidth>Read Full Story</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box textAlign="center" mt={5}>
              <Button component={RouterLink} to="/announcements" variant="contained" color="primary" size="large" sx={{borderRadius: '20px', px:4}}>
                View All News & Updates
              </Button>
            </Box>
          </Container>
        </Box>
      </main>
      <SiteFooter />
      <LoginRegisterDialog open={loginDialogOpen} onClose={handleLoginRegisterClose} />
    </>
  );
}