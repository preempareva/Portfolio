/**
 * Tag any content item `approval: "pending"` to hide it from the site.
 * Setting NEXT_PUBLIC_SHOW_PENDING=1 shows pending items anyway (handy for previews).
 */
export type Approval = "approved" | "pending";

export const SHOW_PENDING = process.env.NEXT_PUBLIC_SHOW_PENDING === "1";

export function isVisible(item: { approval: Approval }): boolean {
  return item.approval === "approved" || SHOW_PENDING;
}
