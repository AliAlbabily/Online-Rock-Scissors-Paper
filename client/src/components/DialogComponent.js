import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function DialogComponent(props) {
    const navigate = useNavigate()

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle sx={{mx: 'auto'}}>Game Over! The winner is {props.winnerName}</DialogTitle>
                <DialogActions sx={{mx: 'auto'}}>
                    <Button 
                        sx={{mb: 1}} 
                        variant="contained" 
                        color="secondary"
                        onClick={() => {
                            props.onClose()
                            navigate("../") // switch to another component
                        }}>
                        Restart
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogComponent;