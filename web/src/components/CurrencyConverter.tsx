import ExchangeRate from "./ExchangeRate"; 
import { useState, MouseEventHandler } from 'react';
import axios, {AxiosResponse, AxiosError} from "axios";


import {
    Table,
    Tbody,
    Tr,
    Td,
    Box,
    Text,
    Input, 
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button, Flex
  } from '@chakra-ui/react'


function CurrencyConverter() {

    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC"); 
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("BTC"); 
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [result, setResult] = useState(0);

    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA'];

    function convert(): MouseEventHandler<HTMLButtonElement>|undefined{

        axios.request({
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': 'd0b88e1566msha2ec5133072eadap1cc5ddjsn74cd066856d7'
            }
            }).then(function (response: AxiosResponse) {
            //console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setResult(exchangeRate * amount);
        }).catch(function (error:AxiosError) {
            console.log(error);
        });
    
        return undefined;
    
    }

    return (
        <Box>
            <Text as ="h2" fontSize="3xl" mb={6}>Currency Converter</Text>
            <Box>
                <Table>
                    <Tbody>
                        <Tr>
                            <Td>Primary Currency</Td>
                            <Td>
                            <NumberInput name="currency-amount-1" type="number" value={amount}
                               onChange = {(valueString) => setAmount(Number(valueString))}>
                                <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                            </NumberInput>
                               {/* <Input name="currency-amount-1" type="number" value={amount}
                               onChange = {(e) => setAmount(Number(e.target.value))}
                               />  */}
                            </Td>
                            <Td>
                                <Select value={chosenPrimaryCurrency} name="currency-option-1"
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index)=>(<option key={_index}>{currency}</option>))}
                                </Select>
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Secondary Currency</Td>
                            <Td>
                               <Input name="currency-amount-2" type="number" disabled={true} value={result} /> 
                            </Td>
                            <Td>
                                <Select value={chosenSecondaryCurrency} name="currency-option-2"
                                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index)=>(<option key={_index}>{currency}</option>))}
                                </Select>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>

                
            </Box>
            <Flex justifyContent="space-between" align="center"  mt={6}>
                <ExchangeRate exchangeRate = {exchangeRate} current1={chosenPrimaryCurrency} current2={chosenSecondaryCurrency} />
                <Button onClick={convert}>Convert</Button>                
            </Flex>
            
        </Box>
    );
  }
  
  export default CurrencyConverter;
  