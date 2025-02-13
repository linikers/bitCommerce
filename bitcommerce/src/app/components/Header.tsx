import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Image from 'next/image'
// import profilePeri from '../public/images/peri3.png';

export default function Header() {

    return (
        <AppBar
            position="static"
            sx={{
                color: 'black',
                backgroundColor: '#e8e8e8',
                boxShadow: 'none',
            }}
        >
            <Toolbar>
                <Box 
                    sx={{ 
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                        <Image 
                            // src={profilePeri}
                            // src="../public/images/peri3.png"
                            src="/images/peri3.png"
                            // src="../"
                            alt="logoPeri"
                            width={90}
                            height={90}
                        />
                        <Typography
                        sx={{
                            fontFamily: '"Pacifico", cursive',
                            fontWeight: 'bold',
                            color: "#333",
                        }}>
                        Peri</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}