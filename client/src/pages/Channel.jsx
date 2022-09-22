import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'timeago.js';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-top: 40px;
`;
const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const ChannelName = styled.span`
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.textSoft};
`;
const Image = styled.img`
  text-align: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;
const ChannelCounter = styled.span`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 13px;
  text-align: center;
`;
const Videos = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 10px;
`;
const Video = styled.div`
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;
`;
const VideoImage = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
`;

const UploadedVideos = styled.h2`
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.textSoft};
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Channel = () => {
  const location = useLocation();
  const channel = location.state?.channel;

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/all`);
      const allvideos = res.data;
      setVideos(
        allvideos.filter((video) => {
          return video.userId === channel._id;
        })
      );
    };
    fetchVideos();
  }, []);

  return (
    <Container>
      <ChannelInfo>
        <Image>{channel.img}</Image>
        <ChannelName>{channel.name}</ChannelName>
        <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
        <UploadedVideos>Videos</UploadedVideos>
      </ChannelInfo>
      <Hr />
      <Videos>
        {videos.map((video) => (
          <Video key={video._id}>
            <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
              <VideoImage src={video.imgUrl} />
              <Texts>
                <Title>{video.title}</Title>
                <Info>
                  {video.views} views • {format(video.createdAt)}
                </Info>
              </Texts>
            </Link>
          </Video>
        ))}
      </Videos>
    </Container>
  );
};

export default Channel;
