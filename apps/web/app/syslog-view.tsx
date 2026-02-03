"use client";

import { useSyslogs } from "@/hooks/use-syslogs";
import { SyslogLevel } from "@workspace/api";
import { DatePickerWithRangeField } from "@workspace/ui/components/range-picker-field";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { SelectField } from "@workspace/ui/components/select-field";
import { SyslogTable } from "@/modules/syslog/table";

export const SyslogView = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 1, 1),
    to: addDays(new Date(new Date().getFullYear(), 1, 1), 1),
  });
  const [level, setLevel] = useState<SyslogLevel | undefined>(undefined);

  const { data, isLoading, error } = useSyslogs({
    level,
    startDate: date?.from?.toISOString(),
    endDate: date?.to?.toISOString(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message} </div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex gap-4">
        <DatePickerWithRangeField date={date} setDate={setDate} label="Date Range" />
        <div className="flex flex-col justify-end">
          <SelectField
            value={SyslogLevel[level ?? 0]}
            onValueChange={(value) => setLevel(SyslogLevel[value as keyof typeof SyslogLevel])}
            label="Level"
            options={[
              { value: undefined, label: "All", key: "all" },
              ...Object.keys(SyslogLevel)
                .filter((level) => isNaN(Number(level)))
                .map((level) => ({
                  value: level,
                  label: level,
                })),
            ]}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border w-full h-full">
        <SyslogTable data={data || []} />
      </div>
    </div>
  );
};
