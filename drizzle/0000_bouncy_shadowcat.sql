CREATE TABLE IF NOT EXISTS "comments" (
	"uuid" text PRIMARY KEY NOT NULL,
	"parentuuid" text,
	"title" text NOT NULL,
	"userid" text NOT NULL,
	"username" text NOT NULL,
	"avatar" text NOT NULL,
	"createdAt" text NOT NULL,
	"reputation" json[],
	"dislikes" json[],
	"message" text NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"isEdited" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"userid" text PRIMARY KEY NOT NULL,
	"username" text,
	"email" text NOT NULL,
	"avatar" text NOT NULL,
	"createdAt" text NOT NULL,
	"isVerified" boolean DEFAULT false NOT NULL
);
