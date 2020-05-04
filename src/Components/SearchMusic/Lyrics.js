import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function ScrollDialog(props) {
    const [open] = React.useState(false);
    const [scroll] = React.useState('paper');

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.click}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{props.track} <span style={{fontWeight:"300"}}>by</span> {props.name}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {props.lyrics ? props.lyrics.slice(0, props.lyrics.length - 71) : ''}
                    </DialogContentText>
                    <Button href={props.link} target="_blank" color="primary">Show more on external website</Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.click} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default ScrollDialog;
