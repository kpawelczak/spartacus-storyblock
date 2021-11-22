import { NgModule } from '@angular/core';
import { BaseStorefrontModule } from "@spartacus/storefront";
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';

@NgModule({
  imports: [
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
    BaseStorefrontModule
  ],
  declarations: [],
  exports: [BaseStorefrontModule]
})
export class SpartacusModule { }
