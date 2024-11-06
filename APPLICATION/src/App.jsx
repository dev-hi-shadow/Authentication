import { Route, Routes, useNavigate } from "react-router-dom";
import { PageRoutes } from "./assets/Configurations/ManagementSection.jsx";
import PageNotFound from "./Assets/Pages/PageNotFound.jsx";
import { useProfileQuery } from "./Services/API/Auth.jsx";
import { useEffect } from "react";

function App() {
  const Navigate = useNavigate();
  const data = useProfileQuery();
  useEffect(() => {
    Navigate("/profile");
  }, []);

  return (
    <>
      <Routes>
        {PageRoutes?.map((item) => {
          return (
            <Route
              key={item.path || "/404"}
              path={item.path || "404"}
              element={item.element || <PageNotFound />}
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
