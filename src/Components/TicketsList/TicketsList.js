import { Box, Button, Center, List } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import Filter from '../Filter/Filter';
import Ticket from '../Ticket/Ticket';

const TicketsList = ({value}) => {

  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('');
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(5);
  const url = `https://front-test.beta.aviasales.ru/search`;

  const searchId = async () => {
    const ids = await axios(url);
    return ids.data.searchId;
  };

  const request = async (ids) => {
    const response = await axios(`https://front-test.beta.aviasales.ru/tickets?searchId=${ids}`);
    return response.data;
  };
  
  const getRequest = async () => {
    const ids = await searchId();
    const response = await request(ids);
    return response.tickets;
  };

  let {data, status, error} = useQuery("tickets", getRequest, {
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    setPosts(data)
  }, [data]);
  

  if (sort === 'sortPrice' && status === 'success') {
    data.sort((a, b) => a.price - b.price);
  }

  if (sort === 'sortFast' && status === 'success') {
    data.sort((a, b) => a.segments[0].duration - b.segments[0].duration);
  }

  useMemo(() => {
    switch (value) {
      case 'NoTransfer':
        data = data.filter(i => {
          return i.segments.every(n => {
            return n.stops.length === 0;
          });
        });
        break;
      case 'OneTransfer':
        data = data.filter(i => {
          return i.segments.every(n => {
            return n.stops.length === 1;
          });
        });
        break;
      case 'TwoTransfers':
        data = data.filter(i => {
          return i.segments.every(n => {
            return n.stops.length === 2;
          });
        });
        break;  
      case 'ThreeTransfers':
        data = data.filter(i => {
          return i.segments.every(n => {
            return n.stops.length === 3;
          });
        });
        break;
      case 'All':
        data = posts;
        break;
    };

  }, [value]);
  
  // switch (value) {
  //   case 'NoTransfer':
  //     data = data.filter(i => {
  //       return i.segments.every(n => {
  //         return n.stops.length === 0;
  //       });
  //     });
  //     break;
  //   case 'OneTransfer':
  //     data = data.filter(i => {
  //       return i.segments.every(n => {
  //         return n.stops.length === 1;
  //       });
  //     });
  //     break;
  //   case 'TwoTransfers':
  //     data = data.filter(i => {
  //       return i.segments.every(n => {
  //         return n.stops.length === 2;
  //       });
  //     }); 
  //     break;  
  //   case 'ThreeTransfers':
  //     data = data.filter(i => {
  //       return i.segments.every(n => {
  //         return n.stops.length === 3;
  //       });
  //     });
  //     break;
  //   case 'All':
  //     data = posts;
  //     break;
  //   default:
  //     console.log('tra');
  // }

  

  const morePosts = () => {
    setStart(start += 5);
    setEnd(end += 5);
  };

  if (error) {
    return <Center flex={'2'} color={'red'} fontSize={30}>Something went wrong, try again later</Center>
  } 

  if (status === 'loading') {
    return <Center flex='2' fontSize={30}>Loading...</Center>
  }

  return (
    
   <Box flex={2}>
     {data.length === 0 ? 
     <Box textAlign={'center'} fontSize={30}>No such tickets</Box>
      :
      <Box>
        <Filter 
        sort={sort}
        setSort={setSort}
        />
        {status === 'success' &&
          <List>
            {data.slice(0, end).map(item => (
              <Ticket
                key={Math.random()}
                item={item}/>
            ))}
          </List>
        }
        <Box >
          <Button colorScheme='blue' w='100%' mb={10}
            onClick={() => {
              morePosts();
            }}
          >
            Показать еще 5 билетов
          </Button>
        </Box>
      </Box>
     }
   </Box> 
  );
};

export default TicketsList;
