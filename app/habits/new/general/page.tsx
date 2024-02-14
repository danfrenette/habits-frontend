import { Separator } from "@/app/components/ui/separator";
import { GeneralHabitInfo } from "./GeneralHabitInfo";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Information</h3>
        <p className="text-sm text-muted-foreground">
          Basic information about your new habit.
        </p>
      </div>
      <Separator />
      <GeneralHabitInfo />
    </div>
  );
}
