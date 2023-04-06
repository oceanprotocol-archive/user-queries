import { request, gql } from 'graphql-request';

const endpoint = 'https://api.thegraph.com/subgraphs/name/<subgraph-name>';

const query = gql`
  query Tokens {
    tokens {
      id
      name
    }
  }
`;

async function run() {
  while (true) {
    try {
      const data = await request(endpoint, query);
      console.log(data.tokens);
    } catch (err) {
      console.error(err);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

run();