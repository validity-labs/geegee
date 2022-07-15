import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { ControlButton } from "../../../components/ControlButton";
import ControlledExpansionPanels from "../../../components/ControlledExpansionPanels/ControlledExpansionPanels";
import { Header } from "../../../components/Header";
import { Stepper } from "../../../components/Stepper";

interface FAQProps {
    currentStep: number;
    totalSteps: number;
    nextStep: () => void;
    previousStep: () => void;
}

const data = [
    [
        'Why are we doing the token swap?',
        `We aim to provide leading Crypto solutions to the market with a world-class cryptocurrency at its core. To change how people manage and grow their finances. The QBX (qiibee token) v2 brings it all together with more power within our ecosystems.`
    ],
    [
        'How does the token swap work?',
        `
        <div>
        The Token Swap works in 2 easy steps, you only have to perform 2 different transactions later in the “Swap Token” step:

        <ol>
            <li>Approve/give permission to this application to exchange all your QBX (qiibee token) v1 for QBX (qiibee token) v2.</li>
            <li>Execute the exchange process.</li>
        </ol>
        </div>
        `
    ],
    [
        'Are any countries excluded from the token swap?',
        `If you are a QBX (qiibee token) holder, you can swap and upgrade your QBX (qiibee token) v1 to QBX (qiibee token) v2.`
    ],
    [
        'Is the token swap free?',
        `Yes, apart from the mandatory transaction fees. You need to have some ETH in your wallet to be able to swap the tokens.`
    ],
    [
        'What if I have QBX (qiibee token) tokens on an exchange?',
        `Please send them to your wallet so that you can proceed with the token swap.`
    ],
    [
        'How long will the token swap be available?',
        `The Token Swap will be available for a period of up to 6 months. After the 12-month period has ended, all QBX (qiibee token) holders will be unable to swap their QBX (qiibee token) v1 to QBX (qiibee token) v2.`
    ],
    [
        'What happens with QBX (qiibee token) v1 after the 12 month period?',
        `After the 12-month period has passed, all QBX (qiibee token) v1 will NOT be able to be swapped anymore, will not have any market value and will not be tradeable anymore.`
    ],
    [
        'Will I still see my new QBX (qiibee tokens) in the qiibee wallet after the migration?',
        `No, you will not be able to see your qiibee tokens (QBX) after the migration in the qiibee wallet. You can easily check them in your other wallets, e.g. Trezor, Ledger, Coinbase.`
    ],
    [
        'What if I need help?',
        `If you have any questions or need assistance, you can get in touch with us via <a href="mailto:foundation@qiibee.com" target="_blank">foundation@qiibee.com</a> and we will get back to you in the shortest time possible.`
    ],
];

const FAQ = (props: FAQProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={4} className={classes.root}>

                    <Stepper currentStep={props.currentStep + 1} totalSteps={props.totalSteps} />

                    <Header label="FAQ" />

                    <ControlledExpansionPanels payload={data} showInfoIcon={false} />
                </Grid>

                <div className={classes.buttonWrapper} >
                    <ControlButton label="Back" onClick={props.previousStep} />
                    <ControlButton label="Next" onClick={props.nextStep} />
                </div>

                <div style={{ flex: 1 }} />
            </div>
        </React.Fragment>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
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
        },
        link: {
            margin: 'auto',
            fontSize: '14px',
            textDecoration: 'none',
            cursor: 'pointer'
        }

    })
);
export { FAQ };
