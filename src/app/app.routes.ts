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

export const routes: Routes = [

    { path: "", redirectTo: "home", pathMatch: 'full' },
    { path: "home", component: HomeComponent, canActivate: [authenticationGuard] },
    { path: "cart", component: CartComponent, canActivate: [authenticationGuard] },
    { path: "categories", component: CategoriesComponent, canActivate: [authenticationGuard] },
    { path: "brands", component: BrandsComponent, canActivate: [authenticationGuard] },
    { path: "products", component: ProductsComponent, canActivate: [authenticationGuard] },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "**", component: NotfoundComponent },

];
