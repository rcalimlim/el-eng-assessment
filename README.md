## Description
A Food Truck service serving San Francisco food truck data. 

## Design

My design philosophy for this RESTful API service was to use an Inversion of Control (IoC) framework to manage code dependencies, generate boilerplate, and scaffold out the project quickly. I'm most familiar with TypeScript/Node on the backend, so I chose a TypeScript framework that would meet that criteria: NestJS. It has a handy interactive CLI to setup a TypeScript project from scratch, add models, new REST routes, generate documentation, and more.

This allowed me to focus on manipulating the food truck data to use TypeScript-compliant naming conventions (camelCase) and fleshing out the Foodtruck model.

With the time I alotted myself, I knew I wouldn't be able to implement a real db connection, load the data, and wire everything together. Instead, I opted to design an adapter interface to sit between the Food Truck service and the data backend. That way, I could map the input data back to a JSON file and use that as a mock data backend. Using this pattern with NestJS's dependency injection framework makes it easy to swap a real database provider in at a later time without needing to change the interface between the food truck service and data backend. The JSON file is stored in `src` and does _not_ persist changes across instances at this time. Here are some code highlights to illustrate this:
```typescript
// service uses a defined interface layer, `DataProviderAdapter`, to encapsulate backend-specific logic
// and expose it as a private property `this.db`
export class FoodtrucksService<T extends DataProviderAdapter> {
  constructor(private readonly db: T) {}
}

// NestJs provides @ annotations utils to loosely couple modules within a service
// here we can inject the `JsonDataProviderAdapter` class that concretely implements the class to
// interact with the food truck JSON file.
// Changing data backends is as easy as creating a new class that extends `DataProviderAdapter`
// and list it in Module.providers instead of `JsonDataProviderAdapter`
@Module({
  controllers: [FoodtrucksController],
  providers: [FoodtrucksService, JsonDataProviderAdapter, /* SomeRealDataProviderAdapter */],
})
export class FoodtrucksModule {}

// Concrete class implementing data interface 
export class JsonDataProviderAdapter implements DataProviderAdapter {
  // getAll(): Promise<any[]>;
  // getById(id: string): Promise<any>;
  // create(data: any): Promise<any>;
  // update(id: string, data: any): Promise<any>;
  // delete(id: string): Promise<void>;
}
```

## Challenges, considerations, and further development

I time boxed this project for a few hours as best as I could, so one of main challenges was narrowing the scope to something that could reasonably built within a few hours.

This project is missing the following and further development should be focused on the following:
- Add some kind of OAuth authentication middleware for route protection. Even just a GitHub integration would suffice.
- A real data backend with easily-swapped-in data provider adapter code that allows for data persistence.
- Automated unit tests to maintain quality and reliability.

If I had more time, I'd like to dive deeper into NestJS's utilities for parsing input objects on POST/PUT requests, error management, and authentication.

### Tech stack:
- [Node](https://nodejs.org/en) - run JS programs outside of a browser
- [TypeScript](https://www.typescriptlang.org/) - typed JavaScript to shift run-time errors to transpile time
- [Nest](https://github.com/nestjs/nest) - IoC server framework for Node
- [Jest](https://jestjs.io/) - automated testing
- [Swagger/OpenAPI](https://swagger.io/) - powers the plugin that auto-generates API documentation for REST routes

## Quick start

1) Clone this repo to your local environment.
2) Install dependencies
```bash
yarn install
```
3) Run the app
```bash
yarn start 
```
4) Navigate to `localhost:3000/api` and confirm you can view the API documentation
5) Request food truck data: `GET localhost:3000/foodtrucks`

## Development

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
