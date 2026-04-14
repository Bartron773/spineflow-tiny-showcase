ALTER TABLE `architectural_assets` MODIFY COLUMN `userId` int NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `node_annotations` MODIFY COLUMN `userId` int NOT NULL DEFAULT 0;