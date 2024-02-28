import { Strapi } from "@strapi/strapi";

const { SEED_USERNAME, SEED_PASSWORD } = process.env;
const username = SEED_USERNAME || "strapi_user";
const password = SEED_PASSWORD || "strapiPassword123456";

/**
 * Using Users collection as main indicator if we have generated seed data before
 */
export const seedUserExists = async (strapi: Strapi) => {
  const [seedUser] = await strapi.entityService.findMany(
    "plugin::users-permissions.user",
    {
      filters: {
        username,
      },
    },
  );
  return !!seedUser;
};

/**
 * Creating user that will be an indicator for method `seedUserExists`
 *
 * cannot be used for login, such as lacks full functionality with JWT
 * for more info how to create valid user via API, checkout the source-code:
 * https://github.com/strapi/strapi/blob/master/packages/plugins/users-permissions/server/controllers/auth.js#L239
 */
export const createSeedUser = async (strapi: Strapi) => {
  await strapi.entityService.create("plugin::users-permissions.user", {
    data: {
      username,
      password,
      email: `${username}@test.com`,
      confirmed: true,
      role: 2,
    },
  });

  await updateRolePermissions(strapi);
};

export const updateRolePermissions = async (strapi: Strapi) => {
  const articleActions = [
    "api::article.article.find",
    "api::article.article.findOne",
    "api::article.article.create",
    "api::article.article.update",
    "api::article.article.delete",
  ];
  const commentActions = [
    "api::comment.comment.find",
    "api::comment.comment.findOne",
    "api::comment.comment.create",
    "api::comment.comment.update",
    "api::comment.comment.delete",
  ];
  const bulkPermission = [];

  const findPermission = await strapi.db
    .query("plugin::users-permissions.permission")
    .findOne({
      where: { action: articleActions[0] },
    });

  if (findPermission) {
    return;
  }

  for (const action of articleActions.concat(commentActions)) {
    const permission = strapi.db
      .query("plugin::users-permissions.permission")
      .create({
        data: {
          action,
          role: 2,
        },
      });

    bulkPermission.push(permission);
  }
};
