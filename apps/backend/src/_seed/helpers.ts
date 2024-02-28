import { Strapi } from "@strapi/strapi";
import { statSync } from "fs";

export const randomBoolean = () => Math.random() < 0.5;

const ensureSQLite = (strapi: Strapi) => {
  console.log("verifying db as local SQLite");
  const db: { config: { connection: { client: string } } } = strapi.db as any; // from debugging

  if (db.config.connection.client !== "sqlite") {
    throw new Error(
      "strapi is NOT using local SQLite! Please, verify usage of SQLite before clearing data",
    );
  }
};

export const clearData = async (strapi: Strapi) => {
  ensureSQLite(strapi);

  const collectionTypeUids = [
    "api::article.article",
    "plugin::users-permissions.user",
  ];
  const bulkClears = [];

  for (const collectionTypeUid of collectionTypeUids) {
    const collectionClear = strapi.db.query(collectionTypeUid).deleteMany({
      where: {
        id: {
          $notNull: true,
        },
      },
    });

    bulkClears.push(collectionClear);
  }

  await Promise.all(bulkClears);
};

export type UploadFile = {
  data: UploadFileData;
  file: UploadFileFile;
};

export type UploadFileData = {
  ref: string;
  refId: string;
  field: string;
};

export type UploadFileFile = {
  name: string;
  path: string;
  type: string;
};

export const uploadFile = async (strapi: Strapi, uploadFiles: UploadFile[]) => {
  const bulkUploads = [];

  if (!uploadFiles.length) {
    return [];
  }

  for (let i = 0; i < uploadFiles.length; i++) {
    const uploadFile = uploadFiles[i];
    const { refId, ref, field } = uploadFile.data;
    const { name, path, type } = uploadFile.file;

    const fileStat = statSync(path);

    const collectionUpload = strapi.plugins.upload.services.upload.upload({
      data: {
        refId,
        ref,
        field,
      },
      files: {
        path,
        name,
        type,
        size: fileStat.size,
      },
    });

    bulkUploads.push(collectionUpload);
  }

  const uploadedFiles = await Promise.all(bulkUploads);

  return uploadedFiles.flat(Infinity);
};
