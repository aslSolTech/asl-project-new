import { z } from "zod";

export const missionSchema = z.object({
  missionText: z.string().min(1, "Mission Text is required"),
  status: z.string().min(1, "Status is required"),
});

export type MissionFormInput = z.infer<typeof missionSchema>;
