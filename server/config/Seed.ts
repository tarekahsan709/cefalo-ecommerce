import logger from '../util/logger';

import { User } from '../models/user';
import { Product } from '../models/product';

const users = [
  {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  }, {
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }
]
const products = [
  {
    "id": 1,
    "name": "Towel Multifold",
    "price": 53,
    "available": true,
    "variants": [
      {
        "color": "Khaki",
        "size": ['large', 'medium', 'extra-large'],
        "quantity": 645
      },
      {
        "color": "Maroon",
        "size": ['large', 'medium', 'extra-large'],
        "quantity": 787
      }
    ]
  },
  {
    "id": 2,
    "name": "Mackerel Whole Fresh",
    "price": 2,
    "available": true,
    "variants": [{"color": "Maroon", "size": ['large', 'medium', 'extra-large'], "quantity": 787}]
  },
  {
    "id": 3,
    "name": "Soup - Beef Conomme, Dry",
    "price": 16,
    "available": false,
    "variants": [{"color": "Violet", "size": ['large', 'medium', 'extra-large'], "quantity": 117}]
  },
  {
    "id": 4,
    "name": "Raisin - Dark",
    "price": 3,
    "available": true,
    "variants": [{"color": "Crimson", "size": [], "quantity": 645}]
  },
  {
    "id": 5,
    "name": "Flower - Daisies",
    "price": 27,
    "available": true,
    "variants": [{"color": "Aquamarine", "size": ['large', 'medium', 'extra-large'], "quantity": 878}]
  },
  {
    "id": 6,
    "name": "Oregano - Dry, Rubbed",
    "price": 60,
    "available": false,
    "variants": [{"color": "Fuscia", "size": ['large', 'medium', 'extra-large'], "quantity": 614}]
  },
  {
    "id": 7,
    "name": "Ostrich - Prime Cut",
    "price": 8,
    "available": false,
    "variants": [{"color": "Violet", "size": ['large', 'medium', 'extra-large'], "quantity": 367}]
  },
  {
    "id": 8,
    "name": "Sour Cream",
    "price": 100,
    "available": true,
    "variants": [{"color": "Violet", "size": ['large', 'medium', 'extra-large'], "quantity": 586}]
  },
  {
    "id": 9,
    "name": "Quail Eggs - Canned",
    "price": 72,
    "available": true,
    "variants": [{"color": "Purple", "size": ['large', 'medium', 'extra-large'], "quantity": 461}]
  },
  {
    "id": 10,
    "name": "The Pop Shoppe - Black Cherry",
    "price": 28,
    "available": false,
    "variants": [{"color": "Crimson", "size": ['large', 'medium', 'extra-large'], "quantity": 452}]
  },
  {
    "id": 11,
    "name": "Appetizer - Tarragon Chicken",
    "price": 94,
    "available": true,
    "variants": [{"color": "Teal", "size": ['large', 'medium', 'extra-large'], "quantity": 372}]
  },
  {
    "id": 12,
    "name": "Butter Balls Salted",
    "price": 75,
    "available": true,
    "variants": [{"color": "Goldenrod", "size": ['large', 'medium', 'extra-large'], "quantity": 600}]
  },
  {
    "id": 13,
    "name": "Beer - Camerons Cream Ale",
    "price": 44,
    "available": true,
    "variants": [{"color": "Pink", "size": ['large', 'medium', 'extra-large'], "quantity": 667}]
  },
  {
    "id": 14,
    "name": "Crab - Dungeness, Whole, live",
    "price": 53,
    "available": false,
    "variants": [{"color": "Aquamarine", "size": ['large', 'medium', 'extra-large'], "quantity": 968}]
  },
  {
    "id": 15,
    "name": "Goulash Seasoning",
    "price": 34,
    "available": false,
    "variants": [{"color": "Puce", "size": ['large', 'medium', 'extra-large'], "quantity": 499}]
  },
  {
    "id": 16,
    "name": "Bread - Frozen Basket Variety",
    "price": 69,
    "available": false,
    "variants": [{"color": "Red", "size": ['large', 'medium', 'extra-large'], "quantity": 663}]
  },
  {
    "id": 17,
    "name": "Wine - Spumante Bambino White",
    "price": 33,
    "available": false,
    "variants": [{"color": "Blue", "size": ['large', 'medium', 'extra-large'], "quantity": 347}]
  },
  {
    "id": 18,
    "name": "Cheese - Colby",
    "price": 80,
    "available": true,
    "variants": [{"color": "Green", "size": ['large', 'medium', 'extra-large'], "quantity": 226}]
  },
  {
    "id": 19,
    "name": "Sage Ground Wiberg",
    "price": 45,
    "available": false,
    "variants": [{"color": "Teal", "size": ['large', 'medium', 'extra-large'], "quantity": 357}]
  },
  {
    "id": 20,
    "name": "Water - Mineral, Natural",
    "price": 92,
    "available": true,
    "variants": [{"color": "Violet", "size": ['large', 'medium', 'extra-large'], "quantity": 211}]
  }]

export class Seed {

  constructor() {

  }

  /**
   * Remove all users from the collection and Add seed users to collection
   */
  public async seedUsers() {
    try {
      await User.deleteMany({});
      await User.insertMany(users);
    } catch (e) {
      logger.error("Error populating user", e)
    }
    logger.info('Finished populating users')
  }

  /**
   * Remove all products from the collection and Add seed users to collection
   */
  public async seedProducts() {
    try {
      await Product.deleteMany({});
      await Product.insertMany(products);
    } catch (e) {
      logger.error("Error populating products", e)
    }
    logger.info('Finished populating products')
  }
}


