import { AppBar, Box, Toolbar } from "@mui/material";
import Image from 'next/image'
import profilePeri from '../public/peri3.png'

export default function Header() {

    return (
        <AppBar
            position="static"
            sx={{
                color: 'black',
                backgroundColor: 'white',
                boxShadow: 'none',
            }}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1}}>
                        <Image 
                            src={profilePeri}
                            alt="logoPeri"
                            width={120}
                            height={120}
                        />
                </Box>
            </Toolbar>
        </AppBar>
    )
}