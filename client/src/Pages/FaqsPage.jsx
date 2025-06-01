import React from 'react';
import {
  Container, Typography, Box, AppBar, Toolbar, Button, Link as MuiLink,
  CssBaseline, IconButton, Paper, Accordion, AccordionSummary, AccordionDetails,
  Grid, Avatar // CORRECTED: Added Grid and Avatar
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // For Accordion
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'; // Page Icon
import ContactSupportIcon from '@mui/icons-material/ContactSupport'; // For further help

// --- FAQ Data (Defined directly in this file) ---
const faqData = [
  {
    id: 'faq1',
    question: 'How do I register as a new voter?',
    answer: 'To register as a new voter, you need to fill Form 6. This can be done online through this portal by navigating to the "Forms" section and selecting "New Voter Registration (Form 6)". You will need to provide proof of age, address, and a passport-sized photograph.',
  },
  {
    id: 'faq2',
    question: 'What documents are required for new voter registration?',
    answer: 'Typically, you will need one document for proof of age (e.g., Birth Certificate, Class 10 marksheet, Passport, PAN Card, Driving License, Aadhaar Card) and one document for proof of ordinary residence (e.g., Passport, Driving License, Bank Passbook, Ration Card, Utility Bill, Aadhaar Card). Please check the latest guidelines on the ECI website for the most up-to-date list.',
  },
  {
    id: 'faq3',
    question: 'How can I update or correct my details in the Voter ID (EPIC)?',
    answer: 'For any corrections, shifting of residence within the same constituency, or requesting a replacement EPIC, you need to fill Form 8. This form is also available online in the "Forms" section of this portal.',
  },
  {
    id: 'faq4',
    question: 'How can I find my polling station?',
    answer: 'You can find your polling station by using the "Search in Electoral Roll" service or by looking for a specific "Know Your Polling Station" service. You may need to provide your EPIC number or personal details.',
  },
  {
    id: 'faq5',
    question: 'Can I download a digital version of my Voter ID card (e-EPIC)?',
    answer: 'Yes, if you are an eligible voter and your mobile number is uniquely registered in the electoral roll, you can download the e-EPIC (Electronic Electoral Photo Identity Card) from this portal. Look for the "Download e-EPIC" service.',
  },
  {
    id: 'faq6',
    question: 'What should I do if I have lost my Voter ID card?',
    answer: 'If you have lost your Voter ID card, you should apply for a replacement EPIC by filling Form 8. You can also download an e-EPIC if you are eligible.',
  },
  {
    id: 'faq7',
    question: 'How can I track the status of my application (Form 6, 7, 8)?',
    answer: 'Most voter portals provide a service to "Track Application Status". You will typically need your application reference ID to check the current status of your submission.',
  },
];

// --- Optional Basic Navbar for Self-Contained Page ---
function FaqsPageNavbar() {
  return (
    <AppBar position="static" color="primary" elevation={1} sx={{ mb: 0 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton component={RouterLink} to="/" color="inherit" edge="start" sx={{ mr: 1 }}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Frequently Asked Questions
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// --- Optional Basic Footer for Self-Contained Page ---
function FaqsPageFooter() {
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

export default function FaqsPage() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* OPTION: Internal Navbar. Comment out if using global Navbar from userRoutes.js */}
      {/* <FaqsPageNavbar /> */}

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'background.default', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="lg">
          <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: { xs: 3, md: 4 }, backgroundColor: 'transparent' }}>
            <Grid container alignItems="center" spacing={2} justifyContent="center" textAlign="center">
              <Grid item>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, color: 'white' }}>
                  <QuestionAnswerIcon sx={{ fontSize: '2.5rem' }} />
                </Avatar>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h2" component="h1" sx={{ fontWeight: 600, color: 'primary.dark', mb:1 }}>
                  Frequently Asked Questions (FAQs)
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 0, maxWidth: '700px', mx:'auto' }}>
                  Find answers to common questions about voter registration, electoral services, and the voting process.
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box>
            {faqData.map((faqItem) => (
              <Accordion
                key={faqItem.id}
                expanded={expanded === faqItem.id}
                onChange={handleChange(faqItem.id)}
                sx={{
                  mb: 1.5,
                  boxShadow: '0 2px 10px -3px rgba(0,0,0,0.1)',
                  '&:before': { display: 'none' }, // Removes default top border
                  '&.Mui-expanded': { margin: '12px 0' } // More space when expanded
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${faqItem.id}-content`}
                  id={`${faqItem.id}-header`}
                  sx={{
                    backgroundColor: expanded === faqItem.id ? 'primary.lighter' : 'background.paper', // Use a light primary color from theme if available
                    minHeight: 56,
                    '&.Mui-expanded': { minHeight: 56 },
                    '& .MuiAccordionSummary-content': {
                        margin: '12px 0',
                        '&.Mui-expanded': { margin: '12px 0' }
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'primary.dark' }}>
                    {faqItem.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'white', borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, py:1 }}>
                    {faqItem.answer.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Paper elevation={0} sx={{ mt: {xs: 4, md: 6}, p: {xs:2, md:3}, textAlign: 'center', backgroundColor: 'primary.lighter', borderRadius: 2}}>
             <ContactSupportIcon sx={{fontSize: '3rem', color: 'primary.main', mb:1}}/>
            <Typography variant="h5" gutterBottom sx={{fontWeight: 'medium'}}>
              Still have questions?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{mb:2}}>
              If you can't find the answer you're looking for, please feel free to reach out to our support team.
            </Typography>
            <Button component={RouterLink} to="/contact-us" variant="contained" color="primary" size="large">
              Contact Us
            </Button>
          </Paper>

        </Container>
      </Box>

      {/* OPTION: Internal Footer. Comment out if using global Footer from userRoutes.js */}
      {/* <FaqsPageFooter /> */}
    </Box>
  );
}