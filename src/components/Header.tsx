import { AppBar, Toolbar, Typography, Box, Link as MuiLink } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e293b" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* 左：タイトル */}
        <Typography variant="h6" component="div">
          API Dashboard
        </Typography>

        {/* 右：メニュー / GitHub */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <MuiLink href="#zipcode" color="inherit" underline="none">
            郵便番号
          </MuiLink>
          <MuiLink href="#weather" color="inherit" underline="none">
            天気
          </MuiLink>
          <MuiLink
            href="https://github.com/KawazoeHaruyoshi"
            target="_blank"
            rel="noopener"
            color="inherit"
            underline="none"
          >
            GitHub
          </MuiLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
