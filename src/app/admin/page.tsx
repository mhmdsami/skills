import Link from "next/link";
import { env } from "@/env";
import { listPrivateSkills } from "@/lib/private-skills";
import { listRecommendations } from "@/lib/recommendations";
import { archivePrivateSkillAction, deletePrivateSkillAction, unarchivePrivateSkillAction } from "./actions";
import { ConfirmAction } from "@/components/confirm-action";
import { DashboardEmpty } from "@/components/dashboard-empty";
import { DashboardRow } from "@/components/dashboard-row";
import { SectionHeader } from "@/components/section-header";
import { RecommendationsPanel } from "./recommendations";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [skills, archivedSkills, recommendations] = await Promise.all([
    listPrivateSkills(env()),
    listPrivateSkills(env(), { archived: true }),
    listRecommendations(),
  ]);

  return (
    <div className="space-y-12">
      <section>
        <SectionHeader
          title="Private skills"
          description="Unlisted skills, available through their private download links."
          action={<Link href="/admin/skills/new" className="button-secondary">New skill</Link>}
        />
        <ul className="mt-5 border-t border-border">
          {skills.length ? skills.map((skill) => (
            <DashboardRow key={skill.slug} title={skill.name} description={skill.description || "No description"}>
              <Link href={`/admin/skills/${skill.slug}`} className="row-action">Edit</Link>
              <ConfirmAction
                action={archivePrivateSkillAction}
                hidden={{ slug: skill.slug }}
                title={`Archive ${skill.slug}?`}
                body="Its private link stops working. The skill and its versions stay in the archive."
                trigger="Archive"
                pendingLabel="Archiving..."
                destructive={false}
              />
            </DashboardRow>
          )) : (
            <DashboardEmpty
              title="No private skills yet."
              description="Create one to share it through an unlisted link."
              action={<Link href="/admin/skills/new" className="button-secondary mt-4 text-[11px]">New skill</Link>}
            />
          )}
        </ul>
      </section>

      {archivedSkills.length > 0 && <section>
        <SectionHeader
          as="h2"
          title="Archived"
          description="Links stay off. Restore a skill to publish it again, or delete it permanently."
        />
        <ul className="mt-5 border-t border-border">
          {archivedSkills.map((skill) => (
            <DashboardRow key={skill.slug} title={skill.name} description={skill.description || "No description"}>
              <Link href={`/admin/skills/${skill.slug}`} className="row-action">Edit</Link>
              <ConfirmAction
                action={unarchivePrivateSkillAction}
                hidden={{ slug: skill.slug }}
                title={`Restore ${skill.slug}?`}
                body="The private link starts working again for keys scoped to this skill."
                trigger="Restore"
                pendingLabel="Restoring..."
                destructive={false}
              />
              <ConfirmAction
                action={deletePrivateSkillAction}
                hidden={{ slug: skill.slug }}
                title={`Delete ${skill.slug}?`}
                body="Removes the skill and all of its versions from storage. This cannot be undone."
                trigger="Delete permanently"
                pendingLabel="Deleting..."
              />
            </DashboardRow>
          ))}
        </ul>
      </section>}

      <RecommendationsPanel recommendations={recommendations} />
    </div>
  );
}
