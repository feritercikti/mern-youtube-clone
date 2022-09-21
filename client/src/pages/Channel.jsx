import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const ChannelName = styled.span`
  font-weight: 500;
`;

const Channel = ({ channel }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getChannel = async () => {
      const res = await axios.get(`/user/find/${channel._id}`);
      setUser(res.data);
    };
    getChannel();
  }, []);

  return (
    <Container>
      <ChannelInfo>
        <ChannelName>Channel</ChannelName>
      </ChannelInfo>
    </Container>
  );
};

export default Channel;
