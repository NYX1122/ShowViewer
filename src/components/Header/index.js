import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='static'>
            <Toolbar sx={{ backgroundColor: '#000000'}}>
                <Grid container spacing={0} justifyContent='space-between' alignItems='center'>
                    <Grid item xs={10} sm={11}>
                        <Typography fontSize={{ xs: 35, md: 50 }} sx={{ variant: 'h1', fontWeight: 'bold', textAlign: 'left', color: 'primary.main'}}><Link to='/'>ShowViewer</Link></Typography>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <IconButton size='large' id='menu-button' sx={{ color: 'primary.main' }}
                            aria-controls={open ? 'menu' : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MenuIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                        <Menu id='menu' anchorEl={anchorEl} open={open}
                            onClose={handleClose}
                            menulistprops={{ 'aria-labelledby': 'menu-button' }}
                        >
                            <MenuItem onClick={handleClose}><Link to='/Show'><Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>Show</Typography></Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to='/Cast'><Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>Cast</Typography></Link></MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;