import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Image from 'next/image'
import Link from 'next/link'

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
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Image 
                            src="/images/peri3.png"
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
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    )
}