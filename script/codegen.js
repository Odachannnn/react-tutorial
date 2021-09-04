module.exports = {
    schema: {
        [process.env.REACT_APP_GRAPHQL_END_POINT]: {
            headers: {
                "x-hasura-admin-secret": process.env.REACT_APP_X_HASURA_ADMIN_SECRET,
            },
        },
    },
    documents: "",
    generates: {
        "src/utils/graphql/generated.ts": {
            plugins: ["typescript", "typescript-operations"],
        },
    },
};
