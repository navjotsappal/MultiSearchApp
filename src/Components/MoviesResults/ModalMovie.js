import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cast from './Cast';

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
                <DialogTitle id="scroll-dialog-title">Cast</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                    </DialogContentText>
                    <Cast cast={props.cast}/>
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