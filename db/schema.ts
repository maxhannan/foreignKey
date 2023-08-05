// schema.ts

import {
  boolean,
  datetime,
  index,
  int,
  json,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";
export const accounts = mysqlTable(
  "accounts",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
    access_token: text("access_token"),
    expires_in: int("expires_in"),
    id_token: text("id_token"),
    refresh_token: text("refresh_token"),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    scope: varchar("scope", { length: 191 }),
    token_type: varchar("token_type", { length: 191 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "accounts__provider__providerAccountId__idx"
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("accounts__userId__idx").on(account.userId),
  })
);

export const sessions = mysqlTable(
  "sessions",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    expires: datetime("expires").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
      session.sessionToken
    ),
    userIdIndex: index("sessions__userId__idx").on(session.userId),
  })
);

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    name: varchar("name", { length: 191 }),
    email: varchar("email", { length: 191 }).notNull(),
    emailVerified: timestamp("emailVerified"),
    image: varchar("image", { length: 191 }),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    username: varchar("username", { length: 191 }).unique().notNull(),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email__idx").on(user.email),
  })
);

export const verificationTokens = mysqlTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: datetime("expires").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex("verification_tokens__token__idx").on(
      verificationToken.token
    ),
  })
);

export const posts = mysqlTable(
  "posts",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    title: varchar("title", { length: 191 }).notNull(),
    subtitle: varchar("subtitle", { length: 191 }).notNull(),
    content: json("content").notNull(),
    featuredImgSrc: varchar("featuredImgSrc", { length: 191 }).notNull(),
    featuredImgBlurHash: varchar("featuredImgBlurHash", {
      length: 700,
    }).notNull(),
    authorId: varchar("authorId", { length: 191 }).notNull(),
    published: boolean("published").notNull().default(false),
    views: int("views").notNull().default(0),
  },
  (post) => ({
    uniqueIndex: uniqueIndex("posts_id_idx").on(post.id),
    authorIdIndex: index("posts__authorId__idx").on(post.authorId),
  })
);
export type User = InferModel<typeof users>;

export const tags = mysqlTable(
  "tags",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
  },
  (tag) => ({
    uniqueIndex: uniqueIndex("tags_id_idx").on(tag.id),
    nameIndex: uniqueIndex("tags_name_idx").on(tag.name),
  })
);

export const likes = mysqlTable(
  "likes",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    postId: varchar("postId", { length: 191 }).notNull(),
  },
  (like) => ({
    uniqueIndex: uniqueIndex("likes_id_idx").on(like.id),
    userIdIndex: index("likes__userId__idx").on(like.userId),
    postIdIndex: index("likes__postId__idx").on(like.postId),
  })
);

export const comments = mysqlTable(
  "comments",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    postId: varchar("postId", { length: 191 }).notNull(),
    content: varchar("content", { length: 256 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    replyId: varchar("replyId", { length: 191 }),
  },
  (comment) => ({
    uniqueIndex: uniqueIndex("comments_id_idx").on(comment.id),
    userIdIndex: index("comments__userId__idx").on(comment.userId),
    postIdIndex: index("comments__postId__idx").on(comment.postId),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  tagstoPosts: many(tagstoPosts),
  likes: many(likes),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  comments: one(comments, {
    fields: [comments.replyId],
    references: [comments.id],
  }),
}));

export const tagstoPosts = mysqlTable(
  "tags_to_posts",
  {
    postId: varchar("postId", { length: 191 }).notNull(),
    tagId: varchar("tagId", { length: 191 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.postId, t.tagId),
    postIdIndex: index("tags_to_posts__postId__idx").on(t.postId),
    tagIdIndex: index("tags_to_posts__tagId__idx").on(t.tagId),
  })
);

export const tagsRelations = relations(tags, ({ many }) => ({
  tagstoPosts: many(tagstoPosts),
}));

export const tagstoPostsRelations = relations(tagstoPosts, ({ one }) => ({
  post: one(posts, {
    fields: [tagstoPosts.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [tagstoPosts.tagId],
    references: [tags.id],
  }),
}));
