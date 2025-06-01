import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link as MuiLink,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
  Avatar,
  Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Icon for registration
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import axios from 'axios'; // You'll uncomment this for actual API calls
// import { serverLink } from "../Data/Variables"; // Your server link

// --- BEGIN CONCEPTUAL BACKEND USER SCHEMA (from your provided code) ---
// This Mongoose schema would reside on your backend server.
/*
import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    fname: {
      type: String,
      min: 3,
      max: 20,
    },
    lname: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
    },
    location: {
      type: String,
      required: true,
    },
    emailverified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/luxuryhub-3b0f6.appspot.com/o/Site%20Images%2Fprofile.png?alt=media&token=6f94d26d-315c-478b-9892-67fda99d2cd6",
    },
    isAdmin: {
      type: Boolean,
      default: false, // Corrected from 0 to false for Boolean
    },
  },
  { timestamps: true }
);

const User = Mongoose.model("User", UserSchema);
export default User;
*/
// --- END CONCEPTUAL BACKEND USER SCHEMA ---


export default function UserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    location: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({}); // For client-side validation errors
  const [submitError, setSubmitError] = useState(''); // For API submission errors
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear specific error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setSubmitError(''); // Clear general submission error
    setSuccessMessage('');
  };

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleToggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim() || formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = "Username must be 3-20 characters.";
    }
    if (formData.fname.trim() && (formData.fname.length < 3 || formData.fname.length > 20)) {
      newErrors.fname = "First name must be 3-20 characters if provided.";
    }
    if (formData.lname.trim() && (formData.lname.length < 3 || formData.lname.length > 20)) {
      newErrors.lname = "Last name must be 3-20 characters if provided.";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "A valid email is required.";
    } else if (formData.email.length > 50) {
        newErrors.email = "Email cannot exceed 50 characters.";
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "A valid 10-digit mobile number is required.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    }
    if (!formData.password || formData.password.length < 6) { // Example: min 6 char password
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Prepare data according to the UserSchema (excluding confirmPassword)
    // Fields like emailverified, avatar, isAdmin are usually set by backend defaults or other processes.
    const dataToSubmit = {
      username: formData.username,
      fname: formData.fname.trim() || undefined, // Send undefined if empty for optional fields
      lname: formData.lname.trim() || undefined, // Send undefined if empty for optional fields
      email: formData.email,
      mobile: formData.mobile,
      location: formData.location,
      password: formData.password, // Backend will hash this
    };

    console.log("Data to submit to backend:", dataToSubmit);

    // --- ACTUAL API CALL (Example using axios - uncomment and adjust) ---
    try {
      // const response = await axios.post(`${serverLink}/api/auth/register`, dataToSubmit); // Adjust endpoint
      // console.log("Registration successful:", response.data);
      // setSuccessMessage("Registration successful! Please login.");
      // setTimeout(() => navigate('/user-login'), 2000); // Redirect to login after delay


      // --- MOCK API Call (for demonstration without a live backend) ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      if (dataToSubmit.username === "testexists") { // Mock existing user
        throw { response: { data: { message: "Username or email already exists." } } };
      }
      setSuccessMessage("Registration successful! You can now login. (Mocked)");
      // Clear form or redirect
      setFormData({ username: '', fname: '', lname: '', email: '', mobile: '', location: '', password: '', confirmPassword: ''});
      setTimeout(() => navigate('/user-login'), 3000); // Redirect to login page
      // --- End of MOCK API Call ---

    } catch (apiError) {
      console.error("Registration error:", apiError);
      setSubmitError(apiError.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm" // Adjusted for a potentially longer form
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, md: 4 },
        mt: 2
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2, color: 'primary.dark', fontWeight: 'bold' }}>
          Create New Account
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }} onClose={() => setSubmitError('')}>
            {submitError}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="fname"
                label="First Name (Optional)"
                name="fname"
                autoComplete="given-name"
                value={formData.fname}
                onChange={handleChange}
                error={!!errors.fname}
                helperText={errors.fname}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lname"
                label="Last Name (Optional)"
                name="lname"
                autoComplete="family-name"
                value={formData.lname}
                onChange={handleChange}
                error={!!errors.lname}
                helperText={errors.lname}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="mobile"
                label="Mobile Number (10 digits)"
                name="mobile"
                autoComplete="tel"
                value={formData.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="location"
                label="Location (City/Area)"
                name="location"
                autoComplete="address-level2" // Or a more appropriate autocomplete
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register Account'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <MuiLink component={RouterLink} to="/user-login" variant="body2" color="primary.main">
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
        By registering, you agree to our Terms and Conditions.
        <br />
        {/* Add any other footer text as needed */}
      </Typography>
    </Container>
  );
}