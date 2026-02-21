import { notFound } from "next/navigation";
import { SandboxPreview } from "./sandbox-preview";

export const dynamic = "force-dynamic";

export default function SandboxPreviewPage(): React.ReactElement {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <SandboxPreview />;
}
