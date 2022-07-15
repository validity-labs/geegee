import { createStyles, Grid, Input, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { ControlButton } from "../../../components/ControlButton";
import { Header } from "../../../components/Header";
import { Stepper } from "../../../components/Stepper";

interface HowItWorksProps {
    currentStep: number;
    totalSteps: number;
    nextStep: () => void;
    previousStep: () => void;
}

const HowItWorks = (props: HowItWorksProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>

            <Stepper currentStep={props.currentStep + 1} totalSteps={props.totalSteps} />

            <Grid container spacing={4} className={classes.root}>
                <Header label="How it works" />

                <Typography className={classes.content} gutterBottom>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                </Typography>

                <Input type="checkbox" name="I have read and understood the legal notice" />

                <div className={classes.buttonWrapper} >
                    <ControlButton label="Back" onClick={props.previousStep} />
                    <ControlButton label="Next" onClick={props.nextStep} />
                </div>
            </Grid>
        </React.Fragment>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up('md')]: {
                marginTop: '173px',
            }
        },
        header: {
            fontSize: "40px",
        },
        content: {
            fontSize: "20px",
        },
        buttonWrapper: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: '2rem'

        }
    })
);
export { HowItWorks };
