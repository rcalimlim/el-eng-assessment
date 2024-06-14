/* eslint-disable */
export default async () => {
  const t = {
    ['./foodtrucks/entities/foodtruck.entity']: await import(
      './foodtrucks/entities/foodtruck.entity'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [import('./foodtrucks/entities/foodtruck.entity'), { Foodtruck: {} }],
        [
          import('./foodtrucks/dto/create-foodtruck.dto'),
          {
            CreateFoodtruckDto: {
              applicant: { required: true, type: () => String },
              locationId: { required: true, type: () => Number },
            },
          },
        ],
        [
          import('./foodtrucks/dto/update-foodtruck.dto'),
          { UpdateFoodtruckDto: {} },
        ],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('./foodtrucks/foodtrucks.controller'),
          {
            FoodtrucksController: {
              create: {},
              findAll: {
                type: [t['./foodtrucks/entities/foodtruck.entity'].Foodtruck],
              },
              findOne: {
                type: t['./foodtrucks/entities/foodtruck.entity'].Foodtruck,
              },
              update: {
                type: t['./foodtrucks/entities/foodtruck.entity'].Foodtruck,
              },
              remove: {},
            },
          },
        ],
      ],
    },
  };
};
