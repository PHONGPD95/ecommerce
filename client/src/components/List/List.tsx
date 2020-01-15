import { get, isEmpty, isEqual } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Item from '~components/List/Item';
import { Loading } from '~components/UI';
import client from '~graphql/client';
import { FIND_MANY_PRODUCT } from '~graphql/queries';
import { FindManyProduct, FindManyProductVariables, Product } from '~graphql/types';
import usePrevious from '~utils/usePrevious';

const StyledContainer = styled.div`
  padding: 1rem 0;
  text-align: center;
`;

const StyledListItem = styled.ul`
  margin: 0;
  background: #fff;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;

  @media screen and (min-width: 992px) {
    padding: 1rem 10%;
  }
`;

const StyledTitle = styled.div`
  margin-bottom: 16px;
  font-size: 24px;
`;

const StyledLink = styled(Link)`
  display: block;
  font-size: 12px;
  text-decoration: underline;
`;

interface Props {
  title?: string;
  link?: string;
  filter?: FindManyProductVariables;
}

const List: FC<Props> = ({ title, link, filter }) => {
  const [products, setProduct] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = get(filter, "limit");

  const prevFilter = usePrevious(filter);

  useEffect(() => {
    if (!isEqual(filter, prevFilter)) {
      loadProducts(0, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const loadProducts = async (page, isReload = false) => {
    const limitData = limit || 20;
    await client
      .query<FindManyProduct, FindManyProductVariables>({
        query: FIND_MANY_PRODUCT,
        variables: { ...filter, limit: limitData, skip: page * limitData }
      })
      .then(({ data }) => {
        if (isEmpty(data!.findManyProduct)) {
          setHasMore(false);
        }

        isReload
          ? setProduct([...data!.findManyProduct])
          : setProduct([...products, ...data!.findManyProduct]);
      });
  };

  const renderProduct = products.map((item: Product, index) => (
    <Item key={index} item={item} />
  ));

  const renderLimit = <StyledListItem>{renderProduct}</StyledListItem>;

  const renderInfinite = (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadProducts}
      hasMore={hasMore}
      loader={<Loading key="loading" />}
    >
      {renderLimit}
    </InfiniteScroll>
  );

  return (
    <StyledContainer>
      <StyledTitle>
        {title}
        {link && <StyledLink to={link}>Xem thêm</StyledLink>}
      </StyledTitle>
      {limit ? renderLimit : renderInfinite}
    </StyledContainer>
  );
};

export default List;
