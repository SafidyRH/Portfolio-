import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server.js";

const projectStatus = v.union(
  v.literal("draft"),
  v.literal("published"),
  v.literal("archived"),
);

const projectFields = {
  title: v.string(),
  type: v.string(),
  description: v.string(),
  status: projectStatus,
  featured: v.boolean(),
  order: v.number(),
  technologyIds: v.array(v.id("technologies")),
  imageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
  imageAlt: v.string(),
  githubUrl: v.optional(v.string()),
  liveUrl: v.optional(v.string()),
};

const normalizeEmail = (value) => String(value ?? "").trim().toLowerCase();

async function requireAdmin(ctx) {
  const userId = await getAuthUserId(ctx);
  const user = userId ? await ctx.db.get(userId) : null;
  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);

  if (!user || !adminEmail || normalizeEmail(user.email) !== adminEmail) {
    throw new ConvexError("Acces administrateur requis.");
  }

  return user;
}

function cleanOptionalUrl(value) {
  const clean = value?.trim();
  return clean ? clean : undefined;
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueSlug(ctx, title, ignoredId) {
  const base = slugify(title) || "projet";
  let slug = base;
  let suffix = 2;

  while (true) {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!existing || existing._id === ignoredId) return slug;
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
}

async function hydrateProject(ctx, project) {
  const technologies = (
    await Promise.all(project.technologyIds.map((id) => ctx.db.get(id)))
  ).filter(Boolean);
  const storedImageUrl = project.imageId
    ? await ctx.storage.getUrl(project.imageId)
    : null;

  return {
    ...project,
    technologies,
    resolvedImageUrl: storedImageUrl ?? project.imageUrl ?? null,
  };
}

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    const hydrated = await Promise.all(projects.map((project) => hydrateProject(ctx, project)));
    return hydrated.sort((a, b) => a.order - b.order || b.updatedAt - a.updatedAt);
  },
});

export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const projects = await ctx.db.query("projects").collect();
    const hydrated = await Promise.all(projects.map((project) => hydrateProject(ctx, project)));
    return hydrated.sort((a, b) => a.order - b.order || b.updatedAt - a.updatedAt);
  },
});

export const listTechnologies = query({
  args: { adminOnly: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    if (args.adminOnly) await requireAdmin(ctx);
    const technologies = await ctx.db.query("technologies").collect();
    const hydrated = await Promise.all(technologies.map(async (technology) => ({
      ...technology,
      resolvedLogoUrl: technology.logoId
        ? await ctx.storage.getUrl(technology.logoId)
        : null,
    })));
    return hydrated.sort((a, b) => a.name.localeCompare(b.name));
  },
});

export const createProject = mutation({
  args: projectFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const now = Date.now();
    return await ctx.db.insert("projects", {
      ...args,
      title: args.title.trim(),
      type: args.type.trim(),
      description: args.description.trim(),
      imageAlt: args.imageAlt.trim() || args.title.trim(),
      githubUrl: cleanOptionalUrl(args.githubUrl),
      liveUrl: cleanOptionalUrl(args.liveUrl),
      imageUrl: cleanOptionalUrl(args.imageUrl),
      slug: await uniqueSlug(ctx, args.title),
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateProject = mutation({
  args: { id: v.id("projects"), ...projectFields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new ConvexError("Projet introuvable.");

    const { id, ...updates } = args;
    if (existing.imageId && existing.imageId !== updates.imageId) {
      await ctx.storage.delete(existing.imageId);
    }

    await ctx.db.patch(id, {
      ...updates,
      title: updates.title.trim(),
      type: updates.type.trim(),
      description: updates.description.trim(),
      imageAlt: updates.imageAlt.trim() || updates.title.trim(),
      githubUrl: cleanOptionalUrl(updates.githubUrl),
      liveUrl: cleanOptionalUrl(updates.liveUrl),
      imageUrl: cleanOptionalUrl(updates.imageUrl),
      slug: await uniqueSlug(ctx, updates.title, id),
      updatedAt: Date.now(),
    });
  },
});

export const setProjectStatus = mutation({
  args: { id: v.id("projects"), status: projectStatus },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { status: args.status, updatedAt: Date.now() });
  },
});

export const removeProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const project = await ctx.db.get(args.id);
    if (!project) return;
    if (project.imageId) await ctx.storage.delete(project.imageId);
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const createTechnology = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    color: v.string(),
    description: v.optional(v.string()),
    logoId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const name = args.name.trim();
    const duplicate = await ctx.db
      .query("technologies")
      .withIndex("by_name", (q) => q.eq("name", name))
      .unique();
    if (duplicate) throw new ConvexError("Cette technologie existe deja.");
    const now = Date.now();
    return await ctx.db.insert("technologies", {
      name,
      category: args.category.trim(),
      color: args.color,
      description: args.description?.trim() || undefined,
      logoId: args.logoId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateTechnology = mutation({
  args: {
    id: v.id("technologies"),
    name: v.string(),
    category: v.string(),
    color: v.string(),
    description: v.optional(v.string()),
    logoId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const duplicate = await ctx.db
      .query("technologies")
      .withIndex("by_name", (q) => q.eq("name", args.name.trim()))
      .unique();
    if (duplicate && duplicate._id !== args.id) {
      throw new ConvexError("Cette technologie existe deja.");
    }
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new ConvexError("Technologie introuvable.");
    if (existing.logoId && existing.logoId !== args.logoId) {
      await ctx.storage.delete(existing.logoId);
    }
    await ctx.db.patch(args.id, {
      name: args.name.trim(),
      category: args.category.trim(),
      color: args.color,
      description: args.description?.trim() || undefined,
      logoId: args.logoId,
      updatedAt: Date.now(),
    });
  },
});

export const removeTechnology = mutation({
  args: { id: v.id("technologies") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const projects = await ctx.db.query("projects").collect();
    if (projects.some((project) => project.technologyIds.includes(args.id))) {
      throw new ConvexError("Cette technologie est encore utilisee par un projet.");
    }
    const technology = await ctx.db.get(args.id);
    if (technology?.logoId) await ctx.storage.delete(technology.logoId);
    await ctx.db.delete(args.id);
  },
});
