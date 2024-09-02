"use client";

import { useTask } from "@/app/lib/queries/useTask";
import { TaskForm } from "./TaskForm";
import { rrulestr } from "rrule";
import {
  recurrenceFormValues,
  RecurrenceFormValues,
} from "../RecurrenceForm/RecurrenceForm";

type Props = {
  userId: string;
  taskSlug: string;
};

export default function TaskInfo({ userId, taskSlug }: Props) {
  const { data: task, isLoading } = useTask({ userId, taskId: taskSlug });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>No task found</div>;
  }

  const recurrenceRuleValues = () => {
    if (!task.recurrenceRule) {
      return;
    }

    const {
      options: {
        dtstart,
        freq,
        byweekday,
        bymonthday,
        byyearday,
        interval,
        count,
        until,
      },
    } = rrulestr(task.recurrenceRule.rrule);

    const monthDates = bymonthday?.map(
      (day) => new Date(new Date().getFullYear(), new Date().getMonth(), day)
    );

    const yearDates = byyearday?.map((day) => {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st

      startOfYear.setDate(startOfYear.getDate() + day - 1);
      return startOfYear;
    });

    return {
      rrule: task.recurrenceRule.rrule,
      startDate: dtstart,
      frequency: freq,
      byWeekday: byweekday || recurrenceFormValues.byWeekday,
      byMonthDay: monthDates || recurrenceFormValues.byMonthDay,
      byYearDay: yearDates || recurrenceFormValues.byYearDay,
      interval: interval || recurrenceFormValues.interval,
      count: count || recurrenceFormValues.count,
      until: until || recurrenceFormValues.until,
    };
  };

  return (
    <TaskForm
      userId={userId}
      task={task}
      rruleOptions={recurrenceRuleValues()}
    />
  );
}
