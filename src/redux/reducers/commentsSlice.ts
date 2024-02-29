import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk("comments/getComments",
    async ({ postId }, { rejectWithValue }) => {
        try {
            const result = await fetch(
                `http://localhost:3000/comments/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!result.ok || result.status !== 200)
                throw new Error("response was not OK")
            const data = await result.json();
            return { data, postId };
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });

export const createComment = createAsyncThunk("comments/createComment",
    async ({ text, postId, token }, { rejectWithValue }) => {
        console.log({ text, postId, token })
        try {
            const result = await fetch("http://localhost:3000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text, postId })
            });
            if (!result.ok || result.status !== 200)
                throw new Error("response was not OK")
            const data = await result.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });


export const deleteComment = createAsyncThunk("comments/deleteComment",
    async ({ commentId, token }, { rejectWithValue }) => {
        try {
            const result = await fetch(`http://localhost:3000/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Autorization: `Bearer ${token}`,
                },
            });
            if (!result.ok || result.status !== 204)
                throw new Error("response was not OK")
            const data = await result.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const likeComment = createAsyncThunk("comments/likeComment",
    async ({ commentId }, { rejectWithValue }) => {
        try {
            const result = await fetch("http://localhost:3000/comments/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ commentId })
            });
            if (!result.ok || result.status !== 200)
                throw new Error("response was not OK")
            const data = await result.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const dislikeComment = createAsyncThunk("comments/dislikeComment",
    async ({ commentId }, { rejectWithValue }) => {
        try {
            const result = await fetch("http://localhost:3000/comments/dislike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ commentId })
            });
            if (!result.ok || result.status !== 200)
                throw new Error("response was not OK")
            const data = await result.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });





const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.comments[action.payload.postId] = action.payload.data;
        })
    }
});

export default commentsSlice.reducer;