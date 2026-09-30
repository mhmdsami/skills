import { CatalogPage } from "@/components/catalog-page";
import { listSkills } from "@/lib/catalog";
import { listRecommendations } from "@/lib/recommendations";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [skills, recommendations] = await Promise.all([listSkills(), listRecommendations()]);
  return <CatalogPage skills={skills.filter((skill) => !skill.internal)} recommendations={recommendations} />;
}
