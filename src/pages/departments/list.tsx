import { Link } from "react-router";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { Department } from "@/types";

const DepartmentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilters = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const departmentTable = useTable<Department>({
    columns: useMemo<ColumnDef<Department>[]>(
      () => [
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title">Name</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground font-medium">
              {getValue<string>()}
            </span>
          ),
        },
        {
          id: "description",
          accessorKey: "description",
          size: 400,
          header: () => <p className="column-title">Description</p>,
          cell: ({ getValue }) => (
            <span className="line-clamp-2 truncate">{getValue<string>()}</span>
          ),
        },
        {
          id: "actions",
          size: 100,
          header: () => null,
          cell: ({ row }) => (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/departments/show/${row.original.id}`}>View</Link>
            </Button>
          ),
        },
      ],
      []
    ),
    refineCoreProps: {
      resource: "departments",
      pagination: { pageSize: 10, mode: "server" },
      filters: { permanent: searchFilters },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Departments</h1>
      <div className="intro-row">
        <p>Manage departments.</p>
        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <Input
              type="text"
              placeholder="Search by name"
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CreateButton resource="departments" />
        </div>
      </div>
      <DataTable table={departmentTable} />
    </ListView>
  );
};

export default DepartmentsList;
