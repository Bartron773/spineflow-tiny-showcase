import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  uploadAsset,
  getAssetsByNode,
  deleteAsset,
  createAnnotation,
  getAnnotationsByNode,
  updateAnnotation,
  deleteAnnotation,
} from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";
import type { InsertArchitecturalAsset, InsertNodeAnnotation } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Architectural Assets - File Storage
  assets: router({
    uploadFile: protectedProcedure
      .input(
        z.object({
          nodeId: z.string(),
          fileName: z.string(),
          fileData: z.string(), // base64 encoded
          mimeType: z.string(),
          description: z.string().optional(),
          assetType: z.enum([
            "specification",
            "material_sample",
            "technical_drawing",
            "photograph",
            "documentation",
            "other",
          ]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Decode base64 and upload to S3
        const buffer = Buffer.from(input.fileData, "base64");
        const fileKey = `${ctx.user.id}-assets/${input.nodeId}/${nanoid()}-${input.fileName}`;

        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        // Save metadata to database
        const assetData: InsertArchitecturalAsset = {
          nodeId: input.nodeId,
          fileName: input.fileName,
          fileKey,
          fileUrl: url,
          mimeType: input.mimeType,
          fileSizeBytes: buffer.length,
          description: input.description,
          assetType: input.assetType,
        };
        await uploadAsset(ctx.user.id, assetData);

        return { url, fileKey };
      }),

    getByNode: publicProcedure
      .input(z.object({ nodeId: z.string() }))
      .query(async ({ input }) => {
        return getAssetsByNode(input.nodeId);
      }),

    delete: protectedProcedure
      .input(z.object({ assetId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteAsset(input.assetId, ctx.user.id);
        return { success: true };
      }),
  }),

  // Node Annotations - User Notes
  annotations: router({
    create: protectedProcedure
      .input(
        z.object({
          nodeId: z.string(),
          title: z.string().optional(),
          content: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const annotationData: InsertNodeAnnotation = {
          nodeId: input.nodeId,
          title: input.title,
          content: input.content,
        };
        await createAnnotation(ctx.user.id, annotationData);
        return { success: true };
      }),

    getByNode: publicProcedure
      .input(z.object({ nodeId: z.string() }))
      .query(async ({ input }) => {
        return getAnnotationsByNode(input.nodeId);
      }),

    update: protectedProcedure
      .input(
        z.object({
          annotationId: z.number(),
          title: z.string().optional(),
          content: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { annotationId, ...updates } = input;
        await updateAnnotation(annotationId, ctx.user.id, updates);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ annotationId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteAnnotation(input.annotationId, ctx.user.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
