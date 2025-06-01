import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, Paper, Breadcrumbs, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, IconButton,Checkbox,FormControlLabel
} from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import CloseIcon from '@mui/icons-material/Close';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'; // Relevant icon

export default function Form6ADetailPage() {
  const formName = "Form 6A";
  const formTitle = "Application for Overseas (NRI) Elector Registration";
  const formDescription = "This form is for an Indian citizen who is absent from their place of ordinary residence in India owing to employment, education or otherwise outside India (has not acquired citizenship of any other country) and is desirous of having their name included in the electoral roll of their home constituency.";

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [form6AData, setForm6AData] = useState({
    name: '',
    surname: '',
    dob: '',
    placeOfBirth: '',
    fatherName: '',
    motherName: '',
    husbandName: '', // if applicable
    passportNo: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportIssuePlace: '',
    visaNo: '', // if applicable
    visaType: '', // if applicable
    countryOfResidence: '',
    addressInIndia: '',
    declaration: false,
  });

  const handleOpenFormDialog = () => setOpenFormDialog(true);
  const handleCloseFormDialog = () => setOpenFormDialog(false);

  const handleForm6AChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm6AData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleForm6ASubmit = (event) => {
    event.preventDefault();
    if (!form6AData.declaration) { alert("Please accept the declaration."); return; }
    console.log("Form 6A Submitted Data:", form6AData);
    alert("Form 6A Submitted (Mock)! Check console for data.");
    handleCloseFormDialog();
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} underline="hover" color="inherit" to="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />Home</Link>
        <Link component={RouterLink} underline="hover" color="inherit" to="/forms"><DescriptionIcon sx={{ mr: 0.5 }} fontSize="inherit" />Forms</Link>
        <Typography color="text.primary">{formName}</Typography>
      </Breadcrumbs>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
          {formName}: <Typography component="span" variant="h4" sx={{fontWeight: 'normal'}}>{formTitle}</Typography>
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>{formDescription}</Typography>
        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 'medium' }}>Key Considerations:</Typography>
        <Box component="ul" sx={{ pl: 2.5, color: 'text.secondary' }}>
            <li>Applicant must be an Indian citizen and not have acquired citizenship of any other country.</li>
            <li>Details of current Indian passport are mandatory.</li>
            <li>Self-attested copies of relevant pages of passport are required.</li>
        </Box>
        <Box sx={{ mt: 4, p: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 2, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" size="large" startIcon={<FlightTakeoffIcon />} onClick={handleOpenFormDialog} sx={{mr:2, mb: {xs:1, sm:0}}}>Fill Form Online</Button>
          <Button variant="outlined" color="primary" size="large" startIcon={<CloudDownloadIcon />} href="#" target="_blank" rel="noopener noreferrer">Download PDF Form</Button>
        </Box>
      </Paper>

      {/* Form 6A Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="md" scroll="paper">
        <DialogTitle sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          Form 6A - {formTitle}
          <IconButton onClick={handleCloseFormDialog}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" id="form6a" onSubmit={handleForm6ASubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField fullWidth required label="Name" name="name" value={form6AData.name} onChange={handleForm6AChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth required label="Surname" name="surname" value={form6AData.surname} onChange={handleForm6AChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth required label="Date of Birth" name="dob" type="date" value={form6AData.dob} onChange={handleForm6AChange} InputLabelProps={{ shrink: true }} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth required label="Place of Birth (Village/Town, District, State)" name="placeOfBirth" value={form6AData.placeOfBirth} onChange={handleForm6AChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Father's Full Name" name="fatherName" value={form6AData.fatherName} onChange={handleForm6AChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Mother's Full Name" name="motherName" value={form6AData.motherName} onChange={handleForm6AChange} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Husband's Full Name (if married female)" name="husbandName" value={form6AData.husbandName} onChange={handleForm6AChange} /></Grid>

              <Grid item xs={12} sx={{mt:2}}><Typography variant="subtitle1">Passport Details (Mandatory)</Typography></Grid>
              <Grid item xs={12} sm={4}><TextField fullWidth required label="Passport Number" name="passportNo" value={form6AData.passportNo} onChange={handleForm6AChange} /></Grid>
              <Grid item xs={12} sm={4}><TextField fullWidth required label="Date of Issue" name="passportIssueDate" type="date" value={form6AData.passportIssueDate} onChange={handleForm6AChange} InputLabelProps={{ shrink: true }} /></Grid>
              <Grid item xs={12} sm={4}><TextField fullWidth required label="Date of Expiry" name="passportExpiryDate" type="date" value={form6AData.passportExpiryDate} onChange={handleForm6AChange} InputLabelProps={{ shrink: true }} /></Grid>
              <Grid item xs={12}><TextField fullWidth required label="Place of Issue" name="passportIssuePlace" value={form6AData.passportIssuePlace} onChange={handleForm6AChange} /></Grid>

              <Grid item xs={12} sx={{mt:2}}><Typography variant="subtitle1">Current Country & Address in India</Typography></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth required label="Country of Current Ordinary Residence" name="countryOfResidence" value={form6AData.countryOfResidence} onChange={handleForm6AChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth required multiline rows={3} label="Full Residential Address in India (for constituency)" name="addressInIndia" value={form6AData.addressInIndia} onChange={handleForm6AChange} /></Grid>
              {/* Add fields for visa if applicable, photograph etc. */}

              <Grid item xs={12} sx={{mt:3}}>
                <FormControlLabel control={<Checkbox name="declaration" checked={form6AData.declaration} onChange={handleForm6AChange} required />}
                  label="I declare that I am an Indian citizen, my name has not been included in electoral roll of any other constituency..." // Shortened
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{p:2}}>
          <Button onClick={handleCloseFormDialog} color="inherit">Cancel</Button>
          <Button type="submit" form="form6a" variant="contained" color="primary">Submit Application</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}