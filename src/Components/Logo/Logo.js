import React from 'react';
import logo from './Logo.png';
import { Center, Image } from '@chakra-ui/react';

const Logo = () => {
  return (
   <Center py={'50px'}> 
      <Image src={logo} alt="logo" />
   </Center > 
   
  );
};

export default Logo;
