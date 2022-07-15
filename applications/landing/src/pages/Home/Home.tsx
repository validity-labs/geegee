import { createStyles, Grid, makeStyles, Theme, Typography, Button } from "@material-ui/core";
import Link from 'next/link';
import React, { useEffect } from "react";
import { SWAP_UPGRADE_STATE } from "../../constants";

const HomePage = () => {
  const classes = useStyles();

  useEffect(() => {
    localStorage.removeItem(SWAP_UPGRADE_STATE);
  });

  return (
    <div className={classes.root}>
      <Grid container className={classes.content}>
        <Grid item style={{ textAlign: "center", width: "100%" }}>
          <img className={classes.logo} src={require("../../assets/logo.png")} style={{ height: "300px", margin: "auto" }} />
        </Grid>

        <Grid item>
          <Typography paragraph>
            The qiibee foundation has upgraded the QBX (qiibee token) Smart Contract at its core and a second version of the QBX (qiibee token) has been created.
          </Typography>
          <Typography paragraph>
            A 'Token Swap' has launched and is available for all QBX (qiibee token) holders to upgrade and receive the QBX (qiibee token) version 2 (v2) which offers a more secure, reliable and efficient cryptocurrency on a global scale.
          </Typography>
          <Typography paragraph>
            This upgrade to swap the current QBX (qiibee token) v1 to QBX (qiibee token) v2 is active ONLY for a 6-month period.
          </Typography>
          <Typography paragraph>
            All current QBX (qiibee tokens) will be swapped to QBX (qiibee tokens) v2 @the same Market value. (1 QBX (qiibee token) v1 = 1 QBX (qiibee token) v2).
          </Typography>
        </Grid>

        <div className={classes.buttonWrapper}>
          <div className={classes.buttonWrapper} >
            <Link href='/swap-engine'>
              <Button className={classes.button}>Continue</Button>
            </Link>
          </div>
        </div>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      color: "#f7f7f9",
      backgroundColor: "#2d2d2d"
    },
    header: {
      color: "#000037"
    },
    logoContainer: {},
    logo: {},
    content: {
      padding: "76px 24px 24px 24px",
      maxWidth: "968px",
      margin: "auto",
      height: "100%"
    },
    buttonWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "baseline",
      marginTop: "0rem"
    },
    button: {
      border: "1px solid #f7f7f9",
      padding: "4px 28px",
      color: "#f7f7f9",
      borderRadius: "27px",
      textDecoration: "none",
      textTransform: "capitalize",
      fontWeight: 600,
      fontSize: "14px",
      width: "auto",
      "&:hover": {
        backgroundColor: "#f7f7f9",
        color: "#2d2d2d"
      }
    }
  })
);
export { HomePage };
