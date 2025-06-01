import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link as MuiLink, // Renamed to avoid conflict
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
  Avatar,
  Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote'; // Placeholder for logo
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // Avatar icon
import RefreshIcon from '@mui/icons-material/Refresh';

// Simple CAPTCHA generation function
const generateCaptchaText = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', // For Mobile/EPIC/Email
    password: '',
    captcha: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCaptchaText(generateCaptchaText());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRefreshCaptcha = () => {
    setCaptchaText(generateCaptchaText());
    setFormData({ ...formData, captcha: '' }); // Clear captcha input on refresh
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic Validation
    if (!formData.username || !formData.password || !formData.captcha) {
      setError('All fields are required.');
      setLoading(false);
      handleRefreshCaptcha();
      return;
    }

    if (formData.captcha.toLowerCase() !== captchaText.toLowerCase()) {
      setError('CAPTCHA verification failed. Please try again.');
      setLoading(false);
      handleRefreshCaptcha();
      return;
    }

    // --- Mock API Call ---
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock success/failure (in a real app, this would be an API call)
      if (formData.username === 'user@example.com' && formData.password === 'password123') {
        alert('Login successful! (Mocked)');
        // TODO: Store token, update auth context, etc.
        navigate('/'); // Redirect to home page after successful login
      } else {
        setError('Invalid credentials. Please try again.');
        handleRefreshCaptcha();
      }
    } catch (apiError) {
      setError('An error occurred during login. Please try again later.');
      handleRefreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 128px)', // Adjust if you have global Navbar/Footer of fixed height
        py: { xs: 2, md: 4 }
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          mt: 3, // Margin top to push it down a bit
          borderRadius: 2, // Softer corners
        }}
      >
        {/* Logo/Branding Area */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Typography component="h1" variant="h5" sx={{ mb: 1, color: 'primary.dark', fontWeight: 'bold' }}>
          Voter Portal Login
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Login to access your personalized services.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Mobile Number / EPIC No. / Email"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* CAPTCHA Section */}
          <Grid container spacing={1} alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <Grid item xs={7} sm={8}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  textAlign: 'center',
                  fontFamily: 'monospace',
                  fontSize: '1.5rem',
                  letterSpacing: '0.3em',
                  userSelect: 'none',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'30\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
                  backgroundColor: 'grey.200',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                {captchaText}
              </Paper>
            </Grid>
            <Grid item xs={5} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleRefreshCaptcha} aria-label="refresh captcha" disabled={loading} color="primary">
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            name="captcha"
            label="Enter CAPTCHA"
            id="captcha"
            value={formData.captcha}
            onChange={handleChange}
            disabled={loading}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" // ECI uses a blueish primary
            disabled={loading}
            sx={{ mt: 2, mb: 2, py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>

          <Grid container justifyContent="space-between">
            <Grid item>
              <MuiLink component={RouterLink} to="/forgot-password" variant="body2" color="primary.main">
                Forgot password?
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink component={RouterLink} to="/register" variant="body2" color="secondary.main" sx={{fontWeight: 'bold'}}>
                {"New User? Register Here"}
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Paper>
       <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
        For technical support, contact: 1950
        <br />
        © Election Commission of India
      </Typography>
    </Container>
  );
}