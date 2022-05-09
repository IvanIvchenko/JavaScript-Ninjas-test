import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export default function DisplayImagesFilenames({ images, onDelete }) {

    const handleImageDelete = event => {
        return onDelete(event)
    }
    return (
        <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
            {images.map(image => (
                <ListItem
                    key={image.name}
                    disableGutters
                    secondaryAction={
                        <IconButton onClick={() => handleImageDelete(image.name)}>
                            <ClearIcon
                                key={image.name}
                                style={{ fontSize: "large" }}
                                sx={{ "&:hover": { color: "red" } }}
                            />
                        </IconButton>
                    }
                >
                    <ListItemText style={{ color: "black" }} primary={image.name} />
                </ListItem>
            ))}
        </List >
    )
}