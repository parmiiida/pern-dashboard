import { useShow } from "@refinedev/core";

import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Department } from "@/types";

const DepartmentShow = () => {
  const { query } = useShow<Department>({
    resource: "departments",
  });

  const department = query.data?.data;

  return (
    <ShowView>
      <ShowViewHeader resource="departments" />
      <Card>
        <CardHeader>
          <CardTitle>{department?.name ?? "—"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {department?.description ?? "—"}
          </p>
        </CardContent>
      </Card>
    </ShowView>
  );
};

export default DepartmentShow;
