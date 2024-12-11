import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { executeGuards } from './guards';
import { routeUtils } from '@/utils/route';

// 路由守卫组件
const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const from = routeUtils.getPreviousRoute() || '/';
    const to = location.pathname;

    const canActivate = executeGuards({
      navigate,
      from,
      to
    });

    if (!canActivate) {
      return;
    }

    routeUtils.recordRoute(to);
  }, [location.pathname, navigate]);

  return <>{children}</>;
};

// 懒加载页面组件
const HomePage = React.lazy(() => import('@/features/home/pages/HomePage'));
const AssessmentPage = React.lazy(() => import('@/features/assessment/pages/AssessmentPage'));
const ResultPage = React.lazy(() => import('@/features/assessment/pages/ResultPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <RouteGuard>
          <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/assessment" element={<AssessmentPage />} />
                <Route path="/result/:id" element={<ResultPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </MainLayout>
        </RouteGuard>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes; 