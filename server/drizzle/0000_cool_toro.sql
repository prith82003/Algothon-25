CREATE TABLE IF NOT EXISTS "marking" (
	"id" serial PRIMARY KEY NOT NULL,
	"submission_id" integer,
	"score" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_name" text,
	"file_key" text,
	"is_individual" boolean DEFAULT false NOT NULL,
	"ready_to_mark" boolean DEFAULT false NOT NULL,
	"date_submitted" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "marking" ADD CONSTRAINT "marking_submission_id_submission_id_fk" FOREIGN KEY ("submission_id") REFERENCES "submission"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
