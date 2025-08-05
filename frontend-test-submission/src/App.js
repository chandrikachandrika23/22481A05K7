import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import ShortenForm from "./components/ShortenForm";
import Statistics from "./components/Statistics";

function App() {
  return (
    <Router>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          URL Shortener App
        </Typography>
        <Routes>
          <Route path="/" element={<ShortenForm />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
