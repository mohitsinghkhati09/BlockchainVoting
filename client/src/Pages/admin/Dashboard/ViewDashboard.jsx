import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Avatar,
  Skeleton,
  Breadcrumbs,
  Link as MuiLink,
  List, // For Recent Activity
  ListItem, // For Recent Activity
  ListItemText, // For Recent Activity
  ListItemIcon, // For Recent Activity
  Divider, // For separation
  Button, // For Quick Links
  Stack // For Quick Links layout
} from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from "axios";

// Icons
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PollIcon from '@mui/icons-material/Poll';
// Icons for Further Insights
import HistoryIcon from '@mui/icons-material/History'; // For Recent Activity
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // For Quick Action
import AssessmentIcon from '@mui/icons-material/Assessment'; // For Reports/Charts
import SettingsIcon from '@mui/icons-material/Settings'; // For Settings Quick Link
import BarChartIcon from '@mui/icons-material/BarChart'; // For Chart Placeholder

// --- Self-Contained ContentHeader Component ---
function ContentHeader({ title = "Dashboard Overview", breadcrumbPath }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{mb:1}}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/admin">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Admin
        </MuiLink>
        {breadcrumbPath ? (
             <MuiLink component={RouterLink} underline="hover" color="inherit" to={breadcrumbPath.path}>
                {breadcrumbPath.icon} {breadcrumbPath.name}
            </MuiLink>
        ) : (
            <Typography color="text.primary" sx={{display: 'flex', alignItems: 'center'}}>
                <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Dashboard
            </Typography>
        )}
      </Breadcrumbs>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
        {title}
      </Typography>
    </Box>
  );
}

// --- Self-Contained DashboardCard Component ---
function DashboardCardMUI({ title, data, icon, color = 'primary' }) {
  const isLoading = data === null || data === "Loading...";
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, boxShadow: '0 6px 20px -10px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 10px 25px -8px ${ color === 'primary' ? 'rgba(13,71,161,0.3)' : color === 'secondary' ? 'rgba(255,102,0,0.3)' : color === 'success' ? 'rgba(46,125,50,0.3)' : 'rgba(0,0,0,0.2)' }`, }, borderTop: (theme) => `4px solid ${theme.palette[color]?.main || theme.palette.primary.main}` }}>
      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
        {icon && (<Avatar sx={{ bgcolor: (theme) => `${theme.palette[color]?.light || theme.palette.primary.light}50`, color: (theme) => theme.palette[color]?.dark || theme.palette.primary.dark, width: 60, height: 60, mb: 2 }}>{React.cloneElement(icon, { sx: { fontSize: '2rem' }})}</Avatar>)}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', color: 'text.secondary', mb: 1 }}>{title}</Typography>
        {isLoading ? (<Skeleton variant="text" width="50%" height={48} sx={{mx:'auto'}} />) : (<Typography variant="h3" sx={{ fontWeight: 'bold', color: (theme) => theme.palette[color]?.dark || theme.palette.primary.dark }}>{data ?? 'N/A'}</Typography>)}
      </CardContent>
    </Card>
  );
}

