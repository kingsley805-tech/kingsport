import React from 'react';
import PortfolioBlock from "./PortfolioBlock";
import {Box, Grid} from "@mui/material";
import {info} from "../../info/Info";

export default function Portfolio({innerRef}) {
    return (
        <Box 
            id={'portfolio'} 
            ref={innerRef}
            sx={{
                marginTop: { xs: '2rem', md: '4rem' } // Responsive margin top
                // Alternatively, you could use theme spacing:
                // marginTop: { xs: 4, md: 8 }
            }}
        >
            <Grid container display={'flex'} justifyContent={'center'} spacing={6}>
                {info.portfolio.map((project, index) => (
                   <Grid item xs={10} md={3.5} key={index} sx={{ padding: { xs: '10px', md: '0' } }}>
                       <PortfolioBlock image={project.image} live={project.live} source={project.source} title={project.title} />
                   </Grid>
                ))}
            </Grid>
        </Box>
    );
};