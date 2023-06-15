import React from "react";
import "./App.css";
import Comments from "./Comments";

function App() {
  // [ {id: "1", title:"This is the first comment", child:["This is the first child comment of first comment","This is the second comment of the first comment"]}]
  const [comments, setComments] = React.useState([]);
  const addcommentHandler = (comment) => {
    const newComment = {};
    newComment["id"] = comments.length + 1; // Id
    newComment["title"] = comment; // Comment
    newComment["child"] = []; // Child

    setComments([...comments, newComment]);
  };

  const updatedCommentsHandler = (comments) => {
    setComments(comments);
  };

  React.useEffect(() => {
    const storedState = localStorage.getItem("comments");
    if (storedState) {
      setComments(JSON.parse(storedState));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  React.useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem("comments", JSON.stringify(comments));
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [comments]);

  React.useEffect(() => {
    return () => {
      localStorage.setItem("comments", comments);
    };
  }, []);

  return (
    <div className="App">
      <Comments
        addcommentHandler={addcommentHandler}
        updatedCommentsHandler={updatedCommentsHandler}
        comments={comments}
      />
    </div>
  );
}

export default App;
