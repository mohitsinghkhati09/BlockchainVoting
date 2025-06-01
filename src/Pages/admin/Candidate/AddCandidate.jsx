import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid, Paper, Container, Alert } from "@mui/material";
// Assuming these are now MUI-styled components or wrappers
import DatePicker from "../../../Components/Form/DatePicker"; // Adjust path
import ContentHeader from "../../../Components/ContentHeader"; // Adjust path
import InputField from "../../../Components/Form/InputField";   // Adjust path
import { ErrorMessage } from "../../../Components/Form/ErrorMessage"; // Adjust path

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddCandidate() {
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const navigate = useNavigate();

  // Using a single state object for form data is often cleaner
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dob: "",
    qualification: "",
    joinYear: String(new Date().getFullYear() - 20), // Default to 20 years ago as an example
    location: "",
    description: "",
  });

  const [errors, setErrors] = useState({}); // For form validation errors
  const [submitError, setSubmitError] = useState(''); // For API submission errors
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    else {
        const birthDate = new Date(formData.dob);
        const ageDiffMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 25) newErrors.dob = "Candidate must be at least 25 years old.";
    }
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (parseInt(formData.joinYear) < 1900 || parseInt(formData.joinYear) > new Date().getFullYear()) {
        newErrors.joinYear = `Join year must be between 1900 and ${new Date().getFullYear()}.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    const dataToSubmit = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      qualification: formData.qualification,
      join: formData.joinYear, // Ensure your backend expects 'join' for the year
      location: formData.location,
      description: formData.description,
    };

    try {
      const res = await axios.post("http://localhost:1322/api/auth/candidate/register", dataToSubmit);
      console.log(res.status);
      if (res.status === 201) {
        // Optionally show a success message before navigating
        alert("Candidate added successfully!"); // Replace with a Snackbar for better UX
        navigate("/admin/candidate"); // Or your list of candidates
      } else {
        setSubmitError(`Failed to add candidate. Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error.response?.data?.message || "An error occurred while adding the candidate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Assuming this page is rendered inside AdminLayout, which provides overall padding
    // So, Container here might be for content within the page
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <ContentHeader title="Add New Candidate" /> {/* Use your MUI-styled ContentHeader */}

      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          boxShadow: '0px 8px 24px -4px rgba(149, 157, 165, 0.2), 0px 0px 4px 0px rgba(149, 157, 165, 0.12)'
        }}
      >
        <form onSubmit={handleSubmit} noValidate> {/* noValidate to use custom validation */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'medium', color: 'primary.main', textAlign:'center' }}>
            Candidate Registration Form
          </Typography>

          {submitError && <Alert severity="error" sx={{mb: 2}}>{submitError}</Alert>}

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <InputField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                title="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                max={maxDate} // Ensure this format matches what TextField type="date" expects
                required
                error={!!errors.dob} // Pass error state
              />
              {/* ErrorMessage can be integrated into DatePicker or shown separately */}
              <ErrorMessage message={errors.dob} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                type="number"
                label="Politics Join From (Year)"
                name="joinYear"
                value={formData.joinYear}
                onChange={handleChange}
                inputProps={{ min: 1900, max: new Date().getFullYear() }}
                required
                error={!!errors.joinYear}
                helperText={errors.joinYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label="Highest Qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                error={!!errors.qualification}
                helperText={errors.qualification}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                label="Location (City/Constituency)"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                error={!!errors.location}
                helperText={errors.location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField // Using MUI TextField directly for multiline
                label="Brief Description / Profile"
                name="description"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                margin="dense"
                value={formData.description}
                onChange={handleChange}
                // No specific validation error shown here, but can be added
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                type="button"
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/admin/candidate")} // Or wherever your candidate list is
                sx={{ mr: 2 }}
                disabled={isSubmitting}
            >
                Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              sx={{ fontWeight: 'bold' }}
            >
              {isSubmitting ? "Adding Candidate..." : "Add Candidate"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}