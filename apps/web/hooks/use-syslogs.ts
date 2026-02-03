import { useQuery } from "@tanstack/react-query";
import { SyslogDto } from "@workspace/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchSyslogs(params: SyslogDto) {
  const searchParams = new URLSearchParams();

  if (params.startDate) searchParams.append("startDate", params.startDate);
  if (params.endDate) searchParams.append("endDate", params.endDate);
  if (params.level) searchParams.append("level", params.level.toString());

  const response = await fetch(`${API_URL}/syslogs?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch syslogs");
  }

  return response.json();
}

export function useSyslogs(params: SyslogDto = {}) {
  return useQuery({
    queryKey: ["syslogs", params],
    queryFn: () => fetchSyslogs(params),
  });
}
