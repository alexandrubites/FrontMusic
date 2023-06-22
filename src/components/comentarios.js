import React, { useState, useEffect } from "react";
import KafkaService from "../services/kafka.service";
import axios from 'axios';

const CommentsComponent = ({ id }) => {
  const [comentarios, setComentarios] = useState([]);
  const [commentText, setCommentText] = useState([]);
  const uri = "https://api-service-alexandrubites.cloud.okteto.net/api/comments"

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${uri}/${id}`);
        const comentarios = response.data ? response.data : [];
        setComentarios(comentarios);
      } catch (error) {
        console.log('Error al obtener los comentarios:', error);
      }
    };

    fetchComments();
  }, [id]);

  const comment = (e, status) => {
    const user = localStorage.getItem('user');
    const data = {
      userId: user,
      objectId: id,
      comment: commentText
    };

    console.log(JSON.stringify(data));
    KafkaService.commentPush(data);
    e.preventDefault();
  };

  return (
    <div className="comments-section">
      <h4>Comments</h4>
      <div className="form-group">
        <label htmlFor="comment-input">Leave a comment:</label>
        <textarea
          id="comment-input"
          name="comment"
          rows="4"
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
      </div>
      <button type="button" onClick={comment}>
        Comentar
      </button>
      <div className="comments-list">
        {comentarios.map((comentario) => (
          <div className="comment" key={comentario._id}>
            <h5>{comentario.userId}</h5>
            <p>{comentario.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsComponent;
