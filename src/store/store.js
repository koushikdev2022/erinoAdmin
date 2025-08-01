import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../Reducer/AuthSlice';
import ProductSlice from '../Reducer/ProductSlice';
import PricingSlice from '../Reducer/PricingSlice';
import CouponSlice from '../Reducer/CouponSlice';
import UpSellSlice from '../Reducer/UpSellSlice';
import DownSellSlice from '../Reducer/DownSellSlice';
import EditorSlice from '../Reducer/EditorSlice';
import BumpProductSlice from '../Reducer/BumpProductSlice';
import AffiliateSlice from '../Reducer/AffiliateSlice';
import PaymentProcessorSlice from '../Reducer/PaymentProcessorSlice';
import FunnelSlice from '../Reducer/FunnelSlice';
import OrderSlice from '../Reducer/OrderSlice';
import PaymentSetupSlice from '../Reducer/PaymentSetupSlice';
import ProductTemplateSlice from '../Reducer/ProductTemplateSlice';
import RevenueSlice from '../Reducer/RevenueSlice';
import UserEditorSlice from '../Reducer/UserEditorSlice';
import PaymentSlice from '../Reducer/PaymentSlice';
import ProfileSlice from '../Reducer/ProfileSlice'
import InvoiceSlice from '../Reducer/InvoiceSlice'
import DashBoardSlice from '../Reducer/DashBoardSlice'
import TransactionSlice from '../Reducer/TransactionSlice';
import PlanSlice from '../Reducer/PlanSlice';
import WalletSlice from '../Reducer/WalletSlice';
import CoachSlice from '../Reducer/CoachSlice';
import LevelSlice from '../Reducer/LevelSlice';
import TopicSlice from '../Reducer/TopicSlice';
import ModuleSlice from '../Reducer/ModuleSlice';
import PlanKeySlice from '../Reducer/PlanKeySlice';
import PaymentMethodSlice from '../Reducer/PaymentMethodSlice';
import CourseSlice from '../Reducer/CourseSlice';
import CustomerSlice from '../Reducer/CustomerSlice';
import MarchentSlice from '../Reducer/MarchentSlice';
import DashboardSliceNew from '../Reducer/DashboardSliceNew';
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    transaction: TransactionSlice,
    plan: PlanSlice,
    product: ProductSlice,
    pricing: PricingSlice,
    coupon: CouponSlice,
    upSellProduct: UpSellSlice,
    downSellProduct: DownSellSlice,
    editor: EditorSlice,
    bump: BumpProductSlice,
    affil: AffiliateSlice,
    paymentPro: PaymentProcessorSlice,
    funnels: FunnelSlice,
    order: OrderSlice,
    paykey: PaymentSetupSlice,
    tempPlate: ProductTemplateSlice,
    rev: RevenueSlice,
    usereditors: UserEditorSlice,
    paymentKey: PaymentSlice,
    profile: ProfileSlice,
    invoice: InvoiceSlice,
    dash: DashBoardSlice,
    transactions: WalletSlice,
    coach: CoachSlice,
    levelsData: LevelSlice,
    topicsData: TopicSlice,
    modulesData: ModuleSlice,
    plankey: PlanKeySlice,
    paymentMethod: PaymentMethodSlice,
    courses: CourseSlice,
    coustomers:CustomerSlice,
    marchent:MarchentSlice,
    dashNew:DashboardSliceNew
  },
  devTools: import.meta.env.DEV,
});

export default store;
