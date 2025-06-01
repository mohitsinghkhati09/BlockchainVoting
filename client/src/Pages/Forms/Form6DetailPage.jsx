import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, Paper, Breadcrumbs, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Autocomplete, IconButton,Checkbox
} from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import CloseIcon from '@mui/icons-material/Close';

// Mock Data for Autocomplete (Example - reuse or define relevant data)
const states = [ { label: 'State A' }, { label: 'State B' }, /* ... */ ];
const districts = [ { label: 'District A1', state: 'State A' }, { label: 'District B1', state: 'State B' }, /* ... */ ];

export default function Form6DetailPage() {
  const formName = "Form 6";
  const formTitle = "Application for New Voter Registration";
  const formDescription = "This form is used for inclusion of name in the Electoral Roll for the first time or on shifting from one constituency to another. Please ensure all details are accurate and supporting documents are ready.";

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [form6Data, setForm6Data] = useState({
    state: null,
    district: null,
    assemblyConstituency: '',
    firstName: '',
    lastName: '',
    relativeFirstName: '',
    relativeLastName: '',
    relationType: 'Father', // Father, Mother, Husband
    mobile: '',
    email: '',
    aadhaarNo: '', // Optional
    dob: '',
    gender: '', // Male, Female, Other
    presentAddress: '',
    // ... more fields like PwD details, photograph, declarations
    declaration: false,
  });
  const [selectedState, setSelectedState] = useState(null);

  const handleOpenFormDialog = () => setOpenFormDialog(true);
  const handleCloseFormDialog = () => setOpenFormDialog(false);

  const handleForm6Change = (event) => {
    const { name, value, type, checked } = event.target;
    setForm6Data(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    setForm6Data(prevData => ({ ...prevData, [name]: newValue }));
    if (name === 'state') {
        setSelectedState(newValue);
        setForm6Data(prevData => ({ ...prevData, district: null }));
    }
  };

  const handleForm6Submit = (event) => {
    event.preventDefault();
    if (!form6Data.declaration) {
        alert("Please accept the declaration.");
        return;
    }
    // Add more validation as needed
    console.log("Form 6 Submitted Data:", form6Data);
    alert("Form 6 Submitted (Mock)! Check console for data.");
    handleCloseFormDialog();
  };

  const filteredDistricts = selectedState ? districts.filter(d => d.state === selectedState.label) : [];

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} underline="hover" color="inherit" to="/"><HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Home</Link>
        <Link component={RouterLink} underline="hover" color="inherit" to="/forms"><DescriptionIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Forms</Link>
        <Typography color="text.primary">{formName}</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
          {formName}: <Typography component="span" variant="h4" sx={{fontWeight: 'normal'}}>{formTitle}</Typography>
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>{formDescription}</Typography>
        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 'medium' }}>Key Instructions:</Typography>
        <Box component="ul" sx={{ pl: 2.5, color: 'text.secondary' }}>
            <li>Fill all mandatory fields clearly.</li>
            <li>Attach self-attested copies of proof of age and proof of address.</li>
            <li>Provide a recent passport-sized color photograph.</li>
        </Box>
        <Box sx={{ mt: 4, p: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 2, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" size="large" startIcon={<OnlinePredictionIcon />} onClick={handleOpenFormDialog} sx={{mr:2, mb: {xs:1, sm:0}}}>
            Fill Form Online
          </Button>
          <Button variant="outlined" color="primary" size="large" startIcon={<CloudDownloadIcon />} href="#" target="_blank" rel="noopener noreferrer">Download PDF Form</Button>
        </Box>
      </Paper>

      {/* Form 6 Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="md" scroll="paper">
        <DialogTitle sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          Form 6 - {formTitle}
          <IconButton onClick={handleCloseFormDialog}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" id="form6" onSubmit={handleForm6Submit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}><Typography variant="h6">A. State, District, Assembly/Parliamentary Constituency</Typography></Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete options={states} getOptionLabel={(option) => option.label} value={form6Data.state} onChange={(e, nv) => handleAutocompleteChange('state', nv)} renderInput={(params) => <TextField {...params} label="State/UT" required />} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete options={filteredDistricts} getOptionLabel={(option) => option.label} value={form6Data.district} onChange={(e, nv) => handleAutocompleteChange('district', nv)} disabled={!form6Data.state} renderInput={(params) => <TextField {...params} label="District" required />} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Assembly/Parliamentary Constituency" name="assemblyConstituency" value={form6Data.assemblyConstituency} onChange={handleForm6Change} required />
              </Grid>

              <Grid item xs={12} sx={{mt:2}}><Typography variant="h6">B. Personal Details</Typography></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="First Name (and Middle Name)" name="firstName" value={form6Data.firstName} onChange={handleForm6Change} required /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Last Name" name="lastName" value={form6Data.lastName} onChange={handleForm6Change} required /></Grid>

              <Grid item xs={12} sx={{mt:1}}><Typography variant="h6">C. Details of Relative</Typography></Grid>
              <Grid item xs={12} sm={4}>
                <FormControl component="fieldset">
                  <RadioGroup row name="relationType" value={form6Data.relationType} onChange={handleForm6Change}>
                    <FormControlLabel value="Father" control={<Radio />} label="Father" />
                    <FormControlLabel value="Mother" control={<Radio />} label="Mother" />
                    <FormControlLabel value="Husband" control={<Radio />} label="Husband" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}><TextField fullWidth label="Relative's First Name" name="relativeFirstName" value={form6Data.relativeFirstName} onChange={handleForm6Change} /></Grid>
              <Grid item xs={12} sm={4}><TextField fullWidth label="Relative's Last Name" name="relativeLastName" value={form6Data.relativeLastName} onChange={handleForm6Change} /></Grid>

              <Grid item xs={12} sx={{mt:1}}><Typography variant="h6">D. Contact Details</Typography></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Mobile Number (Self/Relative)" name="mobile" type="tel" value={form6Data.mobile} onChange={handleForm6Change} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Email ID (Self/Relative)" name="email" type="email" value={form6Data.email} onChange={handleForm6Change} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Aadhaar Number (Optional)" name="aadhaarNo" value={form6Data.aadhaarNo} onChange={handleForm6Change} /></Grid>

              <Grid item xs={12} sx={{mt:1}}><Typography variant="h6">E. Date of Birth & Gender</Typography></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Date of Birth" name="dob" type="date" value={form6Data.dob} onChange={handleForm6Change} InputLabelProps={{ shrink: true }} required /></Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row name="gender" value={form6Data.gender} onChange={handleForm6Change} required>
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{mt:1}}><Typography variant="h6">F. Present Ordinary Address</Typography></Grid>
              <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Full Address (House No, Street, Village/Town, Post Office, etc.)" name="presentAddress" value={form6Data.presentAddress} onChange={handleForm6Change} required /></Grid>
              {/* Add fields for Photograph, PwD details if applicable */}

              <Grid item xs={12} sx={{mt:3}}>
                <FormControlLabel control={<Checkbox name="declaration" checked={form6Data.declaration} onChange={handleForm6Change} required />}
                  label="I hereby declare that to the best of my knowledge and belief all particulars given above are true and correct..." // Shortened for brevity
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{p:2}}>
          <Button onClick={handleCloseFormDialog} color="inherit">Cancel</Button>
          <Button type="submit" form="form6" variant="contained" color="primary">Submit Application</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}