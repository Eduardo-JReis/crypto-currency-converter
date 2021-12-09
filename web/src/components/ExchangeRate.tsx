import { Text, Flex, Box} from '@chakra-ui/react';


type PropsData = {
    exchangeRate: number;
    current1: string;
    current2: string
}


function ExchangeRate({exchangeRate, current1, current2}:PropsData) {
    return (
        <Box as = "div">
            <Flex>
                <Text>Exchange Rate:</Text>
                <Text ml={2} fontWeight="bold">{exchangeRate}</Text>
            </Flex>
            <Text><b>{current1}</b> to <b>{current2}</b></Text>
        </Box>
    );
  }
  
  export default ExchangeRate;
  