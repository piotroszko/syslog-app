"use client";

import { useSyslogs } from "@/hooks/use-syslogs";
import { SyslogLevel } from "@workspace/api";
import { DatePickerWithRangeField } from "@workspace/ui/components/range-picker-field";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { SelectField } from "@workspace/ui/components/select-field";
import { SyslogTable } from "@/modules/syslog/table";
import { Spinner } from "@workspace/ui/components/spinner";

export const SyslogView = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: addDays(new Date(new Date().getFullYear(), 1, 1), 1),
  });
  const [level, setLevel] = useState<SyslogLevel | undefined>(undefined);

  const { data, isLoading, error } = useSyslogs({
    level,
    startDate: date?.from?.toISOString(),
    endDate: date?.to?.toISOString(),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message} </div>;
  }

  const options = useMemo(() => {
    return [
      { value: undefined!, label: "All", key: "all" },
      ...Object.keys(SyslogLevel)
        .filter((level) => isNaN(Number(level)))
        .map((level) => ({
          value: level,
          label: level,
        })),
    ];
  }, []);

  const onLevelChange = (value: string | undefined) => {
    setLevel(SyslogLevel[value as keyof typeof SyslogLevel]);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex gap-4">
        <DatePickerWithRangeField date={date} setDate={setDate} label="Date Range" />
        <div className="flex flex-col justify-end">
          <SelectField
            value={SyslogLevel[level ?? 0]}
            onValueChange={onLevelChange}
            label="Level"
            options={options}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border w-full h-full">
        <SyslogTable data={data || []} />
      </div>
    </div>
  );
};
