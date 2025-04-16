import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes, RouteConfig } from './routes';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route: RouteConfig, index: number) => (
        <Route
          key={index}
          path={route.path}
          element={
            route.public ? (
              route.element
            ) : (
              <ProtectedRoute>{route.element}</ProtectedRoute>
            )
          }
        />
      ))}
    </Routes>
  );
};