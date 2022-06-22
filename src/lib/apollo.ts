import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4os1tw20uk801xx6dfeedf9/master',
  cache: new InMemoryCache()
})