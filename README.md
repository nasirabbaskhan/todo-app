Quick start

# step 1

First, create an NEXT Project using this command

"npx create-next-app@latest"

# step 2

to create vercel data base and conenct to your local project usin this commond

" vercel "
I have already done

complete steps to create database

# step 3

1: run this command in your project terminal for connection environment
"vercel link"

2: "vercel env pull .env.development.local"
or copy the envirement variable from DB to your .env file

3: then also install this package

    "npm install @vercel/postgres"

# step 4

Click on Storage Tab and select database -1 click on Query Tab and create SQL Table using run this query according to your requirement

create Table todo(
id serial primary key,
title varchar(255) not null,
description varchar(255) not null,
status boolean default true not null,
)

# step 5

To crate drizzle-orm create drizzle.ts folder in lib folder.

"npm i drizzle-orm"

write te following code inside drizzle.ts
import {
pgTable,
serial,
text,
varchar,
timestamp,
boolean,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";

export const todoTable = pgTable("todo", {
id: serial("id").primaryKey(),
title: text("title"),
description: varchar("description"),
status: boolean("status").default(true).notNull(),
});

export type Todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable, "insert">; // insert type

export const db = drizzle(sql);

# step 6

Making the API
rout handler

import { NextRequest, NextResponse } from "next/server";
import { todoTable, db } from "@/app/lib/drizzle";

export async function GET(request: NextRequest) {
try {
const res = await db.select().from(todoTable);
return NextResponse.json({ data: res });
} catch (err) {
console.log((err as { message: string }).message);
return NextResponse.json({
message: (err as { message: string }).message,
});
}
}

export async function POST(request: NextRequest) {
const req = await request.json();

try {
if (req.task) {
const data = await db
.insert(todoTable)
.values({ task: req.task })
.returning();
return NextResponse.json({ message: "task is posted successfully", data });
} else {
throw new Error("Task field is required");
}
} catch (error) {
return NextResponse.json({
message: (error as { message: string }).message,
});
}
}
