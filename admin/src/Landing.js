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

import mock1 from './assets/mockups_iphone_xs/Selection_013_iphonexspacegrey_portrait.png';
import mock2 from './assets/mockups_iphone_xs/Selection_015_iphonexspacegrey_portrait.png';
import mock3 from './assets/mockups_iphone_xs/Selection_016_iphonexspacegrey_portrait.png';
import adminScreenshot from './assets/admin_screenshot.png';

import ipad1 from './assets/mockups_idpad/Selection_018_ipadmini_white_portrait.png';
import ipad2 from './assets/mockups_idpad/Selection_019_ipadmini_white_portrait.png';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#56544b',
    },
    secondary: {
      main: '#ffffff',
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
    zIndex: 1,
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
    height: '60vh',
    width: '20vw',
    // minWidth: 200,
    padding: theme.spacing.unit * 3,
  },
  adminCard: {
    height: '60vh',
    width: '54vw',
    // minWidth: 400,
    flexGrow: 1,
  },
  bartenderCard: {
    height: '80vh',
    width: '30vw',
    // minWidth: 250,
  },
  media: {
    height: '100%',
    paddingTop: '56,25%',
    marginTop: '20',
  },
  appBarSpacer: theme.mixins.toolbar,
};

function WelcomePageGrid({ handleScroll }) {
  return (
    <div style={{ width: '100vw' }}>
      <Grid container sm alignItems="center" alignContent="center" justify="center">
        <Grid item sm={8} xs={10}>
          <div align="center" alignContent="center" alignItems="center">
            <Typography variant="h3" color="secondary" gutterBottom component="h2">
                            Welcome to BarQ
            </Typography>
            <Typography variant="h6" color="secondary" gutterBottom>
                            BarQ is
                            a faster and more convenient
                            way to order drinks at bars
              {' '}
              <br />
                            Less queing - more drinking
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
    <Grid container sm justify="center" alignItems="center">
      <Grid item md={3} sm={6} xs={8}>
        <div>
          <Typography align="center" variant="h4" color="primary" gutterBottom component="h2">
                        Easy order.
            {' '}
            <br />
                        Easy pay.
          </Typography>
          <Typography align="left" variant="body2" color="inherit" gutterBottom>
            {/* eslint-disable max-len */}
                BarQ allows you to order and pay for food and drinks at your favorite bars
                without missing the fun. No more waiting for your server or getting stuck in
                long lines. Order from your phone and you’ll be notified when your order is ready for pickup or delivery.
            {/* eslint-disable max-len */}
          </Typography>
        </div>
      </Grid>
      <Grid item md={3} sm={0} xs={0}>
        <div>
          <CardMedia
            className={classes.card}
            image={mock1}
          />
        </div>
      </Grid>
      <Grid item md={3} sm={0} xs={0}>
        <div>
          <CardMedia
            className={classes.card}
            image={mock2}
          />
        </div>
      </Grid>
      <Grid item md={3} sm={0} xs={0}>
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
    <Grid container sm alignItems="center" justify="center">
      <Grid item md={6} sm={6} xs={8}>
        <div>
          <Typography align="center" variant="h4" color="primary" gutterBottom component="h2">
                        Easy to manage.
          </Typography>
          <Typography align="left" variant="body2" color="inherit" gutterBottom>
            {/* eslint-disable max-len */}
                BarQ provides a user friendly admin interface for bar owners and managers.
                You can create a new bar by uploading a menu and we will automatically generate
                a QR code which links customers to your bar.
            {/* eslint-disable max-len */}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={0}>
        <div align="center">
          <div className={classes.appBarSpacer} />
          <CardMedia
            className={classes.adminCard}
            image={adminScreenshot}
            style={classes.media}
          />
        </div>
      </Grid>
    </Grid>
  );
}

function ProductBartender({ classes }) {
  return (
    <Grid container sm alignItems="center" justify="center">
      <Grid item xs={4}>
        <div>
          <Typography align="center" variant="h4" color="primary" gutterBottom component="h2">
                        Order queue.
          </Typography>
          <Typography align="left" variant="body2" color="inherit" gutterBottom>
            {/* eslint-disable max-len */}
                The order queue displays a live feed of current orders. Bartenders can update the status of orders with one
                click. Customers will be notified when the status of their order changes. Specific items on the menu can
                be blocked in case the item is no longer available as well as closing the bar by blocking all items.
            {/* eslint-disable max-len */}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={0}>
        <div align="center">
          <CardMedia
            className={classes.bartenderCard}
            image={ipad1}
            style={classes.media}
          />
        </div>
      </Grid>
      <Grid item xs={0}>
        <div align="center">
          <CardMedia
            className={classes.bartenderCard}
            image={ipad2}
            style={classes.media}
          />
        </div>
      </Grid>
    </Grid>
  );
}


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.myRef = React.createRef();
  }

    handleScroll = () => {
      window.scrollTo({
        top: this.myRef.current.offsetTop,
        behavior: 'smooth',
      });
    }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <MuiThemeProvider theme={theme}>
            <div className={classes.paperContainer}>
              <AppBar style={{ background: 'transparent', boxShaddow: 'none' }} position="fixed">
                <ToolBar>
                  <Typography variant="h4" color="secondary" className={classes.grow}>
                                BarQ
                  </Typography>
                  <Button variant="contained" color="secondary">Sign Up/Log in</Button>
                </ToolBar>
              </AppBar>
              <div className={classes.appBarSpacer} />
              <WelcomePageGrid handleScroll={this.handleScroll} classes={classes} />
            </div>
            <main ref={this.myRef} className={classes.content}>
              <Product classes={classes} />
              <div className={classes.appBarSpacer} />
              <Divider />
              <div className={classes.appBarSpacer} />
              <ProductAdmin classes={classes} />
              <div className={classes.appBarSpacer} />
              <Divider />
              <div className={classes.appBarSpacer} />
              <ProductBartender classes={classes} />
              {/* <div className={classes.appBarSpacer}/> */}
              <Divider />
              <div className={classes.appBarSpacer} />
            </main>
          </MuiThemeProvider>
        </div>
      );
    }
}

export default withStyles(styles)(LandingPage);
