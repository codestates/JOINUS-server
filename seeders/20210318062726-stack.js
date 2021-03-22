"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("stacks", [
      { stackName: "C", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "C#", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "C++", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "CSS", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Go", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "HTML", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Java", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "JavaScript", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "JSP", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Liquid", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Node.js", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Perl", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "PHP", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Python", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Ruby", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Sass", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "Solidity", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "TypeScript", createdAt: new Date(), updatedAt: new Date() },
      { stackName: "XML", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stacks", null, {});
  },
};
