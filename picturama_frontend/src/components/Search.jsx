import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';


import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';


export default function Search({ searchTerm }) {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>

      {loading && <Spinner message="Searching..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No matches found =(</div>
      )}
    </div>
  );
};
