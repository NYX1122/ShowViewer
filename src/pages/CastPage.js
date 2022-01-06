import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';

import { Grid, Container, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Loader from '../components/Loader';
import CastCard from '../components/CastCard';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

export default function CastPage() {
    const [castData, setData] = useState(null);

    useEffect(() => {
      fetch('https://api.tvmaze.com/shows/4/cast')
       .then(response => response.json())
       .then(data => setData(data));
    }, []);
  
    //While statement used to give fetch enough time before page is rendered.
    while (!castData) {
      return <Loader></Loader>
    }

    //Logic used to remove duplicate entries in cast list.
    const names = [];
    const newCastData = [];
    castData.map((actor, i) => {
        names.push(actor.person.name);
    });
    var uniqueNames = [...new Set(names)];
    castData.map((actor) => {
        uniqueNames.map((name, i) => {
            if (actor.person.name === name) {
                newCastData.push(actor);
                uniqueNames.splice(i, 1);
            }
        })
    });

    //format data for csv download package

    const formattedData = [];
    newCastData.map((actor) => {
        formattedData.push({ name: actor.person.name, photo: actor.person.image.original, country: actor.person.country, birthday: actor.person.birthday, gender: actor.person.gender });
    });

    const headers = [
        { label: 'Name', key: 'name' },
        { label: 'Photo', key: 'photo' },
        { label: 'Country of Birth', key: 'country' },
        { label: 'Date of Birth', key: 'birthday' },
        { label: 'Gender', key: 'gender' }
    ];

    const csvReport = {
        data: formattedData,
        headers: headers,
        filename: 'ArrowCast.csv'
    };
    
    return (
        <Container sx={{ marginTop: 1 }}>
            <Grid container spacing={0} justifyContent='space-between' alignItems='center' sx={{ marginBottom: 1 }}>
                <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 'bolder', fontSize: 18 }}>Export Cast Data</Typography>
                </Grid>
                <Grid item xs={3}>
                    <ArrowForwardIcon></ArrowForwardIcon>
                    <ArrowForwardIcon></ArrowForwardIcon>
                    <ArrowForwardIcon></ArrowForwardIcon>
                </Grid>
                <Grid item xs={3}>
                    <CSVLink {...csvReport}><Button variant='outlined' sx={{ backgroundColor: 'primary.main', borderColor: 'secondary.main', fontWeight: 'bolder', color: 'secondary.main' }}>Export</Button></CSVLink>
                </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent='space-between'>
                {newCastData.map((actor, i) => (
                    <Grid item xs={6} key={i}>
                        <CastCard
                            name={actor.person.name}
                            photo={actor.person.image.original}
                            country={actor.person.country}
                            birthday={actor.person.birthday}
                            gender={actor.person.gender}
                        >
                        </CastCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}