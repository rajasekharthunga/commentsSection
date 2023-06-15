import React from "react";
import { Button, Modal } from "antd";

function Comments({ addcommentHandler, updatedCommentsHandler, comments }) {
  const [comment, setComment] = React.useState("");
  const [editReplyComment, setEditReplyComment] = React.useState("");
  const [editReplyIndex, setEditReplyIndex] = React.useState(null);
  const [openModel, setOpenModel] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const editReplyHandler = (key) => {
    debugger;
    if (key === "ok") {
      let updatedComments = [...comments];
      if (edit) {
        updatedComments = updatedComments.map((comment) => {
          if (comment.id === editReplyIndex) {
            comment.title = editReplyComment;
          }
          return comment;
        });
      } else {
        updatedComments = updatedComments.map((comment) => {
          if (comment.id === editReplyIndex) {
            comment.child.push(editReplyComment);
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
        {console.log("comments", comments)}
        <div className="display-comments">
          {comments.map((comment) => (
            <>
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
                {comment.child.length > 0 && (
                  <div className="child-comments-div">
                    {comment.child.map((child) => (
                      <div className="child-comment">{child}</div>
                    ))}
                  </div>
                )}
              </div>
            </>
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
