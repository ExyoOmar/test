import { Button, Stack } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import Post from "./components/Post/Post";

import "./styles.css";

function App() {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  // call api
  useEffect(() => {
    fetch(`https://dummyjson.com/posts`)
      .then((json) => json.json())
      .then(({ posts }) => {
        setPosts(posts);
      });
  }, []);

  const gotoPost = (postId) => {
    console.log(postId);
    history.push(`/${postId}`);
  };

  const postsComponent = (posts) => (
    <Stack spacing={2}>
      {posts.map((post, index) => (
        <Button
          variant="text"
          classes={{
            root: "button-style"
          }}
          onClick={gotoPost(post.id)}
        >
          <Post post={post} key={`post-${index}`} />
        </Button>
      ))}
    </Stack>
  );

  return (
    <Switch>
      <Route path="/">
        <postsComponent />
      </Route>
      <Route path="/:id">
        <Post />
      </Route>
    </Switch>
  );
}

export default App;
