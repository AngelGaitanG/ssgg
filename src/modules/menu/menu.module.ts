import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";
import { ModifierModule } from "./modifier/modifier.module";
import { OptionModule } from "./option/option.module";
import { ProductModule } from "./product/product.module";
import { IntegrationModule } from "./integration/integration.module";

@Module({
    imports: [
        CategoryModule, 
        ModifierModule, 
        OptionModule, 
        ProductModule,
        IntegrationModule
    ],
    controllers: [],
    providers: [],
})
export class MenuModule {}
