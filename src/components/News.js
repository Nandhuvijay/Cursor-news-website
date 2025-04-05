import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  CardMedia,
  Typography, 
  Grid, 
  TextField, 
  Button,
  Box,
  CircularProgress,
  Alert,
  CardActions,
  Tabs,
  Tab,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Container,
  AppBar,
  Toolbar,
  Backdrop,
  Fade,
  Pagination,
  Breadcrumbs,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SportsIcon from '@mui/icons-material/Sports';
import BusinessIcon from '@mui/icons-material/Business';
import ScienceIcon from '@mui/icons-material/Science';
import MovieIcon from '@mui/icons-material/Movie';
import PublicIcon from '@mui/icons-material/Public';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ComputerIcon from '@mui/icons-material/Computer';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { keyframes } from '@mui/system';
import { parseString } from 'xml2js';
import { Buffer } from 'buffer';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InputAdornment from '@mui/material/InputAdornment';
window.Buffer = Buffer;

// Add these keyframes after imports and before the News component
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Add defaultImageUrl before the News component
const defaultImageUrl = 'https://placehold.co/400x200?text=News';

// Add these polyfills
const parseXMLPromise = (xml) => {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const NEWS_SOURCES = {
  TOI: {
    name: 'Times of India',
    rssFeeds: {
      top: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
      world: 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms',
      sports: 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms',
      business: 'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms',
      entertainment: 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms',
      health: 'https://timesofindia.indiatimes.com/rssfeeds/3908999.cms',
      science: 'https://timesofindia.indiatimes.com/rssfeeds/-2128672765.cms',
      technology: 'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms',
      agriculture: 'https://timesofindia.indiatimes.com/rssfeeds/-2128816011.cms',
      politics: 'https://timesofindia.indiatimes.com/rssfeeds/7098551.cms'
    }
  },
  HINDU: {
    name: 'The Hindu',
    rssFeeds: {
      top: 'https://www.thehindu.com/news/feeder/default.rss',
      world: 'https://www.thehindu.com/news/international/feeder/default.rss',
      sports: 'https://www.thehindu.com/sport/feeder/default.rss',
      business: 'https://www.thehindu.com/business/feeder/default.rss',
      entertainment: 'https://www.thehindu.com/entertainment/feeder/default.rss',
      health: 'https://www.thehindu.com/sci-tech/health/feeder/default.rss',
      science: 'https://www.thehindu.com/sci-tech/feeder/default.rss',
      technology: 'https://www.thehindu.com/sci-tech/technology/feeder/default.rss',
      agriculture: 'https://www.thehindu.com/business/agri-business/feeder/default.rss',
      politics: 'https://www.thehindu.com/news/national/feeder/default.rss'
    }
  },
  HT: {
    name: 'Hindustan Times',
    rssFeeds: {
      top: 'https://www.hindustantimes.com/feeds/rss/news/rssfeed.xml',
      world: 'https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml',
      sports: 'https://www.hindustantimes.com/feeds/rss/sports/rssfeed.xml',
      business: 'https://www.hindustantimes.com/feeds/rss/business/rssfeed.xml',
      entertainment: 'https://www.hindustantimes.com/feeds/rss/entertainment/rssfeed.xml',
      health: 'https://www.hindustantimes.com/feeds/rss/lifestyle/health/rssfeed.xml',
      science: 'https://www.hindustantimes.com/feeds/rss/education/rssfeed.xml',
      technology: 'https://www.hindustantimes.com/feeds/rss/tech/rssfeed.xml',
      agriculture: 'https://www.hindustantimes.com/feeds/rss/business/agriculture/rssfeed.xml',
      politics: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml'
    }
  }
};

const fetchRSSFeed = async (url) => {
  try {
    // Use a more reliable CORS proxy
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const response = await axios.get(`${corsProxy}${url}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    const result = await parseXMLPromise(response.data);
    return result;
  } catch (error) {
    console.error('Error fetching RSS:', error);
    // Try alternative proxy if first one fails
    try {
      const altProxy = 'https://api.codetabs.com/v1/proxy?quest=';
      const response = await axios.get(`${altProxy}${url}`);
      const result = await parseXMLPromise(response.data);
      return result;
    } catch (altError) {
      console.error('Error with alternative proxy:', altError);
      return null;
    }
  }
};

// Add this function to sanitize HTML content
const sanitizeHTML = (html) => {
  if (!html) return '';
  return html
    .replace(/<img[^>]*>/g, '') // Remove img tags
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading and trailing spaces
};

const processRSSItems = (items) => {
  return items.map(item => {
    // Extract the first image URL from the description if available
    let imageUrl = item.enclosure?.[0]?.$.url || 
                  item['media:content']?.[0]?.$.url ||
                  item['media:thumbnail']?.[0]?.$.url;

    // If no image URL found, try to extract from description
    if (!imageUrl && item.description?.[0]) {
      const imgMatch = item.description[0].match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) {
        imageUrl = imgMatch[1];
      }
    }

    // Clean up the description
    let description = item.description?.[0] || '';
    description = sanitizeHTML(description);

    // Clean up the title
    let title = item.title?.[0] || '';
    title = sanitizeHTML(title);

    return {
      title: title,
      description: description,
      url: item.link?.[0] || '',
      urlToImage: imageUrl || defaultImageUrl,
      publishedAt: item.pubDate?.[0] || new Date().toISOString(),
      source: {
        name: item.source?.[0] || 'Indian News'
      }
    };
  });
};

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('world');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Add cache state
  const [newsCache, setNewsCache] = useState({});
  const [lastFetchTime, setLastFetchTime] = useState({});
  const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache
  const API_COOLDOWN = 5000; // 5 seconds cooldown
  const RETRY_DELAY = 10000; // 10 seconds retry delay

  // Add new state for dialogs and subscription
  const [loginOpen, setLoginOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#1db954' : '#d32f2f',
      },
      background: {
        default: darkMode ? '#121212' : '#ffffff',
        paper: darkMode ? '#1E1E1E' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? '#888888' : '#666666',
      },
    },
  });

  const categories = [
    { value: 'world', label: 'World', icon: <PublicIcon />, color: '#9c27b0', gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)' },
    { value: 'sports', label: 'Sports', icon: <SportsIcon />, color: '#4caf50', gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)' },
    { value: 'business', label: 'Business', icon: <BusinessIcon />, color: '#ff9800', gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)' },
    { value: 'entertainment', label: 'Entertainment', icon: <MovieIcon />, color: '#e91e63', gradient: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)' },
    { value: 'health', label: 'Health', icon: <LocalHospitalIcon />, color: '#00bcd4', gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)' },
    { value: 'science', label: 'Science', icon: <ScienceIcon />, color: '#9c27b0', gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)' },
    { value: 'technology', label: 'Technology', icon: <ComputerIcon />, color: '#673ab7', gradient: 'linear-gradient(135deg, #673ab7 0%, #512da8 100%)' },
    { value: 'agriculture', label: 'Agriculture', icon: <AgricultureIcon />, color: '#8bc34a', gradient: 'linear-gradient(135deg, #8bc34a 0%, #689f38 100%)' },
    { value: 'politics', label: 'Politics', icon: <AccountBalanceIcon />, color: '#f44336', gradient: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' }
  ];

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const feeds = [];
      let sourceErrors = [];
      let retryCount = 0;
      const maxRetries = 2;
      
      async function attemptFetch() {
        // Determine which feeds to fetch based on category
        for (const [sourceKey, source] of Object.entries(NEWS_SOURCES)) {
          const feedUrl = source.rssFeeds[category] || source.rssFeeds.top;
          if (feedUrl) {
            try {
              console.log(`Fetching ${category} news from ${sourceKey}... (Attempt ${retryCount + 1})`);
              const result = await fetchRSSFeed(feedUrl);
              if (result?.rss?.channel?.[0]?.item) {
                const processedItems = processRSSItems(result.rss.channel[0].item);
                console.log(`Successfully fetched ${processedItems.length} items from ${sourceKey}`);
                feeds.push(...processedItems);
              } else {
                sourceErrors.push(`${sourceKey}: No items found in feed`);
              }
            } catch (error) {
              console.error(`Error fetching from ${sourceKey}:`, error);
              sourceErrors.push(`${sourceKey}: ${error.message}`);
            }
          }
        }
      }

      // First attempt
      await attemptFetch();

      // If no articles found, retry with delays
      while (feeds.length === 0 && retryCount < maxRetries) {
        retryCount++;
        console.log(`No articles found, retrying... (Attempt ${retryCount + 1})`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay between retries
        sourceErrors = []; // Clear previous errors
        await attemptFetch();
      }

      // Sort by date and filter
      const validArticles = feeds
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .filter(article => 
          article.title && 
          article.description && 
          !article.title.includes('[Removed]')
        )
        .slice(0, 30); // Limit to 30 articles

      if (validArticles.length === 0) {
        const errorMessage = sourceErrors.length > 0 
          ? `Failed to fetch ${category} news from all sources. Errors: ${sourceErrors.join('; ')}`
          : `No ${category} news found. Please try another category.`;
        throw new Error(errorMessage);
      }

      console.log(`Successfully processed ${validArticles.length} articles for ${category} category`);
      setNews(validArticles);
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
      setError(`Failed to fetch ${category} news. ${error.message}`);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  // Update useEffect to use a longer debounce
  useEffect(() => {
    let timeoutId;
    const fetchWithDelay = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchNews();
      }, 1000); // 1 second delay before fetching
    };

    fetchWithDelay();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [category]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setCategory(categories[newValue].value);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getCurrentPageArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return news.slice(startIndex, endIndex);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(news.length / articlesPerPage);

  // Add handlers for login
  const handleLoginOpen = () => {
    setLoginOpen(true);
    setLoginError('');
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setEmail('');
    setPassword('');
    setLoginError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please fill in all fields');
      return;
    }
    // Add your login logic here
    handleLoginClose();
  };

  // Add handlers for subscribe
  const handleSubscribeOpen = () => {
    if (!isSubscribed) {
      setSubscribeOpen(true);
    }
  };

  const handleSubscribeClose = () => {
    setSubscribeOpen(false);
    setSubscribeEmail('');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscribeEmail) {
      return;
    }
    setIsSubscribed(true);
    setSubscribeSuccess(true);
    handleSubscribeClose();
    // Add your subscription logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh',
        background: theme.palette.background.default,
        pt: 2
      }}>
        <Container maxWidth="xl">
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, md: 3 },
              mb: 3,
              background: theme.palette.background.paper,
              borderBottom: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
              borderRadius: 0,
              position: 'relative'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 3 
            }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 800,
                  color: theme.palette.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '-0.5px',
                  textTransform: 'none',
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  paddingBottom: 1,
                  marginBottom: 2
                }}
              >
                Daily News
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <IconButton 
                  onClick={toggleDarkMode} 
                  sx={{ 
                    color: theme.palette.text.primary,
                    border: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
                    borderRadius: '50%',
                    p: 1,
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Button
                  variant="text"
                  onClick={handleLoginOpen}
                  sx={{
                    color: theme.palette.text.primary,
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }}
                >
                  LOGIN
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubscribeOpen}
                  startIcon={isSubscribed ? <CheckCircleIcon /> : null}
                  sx={{
                    bgcolor: isSubscribed ? '#4caf50' : theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: isSubscribed ? '#45a049' : (darkMode ? '#1ed760' : '#b71c1c'),
                    },
                    textTransform: 'none',
                    borderRadius: 0,
                    fontWeight: 500
                  }}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </Button>
              </Box>
            </Box>

            {/* Category Tabs */}
            <Box sx={{ 
              mb: 4,
              borderBottom: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
              position: 'relative'
            }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ 
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: theme.palette.text.secondary,
                    minHeight: 40,
                    padding: '8px 16px',
                    letterSpacing: '0.3px',
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                    },
                  },
                  '& .MuiTabs-indicator': {
                    height: '3px',
                    borderRadius: '3px 3px 0 0',
                    backgroundColor: theme.palette.primary.main,
                  }
                }}
              >
                {categories.map((cat, index) => (
                  <Tab
                    key={cat.value}
                    label={
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        '& svg': {
                          fontSize: '1.2rem',
                          color: cat.color
                        }
                      }}>
                        {cat.icon}
                        {cat.label}
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>

            {/* Category Title */}
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3, 
                color: theme.palette.text.primary,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {categories.find(cat => cat.value === category)?.icon}
              {categories.find(cat => cat.value === category)?.label} News
            </Typography>

            {loading ? (
              <Backdrop
                open={loading}
                sx={{
                  color: '#fff',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3
                }}
              >
                <Box sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4
                }}>
                  {/* Main rotating circle */}
                  <Box sx={{
                    position: 'relative',
                    width: '80px',
                    height: '80px',
                  }}>
                    <Box sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      border: '4px solid transparent',
                      borderTopColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      animation: `${rotate} 1s linear infinite`
                    }} />
                    <Box sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      border: '4px solid transparent',
                      borderRightColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      animation: `${rotate} 1s linear infinite`,
                      animationDelay: '-0.5s'
                    }} />
                    
                    {/* Center pulsing dot */}
                    <Box sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '15px',
                      height: '15px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      animation: `${pulse} 1s ease-in-out infinite`
                    }} />
                  </Box>

                  {/* Floating text with gradient */}
                  <Box sx={{
                    animation: `${float} 2s ease-in-out infinite`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        background: darkMode 
                          ? 'linear-gradient(45deg, #1ed760 30%, #4caf50 90%)'
                          : 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        letterSpacing: '1px'
                      }}
                    >
                      Loading Latest News
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        textAlign: 'center',
                        maxWidth: '300px',
                        fontSize: '0.9rem'
                      }}
                    >
                      Fetching the most recent updates for you
                    </Typography>
                  </Box>

                  {/* Progress dots */}
                  <Box sx={{
                    display: 'flex',
                    gap: 1,
                    mt: 2
                  }}>
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: '50%',
                          animation: `${pulse} 0.8s ease-in-out infinite`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Backdrop>
            ) : error ? (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: 0,
                  '& .MuiAlert-message': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {error}
                  <Button
                    size="small"
                    onClick={fetchNews}
                    startIcon={<AutorenewIcon />}
                    sx={{ ml: 2 }}
                  >
                    Retry
                  </Button>
                </Box>
              </Alert>
            ) : news.length === 0 ? (
              <Alert 
                severity="info" 
                sx={{ mb: 3, borderRadius: 0 }}
              >
                No articles found. Try a different search or category.
              </Alert>
            ) : (
              <>
                <Grid container spacing={3}>
                  {getCurrentPageArticles().map((article, index) => (
                    article && (
                      <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        key={`${article.title}-${index}`}
                      >
                        <Card 
                          sx={{ 
                            width: '100%',
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderRadius: 0,
                            boxShadow: 'none',
                            border: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`,
                            bgcolor: darkMode ? '#1E1E1E' : '#ffffff',
                            transition: 'all 0.3s',
                            '&:hover': {
                              boxShadow: darkMode 
                                ? '0 4px 12px rgba(0,0,0,0.3)' 
                                : '0 4px 12px rgba(0,0,0,0.1)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={article.urlToImage || defaultImageUrl}
                            alt={article.title}
                            sx={{ 
                              objectFit: 'cover',
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultImageUrl;
                            }}
                          />
                          <CardContent sx={{ flexGrow: 1, p: 2 }}>
                            <Typography 
                              variant="h6" 
                              gutterBottom
                              sx={{
                                fontFamily: 'Georgia, serif',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: darkMode ? '#fff' : '#000',
                                mb: 2,
                                lineHeight: 1.4,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {article.title || 'No title available'}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{
                                color: darkMode ? '#999' : '#666',
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                                mb: 2,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {article.description || 'No description available'}
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 2, 
                              mt: 'auto',
                              color: darkMode ? '#999' : '#666'
                            }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <AccessTimeIcon sx={{ fontSize: '1rem' }} />
                                {formatDate(article.publishedAt)}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontWeight: 500
                                }}
                              >
                                {article.source?.name || 'Unknown'}
                              </Typography>
                            </Box>
                          </CardContent>
                          <CardActions sx={{ 
                            p: 2, 
                            pt: 0, 
                            borderTop: `1px solid ${darkMode ? '#333' : '#e0e0e0'}` 
                          }}>
                            <Button
                              size="small"
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: darkMode ? '#fff' : '#000',
                                bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : '#f8f9fa',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                padding: '8px 20px',
                                borderRadius: '20px',
                                '&:hover': {
                                  bgcolor: theme.palette.primary.main,
                                  color: '#fff',
                                },
                                transition: 'all 0.3s ease'
                              }}
                              endIcon={<OpenInNewIcon />}
                            >
                              Read Article
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  ))}
                </Grid>
                
                {news.length > articlesPerPage && (
                  <Box sx={{ 
                    mt: 4, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Pagination 
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color={darkMode ? "primary" : "secondary"}
                      size="large"
                      showFirstButton
                      showLastButton
                      sx={{
                        '& .MuiPaginationItem-root': {
                          color: darkMode ? '#fff' : '#000',
                          borderColor: darkMode ? '#333' : '#e0e0e0',
                          margin: '0 4px',
                          '&.Mui-selected': {
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: darkMode ? '#1ed760' : '#b71c1c',
                            }
                          },
                          '&:hover': {
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                          }
                        }
                      }}
                    />
                  </Box>
                )}
              </>
            )}

            {/* Login Dialog */}
            <Dialog 
              open={loginOpen} 
              onClose={handleLoginClose}
              TransitionComponent={Fade}
              PaperProps={{
                sx: {
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 2,
                  minWidth: { xs: '90%', sm: '400px' },
                  overflow: 'hidden',
                  boxShadow: darkMode 
                    ? '0 8px 32px rgba(0,0,0,0.4)'
                    : '0 8px 32px rgba(0,0,0,0.1)',
                }
              }}
            >
              <Box sx={{
                position: 'relative',
                p: 3,
                textAlign: 'center',
                background: darkMode 
                  ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
                  : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              }}>
                <IconButton 
                  onClick={handleLoginClose} 
                  sx={{ 
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.text.secondary
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Avatar sx={{ 
                  width: 56, 
                  height: 56, 
                  margin: '0 auto 16px',
                  bgcolor: theme.palette.primary.main,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" component="h2" sx={{ 
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.text.primary
                }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 2 
                }}>
                  Sign in to access your personalized news feed
                </Typography>
              </Box>
              <form onSubmit={handleLogin}>
                <DialogContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <MailOutlineIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                        ),
                      }}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        }
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <LockOutlinedIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        }
                      }}
                    />
                  </Box>
                  {loginError && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                      {loginError}
                    </Alert>
                  )}
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      bgcolor: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: darkMode ? '#1ed760' : '#b71c1c',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Sign In
                  </Button>
                </DialogContent>
              </form>
            </Dialog>

            {/* Subscribe Dialog */}
            <Dialog 
              open={subscribeOpen} 
              onClose={handleSubscribeClose}
              TransitionComponent={Fade}
              PaperProps={{
                sx: {
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 2,
                  minWidth: { xs: '90%', sm: '400px' },
                  overflow: 'hidden',
                  boxShadow: darkMode 
                    ? '0 8px 32px rgba(0,0,0,0.4)'
                    : '0 8px 32px rgba(0,0,0,0.1)',
                }
              }}
            >
              <Box sx={{
                position: 'relative',
                p: 3,
                textAlign: 'center',
                background: darkMode 
                  ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
                  : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              }}>
                <IconButton 
                  onClick={handleSubscribeClose} 
                  sx={{ 
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.text.secondary
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Avatar sx={{ 
                  width: 56, 
                  height: 56, 
                  margin: '0 auto 16px',
                  bgcolor: theme.palette.primary.main,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  <NotificationsActiveIcon />
                </Avatar>
                <Typography variant="h5" component="h2" sx={{ 
                  fontWeight: 600,
                  mb: 1,
                  color: theme.palette.text.primary
                }}>
                  Stay Updated
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 2 
                }}>
                  Get the latest news delivered directly to your inbox
                </Typography>
              </Box>
              <form onSubmit={handleSubscribe}>
                <DialogContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={subscribeEmail}
                      onChange={(e) => setSubscribeEmail(e.target.value)}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <MailOutlineIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        }
                      }}
                    />
                  </Box>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      bgcolor: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: darkMode ? '#1ed760' : '#b71c1c',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Subscribe Now
                  </Button>
                  {subscribeSuccess && (
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mt: 2, 
                        borderRadius: 2,
                        alignItems: 'center'
                      }}
                      icon={<CheckCircleIcon fontSize="inherit" />}
                    >
                      Successfully subscribed! Welcome aboard.
                    </Alert>
                  )}
                </DialogContent>
              </form>
            </Dialog>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default News; 