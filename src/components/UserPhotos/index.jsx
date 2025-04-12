import React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Box,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Format date string to readable form.
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString();
}

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        This user has no photos.
      </Typography>
    );
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      {photos.map((photo) => {
        let photoSrc;
        try {
          // Dùng require để load ảnh từ thư mục components
          photoSrc = require(`./${photo.file_name}`);
        } catch (err) {
          console.error("Error loading image:", photo.file_name);
          photoSrc = "";
        }

        return (
          <Card key={photo._id} sx={{ marginBottom: 4 }}>
            <CardMedia
              component="img"
              image={photoSrc}
              alt="User uploaded"
              sx={{ maxHeight: 500, objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Uploaded: {formatDate(photo.date_time)}
              </Typography>

              {photo.comments && photo.comments.length > 0 && (
                <>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="h6">Comments:</Typography>
                  <Stack spacing={2} sx={{ marginTop: 1 }}>
                    {photo.comments.map((comment) => (
                      <Box key={comment._id} sx={{ paddingLeft: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(comment.date_time)} by{" "}
                          <MuiLink
                            component={Link}
                            to={`/users/${comment.user._id}`}
                            underline="hover"
                          >
                            {comment.user.first_name} {comment.user.last_name}
                          </MuiLink>
                        </Typography>
                        <Typography variant="body1">
                          {comment.comment}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

export default UserPhotos;
