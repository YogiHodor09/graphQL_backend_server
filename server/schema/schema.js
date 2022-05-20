const graph = require("graphql");
const lodash = require("lodash");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graph;

//dummy user data
var usersData = [
  { id: "1", name: "Yogeshwar", age: 28, profession: "Programmer" },
  { id: "13", name: "Danush", age: 21, profession: "Student" },
  { id: "211", name: "Panneer", age: 16, profession: "Business" },
  { id: "19", name: "Uma", age: 26, profession: "Railways" },
  { id: "150", name: "Ravi", age: 36, profession: "Architect" },
];

// dummy hobby data
var hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computers to make the world a better place",
    userId: "150",
  },
  {
    id: "2",
    title: "Rowing",
    description: "Sweat and feel better before eating donouts",
    userId: "211",
  },
  {
    id: "3",
    title: "Swimming",
    description: "Get in the water and learn to become the water",
    userId: "211",
  },
  {
    id: "4",
    title: "Fencing",
    description: "A hobby for fency people",
    userId: "13",
  },
  {
    id: "5",
    title: "Hiking",
    description: "Wear hiking boots and explore the world",
    userId: "150",
  },
];

// dummy posts data
var postsData = [
  { id: "1", comment: "Building a Mind", userId: "1" },
  { id: "2", comment: "GraphQL is Amazing", userId: "1" },
  { id: "3", comment: "How to Change the World", userId: "19" },
  { id: "4", comment: "How to Change the World", userId: "211" },
  { id: "5", comment: "How to Change the World", userId: "1" },
];

// Create User Type -- Table
const UserType = new graph.GraphQLObjectType({
  name: "User",
  description: "User GraphQL Fields",
  fields: () => ({
    id: { type: graph.GraphQLID },
    name: { type: graph.GraphQLString },
    age: { type: graph.GraphQLInt },
    profession: { type: graph.GraphQLString },
  }),
});

// Create Hobby Type

const HobbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby Type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

// Create Post Type

const PostType = new GraphQLObjectType({
  name: "Posts",
  description: "Post Type",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
  }),
});

// RoorQuery - Path for transversing the query to get data and querying mapped data for endpoint API

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "User GraphQL RootQuery",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // we resolve with data
        // get and return data from server

        return lodash.find(usersData, {
          id: args.id,
        });
      },
    },
    hobby: {
      type: HobbyType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // we resolve with data
        // get and return data from server

        return lodash.find(hobbiesData, { id: args.id });
      },
    },

    posts: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // we resolve with data
        // get and return data from server

        return lodash.find(postsData, { id: args.id });
      },
    },
  },
});

module.exports = new graph.GraphQLSchema({
  query: RootQuery,
});
