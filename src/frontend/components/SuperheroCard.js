import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

function BookCard({ superhero, onClick }) {
    const handleClick = () => {
        return onClick(superhero.id)
    }
    return (
        <Card sx={{ width: 500, m: 2 }} key={superhero.id}>
            <CardActionArea id={superhero.id} onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={superhero.mainImage}
                    alt={superhero.nickname}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        {superhero.nickname}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default BookCard