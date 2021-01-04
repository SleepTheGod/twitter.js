'use strict';

import User from '../structures/User.js';
import Collection from './Collection.js';

/**
 * Builds a User structure
 * @param {Client} client
 * @param {Object|Collection} userData
 */
export function userBuilder(client, userData) {
  if (userData instanceof Collection) {
    const usersCollection = new Collection();
    userData.forEach(element => {
      const user = new User(client, element.data);
      usersCollection.set(user.id, user);
    });
    return usersCollection;
  } else {
    const user = new User(client, userData.data);
    return user;
  }
}
