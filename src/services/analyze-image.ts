import vision from "@google-cloud/vision";
import { ILabels } from "../types/labels-type";

async function analyzeImage(uri: string): Promise<ILabels[]> {
  const visionClient = new vision.ImageAnnotatorClient();
  const [result] = await visionClient.labelDetection(uri);
  let labels: ILabels[] | undefined = result.labelAnnotations?.map(
    ({ score, description }) => {
      return {
        score,
        description,
      };
    }
  );
  return labels ?? [];
}

export { analyzeImage };
