"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const users_json_1 = __importDefault(require("./users.json"));
const endpoint = 'https://api.thegraph.com/subgraphs/name/<subgraph-name>';
async function run() {
    const userArray = users_json_1.default;
    for (const user of userArray) {
        const query = (0, graphql_request_1.gql) `
      query {
        veOCEAN(id: ${user.address}) {
          id
          lockedAmount
        }
      }
    `;
        try {
            const data = await (0, graphql_request_1.request)(endpoint, query);
            console.log(data);
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.default = run;
run();
