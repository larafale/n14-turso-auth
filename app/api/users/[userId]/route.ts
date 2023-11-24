import { z } from "zod";
import { eq } from "drizzle-orm";

import { db, tables } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { userNameSchema } from "@/lib/validations/user";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    const user = await getCurrentUser();
    if (!user || params.userId !== user.id)
      return new Response(null, { status: 403 });

    const body = await req.json();
    const payload = userNameSchema.parse(body);

    await db
      .update(tables.users)
      .set(payload)
      .where(eq(tables.users.id, params.userId));

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
