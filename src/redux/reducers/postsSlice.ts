import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!result.ok || result.status !== 200)
        throw new Error("response was not OK");
      const data = await result.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, text, author, token }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, text, author }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("response was not OK");
      const data = await result.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Autorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });
      if (!result.ok || result.status !== 204)
        throw new Error("response was not OK");
      const data = await result.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("response was not OK");
      const data = await result.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const result = await fetch(`${API_URL}/posts/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      if (!result.ok || result.status !== 200)
        throw new Error("response was not OK");
      const data = await result.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.createPost = action.payload;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.deletePost = action.payload;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.likePost = action.payload;
    });
    builder.addCase(dislikePost.fulfilled, (state, action) => {
      state.dislikePost = action.payload;
    });
  },
});

export default postsSlice.reducer;
// export const {  } = postsSlice.actions;
