import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { format } from 'timeago.js';

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  padding: 5px 15px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 15px;
`;

const Comment = ({ comment, videoId }) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`);
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/comments/${comment._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name}
          <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment.desc}
          {currentUser._id === comment.userId ? (
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          ) : (
            ' '
          )}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
