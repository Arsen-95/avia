import React from 'react';
import s7 from './S7.png';
import { Flex, Box, Image, ListItem } from '@chakra-ui/react';

const Ticket = ({item}) => {

  let time = item.segments.map(i => {
    let durationHours = Math.floor(i.duration / 60);
    let durationMinutes = i.duration % 60;
    return [durationHours, durationMinutes];
  });

  let arrival = item.segments.map(i => {
    let origin = i.origin;
    let destination = i.destination;
    let date = new Date(i.date);
    let hours = date.getHours();
    let mins = date.getMinutes();
    let minutesDeparture = hours * 60 + mins;
    let minutesFly = i.duration;
    let sum = minutesDeparture + minutesFly;
    let hourArrival = Math.floor(sum / 60);
    while (hourArrival >= 24) {
      hourArrival -= 24;

    } if (hourArrival <= 9) {
      hourArrival = `0${hourArrival}`;
    }
    let minsArrival = sum % 60;
    if (minsArrival <= 9) {
      minsArrival = `0${minsArrival}`;
    }  
    return [origin, destination, hours, mins, hourArrival, minsArrival];
  });

  const stops = item.segments.map(i => {
    let stop = i.stops;
    let stopCountries = stop.map(country => country);
    return stop, stopCountries;
  });


  return (
    <ListItem mb='5' p='5' bgColor={'#FFFFFF'} borderRadius={'5px'} boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.1)'}> 

      {/*  Цена и логотип компании */}

      <Flex justifyContent={'space-between'} alignItems={'center'} mb='5'>
        <Box color={'#2196F3'} fontSize='24px' fontWeight={600} className='ticket__price'>{item.price} Р</Box>
        <Box className='ticket__logo'>
          <Image src={s7} alt='s7 logo'/>
        </Box>
      </Flex>
      <Flex gap={'90px'}>

        {/* .......Вылет - Прилет..........
            .......Время отправления - прибытия...........
        */}
        <Box>
          {arrival.map(i => (
            <Box _notLast={{mb: 2.5}} key={Math.random()} >
              <Box fontSize={'12px'} fontWeight={'600'} color='#A0B0B9'>{i[0]} - {i[1]}</Box>
              <Box fontSize={'14px'} fontWeight={'600'}>{i[2] <= 9 ? `0${i[2]}` : i[2]}:{i[3] <= 9 ? `0${i[3]}` : i[3]}-{i[4]}:{i[5]}</Box>
            </Box>
          ))}
        </Box>
        {/*.............Время в пути................... */}

        <Box>
          {time.map(t => (
            <Box _notLast={{mb: 2.5}} key={Math.random()}>
              <Box fontSize={'12px'} fontWeight={'600'} color='#A0B0B9'>В пути</Box>
              <Box fontSize={'14px'} fontWeight={'600'} color={'#4A4A4A'}>{t[0]}ч {t[1] <= 9 ? `0${t[1]}м` : `${t[1]}м` } </Box>
            </Box>
          ))}
        </Box>
          
          {/* .......Количество пересадок............*/}
        <Box display={'flex'} flexDirection={'column'} >
          {stops.map(s => (
            <Box _notLast={{mb: 2.5}, {flexGrow: 1}} display={'flex'} flexDirection={'column'} key={Math.random()} >
              <Box fontSize={'12px'} fontWeight={'600'} justifySelf={'flex-end'} color='#A0B0B9'>{s.length === 1 ? `${s.length} ПЕРЕСАДКА` : s.length > 1 ? `${s.length} ПЕРЕСАДКИ` : "ПРЯМОЙ" } </Box>
              {!s.length ? null :
              <Box fontSize={'14px'} fontWeight={'600'}>{s.join(', ')}</Box>}
            </Box>
          ))}
        </Box>
      </Flex>
    </ListItem> 
  );
};

export default Ticket;
