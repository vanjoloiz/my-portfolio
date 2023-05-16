import React, { FC, useState } from "react";
import Typography from "@mui/material/Typography";

interface SeeMoreSeeLessProps {
  text: string;
  maxLength: number;
}

const SeeMoreSeeLess: FC<SeeMoreSeeLessProps> = ({ text, maxLength }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const truncatedText = text.slice(0, maxLength);

  const displayText = showMore ? text : truncatedText;

  const showButton = text.length > maxLength;

  return (
    <span>
      <Typography
        sx={{ display: "inline" }}
        component="span"
        variant="subtitle1"
        color="text.primary"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: showMore ? "unset" : 2,
        }}
      >
        {displayText}
      </Typography>
      {showButton && (
        <Typography
          component="span"
          variant="subtitle1"
          color="text.primary"
          onClick={toggleShowMore}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {showMore ? "See Less" : "See More"}
        </Typography>
      )}
    </span>
  );
};

export default SeeMoreSeeLess;
