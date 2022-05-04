import { Grid, Box, Typography, Button, rgbToHex } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import libraryImage from '../static/library.svg'


function HomePage() {

    const navigate = useNavigate()

    const handleButtonClick = (e) => {
        e.preventDefault()
        navigate('/library')
    }

    return (
        <Grid
            container
            style={{
                color: "lightblue",
                width: "100%",
                height: '100%'
            }}
            justifyContent="center"
            direction="column"
            alignItems="center"
        >
            <Box
                component="img"
                sx={{
                    height: 350,
                    width: 450,
                }}
                alt="Main page picture."
                src={libraryImage}
            />
            <Typography variant="h3" gutterBottom component="div">
                Digital library
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                "A place for every portfolio reviewer"
            </Typography>
            <Button
                variant="contained"
                style={{
                    maxWidth: '200px',
                    maxHeight: '40px',
                    minWidth: '200px',
                    minHeight: '40px',
                    colour: 'blue',
                    backgroundColor: "rgb(33,128, 153)"
                }}
                onClick={handleButtonClick}
            >
                Browse books
            </Button>
        </Grid>
    )
}

export default HomePage