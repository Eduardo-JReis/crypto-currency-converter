import { useEffect, useState} from 'react';
import {Text, Flex, Stack, Link, Box} from '@chakra-ui/react';
import axios from 'axios';




function NewsFeed() {

    const [articles, setArticles] = useState<Array<{
        title: string;
        url: string;
        source: string;
    }>>([]);

    const rapidApi: string = process.env.REACT_APP_RAPID_API_KEY as string

    useEffect(()=> {
    
        axios.request({
        method: 'GET',
        url: 'https://crypto-news-live.p.rapidapi.com/news',
        headers: {
          'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
          'x-rapidapi-key': rapidApi 
        }
      }).then((response) => {
          setArticles(response.data);
      }).catch((error) => {
          console.error(error);
      });
    });

    const first7Articles = articles?.slice(0,7);

  return (
    <Flex flexDir="column" align="center" w="40%" >
        <Text fontSize="2xl" mb={6}>Crypto News Feed</Text>
        <Stack w="100%" spacing={4}>
            {first7Articles?.map((article, _index) => (
            <Box key={_index} py={2} borderBottom="1px solid #eee">
                <Text fontSize="xl"mb={2}>{article.title}</Text>
                <Link href={article.url} color="#666">{article.url}</Link>
                <Text fontSize="sm" textAlign="right" color="#bbb">{article.source}</Text>
            </Box>
            ))}
        </Stack>
    </Flex>
  );
}

export default NewsFeed;
