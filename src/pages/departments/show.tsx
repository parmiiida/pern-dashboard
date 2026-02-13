import { useShow } from "@refinedev/core";
import { useParams } from "react-router";

import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import type { DepartmentShowData } from "@/types";

const DepartmentShow = () => {
  const { id: idParam } = useParams();
  const { query } = useShow<DepartmentShowData>({
    resource: "departments",
    id: idParam,
  });

  const response = query.data as DepartmentShowData | { data?: DepartmentShowData } | undefined;
  const raw: DepartmentShowData | undefined =
    response && "data" in response && response.data != null ? response.data : (response as DepartmentShowData | undefined);
  const department = raw?.department;
  const totals = raw?.totals;

  if (query.isLoading || query.isFetching) {
    return (
      <ShowView>
        <ShowViewHeader resource="departments" />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </ShowView>
    );
  }

  if (query.isError || !department) {
    return (
      <ShowView>
        <ShowViewHeader resource="departments" />
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              {query.isError ? "Could not load department." : "Department not found."}
            </p>
          </CardContent>
        </Card>
      </ShowView>
    );
  }

  return (
    <ShowView>
      <ShowViewHeader resource="departments" />
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-2xl">{department.name}</CardTitle>
            {department.code && (
              <Badge variant="secondary">{department.code}</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {department.description && (
            <p className="text-muted-foreground whitespace-pre-wrap">
              {department.description}
            </p>
          )}

          {totals && (
            <>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <BookOpen className="text-muted-foreground h-8 w-8" />
                  <div>
                    <p className="text-muted-foreground text-sm">Subjects</p>
                    <p className="text-2xl font-semibold">{totals.subjects}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <GraduationCap className="text-muted-foreground h-8 w-8" />
                  <div>
                    <p className="text-muted-foreground text-sm">Classes</p>
                    <p className="text-2xl font-semibold">{totals.classes}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <Users className="text-muted-foreground h-8 w-8" />
                  <div>
                    <p className="text-muted-foreground text-sm">Enrolled students</p>
                    <p className="text-2xl font-semibold">{totals.enrolledStudents}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </ShowView>
  );
};

export default DepartmentShow;