// --- Main ViewDashboard Component ---
const ViewDashboard = () => {
  const [stats, setStats] = useState({ users: null, candidates: null, elections: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For quick links

  // Mock Recent Activity Data
  const recentActivities = [
    { id: 1, text: "New user 'john.doe' registered.", time: "2 hours ago", icon: <PeopleAltIcon fontSize="small" color="primary"/> },
    { id: 2, text: "Election 'State Assembly 2024' created.", time: "5 hours ago", icon: <PollIcon fontSize="small" color="secondary"/> },
    { id: 3, text: "Candidate 'Jane Smith' application approved.", time: "1 day ago", icon: <HowToRegIcon fontSize="small" color="success"/> },
    { id: 4, text: "System maintenance scheduled for tomorrow.", time: "1 day ago", icon: <SettingsIcon fontSize="small" color="action"/> },
  ];

  useEffect(() => {
    async function getDashboardStats() {
      setLoading(true); setError('');
      try {
        const [userRes, candidateRes, electionRes] = await Promise.all([
          axios.get("http://localhost:1322/api/auth/users"),
          axios.get("http://localhost:1322/api/auth/candidates"),
          axios.get("http://localhost:1322/api/auth/elections"),
        ]);
        setStats({ users: userRes.data.length, candidates: candidateRes.data.length, elections: electionRes.data.length });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard statistics. Please try again later.");
      } finally { setLoading(false); }
    }
    getDashboardStats();
  }, []);

  const cardData = [
    { title: "Total Users", dataKey: "users", icon: <PeopleAltIcon />, color: 'primary' },
    { title: "Registered Candidates", dataKey: "candidates", icon: <HowToRegIcon />, color: 'success' },
    { title: "Active Elections", dataKey: "elections", icon: <PollIcon />, color: 'secondary' },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, py: {xs: 3, md: 4}, px: {xs: 2, md: 3}, backgroundColor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
      <Container maxWidth="xl">
        <ContentHeader title="Admin Dashboard Overview" />

        {loading && (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><CircularProgress size={60} /><Typography variant="h6" sx={{ml:2}}>Loading Dashboard Data...</Typography></Box>)}
        {error && !loading && (<Alert severity="error" sx={{ mb:3 }}>{error}</Alert>)}

        {!loading && !error && (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}> {/* Added mb for spacing before next section */}
              {cardData.map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card.title}>
                  <DashboardCardMUI title={card.title} data={stats[card.dataKey]} icon={card.icon} color={card.color} />
                </Grid>
              ))}
            </Grid>

            {/* Enhanced Further Insights Section */}
            <Grid container spacing={4}>
              {/* Recent Activity Section */}
              <Grid item xs={12} md={7} lg={8}>
                <Paper elevation={2} sx={{p:0, borderRadius: 2, height: '100%'}}>
                  <Box sx={{p:2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center'}}>
                    <HistoryIcon color="primary" sx={{mr:1}}/>
                    <Typography variant="h6" component="div" sx={{fontWeight:'medium'}}>Recent Activity</Typography>
                  </Box>
                  <List dense sx={{maxHeight: 380, overflow: 'auto'}}> {/* dense for more items, maxHeight for scroll */}
                    {recentActivities.map((activity, index) => (
                      <React.Fragment key={activity.id}>
                        <ListItem>
                          <ListItemIcon sx={{minWidth: 36}}>
                            {activity.icon || <DashboardIcon fontSize="small"/>}
                          </ListItemIcon>
                          <ListItemText
                            primary={activity.text}
                            secondary={activity.time}
                          />
                        </ListItem>
                        {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                      </React.Fragment>
                    ))}
                    {recentActivities.length === 0 && (
                        <ListItem>
                            <ListItemText primary="No recent activities to display." />
                        </ListItem>
                    )}
                  </List>
                   <Box sx={{p:2, textAlign:'right', borderTop: '1px solid', borderColor: 'divider'}}>
                        <Button size="small" onClick={() => alert("Navigate to full activity log (Not implemented)")}>View All Activity</Button>
                    </Box>
                </Paper>
              </Grid>

              {/* Quick Actions & Chart Placeholder Section */}
              <Grid item xs={12} md={5} lg={4}>
                <Stack spacing={3}>
                    {/* Quick Actions */}
                    <Paper elevation={2} sx={{p:2.5, borderRadius: 2}}>
                        <Box sx={{mb:2, display: 'flex', alignItems: 'center'}}>
                            <AddCircleOutlineIcon color="primary" sx={{mr:1}}/>
                            <Typography variant="h6" component="div" sx={{fontWeight:'medium'}}>Quick Actions</Typography>
                        </Box>
                        <Grid container spacing={1.5}>
                            <Grid item xs={6}><Button fullWidth variant="contained" onClick={() => navigate('/admin/user/add')}>Add User</Button></Grid>
                            <Grid item xs={6}><Button fullWidth variant="contained" onClick={() => navigate('/admin/candidate/add')}>Add Candidate</Button></Grid>
                            <Grid item xs={6}><Button fullWidth variant="contained" onClick={() => navigate('/admin/election/add')}>Create Election</Button></Grid>
                            <Grid item xs={6}><Button fullWidth variant="outlined" onClick={() => navigate('/admin/settings')}>Settings</Button></Grid>
                        </Grid>
                    </Paper>

                    {/* Chart Placeholder */}
                    <Paper elevation={2} sx={{p:2.5, borderRadius: 2, textAlign:'center'}}>
                        <Box sx={{mb:2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <BarChartIcon color="primary" sx={{mr:1}}/>
                            <Typography variant="h6" component="div" sx={{fontWeight:'medium'}}>User Registrations (Monthly)</Typography>
                        </Box>
                        <Box sx={{ height: 200, display:'flex', alignItems:'center', justifyContent:'center', backgroundColor: 'grey.100', borderRadius: 1 }}>
                            <Typography color="text.secondary">[Chart Placeholder - e.g., Bar Chart]</Typography>
                        </Box>
                         <Button size="small" sx={{mt:1.5}} onClick={() => alert("Navigate to reports (Not implemented)")}>View Full Report</Button>
                    </Paper>
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ViewDashboard;