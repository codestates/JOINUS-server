"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        userName: "kill",
        userEmail: "k@n.g",
        password: "1q2w3e4r",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: "dong",
        userEmail: "d@t.a",
        password: "3e8sf4s6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("stacks", [
      {
        stackName: "javascript",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stackName: "python",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stackName: "c#",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("stacks", null, {});
  },
};
