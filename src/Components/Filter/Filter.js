import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

const Filter = ({sort, setSort}) => {
  return (
    

    <Flex w={'100%'} mb={5}>
      <Button 
        h={'50px'}
        fontWeight={'600'}
        lineHeight={'20px'}
        textTransform={'uppercase'}
        bgColor={'#FFFFFF'}
        onClick={() => setSort('sortPrice')}
        variant='outline'
        _hover={{
          bgColor: '#2196F3',
          color: 'white'
        }}
        _focus={{
          bgColor: '#2196F3',
          color: 'white'
        }}
        // py={'15px'}
        fontSize={'12px'}
        flex={1}>Самый дешевый</Button>
      <Button 
        h={'50px'}
        fontWeight={'600'}
        lineHeight={'20px'}
        textTransform={'uppercase'}
        _focus={{
          bgColor: '#2196F3',
          color: 'white'
        }}
        bgColor={'#FFFFFF'}
        _hover={{
          bgColor: '#2196F3',
          color: 'white'
        }}
        // py={'5px'}
        fontSize={'12px'}
        onClick={() => setSort('sortFast')}
        flex={1} variant='outline'>Самый быстрый</Button>
    </Flex>
  );
};

export default Filter;