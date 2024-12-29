// frontend/src/redux/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: {
      allBlogs: null,
      isFetching: false,
      error: false,
    },
    createBlog: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    getBlogStart: (state) => {
      state.blogs.isFetching = true;
    },
    getBlogSuccess: (state, action) => {
      state.blogs.isFetching = false;
      state.blogs.allBlogs = action.payload;
    },
    getBlogsFailed: (state) => {
      state.blogs.isFetching = false;
      state.blogs.error = true;
    },
    createBlogStart: (state) => {
      state.createBlog.isFetching = true;
      state.createBlog.success = false; // Reset success state
      state.createBlog.error = false; // Reset error state
    },
    createBlogSuccess: (state) => {
      state.createBlog.isFetching = false;
      state.createBlog.success = true;
      state.createBlog.error = false;
    },
    createBlogFailed: (state) => {
      state.createBlog.isFetching = false;
      state.createBlog.error = true;
      state.createBlog.success = false;
    },
    resetCreateBlogState: (state) => {
      state.createBlog.isFetching = false;
      state.createBlog.error = false;
      state.createBlog.success = false;
    },
  },
});

export const {
  getBlogStart,
  getBlogSuccess,
  getBlogsFailed,
  createBlogStart,
  createBlogSuccess,
  createBlogFailed,
  resetCreateBlogState,
} = blogSlice.actions;

export default blogSlice.reducer;