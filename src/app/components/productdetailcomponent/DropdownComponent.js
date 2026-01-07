"use client";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styles from "./DropdownComponent.module.css";

export default function DropdownComponent({ ingredients }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="ingredients-content"
          id="ingredients-header"
        >
          <Typography component="span" sx={{ fontSize: matches ? 14 : 16 }}>
            Ingredients list
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: matches ? 12 : 14 }}>
            {ingredients}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ShareIcon />}
          aria-controls="share-content"
          id="share-header"
        >
          <Typography component="span" sx={{ fontSize: matches ? 14 : 16 }}>
            Share
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.shareContainer}>
            <TextField
              label="URL"
              value={currentUrl}
              size="small"
              fullWidth
              slotProps={{ input: { readOnly: true } }}
              sx={{ "& input": { fontSize: matches ? 12 : 14 } }}
            />
            <Button
              variant="text"
              onClick={handleCopyLink}
              sx={{
                color: "#1db954",
                fontWeight: 600,
                fontSize: matches ? 12 : 14,
              }}
            >
              Copy link
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
