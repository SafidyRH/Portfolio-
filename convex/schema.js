import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  technologies: defineTable({
    name: v.string(),
    category: v.string(),
    color: v.string(),
    description: v.optional(v.string()),
    logoId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_name", ["name"]),
  projects: defineTable({
    title: v.string(),
    slug: v.string(),
    type: v.string(),
    description: v.string(),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    featured: v.boolean(),
    order: v.number(),
    technologyIds: v.array(v.id("technologies")),
    imageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    imageAlt: v.string(),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),
});
