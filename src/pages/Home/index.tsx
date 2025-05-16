import { Grid, Typography } from "@mui/material"

const Home = () => {
    return (
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          size={{ xs: 8 }}
          rowGap={4}
        >
          <Grid>
            <Typography variant="h1" >HOME</Typography>
          </Grid>
        </Grid>
      </Grid>
    )
}

export default Home