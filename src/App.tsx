import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import ZipcodeSearch from "./components/ZipcodeSearch";
import WeatherSearch from "./components/WeatherSearch";

function App() {
  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        API ダッシュボード
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                郵便番号検索
              </Typography>
              <ZipcodeSearch />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                天気検索
              </Typography>
              <WeatherSearch />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
