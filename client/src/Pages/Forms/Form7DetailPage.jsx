import React, { useState } from 'react';
import {
  Container, Typography, Box, Button, Paper, Breadcrumbs, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, IconButton,Checkbox,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';

export default function Form7DetailPage() {
  const formName = "Form 7";
  const formTitle = "Objection or Request for Deletion of Name in Electoral Roll";
  const formDescription = "This form is used for objecting to the inclusion of a name in the electoral roll or for requesting the deletion of an entry due to death, shifting, or other reasons. Proper justification and details are required.";

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [form7Data, setForm7Data] = useState({
    applicationType: 'objection', // objection, deletion
    // For Objection
    objectorName: '',
    objectorPartNo: '',
    objectorSerialNo: '',
    personObjectedName: '',
    personObjectedPartNo: '',
    personObjectedSerialNo: '',
    reasonForObjection: '',
    // For Deletion
    applicantName: '', // If deleting own name or on behalf of other
    applicantEpic: '',
    personToDeleteName: '',
    personToDeleteEpic: '',
    reasonForDeletion: '', // Death, Shifted, Duplicate, Not Citizen, etc.
    declaration: false,
  });

  const handleOpenFormDialog = () => setOpenFormDialog(true);
  const handleCloseFormDialog = () => setOpenFormDialog(false);

  const handleForm7Change = (event) => {
    const { name, value, type, checked } = event.target;
    setForm7Data(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleForm7Submit = (event) => {
    event.preventDefault();
    if (!form7Data.declaration) { alert("Please accept the declaration."); return; }
    // Add more validation based on applicationType
    console.log("Form 7 Submitted Data:", form7Data);
    alert("Form 7 Submitted (Mock)! Check console for data.");
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
        <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 'medium' }}>When to use:</Typography>
        <Box component="ul" sx={{ pl: 2.5, color: 'text.secondary' }}>
            <li>To object to someone's inclusion in the voter list (if ineligible).</li>
            <li>To request deletion of one's own name (e.g., due to permanent shifting).</li>
            <li>To report the death of an elector for name deletion.</li>
        </Box>
        <Box sx={{ mt: 4, p: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 2, textAlign: 'center' }}>
          <Button variant="contained" color="secondary" size="large" startIcon={<DeleteForeverIcon />} onClick={handleOpenFormDialog} sx={{mr:2, mb: {xs:1, sm:0}}}>Submit Form 7 Online</Button>
          <Button variant="outlined" color="primary" size="large" startIcon={<CloudDownloadIcon />} href="#" target="_blank" rel="noopener noreferrer">Download PDF Form</Button>
        </Box>
      </Paper>

      {/* Form 7 Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="md" scroll="paper">
        <DialogTitle sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          Form 7 - {formTitle}
          <IconButton onClick={handleCloseFormDialog}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" id="form7" onSubmit={handleForm7Submit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl component="fieldset" required>
                  <FormLabel component="legend">Application for:</FormLabel>
                  <RadioGroup row name="applicationType" value={form7Data.applicationType} onChange={handleForm7Change}>
                    <FormControlLabel value="objection" control={<Radio />} label="Objection to inclusion of name" />
                    <FormControlLabel value="deletion" control={<Radio />} label="Request for deletion of name" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {form7Data.applicationType === 'objection' && (
                <>
                  <Grid item xs={12} sx={{mt:1}}><Typography variant="subtitle1">Details of Person Objecting</Typography></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth required label="Name of Objector" name="objectorName" value={form7Data.objectorName} onChange={handleForm7Change} /></Grid>
                  <Grid item xs={12} sm={3}><TextField fullWidth label="Part No. in Roll" name="objectorPartNo" value={form7Data.objectorPartNo} onChange={handleForm7Change} /></Grid>
                  <Grid item xs={12} sm={3}><TextField fullWidth label="Serial No. in Roll" name="objectorSerialNo" value={form7Data.objectorSerialNo} onChange={handleForm7Change} /></Grid>

                  <Grid item xs={12} sx={{mt:1}}><Typography variant="subtitle1">Details of Person whose entry is Objected To</Typography></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth required label="Name of Person Objected To" name="personObjectedName" value={form7Data.personObjectedName} onChange={handleForm7Change} /></Grid>
                  <Grid item xs={12} sm={3}><TextField fullWidth label="Part No. in Roll" name="personObjectedPartNo" value={form7Data.personObjectedPartNo} onChange={handleForm7Change} /></Grid>
                  <Grid item xs={12} sm={3}><TextField fullWidth label="Serial No. in Roll" name="personObjectedSerialNo" value={form7Data.personObjectedSerialNo} onChange={handleForm7Change} /></Grid>
                  <Grid item xs={12}><TextField fullWidth required multiline rows={3} label="Reason for Objection" name="reasonForObjection" value={form7Data.reasonForObjection} onChange={handleForm7Change} /></Grid>
                </>
              )}

              {form7Data.applicationType === 'deletion' && (
                <>
                  <Grid item xs={12} sx={{mt:1}}><Typography variant="subtitle1">Details of Applicant (if different from person whose name is to be deleted)</Typography></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="Name of Applicant" name="applicantName" value={form7Data.applicantName} onChange={handleForm7Change} /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="Applicant's EPIC No." name="applicantEpic" value={form7Data.applicantEpic} onChange={handleForm7Change} /></Grid>

                  <Grid item xs={12} sx={{mt:1}}><Typography variant="subtitle1">Details of Person whose Name is to be Deleted</Typography></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth required label="Name of Person" name="personToDeleteName" value={form7Data.personToDeleteName} onChange={handleForm7Change} /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth required label="EPIC No. of Person" name="personToDeleteEpic" value={form7Data.personToDeleteEpic} onChange={handleForm7Change} /></Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth required select SelectProps={{ native: true }} label="Reason for Deletion" name="reasonForDeletion" value={form7Data.reasonForDeletion} onChange={handleForm7Change}>
                      <option value=""></option>
                      <option value="death">Death</option>
                      <option value="shifted">Shifted/Permanently Moved</option>
                      <option value="duplicate">Duplicate Entry</option>
                      <option value="not_citizen">No longer an Indian Citizen</option>
                      <option value="disqualified">Disqualified</option>
                    </TextField>
                  </Grid>
                   {/* Attach proof for death/shifting etc. */}
                </>
              )}

              <Grid item xs={12} sx={{mt:3}}>
                <FormControlLabel control={<Checkbox name="declaration" checked={form7Data.declaration} onChange={handleForm7Change} required />}
                  label="I solemnly affirm/declare that the information furnished above is true and correct..." // Shortened
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{p:2}}>
          <Button onClick={handleCloseFormDialog} color="inherit">Cancel</Button>
          <Button type="submit" form="form7" variant="contained" color="primary">Submit Form 7</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}