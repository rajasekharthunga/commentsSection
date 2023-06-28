import React from "react";
import { Button, Modal } from "antd";
import { v4 as uuidv4 } from "uuid";

const CommentsSection = ({
  comment,
  setEdit,
  setOpenModel,
  setEditReplyComment,
  setEditReplyIndex,
}) => {
  return (
    <div className="comment">
      <div className="parent-comment-div">
        <span>{comment.title}</span>
        <div className="action-buttons">
          <button
            name="edit"
            className="edit-button"
            onClick={(e) => {
              setEdit(true);
              setOpenModel(true);
              setEditReplyIndex(comment.id);
              setEditReplyComment(comment.title);
            }}
          >
            Edit
          </button>
          <button
            name="reply"
            className="reply-button"
            onClick={(e) => {
              setEdit(false);
              setOpenModel(true);
              setEditReplyIndex(comment.id);
            }}
          >
            Reply
          </button>
        </div>
      </div>
      {/* Children */}
      <div>
        {comment.child.length > 0 &&
          comment.child.map((commentChild) => (
            <CommentsSection
              comment={commentChild}
              setEdit={setEdit}
              setOpenModel={setOpenModel}
              setEditReplyComment={setEditReplyComment}
              setEditReplyIndex={setEditReplyIndex}
            />
          ))}
      </div>
    </div>
  );
};

function Comments({ addcommentHandler, updatedCommentsHandler, comments }) {
  const [comment, setComment] = React.useState("");
  const [editReplyComment, setEditReplyComment] = React.useState("");
  const [editReplyIndex, setEditReplyIndex] = React.useState(null);
  const [openModel, setOpenModel] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const editReplyHandler = (key, commentsArr = [...comments]) => {
    if (key === "ok") {
      let updatedComments = [...commentsArr];
      if (edit) {
        updatedComments = updatedComments.map((comment) => {
          if (comment.id === editReplyIndex) {
            comment.title = editReplyComment;
          } else if (comment.child.length > 0) {
            editReplyHandler(key, comment.child);
          }
          return comment; // check th return
        });
      } else {
        updatedComments = updatedComments.map((comment) => {
          debugger;
          if (comment.id === editReplyIndex) {
            const newChildComment = {};
            newChildComment["id"] = uuidv4(); // Id
            newChildComment["title"] = editReplyComment; // Comment
            newChildComment["child"] = []; // Child
            comment.child.push(newChildComment);
          } else if (comment.child.length > 0) {
            editReplyHandler(key, comment.child);
          }
          return comment;
        });
        updatedCommentsHandler(updatedComments);
      }
    }
    if (edit) {
      setEdit(false);
    }

    setOpenModel(false);
    setEditReplyComment("");
    setEditReplyIndex(null);
  };
  return (
    <>
      <div className="comment-div">
        <div className="comment-header">Add Comments</div>
        <div className="add-comment-section">
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            name="add-comment"
            className="add-button"
            onClick={(e) => {
              setComment("");
              addcommentHandler(comment);
            }}
          >
            Add
          </button>
        </div>
        {/* Display the comments */}
        <div className="display-comments">
          {comments.map((comment) => (
            <CommentsSection
              comment={comment}
              setEdit={setEdit}
              setOpenModel={setOpenModel}
              setEditReplyComment={setEditReplyComment}
              setEditReplyIndex={setEditReplyIndex}
            />
          ))}
        </div>
      </div>

      {/* Edit Model / Reply model */}
      <Modal
        title={edit ? "Edit comment" : "Reply for the comment"}
        centered
        open={openModel}
        onOk={() => editReplyHandler("ok")}
        onCancel={() => editReplyHandler("cancel")}
      >
        <textarea
          name="edit-reply-comment"
          value={editReplyComment}
          onChange={(e) => setEditReplyComment(e.target.value)}
        />
      </Modal>
    </>
  );
}

export default Comments;
