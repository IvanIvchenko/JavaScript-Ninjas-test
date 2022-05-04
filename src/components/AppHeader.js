import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function AppHeader({ path }) {
    const navigate = useNavigate();
    return (
        <AppBar position="fixed" >
            <Toolbar>
                {path ?
                    <IconButton
                        onClick={() => navigate(path)}
                        color="inherit"
                    >
                        <ArrowBackIcon />
                    </IconButton>    
                    : null
                }
                <Button
                    onClick={() => navigate('/')}
                    style={{ textTransform: 'none' }}
                    color="inherit">
                    <Typography
                        variant="h4"
                    >
                        Library
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader