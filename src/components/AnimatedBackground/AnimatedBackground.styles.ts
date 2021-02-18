import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles(theme => ({
    root: {
        position: 'absolute',
        width: '100%',
    },
    background: {
        minHeight: '100vh',
        height: (props: any) => `${props.backgroundHeight}px`,
        width: '100%',
        backgroundColor: theme.palette.primary.dark,
        backgroundImage: (props: any) => `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: `zoomanimation 120s infinite`,
        animationTimingFunction: 'ease-in-out',
        position: 'absolute',
    },
    backgroundContainer: {
        minHeight: '100vh',
        height: (props: any) => `${props.backgroundHeight}px`,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
    },
}));

export const zoomanimation = `@keyframes zoomanimation {
    0% {
        transform: scale(1,1);
    }
    50% {
        transform: scale(1.2,1.2);
    }
    100% {
        transform: scale(1,1);
    }
}
`

