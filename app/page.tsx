import MarketDashboard from "@/src/widgets/app/market-dashboard/page";
import TechStackViewer from "@/src/widgets/app/tech-stack-viewer/page";
import MvpRoadmap from "@/src/widgets/app/mvp-roadmap/page";
import CostBreakdown from "@/src/widgets/app/cost-breakdown/page";
import IdeaAnalysisCard from "@/src/widgets/app/idea-analysis-card/page";

export default function Home() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-10">
        AI Startup Idea Analyzer
      </h1>

      <div className="space-y-10">

        <IdeaAnalysisCard />

        <MarketDashboard />

        <TechStackViewer />

        <MvpRoadmap />

        <CostBreakdown />

      </div>
    </main>
  );
}