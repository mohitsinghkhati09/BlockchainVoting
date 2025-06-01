import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, Paper, Breadcrumbs, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Autocomplete, IconButton
} from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditIcon from '@mui/icons-material/Edit'; // For the main button
import CloseIcon from '@mui/icons-material/Close'; // For Dialog close

// --- Mock Data for Autocomplete (Example) ---
const states = [
  { label: 'Andhra Pradesh' }, { label: 'Telangana' }, { label: 'Maharashtra' }, /* ... more states */
];
const districts = [
  { label: 'District A1', state: 'Andhra Pradesh' }, { label: 'District A2', state: 'Andhra Pradesh' },
  { label: 'District T1', state: 'Telangana' }, { label: 'District T2', state: 'Telangana' },
  // ... more districts
];


export default function Form8DetailPage() {
  const formName = "Form 8";
  const formTitle = "Application for Shifting, Correction, Replacement EPIC & PwD Marking";
  const formDescription = "This versatile form is used for multiple purposes: (1) Shifting of residence (within the same or to a different constituency), (2) Correction of entries in existing electoral roll, (3) Issue of replacement EPIC (Voter ID card), and (4) Marking as a Person with Disability (PwD).";

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [form8Data, setForm8Data] = useState({
    applicationType: '', // shifting, correction, replacement, pwd
    name: '',
    epicNo: '',
    // --- Fields for Shifting ---
    newState: null,
    newDistrict: null,
    newAddress: '',
    // --- Fields for Correction ---
    correctionName: false,
    newName: '',
    correctionDob: false,
    newDob: '',
    // ... more correction fields ...
    // --- Fields for Replacement ---
    reasonForReplacement: '', // lost, damaged, mutilated
    // --- Fields for PwD ---
    isPwd: false,
    pwdType: '',
    // ... common fields ...
    mobile: '',
    email: '',
    declaration: false,
  });
  const [selectedState, setSelectedState] = useState(null);


  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleForm8Change = (event) => {
    const { name, value, type, checked } = event.target;
    setForm8Data(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

   const handleAutocompleteChange = (name, newValue) => {
    setForm8Data(prevData => ({
      ...prevData,
      [name]: newValue
    }));
    if (name === 'newState') {
        setSelectedState(newValue);
        setForm8Data(prevData => ({ ...prevData, newDistrict: null })); // Reset district on state change
    }
  };


  const handleForm8Submit = (event) => {
    event.preventDefault();
    // Basic validation (can be more extensive)
    if (!form8Data.applicationType) {
        alert("Please select an application type.");
        return;
    }
    if (!form8Data.declaration) {
        alert("Please accept the declaration.");
        return;
    }
    console.log("Form 8 Submitted Data:", form8Data);
    alert("Form 8 Submitted (Mock)! Check console for data.");
    handleCloseFormDialog();
    // Here you would typically send data to a backend API
  };

  const filteredDistricts = selectedState ? districts.filter(d => d.state === selectedState.label) : [];


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
        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 'medium' }}>Purposes covered:</Typography>
        <Box component="ul" sx={{ pl: 2.5, color: 'text.secondary' }}>
            <li><b>Shifting of Residence:</b> If you have moved your residence.</li>
            <li><b>Correction of Entries:</b> To correct errors in your name, age, address, photo, etc.</li>
            <li><b>Issue of Replacement EPIC:</b> If your Voter ID card is lost, damaged, or mutilated.</li>
            <li><b>Marking as Person with Disability (PwD):</b> To avail facilities for PwD voters.</li>
        </Box>
         <Typography variant="body2" color="text.secondary" paragraph sx={{ mt:2, fontStyle:'italic' }}>
          Ensure you select the correct purpose(s) when filling the form and attach necessary supporting documents as applicable.
        </Typography>
        <Box sx={{ mt: 4, p: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 2, textAlign: 'center' }}>
          {/* This button now opens the dialog */}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<EditIcon />}
            onClick={handleOpenFormDialog} // MODIFIED
            sx={{mr:2, mb: {xs:1, sm:0}}}
          >
            Fill Form 8 Online
          </Button>
          <Button variant="outlined" color="primary" size="large" startIcon={<CloudDownloadIcon />} href="#" target="_blank" rel="noopener noreferrer">
            Download PDF Form
          </Button>
        </Box>
      </Paper>

      {/* Form 8 Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="md" scroll="paper">
        <DialogTitle sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          Form 8 - {formTitle}
          <IconButton onClick={handleCloseFormDialog}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" id="form8" onSubmit={handleForm8Submit} noValidate>
            <Grid container spacing={3}>
              {/* Part A: Applicant Details */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Applicant Details</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Full Name (as per EPIC)" name="name" value={form8Data.name} onChange={handleForm8Change} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="EPIC No. (if available)" name="epicNo" value={form8Data.epicNo} onChange={handleForm8Change} />
              </Grid>
               <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Mobile No. (Self/Relative)" name="mobile" type="tel" value={form8Data.mobile} onChange={handleForm8Change} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email ID (Self/Relative)" name="email" type="email" value={form8Data.email} onChange={handleForm8Change} />
              </Grid>

              {/* Part B: Application For */}
              <Grid item xs={12} sx={{mt:2}}>
                <FormControl component="fieldset" required>
                  <FormLabel component="legend">I submit application for: (Select one)</FormLabel>
                  <RadioGroup row name="applicationType" value={form8Data.applicationType} onChange={handleForm8Change}>
                    <FormControlLabel value="shifting" control={<Radio />} label="Shifting of Residence" />
                    <FormControlLabel value="correction" control={<Radio />} label="Correction of entries" />
                    <FormControlLabel value="replacement" control={<Radio />} label="Issue of Replacement EPIC without correction" />
                    <FormControlLabel value="pwd" control={<Radio />} label="Request for marking as Person with Disability (PwD)" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Conditional Fields based on applicationType */}
              {form8Data.applicationType === 'shifting' && (
                <>
                  <Grid item xs={12} sx={{mt:1}}><Typography variant="subtitle1">Details for Shifting of Residence</Typography></Grid>
                  <Grid item xs={12}><TextField fullWidth required multiline rows={3} label="Full New Address" name="newAddress" value={form8Data.newAddress} onChange={handleForm8Change} /></Grid>
                  <Grid item xs={12} sm={6}>
                     <Autocomplete
                        options={states}
                        getOptionLabel={(option) => option.label}
                        value={form8Data.newState}
                        onChange={(event, newValue) => handleAutocompleteChange('newState', newValue)}
                        isOptionEqualToValue={(option, value) => option.label === value.label}
                        renderInput={(params) => <TextField {...params} label="New State/UT" required />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <Autocomplete
                        options={filteredDistricts}
                        getOptionLabel={(option) => option.label}
                        value={form8Data.newDistrict}
                        onChange={(event, newValue) => handleAutocompleteChange('newDistrict', newValue)}
                        isOptionEqualToValue={(option, value) => option.label === value.label}
                        disabled={!form8Data.newState}
                        renderInput={(params) => <TextField {...params} label="New District" required />}
                    />
                  </Grid>
                  {/* Add more fields: AC, PC, Post Office, Pincode etc. */}
                </>
              )}

              {form8Data.applicationType === 'correction' && (
                <>
                  <Grid item xs={12} sx={{mt:1}}><Typography variant="subtitle1">Details for Correction of Entries (Tick entries to be corrected)</Typography></Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel control={<Checkbox name="correctionName" checked={form8Data.correctionName} onChange={handleForm8Change} />} label="Name" />
                    {form8Data.correctionName && <TextField fullWidth label="Correct Name" name="newName" value={form8Data.newName} onChange={handleForm8Change} sx={{mt:1}} />}
                  </Grid>
                   <Grid item xs={12} sm={6}>
                    <FormControlLabel control={<Checkbox name="correctionDob" checked={form8Data.correctionDob} onChange={handleForm8Change} />} label="Date of Birth" />
                    {form8Data.correctionDob && <TextField fullWidth type="date" label="Correct Date of Birth" name="newDob" value={form8Data.newDob} onChange={handleForm8Change} InputLabelProps={{ shrink: true }} sx={{mt:1}} />}
                  </Grid>
                  {/* Add more checkboxes and fields for other corrections: Gender, Address, Photo, Mobile, etc. */}
                </>
              )}

              {form8Data.applicationType === 'replacement' && (
                <>
                  <Grid item xs={12} sx={{mt:1}}><Typography variant="subtitle1">Reason for Replacement EPIC</Typography></Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset" required>
                      <RadioGroup row name="reasonForReplacement" value={form8Data.reasonForReplacement} onChange={handleForm8Change}>
                        <FormControlLabel value="lost" control={<Radio />} label="Lost" />
                        <FormControlLabel value="destroyed" control={<Radio />} label="Destroyed due to reason beyond control like flood, fire etc." />
                        <FormControlLabel value="mutilated" control={<Radio />} label="Mutilated" />
                      </RadioGroup>
                    </FormControl>
                     <Typography variant="caption" display="block"> (Attach copy of FIR if EPIC is lost. Mutilated/damaged EPIC to be surrendered.)</Typography>
                  </Grid>
                </>
              )}

              {form8Data.applicationType === 'pwd' && (
                <>
                  <Grid item xs={12} sx={{mt:1}}><Typography variant="subtitle1">Request for Marking as Person with Disability (PwD)</Typography></Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth required label="Nature of Disability" name="pwdType" value={form8Data.pwdType} onChange={handleForm8Change} helperText="e.g., Locomotor, Visual, Speech and Hearing, etc."/>
                     <Typography variant="caption" display="block">(Attach Disability Certificate issued by competent authority)</Typography>
                  </Grid>
                </>
              )}

                {/* Declaration */}
                <Grid item xs={12} sx={{mt:3}}>
                    <FormControlLabel
                        control={<Checkbox name="declaration" checked={form8Data.declaration} onChange={handleForm8Change} required />}
                        label="I hereby declare that to the best of my knowledge and belief, the information given above is true and correct."
                    />
                </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{p:2}}>
          <Button onClick={handleCloseFormDialog} color="inherit">Cancel</Button>
          <Button type="submit" form="form8" variant="contained" color="primary">Submit Application</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}