import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { Home, BookOpen, GraduationCap, ClipboardList, Users, Building2 } from "lucide-react";
import { Outlet } from "react-router";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectsList from "./pages/subjects/list";
import ClassesList from "./pages/classes/list";
import ClassesCreate from "./pages/classes/create";
import ClassesShow from "./pages/classes/show";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { authProvider } from "./providers/auth";
import { dataProvider } from "./providers/data";
import Dashboard from "./pages/dashboard";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import SubjectsCreate from "./pages/subjects/create";
import { EnrollmentsCreate, EnrollmentsJoin } from "./pages/enrollments";
import FacultyList from "./pages/faculty/list";
import FacultyShow from "./pages/faculty/show";
import DepartmentsList from "./pages/departments/list";
import DepartmentsCreate from "./pages/departments/create";
import DepartmentsShow from "./pages/departments/show";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              authProvider={authProvider}
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "9iPPCw-GIGcPh-jRsWD6",
                title: { text: " CLMS Dashboard" },
              }}
              resources={[
                {
                  name: "Dashboard",
                  list: "/",
                  meta: { label: "Home", icon: <Home /> },
                },
                {
                  name: "departments",
                  list: "/departments",
                  create: "/departments/create",
                  show: "/departments/show/:id",
                  meta: { label: "Departments", icon: <Building2 /> },
                },
                {
                  name: "subjects",
                  list: "/subjects",
                  create: "/subjects/create",
                  meta: { label: "Subjects", icon: <BookOpen /> },
                },
                {
                  name: "classes",
                  list: "/classes",
                  create: "/classes/create",
                  show: "/classes/show/:id",
                  meta: { label: "Classes", icon: <GraduationCap /> },
                },
                {
                  name: "enrollments",
                  list: "/enrollments",
                  create: "/enrollments/create",
                  meta: { label: "Enrollments", icon: <ClipboardList /> },
                },
                {
                  name: "faculty",
                  list: "/faculty",
                  show: "/faculty/show/:id",
                  meta: { label: "Faculty", icon: <Users /> },
                },
                {
                  name: "users",
                  list: "/",
                  meta: { hide: true },
                },
              ]}
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  element={
                    <Authenticated
                      key="authenticated"
                      fallback={<Navigate to="/login" replace />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="departments">
                    <Route index element={<DepartmentsList />} />
                    <Route path="create" element={<DepartmentsCreate />} />
                    <Route path="show/:id" element={<DepartmentsShow />} />
                  </Route>
                  <Route path="subjects">
                    <Route index element={<SubjectsList />} />
                    <Route path="create" element={<SubjectsCreate />} />
                  </Route>
                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<ClassesCreate />} />
                    <Route path="show/:id" element={<ClassesShow />} />
                  </Route>
                  <Route path="enrollments">
                    <Route index element={<EnrollmentsJoin />} />
                    <Route path="create" element={<EnrollmentsCreate />} />
                  </Route>
                  <Route path="faculty">
                    <Route index element={<FacultyList />} />
                    <Route path="show/:id" element={<FacultyShow />} />
                  </Route>
                  <Route path="api/users" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
