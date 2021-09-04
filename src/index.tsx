import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from "react-router-dom";
import { RootRouter } from "./Route";

import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import GlobalStyle from './GlobalStyle';

import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const theme = createTheme();
const httpLink = createHttpLink({
	uri: process.env.REACT_APP_GRAPHQL_END_POINT,
});
// GraphQLのリクエストを送信する際に付与するRequest Headersなどをここで指定する
// 本来であれば認証情報などをここで取得し、トークンをHeadersに付与する。
const authLink = setContext(async () => {
	return {
		headers: {
			"x-hasura-admin-secret": process.env.REACT_APP_X_HASURA_ADMIN_SECRET,
		}
	};
});

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

ReactDOM.render(
  	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<ApolloProvider client={apolloClient}>
				<BrowserRouter>
					<CssBaseline />
					<GlobalStyle />
					<RootRouter />
				</BrowserRouter>
			</ApolloProvider>
		</ThemeProvider>
  	</React.StrictMode>,
  document.getElementById('root')
);

