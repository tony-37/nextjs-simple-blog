export type Article = {
  id: number;
  attributes: {
    title: string;
    category: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    author: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          width: number;
          height: number;
          ext: string;
          url: string;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
};

export type Comment = {
  id: number;
  attributes: {
    message: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    author?: string;
    article: {
      data: Article;
    };
  };
};

export type MetaData = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type StyledProps = {
  className?: string;
  style?: React.CSSProperties;
};
