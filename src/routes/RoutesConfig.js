import React from 'react';
const Login = React.lazy(() => import('../pages/Auth/Login/Login'));
import InsideLayout from '../ui/layout/InsideLayout';
import OutsideLayout from '../ui/layout/OutsideLayout';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword.jsx';

import Register from '../pages/Auth/Register/Register.jsx';

import ResetPassword from '../pages/Auth/ForgotPassword/ResetPassword.jsx';
import Transaction from '../pages/Transaction/Transaction.jsx';
import Plans from '../pages/Plans/Plans.jsx';
import EditPlanDetails from '../pages/EditPlanDetails/EditPlanDetails.jsx';
import UserRedirectPage from '../pages/Transaction/UserRedirectPage.jsx';
import CreatePlan from '../pages/Plans/CreatePlan.jsx';
import Wallet from '../pages/Wallet/Wallet.jsx';
import TransactionList from '../pages/TransactionList/TransactionList.jsx';
import ManageRoles from '../pages/ManageRoles/ManageRoles.jsx';
import PaymentMethodList from '../pages/PaymentMethod/PaymentMethodList.jsx';
import MerchantManagement from '../pages/MerchantManagement/MerchantManagement.jsx';
import CustomerManagement from '../pages/CustomerManagement/CustomerManagement.jsx';
import PlanBadgeManagement from '../pages/PlanBadgeManagement/PlanBadgeManagement.jsx';
import PlansManagement from '../pages/PlansManagement/PlansManagement.jsx';

const allRoutes = [
  {
    path: '/',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '/forgot-password',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <ForgotPassword /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    path: '/reset-password/:token',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <ResetPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  {
    path: '/register',
    element: <OutsideLayout />,
    children: [
      { index: true, element: <Register /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/merchant-management',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <MerchantManagement />,
      },
    ],
  },
  {
    path: '/customer-management',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <CustomerManagement />,
      },
    ],
  },
    {
    path: '/plan-badge',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <PlanBadgeManagement />,
      },
    ],
  },
  {
    path: '/plans',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <PlansManagement />,
      },
    ],
  },
  {
    path: '/transaction',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Transaction />,
      },
    ],
  },
  {
    path: '/create-plan',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <CreatePlan />,
      },
    ],
  },
  {
    path: '/middlePage',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <UserRedirectPage />,
      },
    ],
  },
  {
    path: '/manage-plans',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Plans />,
      },
    ],
  },
  {
    path: '/edit-plan-details/:id',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <EditPlanDetails />,
      },
    ],
  },
  {
    path: '/user-wallet/:id',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <Wallet />,
      },
    ],
  },
  {
    path: '/user-transaction/:id',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <TransactionList />,
      },
    ],
  },
  {
    path: '/manage-roles',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <ManageRoles />,
      },
    ],
  },
  {
    path: '/payment-method',
    element: <InsideLayout />,
    children: [
      {
        index: true,
        element: <PaymentMethodList />,
      },
    ],
  },

  {
    path: '*',
    element: 'Outside page not found',
  },
];
export default allRoutes;
