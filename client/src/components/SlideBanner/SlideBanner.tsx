import { Carousel } from 'antd';
import React, { FC } from 'react';
import styled from 'styled-components';

const CarouselWrapper = styled.div`
  .ant-carousel .slick-slide {
    text-align: center;
    height: 240px;
    line-height: 240px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
`;

const SlideBanner: FC = () => {
  return (
    <CarouselWrapper>
      <Carousel autoplay dotPosition="left">
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </CarouselWrapper>
  );
};

export default SlideBanner;
