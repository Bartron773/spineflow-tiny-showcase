CREATE TABLE `architectural_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`nodeId` varchar(64) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileKey` text NOT NULL,
	`fileUrl` text NOT NULL,
	`mimeType` varchar(64) NOT NULL,
	`fileSizeBytes` int NOT NULL,
	`description` text,
	`assetType` enum('specification','material_sample','technical_drawing','photograph','documentation','other') NOT NULL DEFAULT 'other',
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `architectural_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `node_annotations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`nodeId` varchar(64) NOT NULL,
	`title` varchar(255),
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `node_annotations_id` PRIMARY KEY(`id`)
);
