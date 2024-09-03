import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/pages/home/home.component';
import { CartComponent } from './layouts/pages/cart/cart.component';
import { CategoriesComponent } from './layouts/pages/categories/categories.component';
import { BrandsComponent } from './layouts/pages/brands/brands.component';
import { ProductsComponent } from './layouts/pages/products/products.component';
import { RegisterComponent } from './layouts/pages/register/register.component';
import { LoginComponent } from './layouts/pages/login/login.component';
import { NotfoundComponent } from './layouts/additions/notfound/notfound.component';
import { authenticationGuard } from './shared/guards/authentication.guard';
import { ForgotPasswordComponent } from './layouts/additions/forgot-password/forgot-password.component';
import { EmailCodeComponent } from './layouts/additions/email-code/email-code.component';
import { ResetPasswordComponent } from './layouts/additions/reset-password/reset-password.component';
import { ProductDetailsComponent } from './layouts/additions/product-details/product-details.component';
import { ShippingAddressComponent } from './layouts/additions/shipping-address/shipping-address.component';
import { AllOrdersComponent } from './layouts/additions/all-orders/all-orders.component';
import { WishlistComponent } from './layouts/pages/wishlist/wishlist.component';

export const routes: Routes = [

    { path: "", redirectTo: "home", pathMatch: 'full' },
    { path: "home", component: HomeComponent, canActivate: [authenticationGuard] },
    { path: "cart", component: CartComponent, canActivate: [authenticationGuard] },
    { path: "categories", component: CategoriesComponent, canActivate: [authenticationGuard] },
    { path: "brands", component: BrandsComponent, canActivate: [authenticationGuard] },
    { path: "products", component: ProductsComponent, canActivate: [authenticationGuard] },
    { path: "allorders", component: AllOrdersComponent, canActivate: [authenticationGuard] },
    { path: "wishlist", component: WishlistComponent, canActivate: [authenticationGuard] },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "forgot-password", component: ForgotPasswordComponent },
    { path: "email-code", component: EmailCodeComponent },
    { path: "reset-password", component: ResetPasswordComponent },
    { path: "product-details/:id", component: ProductDetailsComponent, canActivate: [authenticationGuard] },
    { path: "shipping-address/:cartID", component: ShippingAddressComponent, canActivate: [authenticationGuard] },
    { path: "**", component: NotfoundComponent },

];
