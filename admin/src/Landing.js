import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import backgroundPic from './assets/BarQBg.png';
import mock1 from './assets/mockups_iphone_xs1/IMG_2876_iphonexspacegrey_portrait.png';
import mock2 from './assets/mockups_iphone_xs1/IMG_2878_iphonexspacegrey_portrait.png';
import mock3 from './assets/mockups_iphone_xs1/IMG_2880_iphonexspacegrey_portrait.png';
import adminScreenshot from './assets/admin_screenshot.png';
import ipad1 from './assets/mockups_idpad/Selection_018_ipadmini_white_portrait.png';
import ipad2 from './assets/mockups_idpad/Selection_019_ipadmini_white_portrait.png';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ea0e48',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: '#ea0e48',
    },
  },
  typography: {
    fontFamily: [
      'Quicksand',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    useNextVariants: true,
  },
});

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
  },
  appBar: {
    background: 'transparent',
    boxShaddow: 'none',
  },
  appBarSticky: {
    color: 'primary',
  },
  paperContainer: {
    backgroundImage: `url(${backgroundPic})`,
    backgroundSize: 'cover',
    height: '100vh',
    padding: theme.spacing.unit * 3,
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    flexGrow: 1,
    height: 400,
    padding: theme.spacing.unit * 3,
  },
  adminCard: {
    height: 500,
  },
  bartenderCard: {
    height: 500,
  },
  media: {
    height: '100%',
    paddingTop: '56,25%',
    marginTop: '20',
  },
  appBarSpacer: {
    height: '5vh',
  },
};

function WelcomePageGrid({ handleScroll }) {
  return (
    <div style={{ width: '100vw' }}>
      <Grid container alignItems="center" alignContent="center" justify="center">
        <Grid item sm={8} xs={10}>
          <div align="center">
            <Typography variant="h1" color="secondary" gutterBottom component="h2">
                            BarQ
            </Typography>
            <Typography variant="h4" color="secondary" gutterBottom>
                            Smarter, simpler service at your favourite bars.
            </Typography>
            <Button onClick={handleScroll} variant="contained" color="secondary" gutterBottom>Learn More</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

function Product({ classes }) {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item lg={3} md={3} sm={6} xs={10}>
        <div>
          <Typography align="center" variant="h4" color="primary" gutterBottom component="h2">
                        Easy to order.
            {' '}
            <br />
                        Easy to pay.
          </Typography>
          <Typography align="left" variant="body2" color="inherit" gutterBottom>
            {/* eslint-disable max-len */}
                BarQ allows you to order and pay for drinks from your phone wherever you are in the bar. No more fighting through crowds and waiting to catch a bartenders&#39; attention. Browse the menu and place your order without leaving your seat. You’ll be notified as soon as your order is ready to pick up.
            {/* eslint-disable max-len */}
          </Typography>
        </div>
      </Grid>
      <Grid item lg={3} md={3} sm={4} xs={6}>
        <div>
          <CardMedia
            className={classes.card}
            image={mock1}
          />
        </div>
      </Grid>
      <Grid item lg={3} md={3} sm={4} xs={6}>
        <div>
          <CardMedia
            className={classes.card}
            image={mock2}
          />
        </div>
      </Grid>
      <Grid item lg={3} md={3} sm={4} xs={6}>
        <div>
          <CardMedia
            className={classes.card}
            image={mock3}
          />
        </div>
      </Grid>
    </Grid>
  );
}

function ProductAdmin({ classes }) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item lg={3} md={8} sm={8} xs={10}>
        <div>
          <Typography align="center" variant="h4" color="primary" gutterBottom component="h2">
                        Easy to set up.
          </Typography>
          <Typography align="left" variant="body2" color="inherit" gutterBottom>
            {/* eslint-disable max-len */}
                BarQ provides a user friendly interface for bar owners to manage different menus across multiple bars, all in one place.
            {/* eslint-disable max-len */}
          </Typography>
        </div>
      </Grid>
      <Grid item lg={5} md={8} sm={10} xs={12}>
        <div align="center">
          <CardMedia
            className={classes.adminCard}
            image={adminScreenshot}
          />
        </div>
      </Grid>
    </Grid>
  );
}

function ProductBartender({ classes }) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item lg={4} md={8} sm={8} xs={10}>
        <div>
          <Typography align="center" variant="h4" color="primary" gutterBottom component="h2">
                        Easy to manage.
          </Typography>
          <Typography align="left" variant="body2" color="inherit" gutterBottom>
            {/* eslint-disable max-len */}
                A live feed of current orders shows you what to prepare next. You can update the status of orders with one click, sending live updates to let your customer know when their drink is ready.
            {/* eslint-disable max-len */}
          </Typography>
        </div>
      </Grid>
      <Grid item lg={3} md={6} sm={6} xs={12}>
        <div align="center">
          <CardMedia
            className={classes.bartenderCard}
            image={ipad1}
          />
        </div>
      </Grid>
      <Grid item lg={3} md={6} sm={6} xs={12}>
        <div align="center">
          <CardMedia
            className={classes.bartenderCard}
            image={ipad2}
          />
        </div>
      </Grid>
    </Grid>
  );
}


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTop: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTopThis = this.myRef.current && window.scrollY < this.myRef.current.offsetTop - 65;
      const { isTop } = this.state;
      if (isTopThis !== isTop) {
        this.onScroll(isTopThis);
      }
    });
  }

  onScroll(isTop) {
    this.setState({ isTop });
  }

    handleScroll = () => {
      window.scrollTo({
        top: this.myRef.current.offsetTop,
        behavior: 'smooth',
      });
    }

    render() {
      const { classes, toggleLogin } = this.props;
      const { isTop } = this.state;
      return (
        <div className={classes.root}>
          <MuiThemeProvider theme={theme}>
            <div className={classes.paperContainer}>
              <AppBar className={isTop ? classes.appBar : classes.appBarSticky} position="fixed">
                <ToolBar>
                  <Typography variant="h4" color="secondary" className={classes.grow}>
                                BarQ
                  </Typography>
                  <Button onClick={toggleLogin} variant="contained" color="secondary">Sign Up/Log in</Button>
                </ToolBar>
              </AppBar>
              <div className={classes.appBarSpacer} />
              <WelcomePageGrid handleScroll={this.handleScroll} classes={classes} />
            </div>
            <main ref={this.myRef} className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Product classes={classes} />
              <div className={classes.appBarSpacer} />
              <Divider />
              <div className={classes.appBarSpacer} />
              <ProductAdmin classes={classes} />
              <Divider />
              <div className={classes.appBarSpacer} />
              <ProductBartender classes={classes} />
              <div className={classes.appBarSpacer} />
              <Divider />
              <div className={classes.appBarSpacer} />
            </main>
          </MuiThemeProvider>
        </div>
      );
    }
}

export default withStyles(styles)(LandingPage);
