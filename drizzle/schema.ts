import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Architectural Assets - Store file metadata and references for project files
 * Supports images, PDFs, specifications, and other documentation
 */
export const architecturalAssets = mysqlTable("architectural_assets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().default(0),
  nodeId: varchar("nodeId", { length: 64 }).notNull(), // Reference to ENHANCED_VIEWS node ID
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileKey: text("fileKey").notNull(), // S3 file key for storage
  fileUrl: text("fileUrl").notNull(), // CDN URL for accessing the file
  mimeType: varchar("mimeType", { length: 64 }).notNull(),
  fileSizeBytes: int("fileSizeBytes").notNull(),
  description: text("description"),
  assetType: mysqlEnum("assetType", [
    "specification",
    "material_sample",
    "technical_drawing",
    "photograph",
    "documentation",
    "other",
  ]).default("other").notNull(),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ArchitecturalAsset = typeof architecturalAssets.$inferSelect;
export type InsertArchitecturalAsset = typeof architecturalAssets.$inferInsert;

/**
 * Node Annotations - Allow users to save notes and observations about each node
 */
export const nodeAnnotations = mysqlTable("node_annotations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().default(0),
  nodeId: varchar("nodeId", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NodeAnnotation = typeof nodeAnnotations.$inferSelect;
export type InsertNodeAnnotation = typeof nodeAnnotations.$inferInsert;