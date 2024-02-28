import { Strapi } from "@strapi/strapi";
import { generateSeedData } from "./_seed";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    console.log("running App bootstrap...");

    if (process.env.NODE_ENV === "development") {
      console.log("the App is in the development mode!");
      console.log("running the development bootstrap...");

      await generateSeedData(strapi);

      // other DEVELOPMENT bootstrap functions
    }

    console.log("bootstrap function has finished successfully!");
  },
};
