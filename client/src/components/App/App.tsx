import { PageContainer } from "../PageContainer";
import { useChangePageHeightOnWindowResize } from "../../utils/useChangePageHeightOnWindowResize";

export function App() {
  useChangePageHeightOnWindowResize();

  return <PageContainer />;
}
