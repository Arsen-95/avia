import React, { useState } from "react";
import Logo from "./Components/Logo/Logo";
import './App.css';
import Params from "./Components/Params/Params";
import { QueryClient, QueryClientProvider } from "react-query";
import TicketsList from "./Components/TicketsList/TicketsList";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";


function App() {

  const queryClient = new QueryClient();
  let [value, setValue] = useState([]);

  return (
    <ChakraProvider>
      <div className="App">
        <Container maxW={794} m={'auto'}>
          <Logo/>
          <Flex justifyContent={'space-between'} gap={5}>
            <Params setValue={setValue} value={value} flex='1'/>
            <QueryClientProvider flex='2' client={queryClient}>
              <TicketsList setValue={setValue} value={value} />
            </QueryClientProvider>
          </Flex>
        </Container>
      </div>
    </ChakraProvider>
  );
}

export default App;
