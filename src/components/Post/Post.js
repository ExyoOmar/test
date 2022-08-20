import { Chip, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const Post = ({ post: apiPost }) => {
  const [user, setUser] = useState();
  const [post, setPost] = useState(apiPost);
  useEffect(() => {
    post?.userId &&
      fetch(`https://dummyjson.com/users/${post.userId}`)
        .then((json) => json.json())
        .then((user) => setUser(user));
  }, [post?.userId]);

  const likePost = useCallback(() => {
    const copyPost = Object.assign({}, post);
    copyPost.isLiked = !copyPost.isLiked;
    if (copyPost.isLiked) {
      copyPost.reactions++;
    } else {
      copyPost.reactions--;
    }
    setPost(copyPost);
  }, [post]);

  return (
    <Stack
      spacing={2}
      sx={{
        border: "1px solid #aaab",
        padding: 5,
        borderRadius: 10
      }}
    >
      <Typography>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Typography>{post.title}</Typography>
      <Divider />
      <Typography>{post.body}</Typography>
      <Stack direction="row" spacing={2}>
        {post.tags?.map((tag) => (
          <Chip label={tag} variant="outlined" />
        ))}
      </Stack>
      <Stack direction="row">
        <IconButton
        onClick={likePost}
        color={post.isLiked ? "primary" : "default"}
        >
          <AcUnitIcon />
          {post.reactions}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Post;
