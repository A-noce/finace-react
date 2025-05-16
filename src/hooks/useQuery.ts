import { objectToQuery, queryToObject } from '@utils/manipulateObjectUtils';
import { omit } from 'lodash';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useQuery = <T extends Record<string, unknown>>() => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = queryToObject(location.search.slice(1)) as Record<
    string,
    unknown
  >;

  const changeQuery = useCallback(
    (data: Record<string, unknown>) => {
      updateQuery({ ...query, ...data });
    },
    [query],
  );

  const resetQuery = () => navigate(location.pathname);

  const removeKeyFromQuery = (keys: string[]) => {
    updateQuery(omit(query, ...keys));
  };

  const updateQuery = (data: Record<string, unknown>) => {
    const query = objectToQuery(data);
    if (location.search.slice(1) !== query) {
      navigate(`${location.pathname}?${query}`);
    }
  };

  return {
    query: query as T extends Record<string, unknown>
      ? T
      : Record<string, unknown>,
    addQuery: changeQuery,
    resetQuery,
    removeKeyFromQuery,
  };
};
