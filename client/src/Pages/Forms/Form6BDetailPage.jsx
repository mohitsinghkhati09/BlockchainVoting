import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, Paper, Breadcrumbs, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, IconButton,
  FormControlLabel, Checkbox
} from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CloseIcon from '@mui/icons-material/Close';

export default function Form6BDetailPage() {
  const formName = "Form 6B";
  const formTitle = "Letter of Information of Aadhaar Number";
  const formDescription = "This form is for existing electors to voluntarily provide their Aadhaar number for the purpose of authentication and linking with their electoral roll data. Providing Aadhaar is not mandatory and will not result in deletion of name from electoral roll if not provided.";

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [form6BData, setForm6BData] = useState({
    name: '',
    epicNo: '',
    aadhaarNo: '',
    notAbleToFurnishAadhaar: false,
    // If not able, specify one of the documents
    documentType: '', // e.g., MNREGA Job Card, Bank Passbook, etc.
    declaration: false,
  });

  const handleOpenFormDialog = () => setOpenFormDialog(true);
  const handleCloseFormDialog = () => setOpenFormDialog(false);

  const handleForm6BChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm6BData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleForm6BSubmit = (event) => {
    event.preventDefault();
    if (!form6BData.declaration) { alert("Please accept the declaration."); return; }
    if (!form6BData.aadhaarNo && !form6BData.notAbleToFurnishAadhaar) {
        alert("Please provide Aadhaar number or tick the checkbox if unable to furnish."); return;
    }
    if (form6BData.notAbleToFurnishAadhaar && !form6BData.documentType) {
        alert("If unable to furnish Aadhaar, please specify the document you are submitting."); return;
    }
    console.log("Form 6B Submitted Data:", form6BData);
    alert("Form 6B Submitted (Mock)! Check console for data.");
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
        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 'medium' }}>Purpose:</Typography>
        <Box component="ul" sx={{ pl: 2.5, color: 'text.secondary' }}>
            <li>To authenticate entries in the electoral roll.</li>
            <li>To identify registration of name of the same person in more than one constituency or more than once in the same constituency.</li>
        </Box>
        <Box sx={{ mt: 4, p: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 2, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" size="large" startIcon={<FingerprintIcon />} onClick={handleOpenFormDialog} sx={{mr:2, mb: {xs:1, sm:0}}}>Furnish Aadhaar Info</Button>
          <Button variant="outlined" color="primary" size="large" startIcon={<CloudDownloadIcon />} href="#" target="_blank" rel="noopener noreferrer">Download PDF Form</Button>
        </Box>
      </Paper>

      {/* Form 6B Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="sm" scroll="paper">
        <DialogTitle sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          Form 6B - {formTitle}
          <IconButton onClick={handleCloseFormDialog}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" id="form6b" onSubmit={handleForm6BSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField fullWidth required label="Name of Elector (as in EPIC)" name="name" value={form6BData.name} onChange={handleForm6BChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth required label="EPIC Number" name="epicNo" value={form6BData.epicNo} onChange={handleForm6BChange} /></Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Aadhaar Number" name="aadhaarNo" value={form6BData.aadhaarNo} onChange={handleForm6BChange} disabled={form6BData.notAbleToFurnishAadhaar} helperText="Voluntary. Enter 12-digit Aadhaar number." />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="notAbleToFurnishAadhaar" checked={form6BData.notAbleToFurnishAadhaar} onChange={handleForm6BChange} />}
                  label="I am not able to furnish my Aadhaar Number because I don’t have an Aadhaar Number."
                />
              </Grid>
              {form6BData.notAbleToFurnishAadhaar && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Therefore, I submit a copy of (Select Document)"
                    name="documentType"
                    value={form6BData.documentType}
                    onChange={handleForm6BChange}
                    select
                    SelectProps={{ native: true }}
                    helperText="Provide one of the listed documents if not providing Aadhaar."
                  >
                    <option aria-label="None" value="" />
                    <option value="mnrega">MNREGA Job Card</option>
                    <option value="passbook">Passbooks with photograph issued by Bank/Post Office</option>
                    <option value="health_insurance">Health Insurance Smart Card under scheme of Ministry of Labour</option>
                    <option value="driving_license">Driving License</option>
                    <option value="pan_card">PAN Card</option>
                    {/* Add other document options as per official Form 6B */}
                  </TextField>
                </Grid>
              )}
              <Grid item xs={12} sx={{mt:2}}>
                <FormControlLabel control={<Checkbox name="declaration" checked={form6BData.declaration} onChange={handleForm6BChange} required />}
                  label="I hereby declare that the information is true and correct."
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{p:2}}>
          <Button onClick={handleCloseFormDialog} color="inherit">Cancel</Button>
          <Button type="submit" form="form6b" variant="contained" color="primary">Submit Information</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}