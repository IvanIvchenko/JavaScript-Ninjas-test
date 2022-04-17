import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./routes/HomePage.js"
import Library from "./routes/Library.js"
import BookDetails from "./routes/BookDetails.js"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/library" element={<Library />} />
      <Route exact path="/book/:id" element={<BookDetails />} />
      <Route path="*" element={<h1>Page not found 404 error</h1>} />
    </Routes>
  );
}

export default App;
