import { createTheme } from '@mui/material/styles';

const adminTheme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Dark Blue
      light: '#1976D2',
      dark: '#002171',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6F00', // Orange Accent
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6f8', // Light grey for content area
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#5f6368',
    },
    // Custom color for the sidebar
    sidebar: {
      background: '#232f3e', // Darker, slightly desaturated blue/grey
      text: '#e0e0e0', // Light grey text for sidebar
      hoverBackground: '#1a242f',
      activeBackground: '#0D47A1', // Use primary main for active item
      activeText: '#ffffff',
    },
    divider: 'rgba(255, 255, 255, 0.12)', // For dividers in dark sidebar
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none', // Remove default border if not desired
        }
      }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                '&.Mui-selected': {
                    // backgroundColor: 'rgba(13, 71, 161, 0.15)', // Lighter primary for active
                    // color: '#0D47A1',
                    // '& .MuiListItemIcon-root': {
                    //     color: '#0D47A1',
                    // },
                },
            },
        },
    },
  },
});

export default adminTheme;