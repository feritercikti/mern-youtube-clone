import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from './Comment';

const Container = styled.div``;

const NewComment = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.textSoft};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {}
    };
    fetchComments();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = { desc, videoId };
      await axios.post(`/comments/`, newComment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <NewComment onSubmit={handleSubmit}>
        <Avatar src={currentUser?.img} />
        <Input
          placeholder='Add a comment...'
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button>Submit</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          videoId={videoId}
          setComments={setComments}
        />
      ))}
    </Container>
  );
};

export default Comments;
