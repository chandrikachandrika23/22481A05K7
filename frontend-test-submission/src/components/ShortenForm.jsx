import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Alert,
  Typography,
  List,
  ListItem,
} from "@mui/material";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

function ShortenForm() {
  const [inputs, setInputs] = useState([
    { url: "", validity: "", shortcode: "" },
  ]);
  const [errors, setErrors] = useState([]);
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleChange = (i, name, value) => {
    const updated = [...inputs];
    updated[i][name] = value;
    setInputs(updated);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const validateInputs = () => {
    const errs = inputs.map(({ url, validity }) => {
      if (!isValidUrl(url)) return "Invalid URL";
      if (validity && (!Number.isInteger(+validity) || +validity < 1))
        return "Validity must be a positive number";
      return null;
    });
    setErrors(errs);
    return errs.every((e) => e === null);
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;

    const results = inputs.map(({ url, validity, shortcode }) => {
      const code = shortcode || Math.random().toString(36).substring(2, 8);
      return {
        original: url,
        shortened: `https://short.ly/${code}`,
        expiry: validity ? `${validity} minutes` : "No expiry",
      };
    });

    setShortenedUrls(results);
  };

  return (
    <Stack spacing={3}>
      {inputs.map((input, i) => (
        <Stack direction="row" spacing={2} key={i}>
          <TextField
            label="Original URL"
            fullWidth
            value={input.url}
            onChange={(e) => handleChange(i, "url", e.target.value)}
            error={!!errors[i]}
          />
          <TextField
            label="Validity (mins)"
            type="number"
            value={input.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
          />
          <TextField
            label="Custom Code"
            value={input.shortcode}
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
          />
        </Stack>
      ))}
      {inputs.length < 5 && (
        <Button variant="outlined" onClick={addInput}>
          Add URL
        </Button>
      )}
      <Button variant="contained" onClick={handleSubmit}>
        Shorten URLs
      </Button>

      {errors.some((e) => e) && (
        <Alert severity="error">Please fix the highlighted fields.</Alert>
      )}

      {shortenedUrls.length > 0 && (
        <List>
          {shortenedUrls.map((item, idx) => (
            <ListItem key={idx}>
              <Typography>
                {item.original} → <b>{item.shortened}</b> (Expires:{" "}
                {item.expiry})
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
}

export default ShortenForm;
