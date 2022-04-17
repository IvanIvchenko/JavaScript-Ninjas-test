import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./routes/HomePage.js"
import LibraryPage from "./routes/LibraryPage.js"
import BookDetailsPage from "./routes/BookDetailsPage.js"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route exact path="/book/:id" element={<BookDetailsPage />} />
      <Route path="*" element={<h1>Page not found 404 error</h1>} />
    </Routes>
  );
}

export default App;
