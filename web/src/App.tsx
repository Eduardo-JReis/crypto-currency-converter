import CurrencyConverter from './components/CurrencyConverter';
import NewsFeed from './components/NewsFeed';
import { Flex, Container } from '@chakra-ui/react';

function App() {
  return (
    <Container maxW='container.xl' my={14} centerContent>
      <Flex w="100%" justify="space-between" >
        <CurrencyConverter />
        <NewsFeed />
      </Flex>
    </Container>
  );
}

export default App;
