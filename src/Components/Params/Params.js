import { Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const Params = ({value, setValue}) => {
  return (
   <RadioGroup 
      onChange={setValue} value={value} 
      h={'252px'} bgColor={'#FFFFFF'} alignSelf={'start'} p={5} borderRadius={'5px'} boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.1)'}
    > 
      <Text mb={4}>Количество пересадок</Text>
      <Stack direction={'column'}>
        <Radio value="All">Все</Radio>
        <Radio value="NoTransfer">Без пересадок</Radio>
        <Radio value="OneTransfer">1 пересадка</Radio>
        <Radio value="TwoTransfers">2 пересадки</Radio>
        <Radio value="ThreeTransfers">3 пересадки</Radio>
      </Stack>
   </RadioGroup> 
  );
};

export default Params;
