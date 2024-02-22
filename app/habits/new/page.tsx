"use client";

import { Separator } from "@/app/components/ui/separator";
import { GeneralHabitInfo } from "./GeneralHabitInfo";
import { useHabitForm } from "@/app/lib/contexts/HabitFormContext/HabitFormContext";
import { CueForm } from "./CueForm";
import { ResponseForm } from "./ResponseForm";
import { Resolver, useForm } from "react-hook-form";
import { useCreateHabit } from "@/app/lib/queries/useCreateHabit";
import { useSession } from "next-auth/react";
import { toast } from "@/app/components/ui/use-toast";
import { CueType } from "@/app/types/backend/Habit";
import { TimeValue } from "react-aria";

export default function Page() {
  const { data: session } = useSession();
  const { currentSection } = useHabitForm();
  const createHabit = useCreateHabit(session?.user.id as string);

  interface FormValues {
    name: string;
    current: boolean;
    cueDescription: string;
    cueType: CueType;
    cueTime: TimeValue;
    cueRrule: string;
    frequency: string;
    byWeekday: string[];
    interval: number;
    count: number;
    responseDescription: string;
  }

  const validateName = (name: string): string | null => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters long";
    return null;
  };

  const customResolver: Resolver<FormValues> = async (values) => {
    const errors: Record<string, { message: string }> = {};
    const { name } = values;

    const nameError = validateName(name);
    if (nameError) errors.name = { message: nameError };

    return {
      values: errors.name ? {} : values,
      errors: errors,
    };
  };

  const form = useForm<FormValues>({
    resolver: customResolver,
    defaultValues: {
      current: false,
      name: "",
      cueDescription: "",
      byWeekday: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    debugger;
    createHabit.mutate(data, {
      onSuccess: () => {
        toast({
          title: "you submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      },
    });
  };

  const renderSection = () => {
    switch (currentSection) {
      case "General":
        return <GeneralHabitInfo form={form} onSubmit={onSubmit} />;
      case "Cue":
        return <CueForm form={form} onSubmit={onSubmit} />;
      // case "Craving":
      //   return <CravingForm />;
      case "Response":
        return <ResponseForm form={form} onSubmit={onSubmit} />;
      // case "Reward":
      //   return <RewardForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Information</h3>
        <p className="text-sm text-muted-foreground">
          Basic information about your new habit.
        </p>
      </div>
      <Separator />
      {renderSection()}
    </div>
  );
}
