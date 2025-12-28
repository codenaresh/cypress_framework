// cypress/utils/testData.js
import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phone:faker.phone.number()
});
