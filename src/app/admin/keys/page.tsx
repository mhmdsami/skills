import { env } from "@/env";
import { listKeys } from "@/lib/access-keys";
import { listPrivateSkills } from "@/lib/private-skills";
import { KeysPanel } from "../keys";

export const dynamic = "force-dynamic";

export default async function KeysPage() {
  const [keys, slugs] = await Promise.all([listKeys(), listPrivateSkills(env())]);

  return <KeysPanel keys={keys} slugs={slugs.map((skill) => skill.slug)} />;
}
