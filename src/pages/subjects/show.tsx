import { useShow } from "@refinedev/core";

import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Subject } from "@/types";

const SubjectsShow = () => {
  const { query } = useShow<Subject>({
    resource: "subjects",
  });

  const subject = query.data?.data;

  return (
    <ShowView>
      <ShowViewHeader resource="subjects" />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>{subject?.name ?? "—"}</CardTitle>
            {subject?.code && (
              <Badge variant="secondary">{subject.code}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {subject?.department && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Department
              </p>
              <p className="text-foreground">{subject.department}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Description
            </p>
            <p className="text-foreground whitespace-pre-wrap">
              {subject?.description ?? "—"}
            </p>
          </div>
        </CardContent>
      </Card>
    </ShowView>
  );
};

export default SubjectsShow;
